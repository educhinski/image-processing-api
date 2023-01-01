import express from 'express';
import images from './api/images.route';
import imageController from './controller/images.controller';

// init our Router
const routes = express.Router();

// define endpoints
routes.use('/images', express.static('images'), imageController, images);

export default routes;
