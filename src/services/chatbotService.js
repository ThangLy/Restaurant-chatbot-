'use strict'
const dialogFlow = require('dialogflow');
const configKeys = require('../configs/keys');
const structjson = require('../services/structjson')

const projectId = configKeys.googleProcjectID;
const sessionId = configKeys.dialogFlowSessionID;
const languageCode = configKeys.dialogFlowSessionLanguageCode;

const credentials = {
    client_email: configKeys.googleClientEmail,
    private_key: configKeys.googlePrivateKey
}

const sessionClient = new dialogFlow.SessionsClient({ projectId, credentials });

module.exports = {
    textQuery: async function (text, userID, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: languageCode,
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

    eventQuery: async function (event, userID, parameters = {}) {
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectId, sessionId + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: languageCode,
                },
            }
        };

        let responses = await sessionClient.detectIntent(request);
        responses = self.handleAction(responses);
        return responses;

    },


    handleAction: function (responses) {
        return responses;
    }
}