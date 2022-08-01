# siteminder-mailer-api

This project contains source code and supporting files for a serverless application that you can deploy with the AWS Serverless Application Model (AWS SAM) command line interface (CLI). It includes the following files and folders:

- `src/handlers/index.js` - Code for the application's Lambda function.
- `src/utils` - utility functions for validatio, schema definition, mailgun/sengrid Http API and mailer.
- `__tests__` - Unit tests for the application code. 
- `template.yaml` - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions, an API Gateway API. 
## Deploy/Test the  application locally
* Prequesites:
- Install AWS SAM CLI - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

- Once SAM CLI is insalled  go to the root folder and  execute following:
```bash
$ npm i
```
- invoke api locally using SAM

```bash
$ sam local start-api
$ curl http://localhost:3000/
```


*  Test api request using POST man or curl using following sample code:
curl --location --request POST 'http://127.0.0.1:3000/' \
--header 'Content-Type: application/json' \
--data-raw '{ "to" : [
      { "email": "to1@email.com", "name": "name1" },
      { "email": "to2@email.com", "name": "name2" },
      { "email": "to3@email.com", "name": "name3" }
    ],
    "cc": [
      { "email": "cc1@email.com", "name": "name1" },
      { "email": "cc2@email.com", "name": "name2" },
      { "email": "cc3@email.com", "name": "name3" }
    ],
    "bcc": [
      { "email": "bcc1@email.com", "name": "name1" },
      { "email": "bcc2@email.com", "name": "name2" },
      { "email": "bcc3@email.com", "name": "name3" }
    ],
    "subject": "email subject for testing",
    "text": "This is the body of the email in text format only"
  }'

## Payload Validation Example: Missing subject
- Missing subject from payload:
{'headers': {'content-type': 'application/json'
    }, 'body': '{
        "message": [
            {
                "instancePath": "",
                "schemaPath": "#/required",
                "keyword": "required",
                "params": {
                    "missingProperty": "subject"
                },
                "message":"must have required property \'subject\'"
            }
        ]
    }'
}

- Invalid Email address:
{'headers': {'content-type': 'application/json'
    }, 'body': '{
        "message": [
            {
                "instancePath": "/to/0/email",
                "schemaPath": "#/properties/to/items/0/properties/email/format",
                "keyword": "format",
                "params": {
                    "format": "email"
                },
                "message": "must match format \\"email\\""
            }
        ]
    }'
}

## Deploy the  application - Production Ready
To build and deploy your application for the first time, run the following in your shell:
* set the env variabled defined in template.yml for mailgun and sendgrid
```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

## Cleanup

To delete the application using AWS CLI we can run the following:

```bash
aws cloudformation delete-stack --stack-name siteminder-mailer-api
```

## To Do - Unit tests

Tests Can be  defined in the `__tests__` folder which can be created in project. Use `npm` to install the [Jest test framework](https://jestjs.io/) and run unit tests.

```bash
$ npm install
$ npm run test
```


