require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');
const bodyParser = require('body-parser');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const client = new line.Client(config);

const handleEvent = event => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result));
});

app.listen(process.env.PORT||8080);