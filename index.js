//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var bitcoinType = req.body.crypto;
  var currencyType = req.body.fiat;
  var amount = req.body.amount;

  var baseUrl = "https://apiv2.bitcoinaverage.com/convert/global";

  var option = {
    url : baseUrl,
    method : "GET",
    qs : {
      from : bitcoinType,
      to : currencyType,
      amount : amount
    }
  };

  request(option, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.price;
    // console.log(price);
    var currentDate = data.time;
    res.write("<p>The current date is " + currentDate + "</p>");
    res.write("<h1>"+ amount + bitcoinType + " is currently worth " + price + " " + currencyType);
    res.send();
  });
});


app.listen(3000, function() {
  console.log("Local host started at port 3000");
});
