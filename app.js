//jshint esversion: 6

const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {

    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var url = "https://us14.api.mailchimp.com/3.0/lists/5c668b2dab";

    const options = {
        method: "POST",
        auth: "connor1:9ab51fc887a3097af8fe3b0275e4ab6d-us14"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        };

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });

    });

    request.write(jsonData);

    request.end();



});

app.listen(3000, () => {

    console.log('Server is running on port 3000')

});