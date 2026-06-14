const Cart = require("../model/cart");
const Order = require('../model/order');
const Product = require('../model/product');

exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.session.user._id;

    let cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      cart = new Cart({
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: 1
          }
        ]
      });
    } else {
      const existingProduct = cart.items.find(item => {
        return item.productId.toString() === productId;
      });

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.items.push({
          productId: productId,
          quantity: 1
        });
      }
    }

    await cart.save();

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
    res.redirect("/products");
  }
};


exports.getCart = async (req, res) => {

    const userId = req.session.user._id;

    const cart = await Cart.findOne({ userId })
        .populate("items.productId");

    let total = 0;

    if(cart){
        cart.items.forEach(item => {
            total += item.productId.price * item.quantity;
        });
    }

    const message = req.session.message;

    req.session.message = null;

    res.render("cart", {
        cart,
        total,
        message
    });
};



// after adding in the cart 

exports.increaseQuantity = async (req, res) => {

    const productId = req.params.id;
    const userId = req.session.user._id;

    const cart = await Cart.findOne({ userId })
        .populate("items.productId");

    const item = cart.items.find(
        item => item.productId._id.toString() === productId
    );

    if(item){

        if(item.quantity >= item.productId.stock){

            req.session.message =
                `Only ${item.productId.stock} items available in stock`;

            return res.redirect("/cart");
        }

        item.quantity += 1;
    }

    await cart.save();

    res.redirect("/cart");
};
  
  exports.decreaseQuantity = async (req, res) => {
    const productId = req.params.id;
    const userId = req.session.user._id;
  
    const cart = await Cart.findOne({ userId });
  
    const item = cart.items.find(item => item.productId.toString() === productId);
  
    if (item) {
      item.quantity -= 1;
  
      if (item.quantity <= 0) {
        cart.items = cart.items.filter(
          item => item.productId.toString() !== productId
        );
      }
    }
  
    await cart.save();
  
    res.redirect("/cart");
  };
  
  exports.removeItem = async (req, res) => {
    const productId = req.params.id;
    const userId = req.session.user._id;
  
    const cart = await Cart.findOne({ userId });
  
    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );
  
    await cart.save();
  
    res.redirect("/cart");
  };
  
  exports.checkout = async (req, res) => {
    const userId = req.session.user._id;
  
    const cart = await Cart.findOne({ userId }).populate("items.productId");
  
    if (!cart || cart.items.length === 0) {
      return res.redirect("/cart");
    }
  
    let totalAmount = 0;
  
    const orderItems = cart.items.map(item => {
      totalAmount += item.productId.price * item.quantity;
  
      return {
        productId: item.productId._id,
        name: item.productId.name,
        price: item.productId.price,
        quantity: item.quantity
      };
    });
  
    await Order.create({
      userId,
      items: orderItems,
      totalAmount
    });

    for(const item of cart.items){

      const product = await Product.findById(
          item.productId._id
      );
  
      product.stock -= item.quantity;
  
      await product.save();
  }
  
    cart.items = [];
    await cart.save();
  
    res.redirect("/orders");
  };
  