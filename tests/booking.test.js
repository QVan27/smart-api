const request = require('supertest');
const { app, closeServer } = require('../server');

describe('Booking API', () => {
  let accessToken;

  beforeAll(async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        firstName: 'John',
        lastName: 'Four',
        email: 'johnfour@example.com',
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
        email: 'johnfour@example.com',
        password: 'password123'
      });

    expect(loginRes.statusCode).toEqual(200);
    expect(loginRes.body).toHaveProperty('accessToken');

    accessToken = loginRes.body.accessToken;
  });

  afterAll(() => {
    closeServer();
  });

  it('should get all bookings', async () => {
    const res = await request(app)
      .get('/api/bookings')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
    
  });

  it('should get a booking by ID', async () => {
    const res = await request(app)
      .get('/api/bookings/1')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
    
  });

  it('should get users by booking ID', async () => {
    const res = await request(app)
      .get('/api/bookings/1/users')
      .set('x-access-token', accessToken)
      .send();

    expect(res.statusCode).toEqual(200);
    
  });
});
