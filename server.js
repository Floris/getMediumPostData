const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const _ = require('lodash');
const bodyParser = require('body-parser');
const rp = require('request-promise');

app.use(bodyParser.json());

// CORSS
// app.use(function (req, res, next) {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     // res.setHeader('Access-Control-Request-Headers', 'x-auth, Content-Type');
//     // res.setHeader('Access-Control-Request-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     next();
// });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    // const url = 'https://medium.com/@nebulasio/latest?format=json'; // test medium url

    const body = _.pick(req.body, ['url']);
    const url = body.url;

    if (!url) {
        console.log('no url');
        res.status(500).send('NO URL');

        return;
    }

    rp(url)
        .then(function (html) {
            const parsed_json = JSON.parse(html.substring(16)); //success!
            // console.log(html);
            res.send(parsed_json)
        })
        .catch(function (err) {
            // res.send('error'); //handle error
            res.status(500).send('Error getting data');
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))