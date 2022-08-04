import express from "express";
import bodyParser from "body-parser";
//import viewEngine from "./config/viewEngine";
import dialogFlowRoutes from "./routes/dialogFlowRoutes";

import mongoose from "mongoose";
import config from "./config/keys";

mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        //useUnifiedTopology: true,
        //useCreateIndex: true,
    })
    .then(() => console.log("DB Connection Successfull"))
    .catch((err) => {
        console.error(err);
    });

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config view Engine
//viewEngine(app);

//config view routes
dialogFlowRoutes(app);

// Static
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

let port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("App is running at the port: " + port);
})