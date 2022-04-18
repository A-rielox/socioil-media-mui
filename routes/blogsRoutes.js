import express from 'express';
const router = express.Router();

import {
   createBlog,
   deleteBlog,
   getAllBlogs,
   updateBlog,
   showStats,
} from '../controllers/blogsController.js';

//'/api/v1/blogs'
router.route('/').post(createBlog).get(getAllBlogs);
router.route('/stats').get(showStats);

router.route('/:id').delete(deleteBlog).patch(updateBlog);

export default router;
