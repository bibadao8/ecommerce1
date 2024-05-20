const Article = require('../models/Articles'); // Import model Article

// Lấy tất cả các bài báo
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo bài báo mới
const createArticle = async (req, res) => {
  const { title, author, content, category } = req.body;
  const newArticle = new Article({ title, author, content, category });

  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy một bài báo theo ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getArticlesByCategory = async (req, res) => {
  const { category } = req.query; // Lấy giá trị category từ query parameters
  try {
    const articles = await Article.find({ category });
    if (articles.length === 0) {
      return res.status(404).json({ message: `No articles found in category: ${category}` });
    }
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cập nhật một bài báo theo ID
const updateArticle = async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xóa một bài báo theo ID
const deleteArticle = async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllArticles,
  createArticle,
  getArticleById,
  getArticlesByCategory,
  updateArticle,
  deleteArticle
};
