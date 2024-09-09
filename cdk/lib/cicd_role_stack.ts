import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'

export interface CICDRoleStackProps extends cdk.StackProps {
  iamUserArn: string; // ARN of your IAM user
}

export class CICDRoleStack extends cdk.Stack {
  constructor (scope: cdk.App, id: string, props: CICDRoleStackProps) {
    super(scope, id, props)

    const cicdRole = new iam.Role(this, 'CICDRole', {
      assumedBy: new iam.ArnPrincipal(props.iamUserArn),
      description: 'Role for SAM Pipeline',
      inlinePolicies: {
        AllowCDKDeploy: new iam.PolicyDocument({
          statements: [new iam.PolicyStatement({
            actions: ['*'],
            resources: ['*'],
          }),],
        }),
      },
    })

    new cdk.CfnOutput(this, 'CICDRoleArn', {
      value: cicdRole.roleArn,
      description: 'The ARN of the role that the SAM pipeline will assume',
    })
  }
}
