const express=require("express");
const bodyParser=require("body-parser");
const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');

const app=express();



var endpoint = "https://api.cognitive.microsofttranslator.com";



app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
  var subscriptionKey = "Your Subscription Key";
  var text=req.body.textToTranslate;
  var language=req.body.option;
  var endpoint = "https://api.cognitive.microsofttranslator.com";
  axios({
      baseURL: endpoint,
      url: '/translate',
      method: 'post',
      headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          //'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
      },
      params: {
          'api-version': '3.0',
          'from': 'en',
          'to': language
      },
      data: [{
          'text': text
      }],
      responseType: 'json'
  }).then(function(response){
      //console.log(response.data[0].translations[0].text);
      var result=response.data[0].translations[0].text;
      res.send("<h1>"+result+"</h1>");
  });

})


app.listen(3000,function(){
  console.log("Server is running on portal");
});
