const port = process.argv.length > 2 ? process.argv[2] : 4000;
// Express stuff
const express = require('express');
const app = express();

// Login stuff
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

const authCookieName = 'token';

app.use(express.static('public'));