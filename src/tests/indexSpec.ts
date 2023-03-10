import supertest from 'supertest';
import app from '../index';

// test our endpoint
const request = supertest(app);

describe('Test Homepage', () => {
  // test whether the endpoint connects
  it('Get the home endpoint and test its response code', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(404);
  });
});

export default app;
