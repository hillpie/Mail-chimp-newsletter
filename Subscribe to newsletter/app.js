//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;


    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
        }
    ]

    };

    const jsonData = JSON.stringify(data);

    // const url = "https://mailchi.mp/630dfa5d93";
    const url = "https://us11.api.mailchimp.com/3.0/lists/630dfa5d93";

    const option = {
        method: "post",
        auth : "rahil1:a43061f540f2d10bbb953187a689531c-us11"
    }

    const request = https.request(url, option, function(response){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }



        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
    
});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(2000, function(){
    console.log("Server is runnning.");
});

//API key
//a43061f540f2d10bbb953187a689531c-us11

//List ID
//630dfa5d93