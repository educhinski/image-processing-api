import express, { Request, Response } from 'express';

const images = express.Router();

images.get('/', async (_req: Request, res: Response) => {
  if (res.locals.fileExists) {
    res.sendFile(res.locals.newFilePath);
  } else {
    res.status(404).send(res.locals.fileError);
  }
});

export default images;
