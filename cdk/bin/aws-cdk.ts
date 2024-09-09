import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { SinglePageApp } from '../lib/deployed-stacks'

const app = new cdk.App()
// const env = app.node.tryGetContext('env') || 'development';  // Updated this line

const envFilePath = `./.env`
if (fs.existsSync(envFilePath)) {
  console.log(`Loading environment variables from ${envFilePath}`)
  dotenv.config({ path: envFilePath })
  console.log('AWS_PROFILE', process.env.AWS_PROFILE)
  console.log('AWS_REGION', process.env.AWS_REGION)
  console.log('CDK_ZONE', process.env.CDK_ZONE)
  console.log('CDK_RECORD_PREFIX', process.env.CDK_RECORD_PREFIX)
  console.log('APP_NAME', process.env.APP_NAME)
  console.log('STACK_NAME', process.env.STACK_NAME)
}

if (!process.env.CDK_ZONE || !process.env.CDK_CERTIFICATE_ARN || !process.env.CDK_RECORD_PREFIX || !process.env.APP_NAME || !process.env.CDK_PIPELINE_USER_ARN || !process.env.STACK_NAME) {
  throw new Error('Environment variables APP_NAME, CDK_ZONE, CDK_CERTIFICATE_ARN, and CDK_RECORD_PREFIX must be set.')
}

const baseStackProps = {
  // envName: env,
  stackName: process.env.STACK_NAME,
  domainName: process.env.CDK_ZONE,
  certificateArn: process.env.CDK_CERTIFICATE_ARN,
  recordPrefix: process.env.CDK_RECORD_PREFIX,
  appName: process.env.APP_NAME,
  cdkPipelineUserArn: process.env.CDK_PIPELINE_USER_ARN,

  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },

}

new SinglePageApp(app, process.env.STACK_NAME, baseStackProps)
