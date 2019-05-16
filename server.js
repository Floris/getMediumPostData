const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const _ = require('lodash');
const bodyParser = require('body-parser');
const rp = require('request-promise');

app.use(bodyParser.json());


app.post('/', (req, res) => {
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