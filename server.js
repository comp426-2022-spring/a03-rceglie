import express from 'express'
import minimist from 'minimist'
const app = express()
const args = minimist(process.argv.slice(2))
args["port"]
const HTTP_PORT = args.port || 5000

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', HTTP_PORT))
})

app.get('/app/', (req, res) => {
    res.statusCode = 200
    res.statusMessage = "OK"
    res.writeHead(res.statusCode, {'Content-Type':'text/plain'})
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/flip/', (req, res) => {
    res.status(200).json({"flip" : coinFlip()})
});

app.get('/app/flips/:number', (req, res) => {
    var flips = coinFlips(req.params.number)
    res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
});

app.get('/app/flip/call/heads', (req, res) => {
    var result = "lose"
    var flip = coinFlip()
    if (flip == "heads"){
        result ="win"
    }
    res.status(200).json({"call" : "heads", "flip" : flip, "result" : result})
});

app.get('/app/flip/call/tails', (req, res) => {
    var result = "lose"
    var flip = coinFlip()
    if (flip == "tails"){
        result ="win"
    }
    res.status(200).json({"call" : "tails", "flip" : flip, "result" : result})
});

app.use(function(req,res){
    res.status(404).send('404 NOT FOUND')
})


function coinFlip() {
    return Math.round(Math.random()) ? "heads" : "tails";
}


function coinFlips(flips) {
    var results = [];
    for (var i = 0; i < flips; i++){
      results.push(coinFlip());
    }
    return results;
}

function countFlips(array) {
    var headcount = 0;
    var tailcount = 0;
    array.forEach( (element) => {
      if (element == "heads") {
        headcount++;
      } else{
        tailcount++;
      }
    });
    return {heads: headcount, tails: tailcount};
}