//  Sử dụng model Product đã định nghĩa ở trên
const Product = require('../models/Products');

//  req: Yêu cầu người dùng
//  res: Phản hồi máy chủ
//  await: tạm dừng code để đợi lấy kết quả

//  Hàm để lấy toàn bộ sản phẩm
const getAllProducts = async (req, res) => {
    try {
        //  Hàm find(): Tìm kiếm toàn bộ sản phẩm
        const products = await Product.find();

        //  Máy chủ gửi phản hồi về client là toàn bộ dữ liệu sản phẩm dưới dạng json
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//  Hàm để lấy các sản phẩm tên có từ khoá
const searchProducts = async (req, res) => {
    //  biến keyword được gán giá trị từ truy vấn của người dùng
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({ message: 'Keyword is required' });
    }

    try {
        /*  Không cần hiểu kỹ quá về hàm find() dưới, 
        chỉ cần biết nó trả về sản phẩm chứa từ khoá trong tên */
        const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Hàm để lấy sản phẩm theo ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Hàm để lấy các sản phẩm có thuộc tính salePercent > 0 giảm dần
const getProductsOnSale = async (req, res) => {
    try {
        // Tìm kiếm sản phẩm có salePercent > 0
        const productsOnSale = await 
        Product.find({ salePercent: { $gt: 0 } }).sort({ salePercent: -1 });
        res.json(productsOnSale);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Hàm để tìm sản phẩm theo category_id
const getProductsByCategory = async (req, res) => {
    try {
        // Lấy category_id từ tham số của truy vấn
        const categoryId = req.params.category_id;
        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required' });
        }
        // Tìm kiếm sản phẩm theo category_id
        const products = await Product.find({ category_id: categoryId });

        // Kiểm tra xem có sản phẩm nào không
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        // Trả về danh sách sản phẩm theo category_id
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Hàm để lấy các sản phẩm có lượt mua nhiều nhất giảm dần
const getProductsByPurchases = async (req, res) => {
    try {
        // Tìm kiếm toàn bộ sản phẩm và sắp xếp theo purchasesNum giảm dần
        const products = await Product.find().sort({ purchasesNum: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xuất ra các hàm controller
module.exports = {
    getAllProducts,
    searchProducts,
    getProductById,
    getProductsOnSale,
    getProductsByCategory, 
    getProductsByPurchases
};
