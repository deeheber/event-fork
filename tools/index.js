const AWS = require('aws-sdk');
const credentials = new AWS.SharedIniFileCredentials({
  // TODO: replace with your profile
  // Note you can remove all of the credential stuff if using the 'default' profile
  profile: 'personal'
});
AWS .config.credentials = credentials;
// TODO: replace with your region
const SNS = new AWS.SNS({ region: 'us-west-2' });

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
      StringValue: 'login'
    }
  },
  Message: JSON.stringify(message)
};

(async function main () {
  try {
    const result = await SNS.publish(params).promise();
    console.log(`SUCCESS: ${JSON.stringify(result, null, 2)}`);
  } catch (err) {
    console.log('AN ERROR OCURRED: ', err);
  }
})();
