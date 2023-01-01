import supertest from 'supertest';
import app from '../../indexSpec';

// test our endpoint
const request = supertest(app);

describe('Test images endpoint', async () => {
  // test whether the endpoint connects
  it('get the api endpoint', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(301);
  });
});
