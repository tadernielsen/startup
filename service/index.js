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

const announcement = 'Press Edit to change this!';

// Functions
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

// Middleware
app.use(express.static('public'));

app.use(cookieParser());

app.use(express.json());

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

// Developer Login Maybe?

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

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});