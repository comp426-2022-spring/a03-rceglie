const express = require('express')
const app = express()
<<<<<<< HEAD
var port = 5000

const server = app.listen(port, () => {
    console.log('App is running on port %PORT%'.replace('%PORT%'))
})

app.get('/app', (req,res) => {
    res.status(200).end('OK')
    res.type('text/plain')
})

app.get('/app/flip', (req, res) => {
    var flip = coinFlip()
    res.status(200).json({'flip' : flip})
})

app.get('app/echo/:number', (res, requ) => {
    res.status(200).json({ 'message': req.params.number})
})

app.use(function(req,res) {
    res.status(404).end("Endpoint does not exist")
    res.type("text/plain")
})
=======

const args = require('minimist')(process.argv.slice(2))
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


>>>>>>> 75b35cc10caefdfcea5f4bb13bed1a419b9ae639
