
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;
  const data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
     }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https:us7.api.mailchimp.com/3.0/lists/61d7a67bb9";

  const options = {
    method: "POST",
    auth: "sanchit:289fa598e5287d6daa040ac3cd7e07eb-us7"
  }

  const request = https.request(url,options,function(response){

    if(response.statusCode === 200){
      // res.send("Succesfully subscribed!!");
      res.sendFile(__dirname+"/success.html");
    } else {
      // res.send("There was an error with signing up , plaese try again");
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
  res.redirect("/");
});

app.post("/success",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3006, function(){
  console.log("Yuhu");
});

// My API Key
// 289fa598e5287d6daa040ac3cd7e07eb-us7

// unique id
// 61d7a67bb9
