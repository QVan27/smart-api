const request = require('supertest');
const { app, closeServer } = require('../server');

describe('User API', () => {
  let accessToken;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Three',
        email: 'johnthree@example.com',
        position: 'Developer',
        picture: 'profile.jpg',
        password: 'password123',
        roles: ['USER']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User was registered successfully!');

    const loginRes = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'johnthree@example.com',
        password: 'password123'
      });

    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('accessToken');

    accessToken = loginRes.body.accessToken;
  });

  afterAll(() => {
    closeServer();
  });

  it('should get all users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
  });

  it('should get a user by ID', async () => {
    const res = await request(app)
      .get('/api/users/1') 
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
  });

  it('should get bookings by user ID', async () => {
    const res = await request(app)
      .get('/api/users/1/bookings')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
  });

  it('should get session user bookings', async () => {
    const res = await request(app)
      .get('/api/user/bookings')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
  });

  it('should get session user info', async () => {
    const res = await request(app)
      .get('/api/user')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
  });
});
