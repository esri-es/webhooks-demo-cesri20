const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {getJSONResource, getJobIfCompleted} = require('./utils');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Web hooks uses POST request, you jus used a GET request now.");
});

app.post('/',function(req,res){

    // Webhook call received: some layers has changed!
    console.log(`Webhook call received: `, req.body);

    var payload = JSON.parse(req.body.payload)

    // WARNING: Will check just changes in one layer -> '0'
    let jobUrl = `${payload[0].changesUrl}&f=json`;

    // Let's get find the job's statusUrl
    getJSONResource(jobUrl).then(({resp, url}) => {
        // Now let's query if it has finished
        getJobIfCompleted(`${resp.statusUrl}?f=json`);
    }).catch(reason => {
        console.error(reason);
    });

    res.send(req.body);
});

app.listen(port);
