const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
// TODO: replace with your region
const client = new SNSClient({ region: 'add your region here' });

const message = {
  // TODO: add contents of the message here
};

const params = {
  // TODO: add your topic ARN here
  // can be found in the SNS console or the CloudFormation stack outputs
  TopicArn: 'add topic ARN here',
  MessageAttributes: {
    event: {
      DataType: 'String',
      // TODO: add your message attribute value here
      // login and signup are the default supplied options, but you can update the template for more
      StringValue: 'login'
    }
  },
  Message: JSON.stringify(message)
};

const command = new PublishCommand(params);

(async function main () {
  try {
    const result = await client.send(command);
    console.log(`SUCCESS: ${JSON.stringify(result, null, 2)}`);
  } catch (err) {
    console.log('AN ERROR OCURRED: ', err);
  }
})();
