import supertest from 'supertest';
import app from '../index';

// test our endpoint
const request = supertest(app);

describe('Test endpoint responses', () => {
  // test whether the endpoint connects
  it('get the api endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
