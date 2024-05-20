const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true
    },
    publication_date: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        default: "" // Giá trị mặc định là chuỗi trống
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    }
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
