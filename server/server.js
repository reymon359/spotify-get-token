const express = require('express');
const request = require('request');
const path = require('path');

const app = express();


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/spotify', (req, resp) => {
    let client_id = 'YOUR CLIENT ID';
    let client_secret = 'YOUR CLIENT SECRET ID';



    let spotifyUrl = 'https://accounts.spotify.com/api/token';

    var authOptions = {
        url: spotifyUrl,
        headers: {
            Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64')
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };


    request.post(authOptions, (err, httpResponse, body) => {

        if (err) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Could not get the token',
                err
            })
        }

        resp.json(body);

    });

});


app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Server running on port ${ port }`);

});