const port = 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { https } = require('follow-redirects');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("Web hooks uses POST request, you jus used a GET request now.");
});

app.post('/',function(req,res){

    // ******************
    // Webhook call received: some layers has changed!
    // ******************
    console.log(`Webhook call received: `, req.body);

    var payload = JSON.parse(req.body.payload)

    // WARNING: Will check just changes in one layer -> '0'
    let jobUrl = `${payload[0].changesUrl}&f=json`;

    // ******************
    // Let's get find the job's statusUrl
    // ******************
    https.get(jobUrl, (resp) => {
        let data = '';
        resp.on('data', (chunk) => { data += chunk; });
        resp.on('end', () => {

            // Job's statusUrl received
            let resp = JSON.parse(data);
            let getJobUrl = `${resp.statusUrl}?f=json`;

            // ******************
            // Let's query if it has finished
            // ******************
            https.get(getJobUrl, (resp) => {
                let data = '';
                resp.on('data', (chunk) => data += chunk );
                resp.on('end', () => {

                    // Job status data recived
                    let resp = JSON.parse(data);

                    if(resp.status === 'Completed'){

                        // ******************
                        // If it has finished, let's get the results
                        // ******************
                        https.get(resp.resultUrl, (resp) => {

                            let data = '';
                            resp.on('data', (chunk) => data += chunk );
                            resp.on('end', () => {

                                let resp = JSON.parse(data);

                                resp.edits[0].features.adds.map(f => console.log(`Feature added: \n${JSON.stringify(f, null, 2)}`));
                                resp.edits[0].features.updates.map(f => console.log(`Feature updated: \n${JSON.stringify(f, null, 2)}`));
                                resp.edits[0].features.deleteIds.map(f => console.log(`Feature deleted: ${f}`));

                                // Same with attachments: resp.edits[0].attachments

                            });

                        }).on("error", (err) => {
                            console.log("Error getting results: " + err.message);
                        });
                    }else{
                        console.log(`This job hasn't finished yet (${resp.status}), check later: ${getJobUrl}`);
                    }
                });

            }).on("error", (err) => {
                console.log("Error getting job status: " + err.message);
            });
        });

    }).on("error", (err) => {
        console.log("Error getting job's statusUrl: " + err.message);
    });

    res.send(req.body);
});

app.listen(port);
