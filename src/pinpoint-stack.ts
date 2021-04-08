import {
  CfnApp,
  CfnEmailChannel,
  CfnEmailTemplate,
  CfnSMSChannel,
  CfnSmsTemplate,
} from '@aws-cdk/aws-pinpoint';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import * as fs from 'fs';

export class PinpointStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const senderEmailAddress = this.node.tryGetContext('senderEmailAddress');
    const sesIdentityArn = this.node.tryGetContext('sesIdentityArn');
    const smsSenderId = this.node.tryGetContext('smsSenderId');

    const app = new CfnApp(this, 'PinpointApp', { name: 'PinpointApp' });

    this.createMessageTemplates();
    this.createChannels(app, senderEmailAddress, sesIdentityArn, smsSenderId);
  }

  private createChannels(
    app: CfnApp,
    senderEmailAddress: any,
    sesIdentityArn: any,
    smsSenderId: any
  ) {
    new CfnEmailChannel(this, 'EmailChannel', {
      applicationId: app.ref,
      fromAddress: senderEmailAddress,
      identity: sesIdentityArn,
    });
    new CfnSMSChannel(this, 'SmsChannel', {
      applicationId: app.ref,
      enabled: true,
      senderId: smsSenderId,
    });
  }

  private createMessageTemplates() {
    const emailHtmlContent = fs.readFileSync(
      './templates/email-template.html',
      'utf8'
    );
    new CfnEmailTemplate(this, 'EmailTemplate', {
      subject: 'Message subject',
      templateName: 'SampleEmail',
      htmlPart: emailHtmlContent,
    });

    const smsContent = fs.readFileSync('./templates/sms-template.txt', 'utf8');
    new CfnSmsTemplate(this, 'SmsTemplate', {
      templateName: 'SampleSms',
      body: smsContent,
    });
  }
}
