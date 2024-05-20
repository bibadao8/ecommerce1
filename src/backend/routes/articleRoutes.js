const express = require('express');
const articleController = require('../controllers/articleController')
const router = express.Router();

// Route để lấy tất cả các bài báo
router.get('/', articleController.getAllArticles);

// Route để tạo bài báo mới
router.post('/', articleController.createArticle);

// Route để tìm kiếm bài báo theo category
router.get('/category', articleController.getArticlesByCategory);

// Route để lấy một bài báo theo ID
router.get('/:id', articleController.getArticleById);

// Route để cập nhật một bài báo theo ID
router.put('/:id', articleController.updateArticle);

// Route để xóa một bài báo theo ID
router.delete('/:id', articleController.deleteArticle);


module.exports = router;
