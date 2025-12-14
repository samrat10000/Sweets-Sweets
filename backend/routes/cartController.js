import Cart from "../models/Cart.js";
import Sweet from "../models/Sweet.js";

// ➕ Add to Cart
export const addToCart = async (req, res) => {
  const { sweetId } = req.body;
  const userId = req.user.id;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.sweet.toString() === sweetId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += 1;
  } else {
    cart.items.push({ sweet: sweetId, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
};

// 🛒 Get Cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.sweet"
  );
  res.json(cart || { items: [] });
};

// 💳 Checkout
export const checkout = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    "items.sweet"
  );

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  for (let item of cart.items) {
    if (item.sweet.quantity < item.quantity) {
      return res
        .status(400)
        .json({ message: `${item.sweet.name} out of stock` });
    }

    item.sweet.quantity -= item.quantity;
    await item.sweet.save();
  }

  cart.items = [];
  await cart.save();

  res.json({ message: "Checkout successful 🎉" });
};
