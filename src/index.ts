import express from 'express';

const app = express();
const port = 3000;

// create an endpoint
app.get('/', (req, res) => {
  console.log('Image Processing API - on');
  res.send('Hello. Welcome to Image Processing API');
});

// initiate server
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/`)
);

export default app;
