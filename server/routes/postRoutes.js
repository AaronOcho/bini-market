const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const { getPosts, createPost, deletePost } = require('../controllers/postController');

router.get('/posts', getPosts);
router.post('/posts', adminAuth, createPost);
router.delete('/posts/:id', adminAuth, deletePost);

module.exports = router;