const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {

  const query = req.body.cityName;
  const apiKey = "9d221e24cddbbb5fc6e6d74bb413e65c#";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;

  https.get(url, (response) => {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weather = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      // console.log(temp);
      // console.log(weather);
      res.write(`<h1>The temperature of ${query} is ${temp}</h1>`);
      res.write(`<h3>and the weather is currently ${weather}</h3>`);
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Your server is running at port 3000");
});
