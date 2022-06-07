'use strict'
const dialogFlow = require('dialogflow');
const configKeys = require('../configs/keys');
const structjson = require('../services/structjson')

const sessionClient = new dialogFlow.SessionsClient();
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