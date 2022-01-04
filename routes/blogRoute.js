import express from 'express';
import blogImages from '../utils/blogImages.js';

const blogRouter = express.Router();

import { getBlogs, deleteBlog, getBlogById, updateBlog, addBlog } from '../controllers/blogController.js';

blogRouter
    .route('/')
    .get(getBlogs)
    .post(blogImages, addBlog);

blogRouter
    .route('/:id')
    .get(getBlogById)
    .delete(deleteBlog)
    .put(blogImages, updateBlog);

export default blogRouter;
