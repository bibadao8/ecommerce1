
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const articleRoutes = require('./routes/articleRoutes')
const cartRoutes = require('./routes/cartRoutes');
const routes = require('./routes')
// Khởi tạo ứng dụng Express
const app = express();

const PORT = process.env.PORT || 5000;

productRoutes.route(app);
app.use(cors());
app.use(express.json());


(async () => {
  try {
    await mongoose.connect('mongodb+srv://group10team:pbT2vLDmfQqkhvjg@cluster0.llxx5bj.mongodb.net/ECOMMERCE'); // URL của CSDL

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
})();

app.use('/products', productRoutes);
app.use('/articles', articleRoutes);
app.use('/', cartRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
