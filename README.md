# Event Fork Example

## Purpose
Link to blog post

## Architecture
- High level diagram
- SNS filtering overview
- List out current pipelines
- How to add/remove pipelines

## Directions to Run
- Prerequsite installs
  - Node
  - AWS CLI
  - Stackery
- Clone or download the repo code
- Import and deploy the stack via Stackery. Getting started directions [here](https://docs.stackery.io/docs/using-stackery/introduction/). TL;DR sign up for free account > create a stack and an environment > deploy.
  - Note: this is also a valid [AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) template, so you can also use that tool as well for deploying if you prefer
- Send messages to the SNS topic either via a client or by following the manual testing steps in the section below

## Testing without a "Frontend"
- Deploy the stack
- Script in tools overview (can also do this via the AWS CLI)
  - TODOs in the script


## Extra Things to Keep in Mind
- Parameters/secrets for 3rd party API tokens/creds etcs
- DLQ redrive
- SQS is "at least once" delivery
