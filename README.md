# Event Fork Example

## Purpose
Check out this [blog post](https://dev.to/aws-builders/event-driven-background-processes-55li) for more details.

## Architecture

![event-driven](https://user-images.githubusercontent.com/12616554/132954599-2bd928ad-66df-461f-9cf8-b66c5c28684c.png)


This repo is designed to be used as a starter template to set up your own event-driven forks. It starts with an SNS topic that fans out into various SQS queues that then feed into a (currently unfinished) function that performs all of the work needed to respond to that specific event.

Current forks (queue => function) are Analytics, MailingList, and ChatNotifications. You can add or remove these forks as you see fit.

Each queue subscribes to the SNS topic and the `FilterPolicy` determines which queue(s) receive the event. Currently it is set up to filter on the SNS message's `MessageAttributes` `event` key value as follows:

`{ "event": "signup" }` forwards the event to Analytics, MailingList, and ChatNotifications forks
`{ "event": "login" }` forwards the event to the Analytics fork

If the `MessageAttributes` field on the original SNS message does not match either, then nothing happens.

You can go further and do more complex SNS topic filtering if you'd like. Check out the docs [here](https://docs.aws.amazon.com/sns/latest/dg/sns-message-filtering.html)

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
- `npm run send` will send a message to the SNS topic arn you specified

The example code will send anything with message attribute `{ event: { DataType: "String", StringValue: "signup" } }` to the Analytics, MailingList, and ChatNotifications queues. Message attribute `{ event: { DataType: "String", StringValue: "login" } }` to the Analytics queue. You can update what attributes filter to where via editing the `template.yaml` under `FilterPolicy` for each topic subscription.

## Extra Things to Keep in Mind
- You'll need to add your business logic to the functions under `/src`
- It's probably a good idea to use the [AWS secrets manager](https://aws.amazon.com/secrets-manager/) to manage 3rd party API tokens/creds etcs
- Each queue in this stack has a designated "Dead Letter Queue" (DLQ for short) in which the event will be tried three times and then failed messages will be sent to the corresponding DLQ. It's possibly to do this via an SNS DLQ as well. Check out [this blog post](https://www.danielleheberling.xyz/blog/dlq-messages/) if you need help setting up a way to retry (or redrive) the failed events.
- SQS standard queues "at least once" delivery, so if your events need to have "exactly once" delivery you'll need to write your function code to handle this or swap out the queues in the template with FIFO queues.
- It is possible to do a "fan out" architecture that responds to events via EventBridge instead of SNS. EventBridge does have a lower limit of how many targets per rule you can have.
