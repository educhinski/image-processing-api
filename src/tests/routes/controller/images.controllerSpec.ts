import path from 'path';
import { existsSync, unlinkSync } from 'fs';
import { resizeImage } from '../../../routes/controller/images.controller';

// test our sharp functionality
// declare some variables
const h = 200,
  w = 200;
const filename = 'fjord';
const originalFilePath = path.join(process.cwd(), 'images', `${filename}.jpg`);

const editedFilePath = path.join(
  process.cwd(),
  'images',
  'thumbs',
  `${filename}-${w}-${h}.jpg`
);

describe('Test Image Processor', () => {
  beforeAll(() => {
    if (existsSync(editedFilePath)) unlinkSync(editedFilePath);
  });

  it('Expect edited file to be absent before running Sharp Processing', () => {
    expect(existsSync(editedFilePath)).toBeFalse();
  });

  it('Expect edited file to be present after running Sharp Processing', async () => {
    await resizeImage(originalFilePath, editedFilePath, w, h);
    const fileExists = expect(existsSync(editedFilePath)).toBeTrue();
  });
});
