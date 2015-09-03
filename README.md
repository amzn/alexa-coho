# Node.js for Alexa Connected Home Skills

## Contents
This repository includes a Node.js sample for an AWS Lambda function that is an adapter for an Alexa skill. Currently this repository contains the following:
- Virtual Device using the Lighting API : This sample demonstrates how to create a dummy Skills Adapter

## FAQ

### What is the Alexa Lighting API? What do I build with it? 
The Alexa Lighting API enables developers to extend Alexa’s built-in lighting skill so she can securely control their cloud-connected lighting and switch devices. A developer writes code using the new APIs that runs in the cloud (as an AWS Lambda function called a skill adapter) and translates between Alexa’s built-in lighting skill and their lighting device’s proprietary control systems. Once an end user turns on the functionality, they can control the devices by saying phrases like, “Alexa, turn on the living room lights” or "Alexa, turn off the fan." 

Options for devices that you enable with your lighting skill adapter on show up in the Alexa companion app in the Connected Home settings screen, under “Device Links”. Wink and Samsung SmartThings have already built this functionality for their home automation hubs using the Alexa Lighting API, and any new devices you integrate will show up along with those companies in the companion app.

The Alexa Lighting API can be used to enable the control of any sort of cloud-connected device that can be turned on or off or have its brightness adjusted. 

### What actions does the Alexa Lighting API support?
The Alexa Lighting API supports the discovery of devices, turning devices on and off, and dimming. For example:
- Discover: “Alexa, discover my devices.” 
- Turn On: “Alexa, turn on the kitchen light.” 
- Turn Off: “Alexa, turn off the kitchen light.” 
- Brighten: “Alexa, brighten the kitchen light.” 
- Dim: “Alexa, dim the kitchen light.” 
- Set: “Alexa, set the kitchen light to 50%.” 

### What is the difference between the Alexa Skills Kit and the Lighting API? 
Alexa provides a set of built-in skills and capabilities. Examples of Alexa’s built-in skills include the ability to play music from multiple providers (the music skill), set an alarm (the alarm skill), and control lights and switches (the lighting skill). The Alexa Skills Kit lets you build services that add new skills to Alexa. Customers can access these new abilities by asking Alexa questions or making requests in the form of “Alexa, ask <skill invocation phrase> to <intent>”. New skills can be built as a Web Service or as an AWS Lambda function. 

The Alexa Lighting API lets you extend Alexa’s built-in lighting skill so that it knows how to control new types of lights and switches (things that can be turn on or off or have their brightness adjusted). Customers can control these new devices using phrases like “Alexa, turn on the kitchen lights.” Lighting API skill adapters can only be built using AWS Lambda. 

Can I control devices other than lights and switches? 
The Alexa Lighting API currently supports extending Alexa’s built-in lighting skill. It supports natural language actions for lights and switches. Specifically, this means devices that can be turned on, turned off, and have their brightness changed. Other devices besides lights that can be turned on or off will work too. For example since a hot tub can be turned on or off, the Lighting API could be used to enable “Alexa, turn on the hot tub.” 


### What is required to build a skill adapter with the Alexa Lighting API? 
All you need to do is:
1.	Configure your Lambda function for your adapter on AWS 
2.	Develop the adapter using either JavaScript or Java code. 

This should take just a few hours. Full instructions can be found in the Alexa Lighting API Developer Documentation. (https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html).
See our sample code at the link below to help get you started.
(https://github.com/amzn/alexa-coho) 


### Can I build a skill adapter for my personal home automation system? 
Absolutely! We are encouraging home automation enthusiasts who have coding experience to do this. Please see the documentation (https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html) for details. 

We’ve created a showcase in the Alexa Connected Home Developer Forum (https://forums.developer.amazon.com/forums/forum.jspa?forumID=152) where enthusiast/developers can share their skill adapters with others. There might already be a skill adapter for the system you use in your home already, so check the showcase out first. 


### Do I have to implement OAuth to use the Alexa Lighting API? 
If your backend service does not support OAuth, you can register with any OAuth provider (e.g Login With Amazon) to enable customers to securely link their Amazon account with your device cloud service. Your Lambda skill adapter can then forward the incoming accessToken to the OAuth provider for validation. 

### How do I share my skill adapter with other developers? 
We’ve created a Showcase in the Alexa Connected Home Developer Forum (https://forums.developer.amazon.com/forums/forum.jspa?forumID=152) where enthusiast/developers can share their skill adapters with others. Other developers and enthusiasts can reuse your code and enable the skill adapter for their own personal Alexa-enabled device following the instructions in the Alexa Lighting API Developer Documentation (https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html).

### How do I make my adapter accessible to all Alexa customers? 
Commercial home automation companies who would like to enable their completed skill adapter for all Alexa customers should contact us via email at alexa-coho-submissions@amazon.com. As an enthusiast you can follow the instructions in the Alexa Lighting API Developer Documentation (https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html) to enable your skill adapters for your own personal use.

### Will my skill adapter be accessible on AVS devices? 
Provisioning your skill adapter will enable your skill adapter on your Alexa-enabled device (Echo and any AVS devices) using the customer account provisioned.
Instructions for provisioning can be found here: https://forums.developer.amazon.com/forums/thread.jspa?threadID=8580 

### Can I write an adapter for devices that don’t have cloud connectivity? 
Currently, the Alexa Lighting API supports devices that can be controlled via a cloud service. 



## Resources
Here are a few direct links to our documentation:

- [Alexa Lighting API (Node.js)](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api.html)
- [Lambda usage instructions](https://developer.amazon.com/public/binaries/content/assets/html/alexa-lighting-api-lambda-integration.html)
- [Developer blog post](https://developer.amazon.com/public/community/post/Tx23PZD8E8GWHAY/Introducing-the-New-Alexa-Lighting-API)
- [Developer forum](https://forums.developer.amazon.com/forums/category.jspa?categoryID=71)
