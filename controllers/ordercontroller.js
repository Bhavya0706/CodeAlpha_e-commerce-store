const Order = require("../model/order");
const Product = require('../model/product')

exports.getOrders = async (req, res) => {
  try {
    const userId = req.session.user._id;

    const orders = await Order.find({ userId: userId })
      .sort({ createdAt: -1 });

    res.render("order.ejs", {
      orders: orders
    });

  } catch (error) {
    console.log(error);
    res.redirect("/cart");
  }
};
exports.cancelOrder = async (req, res) => {

    const orderId = req.params.id;

    const order = await Order.findById(orderId);

for(const item of order.items){

    const product = await Product.findById(
        item.productId
    );

    product.stock += item.quantity;

    await product.save();
  }
    
    await Order.findByIdAndUpdate(
        orderId,
        {
            status: "Cancelled"
        }
    );

    res.redirect("/orders");
}