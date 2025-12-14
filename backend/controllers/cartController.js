import Cart from "../models/Cart.js";
import Sweet from "../models/Sweet.js";

export const addToCart = async (req, res) => {
  try {
    const { sweetId, quantity } = req.body;
    const qty = Number(quantity) > 0 ? Number(quantity) : 1;
    const userId = req.user.id;

    const sweet = await Sweet.findById(sweetId);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ sweet: sweetId, quantity: qty }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.sweet.toString() === sweetId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += qty;
      } else {
        cart.items.push({ sweet: sweetId, quantity: qty });
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.sweet");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Checkout successful (Cart cleared)" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
