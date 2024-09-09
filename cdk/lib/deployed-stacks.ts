// lib/deployed-stacks.ts
import * as cdk from 'aws-cdk-lib'
import { BaseStack, BaseStackProps } from './base-stack'

export class SinglePageApp extends BaseStack {
  constructor (scope: cdk.App, id: string, props: BaseStackProps) {
    super(scope, id, props)

    // Add any prod-specific resources or overrides here
    cdk.Tags.of(this).add('Environment', 'Production')

    // Example: You might want to add a production-only resource here
    // e.g., new cdk.SomeProdOnlyResource(this, 'ProdResource', { ... });
  }
}
