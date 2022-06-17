import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
//import webRoutes from "./routes/web";
import dialogFlowRoutes from "./routes/dialogFlowRoutes";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view Engine
viewEngine(app);

//config view routes
//webRoutes(app);

dialogFlowRoutes(app);

let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("App is running at the port: " + port);
})