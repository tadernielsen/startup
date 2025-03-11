const port = process.argv.length > 2 ? process.argv[2] : 4000;
// Express stuff
const express = require('express');
const app = express();

// Login stuff
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

const authCookieName = 'token';

// Data Lists
const users = [];
const developers = [];

const devLogs = [];
const games = [];

let announcement = 'Press Edit to change this!';

// Middleware
app.use(express.static('public'));

app.use(cookieParser());

app.use(express.json());

async function createUser(username, password, userType)
{
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {name: username, pass: hashedPassword, type: userType};
    users.push(user);

    return user;
}

async function getUser(field, value)
{
    if (value)
    {
        return users.find((user) => user[field] === value);
    }
    return null;
}

async function getDeveloper(field, value)
{
    if (value)
    {
        return developers.find((dev) => dev[field] === value);
    }
    return null;
}

function setCookie(res, user)
{
    user.token = uuid.v4();
    res.cookie(
        authCookieName, user.token, 
        {
        secure: true, 
        httpOnly: true, 
        sameSite: 'strict',
    });
}

function clearCookie(res, user)
{
    delete user.token;
    res.clearCookie(authCookieName);
}

// Endpoints
// User Creation
app.post('/api/auth/CreateAccount', async (req, res) => {
    if (await getUser('name', req.body.email))
    {
        res.status(409).send({msg: 'User already exists.'});
    }
    else
    {
        const user = await createUser(req.body.email, req.body.password, 'normal');
        
        setCookie(res, user);

        res.send({email: user.name, type: user.type});
    }
});

// User Login
app.put('/api/auth/Login', async (req, res) => {
    const user = await getUser('name', req.body.email);
    if (user && (await bcrypt.compare(req.body.password, user.pass)))
    {
        setCookie(res, user);

        res.send({email: user.name, type: user.type});
    }
    else
    {
        res.status(401).send({ msg: 'Incorrect email or password.' });
    }
});

// Developer Login
app.put('/api/auth/LoginDev', async (req, res) => {
    const dev = await getDeveloper(req.body.email);
    if (dev && (await bcrypt.compare(req.body.password, dev.pass)))
    {
        setCookie(res, dev);

        res.send({email: dev.name, type: dev.type});
    }
    else
    {
        res.status(401).send({ msg: 'Incorrect email or password.' });
    }
});

// User Logout
app.delete('/api/auth/Logout', async (req, res) => {
    const token = req.cookies[authCookieName];

    const user = await getUser('token', token);
    if (user)
    {
        clearCookie(res, user);
    }

    res.send({msg: 'Logged out.'});
});

// Get User Data
app.get('/api/auth/User', async (req, res) =>{
    const token = req.cookies[authCookieName];

    const user = await getUser('token', token);
    res.send({"email": "Name", "type": "Type"});
});

// Website Management Endpoints
// Set Announcement
app.put('/api/data/Announcement', async (req, res) => {
    announcement = req.body.announcement;
    res.send({announcement: announcement});
});

// Get Announcement
app.get('/api/data/Announcement', async (req, res) => {
    res.send({announcement: announcement});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});