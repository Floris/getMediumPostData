const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const _ = require('lodash');
const bodyParser = require('body-parser');
const rp = require('request-promise');

app.use(bodyParser.json());

// CORSS
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "x-auth, Content-Type");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "x-auth, Content-Type");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", "true")
//     next();
// });

app.post('/', (req, res) => {
    // const url = 'https://medium.com/@nebulasio/latest?format=json'; // test medium url

    const body = _.pick(req.body, ['url']);

    const url = body.url; // post request, get url

    // const url = req.query.url; // get request, get url

    console.log('url', url);

    if (!url) {
        console.log('no url');
        res.status(500).send('NO URL');

        return;
    }

    try {
        rp(url)
            .then(function (html) {
                const parsed_json = JSON.parse(html.substring(16)); //success!
                // console.log(html);
                res.send(parsed_json);
            })
            .catch(function (err) {
                // res.send('error'); //handle error
                res.status(500).send('Error getting data');
            });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))