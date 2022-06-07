import express from "express";
import { query } from "express";

let router = express.Router();

const chatbotService = require('../services/chatbotService');

let initDialogFlowRoutes = (app) => {

    router.post("/api/df_text_query", async (req, res) => {

        let responses = await chatbotService.textQuery(req.body.text, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    router.post("/api/df_event_query", async (req, res) => {
        let responses = await chatbotService.eventQuery(req.body.event, req.body.parameters);
        res.send(responses[0].queryResult);
    });

    return app.use('/', router);
}

module.exports = initDialogFlowRoutes;