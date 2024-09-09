import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as targets from 'aws-cdk-lib/aws-route53-targets'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'

export interface BaseStackProps extends cdk.StackProps {
  // envName: string;
  stackName: string;
  domainName: string;
  certificateArn: string;
  recordPrefix: string;
  appName: string;
  cdkPipelineUserArn: string;
}

export class BaseStack extends cdk.Stack {
  constructor (scope: cdk.App, id: string, props: BaseStackProps) {
    super(scope, id, props)

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'OAI')

    // Create an S3 bucket for the SPA
    const spaBucket = new s3.Bucket(this, `${props.stackName}-${props.appName}-bucket`, {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      objectOwnership: s3.ObjectOwnership.OBJECT_WRITER,
      autoDeleteObjects: true, // Automatically delete bucket contents when the bucket is deleted
      blockPublicAccess: { // Allow public access //TODO: find more restrictive settings
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      },
    })

    // Create an Origin Access Identity

    // Allow CloudFront Origin Access Identity to read the bucket
    spaBucket.grantRead(originAccessIdentity)

    const prodCachePolicy = new cloudfront.CachePolicy(this, 'ProdCachePolicy', {
      defaultTtl: cdk.Duration.days(1), // or whatever makes sense for your application
    })

    // Choose the appropriate cache policy based on the environment
    const chosenCachePolicy = prodCachePolicy
    console.log('chosenCachePolicy', chosenCachePolicy)

    // Create a CloudFront distribution for the SPA
    const distribution = new cloudfront.Distribution(this, `${props.stackName}-${props.appName}-dist`, {
      defaultBehavior: {
        origin: new origins.S3Origin(spaBucket, {
          originAccessIdentity, // make sure to include this
        }),
        cachePolicy: chosenCachePolicy,
      },

      domainNames: [`${props.recordPrefix}.${props.domainName}`], // Changed this line
      certificate: acm.Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn),
      errorResponses: [{
        httpStatus: 404,
        responsePagePath: '/error.html',
        responseHttpStatus: 200,
      }],
    })

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('./dist')], // Replace with your actual compiled web app directory
      destinationBucket: spaBucket,
      distribution,
    })

    // setup DNS for the SPA
    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: props.domainName })
    // console.log("zone", zone)
    console.log('props.domainName', props.domainName)
    console.log('record name: ', `${props.recordPrefix}.${props.domainName}`)
    new route53.ARecord(this, 'SpaAliasRecord', {
      zone,
      recordName: `${props.recordPrefix}.${props.domainName}`,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution)),
    })

    // Create a role that GitHub Actions will assume

    const cicdRole = new iam.Role(this, 'CICDRole', { assumedBy: new iam.ArnPrincipal(props.cdkPipelineUserArn) })

    cicdRole.addToPolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject', 's3:PutObject', 'cloudfront:CreateDistribution', 'cloudfront:UpdateDistribution', 'route53:ChangeResourceRecordSets', 'route53:ListResourceRecordSets', 'acm:DescribeCertificate', 's3:ListBucket', 'sts:AssumeRoleWithWebIdentity'],
      resources: [spaBucket.bucketArn, `${spaBucket.bucketArn}/*`, `arn:aws:cloudfront::${this.account}:distribution/${distribution.distributionId}`, zone.hostedZoneArn, props.certificateArn, cicdRole.roleArn],
      effect: iam.Effect.ALLOW,
    }))
  }
}
