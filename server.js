// functions/index.js
const functions = require('firebase-functions');
const express = require('express');
const ytdl = require('ytdl-core');
const app = express();

app.get('/download', async (req, res) => {
    try {
        const url = req.query.url;
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title;
        res.header('Content-Disposition', `attachment; filename="${title}.mp4"`);
        ytdl(url, { format: 'mp4' }).pipe(res);
    } catch (error) {
        res.status(400).send('Error downloading the video');
    }
});

exports.app = functions.https.onRequest(app);
