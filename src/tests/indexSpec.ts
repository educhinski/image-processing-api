import supertest from 'supertest';
import app from '../index';

// test our endpoint
const request = supertest(app);

describe('Test homepage', () => {
  // test whether the endpoint connects
  it('get the home endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(404);
  });
});

export default app;
