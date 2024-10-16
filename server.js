var express = require('express');
var request = require('request');
var https_exp = require('https');
const fs = require("fs");
const port=1235;

var app = express();
app.use(express.static('src'));

const config = require("./config/config");

app.get("/", (request, response) =>
{
    response.sendFile(__dirname + "/src/index.html");
});

app.get("/predictive", (request, response) =>
  {
      response.sendFile(__dirname + "/src/predictive.html");
  });

  
app.get("/code", (request, response) =>
  {
      response.sendFile(__dirname + "/src/code.html");
  });
  

app.get("/config", (req, res) => {
  res.json(config);
  res.end();
});


//=====  Automations call  ===============================================================

app.post("/runFactoryTaskAssignment", (req, res) =>{

  const body = [];
  req.on("data", (data) => {
    body.push(data);
  });

  req.on("end", () => {
    const requestBody=Buffer.concat(body).toString();
    console.log("request body ", requestBody);

    const config = require("./config/config");

    var options = {
      'method': 'POST',
      'url': 'https://'+config.tenantHostname+'/api/v1/automations/'+config.factoryAutomationId+'/actions/execute',
      'headers': {
        'X-Execution-Token': config.factoryAutomationToken
      },
      formData: JSON.parse(requestBody)
    };

    request(options, function (error, res) {
      if (error) throw new Error(error);
        console.log(res.body);
    });
  });
  
});


//======================================================================================
//
//      SERVER CREATION
//
//======================================================================================
https_exp.createServer({
  key: fs.readFileSync('./server_certs/server.key'),
  cert: fs.readFileSync('./server_certs/server.cert')
}, app)
.listen(port, '127.0.0.1', function () {
  console.log('Https Server listening! Go to https://127.0.0.1:'+port)
})

//localhost:8443