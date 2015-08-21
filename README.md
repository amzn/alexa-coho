# Node.js for Alexa Connected Home Skills

##Alexa Lighting API Documentation
The documentation for the Alexa Lighting API is available  [here](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html).

## Contents
This repository includes a sample on how to use nodejs AWS Lambda functions as Alexa Skills. Currently, you can find a sample virtual device created in the LightingAPI folder. This sample demonstrates:
- Responding to discovery messages
- Responding to triggered events (on / off)
- Making simple call to an HTTPS endpoint

## Usage
After following the lambda whitelisting instructions and OAuth2.0 setup instructions via the technical documentation, copy & paste the code in LightingAPI/SampleVirtualDevice.js to your lambda function.
After you run discovery, you should be able to see a "Dummy Light" if you navigate to Alexa Companion App -> Settings -> Connected Home


## Resources
Here are a few direct links to our documentation:

- [Alexa Lighting API (Node.js)](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html)
- [Lambda usage instructions](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api-lambda-integration.html)
- [Developer blog post](TBD)
- [Developer forum](https://forums.developer.amazon.com/forums/category.jspa?categoryID=71)
