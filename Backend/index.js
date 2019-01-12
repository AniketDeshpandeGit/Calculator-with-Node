//import the require dependencies
var express = require("express");
var app = express();
const math = require("mathjs");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");
//import * as math from "mathjs";

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var resultExpression;

app.post("/evaluation", function(req, res) {
  console.log("Inside Evaluate Post Request");
  console.log("Req Body : ", req.body);
  console.log("body: " + req.body.expression);
  resultExpression = math.eval(req.body.expression);
  //this.setState({ expression: result.toString() });
  console.log("Result: " + resultExpression);
  res.send(resultExpression.toString());
  res.end("Success");
});

//Route to get All students when user visits the Home Page
app.get("/evaluation", function(req, res) {
  console.log("Inside Get Evaluation Request");
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  console.log("Expression Result: ", resultExpression);
  res.end(resultExpression.toString());
});
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
