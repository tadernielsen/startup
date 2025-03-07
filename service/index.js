const port = process.argv.length > 2 ? process.argv[2] : 4000;
// Express stuff
const express = require('express');
const app = express();

// Login stuff
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
var apiRouter = express.Router();

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
        return users.find(user => user[field] === value);
    }
    return null;
}

function setCookie(res, user)
{
    user.token = uuid.v4();
    res.cookie(
        'token', user.token, 
        {
        secure: true, 
        httpOnly: true, 
        sameSite: 'strict',
    });
}

// Middleware
app.use(express.static('public'));

app.use(cookieParser());

app.use(express.json());

app.use('/api', apiRouter);

// Endpoints
// User Creation
app.post('/auth/CreateAccount', async (req, res) => {
    if (await getUser('email', req.body.email))
    {
        res.status(409).send({msg: 'User already exists.'});
    }
    else
    {
        const user = await createUser(req.body.email, req.body.password, req.body.type);
        
        setCookie(res, user);

        res.send({email: user.name, type: user.type});
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});