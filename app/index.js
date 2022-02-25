const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();

// On active le middleware pour parser le payload JSON
app.use(express.json());
// On active le middleware pour parser le payload urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

module.exports = app;
