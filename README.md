# Amazon Pinpoint in CDK

## Requirements

* [AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/cli.html)

## Deployment

To deploy Amazon Pinpoint sample application:

```
cdk deploy \
    --context senderEmailAddress=<SENDER_EMAIL_ADDRESS> \ 
    --context sesIdentityArn=arn:aws:ses:<REGION>:<ACCOUNT_ID>:identity/<SENDER_EMAIL_ADDRESS>
```