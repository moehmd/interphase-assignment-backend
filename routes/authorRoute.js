import express from 'express';
import authorImages from '../utils/authorImages.js';

const authorRouter = express.Router();

import { getAuthors, deleteAuthor, getAuthorById, updateAuthor, addAuthor } from '../controllers/authorController.js';

authorRouter
    .route('/')
    .get(getAuthors)
    .post(authorImages ,addAuthor);

authorRouter
    .route('/:id')
    .delete(deleteAuthor)
    .get(getAuthorById)
    .put(authorImages ,updateAuthor);

export default authorRouter;