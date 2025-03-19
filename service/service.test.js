const request = require('supertest');
const app = require('./service')

test('Register Simple', async () => {
    const email = "test1@email.com";
    const password = 'secret';
    const registerUser = await request(app).post('/api/auth/CreateAccount').send({email, password});

    expect(registerUser.status).toBe(200);
    expect(registerUser.headers['content-type']).toMatch('application/json; charset=utf-8');
    expect(registerUser.body).toMatchObject({email, type:'normal'});
});

afterAll(() => {
    
});