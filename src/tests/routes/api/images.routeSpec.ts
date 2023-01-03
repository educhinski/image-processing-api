import supertest from 'supertest';
import app from '../../indexSpec';

// test our endpoint
const request = supertest(app);

describe('Test images endpoint', async () => {
  it('Test whether the api responds correctly with the wrong filename', async () => {
    const response = await request.get('/api/images?filename=nonexistent');
    expect(response.status).toBe(301);
  });

  it('Test whether the api responds correctly with the correct filename', async () => {
    const response = await request.get(
      '/api/images?filename=fjord&width=200&height=200'
    );
    expect(response.status).toBe(301);
  });
});
