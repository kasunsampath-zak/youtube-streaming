const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { caesarCipherEncrypt, caesarCipherDecrypt } = require('./helper/cipher');
const shift = 5
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});
app.get('/ex', (req, res) => {
    res.render('example');
});

app.post('/', (req, res) => {
    const videoUrl = req.body.videoUrl;
    const videoId = new URL(videoUrl).searchParams.get('v');
    const encryptedId = caesarCipherEncrypt(videoId, shift)
    const videoLink = `/${encryptedId}`;
    // res.render('index', { videoLink });
    res.redirect(`/?videoLink=${encodeURIComponent(encryptedId)}`);
});

app.get('/video/:id', (req, res) => {
    const videoId = req.params.id;
    const decryptedId = caesarCipherDecrypt(videoId, shift)
    console.log(decryptedId)
    res.render('video', { videoId: decryptedId });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});