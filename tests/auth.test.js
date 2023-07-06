const request = require('supertest');
const { app, closeServer } = require('../server');

describe('Auth API', () => {
  let accessToken;

  afterAll(() => {
    closeServer();
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        position: 'Developer',
        picture: 'profile.jpg',
        password: 'password123',
        roles: ['USER']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User was registered successfully!');
  });

  it('should connect a user', async () => {
    const res = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'johndoe@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('accessToken');

    accessToken = res.body.accessToken;
  });

  it('should logout a user', async () => {
    const res = await request(app)
      .post('/api/auth/logout')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Logout successful!');
  });
});
