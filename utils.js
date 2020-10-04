const { https } = require('follow-redirects');
const Promise = require('promise');

let getJSONResource = function(url){
    return new Promise((resolve, reject) => {
        https.get(url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => data += chunk );
            resp.on('end', () => {
                try{
                   resolve({
                       resp: JSON.parse(data),
                       url: url
                    });
                }catch(err){
                    console.error(err);
                }
            });
        }).on("error", (err) => {
            reject(`Error on https.get request to: ${url}\nError: ${err.message}`)
        });
    });
};

let getChangesFromJob = function(url){
    getJSONResource(url).then(({resp, url}) => {
        resp.edits.forEach(elem => {

            elem.features.adds.map(f => console.log(`Feature added: \n${JSON.stringify(f, null, 2)}`));
            elem.features.updates.map(f => console.log(`Feature updated: \n${JSON.stringify(f, null, 2)}`));
            elem.features.deleteIds.map(f => console.log(`Feature deleted: ${f}`));
            // Same with attachments: resp.edits[0].attachments
            elem.attachments.adds.map(f => console.log(`Attachments added: \n${JSON.stringify(f, null, 2)}`));
            elem.attachments.updates.map(f => console.log(`Attachments updated: \n${JSON.stringify(f, null, 2)}`));
            elem.attachments.deleteIds.map(f => console.log(`Attachments deleted: ${f}`));

        });
    }).catch(reason => {
        console.error(reason);
    });
}

let getJobIfCompleted = function(url){

    getJSONResource(url).then(( {resp, url} ) => {
        if(resp.status === 'Completed'){
            // If it has finished, let's get the results
            getChangesFromJob(resp.resultUrl);
        }else{
            // Otherwise check again in three seconds
            console.log(`This job hasn't finished yet (${resp.status}), check later: ${url}`);
            setTimeout( function(){
                getJobIfCompleted(url)
            }, 3000);
        }
    }).catch(reason => {
        console.error(reason);
    });

}

module.exports = {
    getJSONResource: getJSONResource,
    getChangesFromJob: getChangesFromJob,
    getJobIfCompleted: getJobIfCompleted
};
