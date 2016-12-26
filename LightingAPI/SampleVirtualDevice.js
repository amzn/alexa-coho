/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
        http://aws.amazon.com/apache2.0/
    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This sample demonstrates a simple driver built against the Alexa Lighting Api. This sample will
 * create a virtual device and make it accessible via the Alexa Companion App.
 * For additional details, please refer to the Alexa Lighting API developer documentation 
 */
var https = require('https');
var REMOTE_CLOUD_BASE_PATH = "/";
var REMOTE_CLOUD_HOSTNAME = "www.amazon.com";

var log = log;
var generateControlError = generateControlError;

/**
 * Main entry point.
 * Incoming events from Alexa Lighting APIs are processed via this method.
 */
exports.handler = function(event, context) {

    // Warning! Logging this in production might be a security problem.
    log('Input', event);

    switch (event.header.namespace) {

        /**
         * The namespace of "Discovery" indicates a request is being made to the lambda for
         * discovering all appliances associated with the customer's appliance cloud account.
         * can use the accessToken that is made available as part of the payload to determine
         * the customer.
         */
        case 'Alexa.ConnectedHome.Discovery':
            handleDiscovery(event, context);
        break;

		/**
		 * The namespace of "Control" indicates a request is being made to us to turn a
		 * given device on, off or brighten. This message comes with the "appliance"
		 * parameter which indicates the appliance that needs to be acted on.
		 */
        case 'Alexa.ConnectedHome.Control':
            handleControl(event, context);
        break;

		/**
		 * We received an unexpected message
		 */
        default:
            // Warning! Logging this in production might be a security problem.
            log('Err', 'No supported namespace: ' + event.header.namespace);
            context.fail('Something went wrong');
        break;
    }
};

/**
 * This method is invoked when we receive a "Discovery" message from Alexa Connected Home Skill.
 * We are expected to respond back with a list of appliances that we have discovered for a given
 * customer. 
 */
function handleDiscovery(event, context) {

    /**
     * Crafting the response header
     */
    var headers = {
	messageId: event.header.messageId,
        namespace: 'Alexa.ConnectedHome.Discovery',
        name: 'DiscoverAppliancesResponse',
        payloadVersion: '1'
    };

    /**
     * Response body will be an array of discovered devices.
     */
    var appliances = [];

    var applianceDiscovered = {
        applianceId: 'e145-4062-b31d-7ec2c146c5ea',
        manufacturerName: 'DummyInfo',
        modelName: 'ST01',
        version: 'VER01',
        friendlyName: 'Dummy light',
        friendlyDescription: 'the light in kitchen',
        isReachable: true,
        additionalApplianceDetails: {
            /**
             * OPTIONAL:
             * We can use this to persist any appliance specific metadata.
             * This information will be returned back to the driver when user requests
             * action on this appliance.
             */
            'fullApplianceId': '2cd6b650-e145-4062-b31d-7ec2c146c5ea'
        }
    };
    appliances.push(applianceDiscovered);

    /**
     * Craft the final response back to Alexa Connected Home Skill. This will include all the 
     * discovered appliances.
     */
    var payloads = {
        discoveredAppliances: appliances
    };
    var result = {
        header: headers,
        payload: payloads
    };

    // Warning! Logging this in production might be a security problem.
    log('Discovery', result);

    context.succeed(result);
}

/**
 * Control events are processed here.
 * This is called when Alexa requests an action (IE turn off appliance).
 */
function handleControl(event, context) {

    /**
     * Fail the invocation if the header is unexpected. This example only demonstrates
     * turn on / turn off, hence we are filtering on anything that is not SwitchOnOffRequest.
     */
    if (event.header.namespace !== 'Control' || event.header.name !== 'SwitchOnOffRequest') {
        context.fail(generateControlError('SwitchOnOffRequest', 'UNSUPPORTED_OPERATION', 'Unrecognized operation'));
    }

    if (event.header.namespace === 'Control' && event.header.name === 'SwitchOnOffRequest') {

        /**
         * Retrieve the appliance id and accessToken from the incoming message.
         */
        var applianceId = event.payload.appliance.applianceId;
        var accessToken = event.payload.accessToken;
        
        if (typeof applianceId !== "string" || typeof accessToken !== "string") {
            log("event payload is invalid");
            context.fail(generateControlError('SwitchOnOffRequest', 'UNEXPECTED_INFORMATION_RECEIVED', 'Input is invalid'));
        }

        accessToken = accessToken.trim();
        
        log('applianceId', applianceId);

        /**
         * Make a remote call to execute the action based on accessToken and the applianceId and the switchControlAction
         * Some other examples of checks:
         *	validate the appliance is actually reachable else return TARGET_OFFLINE error
         *	validate the authentication has not expired else return EXPIRED_ACCESS_TOKEN error
         * Please see the technical documentation for detailed list of errors
         */
        var basePath = '';
        if (event.payload.switchControlAction === 'TURN_ON') {
            basePath = REMOTE_CLOUD_BASE_PATH + '/' + applianceId + '/on?access_token=' + accessToken;
        } else if (event.payload.switchControlAction === "TURN_OFF") {
            basePath = REMOTE_CLOUD_BASE_PATH + '/' + applianceId + '/of?access_token=' + accessToken;
        }

        var options = {
            hostname: REMOTE_CLOUD_HOSTNAME,
            port: 443,
            path: REMOTE_CLOUD_BASE_PATH,
            headers: {
                accept: '*/*' // Warning! Accepting all headers in production could lead to security problems.
            }
        };

        var callback = function(response) {
            var str = '';

            response.on('data', function(chunk) {
                // TODO: Add string limit here
                str += chunk.toString('utf-8');
            });

            response.on('end', function() {
                /**
                 * Test the response from remote endpoint (not shown) and craft a response message
                 * back to Alexa Connected Home Skill
                 */
                log('done with result');
                var headers = {
                    namespace: 'Control',
                    name: 'SwitchOnOffResponse',
                    payloadVersion: '1'
                };
                var payloads = {
                    success: true
                };
                var result = {
                    header: headers,
                    payload: payloads
                };
                
                // Warning! Logging this with production data might be a security problem.
                log('Done with result', result);
                context.succeed(result);
            });

            response.on('error', function(e) {
                log('Error', e.message);
                /**
                 * Craft an error response back to Alexa Connected Home Skill
                 */
                context.fail(generateControlError('SwitchOnOffRequest', 'DEPENDENT_SERVICE_UNAVAILABLE', 'Unable to connect to server'));
            });
        };

        /**
         * Make an HTTPS call to remote endpoint.
         */
        https.get(options, callback)
            .on('error', function(e) {
                log('Error', e.message);
                /**
                 * Craft an error response back to Alexa Connected Home Skill
                 */
                context.fail(generateControlError('SwitchOnOffRequest', 'DEPENDENT_SERVICE_UNAVAILABLE', 'Unable to connect to server'));
            }).end();
    }
}

/**
 * Utility functions.
 */
function log(title, msg) {
    console.log('*************** ' + title + ' *************');
    console.log(msg);
    console.log('*************** ' + title + ' End*************');
}

function generateControlError(name, code, description) {
    var headers = {
        namespace: 'Control',
        name: name,
        payloadVersion: '1'
    };

    var payload = {
        exception: {
            code: code,
            description: description
        }
    };

    var result = {
        header: headers,
        payload: payload
    };

    return result;
}
