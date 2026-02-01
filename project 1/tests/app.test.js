const request = require('supertest');
const app = require('../app');

describe('Basic app', () => {
  it('GET / should return greeting', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Hello from Project 1/);
  });

  it('GET /health should return status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});