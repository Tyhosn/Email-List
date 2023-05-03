const express = require("express");

const bodyParser =require("body-parser");

const request = require("request");

const https = require("https");
const { response } = require("express");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



//to call it to home page
app.get("/", function (req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName =req.body.lName;
    const email =req.body.email;

    var data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url ="https://us21.api.mailchimp.com/3.0/lists/606b39dce1";

    const options ={
        method: "POST",
        auth:"Ty:fc16589ae32d7d06fa645c12940998e3-us21"
    }

    const request = https.request(url, options, function(request){

        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        } 
        else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    });

    request.write(jsonData)
    request.end();
    

});

app.post("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});

// fc16589ae32d7d06fa645c12940998e3-us21

// Audience Id
// 606b39dce1