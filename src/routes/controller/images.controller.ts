import sharp from 'sharp';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { mkdirSync, existsSync } from 'fs';

const imageController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // create our cache folder
  // define our folder path
  const dirPath = path.join(process.cwd(), 'images');

  // create thumbs folder if it does not exist
  if (!existsSync(`${dirPath}/thumbs`)) {
    mkdirSync(`${dirPath}/thumbs`);
  }

  // get parameters from url - filename, width, height
  const { filename, height, width } = req.query;

  // check the variables
  res.locals.error = '';
  let h, w, originalImagePath, cacheImagePath;
  // are all variables present
  if (!filename || !height || !width) {
    res.locals.error +=
      'All variables are required: `filename`, `height` and `width`';
    console.log(`Error ${res.locals.error}`);
    next();
    return;
  } else {
    // is the filename correct
    if (!existsSync(`${dirPath}/${filename}.jpg`)) {
      res.locals.error +=
        "The filename '" +
        filename +
        "' does not exist currently. \nUse any the following filenames: \
        \n- encenadaport - fjord - icelandwaterfall - palmtunnel- santamonica \n";
      console.log(`Error ${res.locals.error}`);
      next();
      return;
    }
    // define imagePaths
    cacheImagePath = `${dirPath}/thumbs/${filename}-${width}-${height}.jpg`;
    originalImagePath = `${dirPath}/${filename}.jpg`;

    // save our filename to response
    res.locals.cacheImagePath = cacheImagePath;

    // are width and height correct
    // assign height and width
    const newWidth = parseInt(width as string);
    const newHeight = parseInt(height as string);
    if (isNaN(newWidth) || isNaN(newHeight)) {
      res.locals.error +=
        '`height` and `width` variables allows integer values\n';
      console.log(`Error ${res.locals.error}`);
      next();
      return;
    } else if (newWidth < 1 || newHeight < 1) {
      res.locals.error =
        '`height` and `width` variables take positive integers as values\n';
      console.log(`Error ${res.locals.error}`);
      next();
      return;
    } else {
      // assign our verified height and width
      h = newHeight;
      w = newWidth;
    }
  }

  // check if image exists
  if (!existsSync(cacheImagePath)) {
    // if it doesn't exist, resize
    await resizeImage(originalImagePath, cacheImagePath, w, h);
  }

  next();
};

// resize using sharp
async function resizeImage(
  originalPath: string,
  destinationPath: string,
  width: number,
  height: number
): Promise<void> {
  await sharp(originalPath).resize(width, height).toFile(destinationPath);
}

export { imageController, resizeImage };
