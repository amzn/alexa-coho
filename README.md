# Node.js for Alexa Connected Home Skills

##Alexa Lighting API Documentation
The documentation for the Alexa Lighting API is available  [here](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html).

## Contents
This repository includes a Node.js sample for an AWS Lambda function that is an adapter for an Alexa skill. The LightingAPI folder contains a sample virtual device that you can use as a basis for your own Lambda function. The sample demonstrates:
- Responding to discovery messages
- Responding to triggered events (on / off)
- Making a simple call to an HTTPS endpoint

## Usage
After following the [whitelisting and OAuth2.0 setup instructions in the technical documentation](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html), copy the code from LightingAPI/SampleVirtualDevice.js and paste it into your Lambda function. After you run discovery, in the Alexa companion app you should see a dummy light if you navigate through Settings to Connected Home.


## Resources
Here are a few direct links to our documentation:

- [Alexa Lighting API (Node.js)](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html)
- [Lambda usage instructions](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api-lambda-integration.html)
- [Developer blog post](TBD)
- [Developer forum](https://forums.developer.amazon.com/forums/category.jspa?categoryID=71)
