const Product = require("../model/product");

exports.getProducts = async (req, res) => {
  const products = await Product.find();

  res.render("products.ejs", {
    products: products
  });
};

exports.getProductDetails = async (req, res) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);

  res.render("product_detail.ejs", {
    product: product
  });
}; 