// Express stuff
const express = require('express');
const app = express();

// Login stuff
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

const authCookieName = 'token';

// Image
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/GameImages/',
        filename: (req, file, cb) => {
            const filetype = file.originalname.split('.').pop();
            const id = Math.round(Math.random() * 1e9);
            const filename = `${id}.${filetype}`;
            cb(null, filename);
        },
    }),
    limits: {fileSize: 500000},
})

// Database
const DB = require('./database.js')

// Data Lists (to be replaced by database once it is finished)
let users = [];
let developers = [];

let devLogs = [];
let games = [];

let announcement = 'Press Edit to change this!';

const tnImages = ['TN PFP V3.png', 'V2 TN.jpg', 'V1 TN.png', 'OG TN.png', 'TN games PFP.png', 'TN Galaxy.png', 'TNYT logo.png', 'Halloween TN.png', 'TN chrismas Logo.png', 'TN chrismas V2.png', 'TN COVID-19.png', 'TN halloween 2021 pfp.png'];

// Middleware
app.use(express.static('public'));

app.use(cookieParser());

app.use(express.json());

// Shows both request and response
app.use((req, res, next) => {
    console.log(req.path,req.method);
    console.log(res.statusCode);
    next();
});

async function createUser(username, password, userType)
{
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {name: username, pass: hashedPassword, type: userType, token: uuid.v4()};
    //users.push(user);
    DB.addNewUser(user);

    return user;
}

function getUser(field, value)
{
    if (!value) {return null;}

    if (field === "token")
    {
        return DB.getUserWithToken(value);
    }
    return DB.getUser(value);
}

function getDeveloper(field, value)
{
    if (!value) {return null;}

    if (field === "token")
    {
        return DB.getDeveloperWithToken(value);
    }
    return DB.getDeveloper(value);
}

function setCookie(res, user)
{
    res.cookie(
        authCookieName, user.token, 
        {
        secure: true, 
        httpOnly: true, 
        sameSite: 'strict',
    });
}

// Endpoints
// Authentication Endpoints
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
    const user = await getUser('user', req.body.email);
    if (user && (await bcrypt.compare(req.body.password, user.pass)))
    {
        user.token = uuid.v4();
        await DB.updateUser(user);
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
    const dev = await getDeveloper('name', req.body.email);
    if (dev && (await bcrypt.compare(req.body.password, dev.pass)))
    {
        dev.token = uuid.v4();
        await DB.updateDeveloper(dev);
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
        delete user.token;
        DB.updateUser(user);
    }
    else
    {
        const dev = await getDeveloper('token', token);
        if (dev)
        {
            delete dev.token;
            DB.updateDeveloper(dev);
        }
    }
    res.clearCookie(authCookieName);

    res.status(204).end();
});

// Get User Data
app.get('/api/auth/User', async (req, res) =>{
    const token = req.cookies[authCookieName];
    const user = await getUser('token', token)
    
    if (user)
    {
        res.send({"email": user.email, "type": user.type});
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

// Middleware for checking if user is developer
const verifyDeveloper = async (req, res, next) => {
    const user = await getDeveloper('token', req.cookies[authCookieName]);

    if (user === null)
    {
        res.status(403).send({msg: "UNAUTHORIZED"});
    }
    else if (user === undefined)
    {
        res.status(403).send({msg: "UNAUTHORIZED"});
    }
    else
    {
        next();
    }
}

// Middleware for checking if user is logged in
const verifyAuth = async (req, res, next) => {
    const user = await getUser('token', req.cookies[authCookieName]);

    if (user)
    {
        next();
    }
    else
    {
        const dev = await getDeveloper('token', req.cookies[authCookieName]);
        if (dev)
        {
            next();
        }
        else
        {
            res.status(403).send({msg: "Please Log in or Create Account"});
        }
    }
}

// Announcement Endpoints
// Set Announcement
app.put('/api/data/Announcement', verifyDeveloper, async (req, res) => {
    await DB.updateAnnouncement(req.body.announcement);

    res.send(await DB.getAnnouncement());
});

// Get Announcement
app.get('/api/data/Announcement', async (req, res) => {
    res.send(await DB.getAnnouncement());
});

// Devlog Endpoints
// Create Devlog
app.post('/api/data/Devlog', verifyDeveloper, (req, res) => {
    devLogs.push(req.body);
    res.send({devlogs: devLogs});
});

// Like Devlog
app.put('/api/data/Devlog', verifyAuth, (req, res) => {
    const post = devLogs.find(log => log.ID === req.body.ID)

    if (post)
    {
        devLogs = devLogs.map(log => log === post ? { ...log, "likedAccounts": req.body.likedAccounts } : log);
        res.send({devlogs: devLogs});
    }
    else
    {
        res.status(400).send({msg: 'ERROR: Could not find post'})
    }
});

// Delete Devlog
app.delete('/api/data/Devlog', verifyDeveloper, (req, res) => {
    const post = devLogs.find(log => log.ID === req.body.ID)
    
    if (post)
    {
        devLogs = devLogs.filter(log => log !== post);
        res.send({devlogs: devLogs})
    }
    else
    {
        res.status(400).send({msg: 'ERROR: Could not find post'})
    }
});

// Get Devlog
app.get('/api/data/Devlog', (req, res) => {
    res.send(devLogs);
});

// Game Endpoints
// Create Game
app.post('/api/data/Games', verifyDeveloper, (req, res) => {
    games.push(req.body);
    res.send({games: games});
});

// Like and Favorite Game
app.put('/api/data/Games', verifyAuth, (req, res) => {
    const game = games.find(post => post.ID === req.body.ID);

    if (game)
    {
        games = games.map(post => post === game ? { ...post, "likedAccounts": req.body.likedAccounts, "favoritedAccounts": req.body.favoritedAccounts } : post);
        res.send({games: games});
    }
    else
    {
        res.status(400).send({msg: 'ERROR: Could not find game'});
    }
})

// Delete Game
app.delete('/api/data/Games', verifyDeveloper, (req, res) => {
    const game = games.find(post => post.ID === req.body.ID)
    
    if (game)
    {
        games = games.filter(post => post !== game);
        res.send({games: games})
    }
    else
    {
        res.status(400).send({msg: 'ERROR: Could not find game'})
    }
});

// Get Game
app.get('/api/data/Games', (req, res) => {
    res.send(games);
});

// Save Game Image
app.post('/api/data/Games/Images', upload.single('file'), (req, res) => {
    if (req.file)
    {
        res.send({file: req.file.filename});
    }
    else
    {
        res.status(400).send({msg: "Upload Failed"});
    }
});

// Other Endpoints
// TN shuffler Endpoints
app.get('/api/data/TNimages', (req, res) => {
    const min = 0;
    const max = tnImages.length;
    const randomNumber = Math.floor(Math.random() * (max - min) + min);

    res.send({img: tnImages[randomNumber]})
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

// Injects Developer into list (Remove when DB is complete)
// async function injectDeveloper(username = "", password = "")
// {
//     // Create user
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const dev = {name: username, pass: hashedPassword, type: "developer"};
//     developers.push(dev);

//     // Set Cookie        
//     dev.token = uuid.v4();

//     DB.injectDeveloper(dev);
// }
// injectDeveloper()

module.exports = app;