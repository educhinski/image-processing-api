import supertest from 'supertest';
import app from '../../indexSpec';

// test our endpoint
const request = supertest(app);

describe('Sharp Image Processor tests', () => {
  // test sharp functionality
  it('test whether the correct code is sent on accessing full api', async () => {
    const response = await request.get('/api/images?filename');
    expect(response.status).toBe(301);
  });

  it('test whether the sharp raises the correct error with wrong filename', async () => {
    const response = await request.get('/api/images?filename=nonexistent');
    expect(response.status).toBe(301);
  });

  it('test whether the api responds correctly with the correct filename', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(301);
  });
});
