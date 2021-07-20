# Event Fork Example

## Purpose
Link to blog post

## Architecture
- High level diagram
- SNS filtering overview
- List out current pipelines
- How to add/remove pipelines

## Directions to Run
- Install the following (if you don't have it yet)
  - [Node](https://nodejs.org/) at least version 14
  - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
  - [Stackery](https://www.stackery.io/)
- Clone or download the repo code
- Import and deploy the stack via Stackery. Getting started directions [here](https://docs.stackery.io/docs/using-stackery/introduction/). TL;DR sign up for free account > create a stack and an environment > deploy.
  - Note: this is also a valid [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) template, so you can also use [the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html) for deploying if you prefer
- Send messages to the SNS topic either via the console, a client, or by following the manual testing steps in the "Testing without a Frontend" section below

## Testing without a "Frontend"
This is admittedly a naive script that I threw together to manually test sending messages to the SNS topic quickly. It can be found in the `tools` folder. Alternatively, you could test this out by using the AWS SNS console or the AWS CLI as well.

Steps to use the script
- Deploy the stack and make sure you have the AWS CLI installed/configured
- cd `tools`
- `npm install`
- Update the inline TODOs in the `index.js` file
- `npm run send` will send a message to the SNS topic Arn you specified


## Extra Things to Keep in Mind
- It's probably a good idea to use the [AWS secrets manager](https://aws.amazon.com/secrets-manager/) to manage 3rd party API tokens/creds etcs
- Each queue in this stack has a designated "Dead Letter Queue" (DLQ for short) in which the event will be tried three times and then failed messages will be sent to the corresponding DLQ. It's possibly to do this via an SNS DLQ as well. Check out [this blog post](https://www.danielleheberling.xyz/blog/dlq-messages/) if you need help setting up a way to retry (or redrive) the failed events.
- SQS standard queues "at least once" delivery, so if your events need to have "exactly once" delivery you'll need to write your function code to handle this or swap out the queues in the template with FIFO queues.
