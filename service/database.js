const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

// Setup
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

// Client and Collections
const db = client.db('TN-Games');
const userCollection = db.collection('user');
const developerCollection = db.collection('developer');
const devLogCollection = db.collection('devLog');
const gameCollection = db.collection('game');
const announcementCollection = db.collection('announcement');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connected to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

// Database Endpoints
// User
async function addNewUser(user)
{
    await userCollection.insertOne(user);
}

async function updateUser(user)
{
    await userCollection.updateOne({name: user.name}, {$set: user});
}

function getUser(email)
{
    return userCollection.findOne({name: email});
}

function getUserWithToken(token)
{
    return userCollection.findOne({token: token});
}

// Developer

async function updateDeveloper(dev)
{
    await developerCollection.updateOne({name: dev.name}, {$set: dev});
}

function getDeveloper(email)
{
    return developerCollection.findOne({name: email});
}

function getDeveloperWithToken(token)
{
    return developerCollection.findOne({token: token})
}

// DevLog

// Games

// Announcement
async function updateAnnouncement(newAnnouncement)
{
    await announcementCollection.updateOne({}, {$set: {announcement: newAnnouncement}});
}

function getAnnouncement()
{
    const announcement = announcementCollection.findOne({});
    return announcement;
}

module.exports = {
    addNewUser,
    updateUser,
    getUser,
    getUserWithToken,
    updateAnnouncement,
    getAnnouncement,
};