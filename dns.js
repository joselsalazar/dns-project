const express = require("express");
const request = require('request');
const logger = require("morgan");
const bodyParser = require("body-parser");
let dnsRequest = "https://dns-api.org/a/spencerstv.com";

// Initiate Express App and Port
const app = express();
const PORT = process.env.PORT || 3000;

// Bind to Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

//  -------------------------------

// Creates Route to Home Page
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

const dnsCheck = (query) => {
	request(dnsRequest, function(error, response, body) {
		body=JSON.parse(body);
		console.log(body[0].value);
	});
}

dnsCheck();

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
