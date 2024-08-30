'use strict';
var util = require('util');
var sleep = require('system-sleep');

// Deps
const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
var http = require('https');
const { stringify } = require('querystring');

exports.logExecuteData = [];

function logData(req) {
    try {
        exports.logExecuteData.push({
            body: req.body,
            headers: req.headers,
            trailers: req.trailers,
            method: req.method,
            url: req.url,
            params: req.params,
            query: req.query,
            route: req.route,
            cookies: req.cookies,
            ip: req.ip,
            path: req.path, 
            host: req.host,
            fresh: req.fresh,
            stale: req.stale,
            protocol: req.protocol,
            secure: req.secure,
            originalUrl: req.originalUrl
        });
        console.log("body: " + util.inspect(req.body));
        console.log("headers: " + req.headers);
        console.log("trailers: " + req.trailers);
        console.log("method: " + req.method);
        console.log("url: " + req.url);
        console.log("params: " + util.inspect(req.params));
        console.log("query: " + util.inspect(req.query));
        console.log("route: " + req.route);
        console.log("cookies: " + req.cookies);
        console.log("ip: " + req.ip);
        console.log("path: " + req.path);
        console.log("host: " + req.host);
        console.log("fresh: " + req.fresh);
        console.log("stale: " + req.stale);
        console.log("protocol: " + req.protocol);
        console.log("secure: " + req.secure);
        console.log("originalUrl: " + req.originalUrl);
    }catch(e){
        console.log(e);
        return res.status(500).json({branchResult: 'generic_error'});
    }
}

/*
 * POST Handler for / route of Activity (this is the edit route).
 */
exports.edit = function (req, res) {
    try {
        console.log( req.body );
        logData(req);
        return res.send(200, 'Edit');
    }catch(e){
        console.log(e);
        return res.status(500).json({branchResult: 'generic_error'});
    }
};

/*
 * POST Handler for /save/ route of Activity.
 */
exports.save = function (req, res) {
    try {
        console.log( req.body );
        logData(req);
        return res.status(200).json({ "success": true });
    }catch(e){
        console.log(e);
        return res.status(500).json({ "success": false });
    }
};


/*
 * POST Handler for /execute/ route of Activity.
 */
exports.execute = function (req, res) {
    try {
        console.log("Executed: "+ JSON.stringify(req.body));

        // Wait for 'seconds' to simulate a massive proccess 
        console.log(new Date());
        sleep(2000); // sleep for seconds
        console.log(new Date());
    
        var requestBody = req.body.inArguments[0];
    
        console.log(JSON.stringify(requestBody));

        const to = requestBody.to;
        const body = requestBody.body;
    
        var request = require('request')
        var url = 'https://mcbn726hd67phgy139zrhkmy1954.pub.sfmc-content.com/agtjes5uvk3?body="' + JSON.stringify(req.body) + '"';
        
        // use a timeout value of 10 seconds
        var timeoutInMilliseconds = 10*1000
        var opts = {
          url: url,
          timeout: timeoutInMilliseconds
        }
        
        request(opts, function (err, res, body) {
          if (err) {
            console.dir(err)
            return
          }
          var statusCode = res.statusCode
          console.log('status code: ' + statusCode)
        })
    
        logData(req);

        // Validation log
        console.log("Message will sent to: " + req.body.inArguments[0].to.valueOf());
        console.log((req.body.inArguments[0].to.valueOf() == new String("999").valueOf()));

        // Preparing the return
        const responseObject = {
            success: true,
            result: to
        };

        // To validate alternative flow on jorney
        if (req.body.inArguments[0].to.valueOf() == new String("999").valueOf()) {
            responseObject.success = false;
            return res.status(422).json(responseObject);
        } else {
            responseObject.success = true;
            return res.status(200).json(responseObject);
        }
        
    }catch(e){
        console.log(e);
        return res.status(500).json({success: false});
    }
};

function generateRandomCode() {
    let toReturn = String.fromCharCode(65+(Math.random() * 5));
    for(let i = 0; i < 4; i++) {
        toReturn += String.fromCharCode(65+(Math.random() * 25));
    }
    return toReturn + "-" + Math.round(Math.random() * 99999, 0);
}

/*
 * POST Handler for /publish/ route of Activity.
 */
exports.publish = function (req, res) {
    try {
        return res.status(200).json({ "success": true });
    }catch(e){
        console.log(e);
        return res.status(500).json({ "success": false });
    }
};

/*
 * POST Handler for /validate/ route of Activity.
 */
exports.validate = function (req, res) {
    try {
        return res.status(200).json({ "success": true });
    }catch(e){
        console.log(e);
        return res.status(500).json({ "success": false });
    }
};
