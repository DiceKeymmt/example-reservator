require('dotenv').config();
const line = require('@line/bot-sdk');
const express = require('express');

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
};

const app = express();

app.get('/webhook', (req, res) => {
    console.log(req);
});

app.listen(process.env.PORT||8080);