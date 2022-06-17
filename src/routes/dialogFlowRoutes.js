import express from "express";
import homeController from '../controllers/HomeController';

let router = express.Router();

let initDialogFlowRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    router.post("/api/df_text_query", homeController.dfTextQuery);

    router.post("/api/df_event_query", homeController.dfEventQuery);

    return app.use('/', router);
}

module.exports = initDialogFlowRoutes;