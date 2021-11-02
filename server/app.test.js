const app = require('./app');
const request = require('supertest');

describe('POST /user/login', () => {
  test('should respond with status code 200 and a JWT', async () => {
    const response = await request(app).post('/user/login').send({
      email: 's@g.com',
      password: '12345',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });
  test('should respond with status code 403 and no JWT', async () => {
    const response = await request(app).post('/user/login').send({
      email: 's@g.com',
      password: '1235',
    });
    expect(response.statusCode).toBe(403);
    expect(response.body.token).toBeUndefined();
  });
});
