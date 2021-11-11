import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

// @desc Fetch all cart items
// @route GET /api/cart
// @access Private/Admin
const getCartItems = asyncHandler(async (req, res) => {
  // console.log("req params");
  // console.log(req.query.email);
  const myCart = await Cart.find({ email: req.query.email });
  //console.log(cartItems);
  res.json(myCart);
});

// @desc ADD cart item
// @route POST /api/cart/product/:id
// @access Private/Admin
const addToCart = asyncHandler(async (req, res) => {
  //query for specified user
  //query for all products except for what's on the list
  /* let stuff = await Product.find(
            {_id:{ $not: {$in:[...user.wishlist.items]}}
        });

    if(stuff = 0){
        
    }*/
  const { userId } = req.body;
  // console.log(req.params.id);
  const product = await Product.findById(req.params.id);
  // console.log(product);
  // console.log("body", req.body);
  const data = req.body;
  const cartItem = new Cart(data);

  const cartAddedItem = await cartItem.save();
  res.json(cartAddedItem);
});

// @desc    Delete a cart item
// @route   DELETE /api/cart/:id
// @access  Private/Admin
const deleteCartItem = asyncHandler(async (req, res) => {
  const cartItemById = await Cart.findById(req.params.id);

  if (cartItemById) {
    await cartItemById.remove();
    res.json({ message: "Cart Item removed" });
  } else {
    res.status(404);
    throw new Error("Cart Item found");
  }
});

export { getCartItems, addToCart, deleteCartItem };
