import sharp from 'sharp';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { mkdirSync, existsSync } from 'fs';

const imageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // define our folder path
  const dirPath = path.join(process.cwd(), 'images');

  // extract query parameters
  interface Query {
    filename?: string | '';
    height?: number | undefined;
    width?: number | undefined;
  }

  let { filename, height, width }: Query = req.query;
  res.locals.fileError = `
  <div style="font-family: sans-serif; font-size: 1.2em; margin: 0 auto;">
    <h3>File does not exist.</h3>
    <p>Please use one of the following filenames:</p>
    <ul>
    <li><span>encenadaport</span></li>
    <li><span>fjord</span></li>
    <li><span>icelandwaterfall</span></li>
    <li><span>palmtunnel</span></li>
    <li><span>santamonica</span></li>
  </div>
     `;
  if (!filename) {
    next();
    return;
  }

  if (typeof height === 'string') height = parseInt(height);
  if (typeof width === 'string') width = parseInt(width);

  res.locals.fileExists = null;
  res.locals.filePath = `${dirPath}/${filename}.jpg`;
  res.locals.newFilePath = `${dirPath}/thumbs/${filename}-thumb.jpg`;

  if (height && width) {
    res.locals.newFilePath = `${dirPath}/thumbs/${filename}-${width}x-${height}-thumb.jpg`;
  } else if (width) {
    res.locals.newFilePath = `${dirPath}/thumbs/${filename}-${width}-thumb.jpg`;
  } else if (height) {
    res.locals.newFilePath = `${dirPath}/thumbs/${filename}-${height}-thumb.jpg`;
  }

  // create thumbs folder if it does not exist
  if (!existsSync(`${dirPath}/thumbs`)) {
    mkdirSync(`${dirPath}/thumbs`);
  }

  // create the thumbnail image
  if (existsSync(res.locals.filePath)) {
    res.locals.fileExists = true;
    console.log(`${res.locals.newFilePath} created.`);
    await sharp(res.locals.filePath)
      .resize(width, height)
      .toFile(res.locals.newFilePath);
  } else {
    console.log('Image Processing Error: Input file is missing');
  }
  next();
};

export default imageController;
