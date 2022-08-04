'use strict'
import dialogFlow from 'dialogflow';
import configKeys from '../config/keys';
import structjson from '../services/structjson';
const Reservation = require('../models/Reservation');

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
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.queryText) {
            case 'Đặt bàn':
                // console.log(queryResult.queryText);
                // console.log(queryResult.fulfillmentMessages);
                //console.log(queryResult.parameters.fields);
                //self.saveReservation(queryResult.parameters.fields);
                break;
        }


        return responses;
    },

    saveReservation: async function (fields) {
        console.log(fields);
        const reservation = new Reservation({
            name: fields.name.stringValue,
            phone: fields['phone-number'].stringValue,
            time: fields.time.stringValue,
            guests: fields.guests.stringValue,
            reservationDate: Date.now()
        });
        try {
            let reg = await reservation.save();
            console.log(reg);
        } catch (err) {
            console.log(err);
        }
    }

}