const request = require('supertest');
const { app, closeServer } = require('../server');

describe('Room API', () => {
  let accessToken;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Two',
        email: 'johntwo@example.com',
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
        email: 'johntwo@example.com',
        password: 'password123'
      });

    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('accessToken');

    accessToken = loginRes.body.accessToken;
  });

  afterAll(() => {
    closeServer();
  });

  it('should get all rooms', async () => {
    const res = await request(app)
      .get('/api/rooms')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
  });

  it('should get a room by ID', async () => {
    const res = await request(app)
      .get('/api/rooms/1')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
  });

  it('should get bookings by room ID', async () => {
    const res = await request(app)
      .get('/api/rooms/1/bookings')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
  });
});