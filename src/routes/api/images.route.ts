import express, { Request, Response } from 'express';

const images = express.Router();

images.get('/', async (_req: Request, res: Response) => {
  if (res.locals.error) {
    res.status(404).send(res.locals.error);
  } else {
    res.status(200).sendFile(res.locals.cacheImagePath);
  }
});

export default images;
