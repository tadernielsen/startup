const request = require('supertest');
const app = require('./service')

// Currently doesn't work because I am unable to disable the server

// User Tests
function getRandomName()
{
    const min = 1;
    const max = 500;
    return `email${Math.floor(Math.random() * (max - min + 1) + min)}@tader.TN`;
}

function createUser()
{
    const email = getRandomName();
    const password = "secret :)";
    return {email: email, password: password}
}

test('Register', async () => {
    const user = await createUser();
    const registerUser = await request(app).post('/api/auth/CreateAccount').send(user);

    expect(registerUser.status).toBe(200);
    expect(registerUser.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(registerUser.body).toMatchObject({email:user.email, type:'normal'});
});

test('Login', async () => {

});

test('Logout', async () => {

});

test('Get User', async () => {

});

// Developer Test
test('Developer Login', async () => {

});

// Announcement Test
// Add function that creates random announcement and saves it
test('Save Announcement', async () => {

});

test('Get Announcement', async () => {

});

afterAll(async () => {

});