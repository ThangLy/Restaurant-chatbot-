'use strict'
const dialogFlow = require('dialogflow');
const { config } = require('dotenv');
const configKeys = require('../configs/keys');
const structjson = require('../services/structjson')

const projectID = configKeys.googleProcjectID;

const credentials = {
    client_email: configKeys.googleClientEmail,
    private_key: configKeys.googlePrivateKey
}

const sessionClient = new dialogFlow.SessionsClient({ projectID, credentials });

const sessionPath = sessionClient.sessionPath(configKeys.googleProcjectID, configKeys.dialogFlowSessionID)

module.exports = {
    textQuery: async function (text, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: configKeys.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    eventQuery: async function (event, parameters = {}) {
        let self = module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: configKeys.dialogFlowSessionLanguageCode,
                },
            }

        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;
    },

    handleAction: function (responses) {
        return responses;
    }
}