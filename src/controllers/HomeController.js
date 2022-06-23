import request from "request";
import chatbotService from "../services/chatbotService";

let getHomePage = (req, res) => {
    return res.render('homepage.ejs')
};

let dfTextQuery = async (req, res) => {
    let responses = await chatbotService.textQuery(req.body.text, req.body.userID, req.body.parameters);
    res.send(responses[0].queryResult);
};

let dfEventQuery = async (req, res) => {
    let responses = await chatbotService.eventQuery(req.body.event, req.body.userID, req.body.parameters);
    res.send(responses[0].queryResult);
};

module.exports = {
    getHomePage: getHomePage,
    dfTextQuery: dfTextQuery,
    dfEventQuery: dfEventQuery,
}