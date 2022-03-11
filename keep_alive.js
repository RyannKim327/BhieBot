const express = require('express');
const app = express();

const host = process.env.HOST || "http://localhost"
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('BhieBot, BY: MPOP Reverse II'));

app.listen( port, () =>
	console.log(`Your app is listening a ${host}:${port}`)
);