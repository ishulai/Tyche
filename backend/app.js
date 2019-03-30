const routes = require("./routes");

const express = require("express");
const app = express();
const port = 8080;
//use cors 


var cors = require('cors');
const state = require("./classes/state");

const currentState = new state();
app.use(cors);


routes(app, currentState);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
