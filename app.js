const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    const name = req.body.PersonName;
    const email = req.body.PersonEmail;
    console.log(name);
    console.log(email);


    const data = {
        members: [
            {
                email_address: email,
                
                status: "subscribed",
                merge_fields:{
                    FNAME: name.toString()
                }
            }
        ]
    };
    //data.members[0].email_address = email;
// this is change
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/71da7f2190";
    const options = {
        method: "POST",
        auth: "zomie:37729c74c2a39adcd5d9690cb7b19fad-us21"
    }
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));  
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(3000, function(req, res){
    console.log("server is up and running on port 3000");
})




// API KEY NAME
// Newsletter_Signup
// API KEY
// a520c72195e715056c53f85c524567c6-us21
// List id
// 71da7f2190