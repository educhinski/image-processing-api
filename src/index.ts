import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

// use routes endpoint
app.use('/api', routes);

// initiate server
app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/`)
);

export default app;
