import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Sweet from "../models/Sweet.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate("items.sweet");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      if (!item.sweet) continue;
      
      if (item.sweet.quantity < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${item.sweet.name}` });
      }

      orderItems.push({
        sweet: item.sweet._id,
        quantity: item.quantity,
        price: item.sweet.price,
      });
      totalAmount += item.sweet.price * item.quantity;
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      totalAmount,
      address: address || "Default Address",
      status: "Completed",
    });

    for (const item of cart.items) {
        if(item.sweet) {
            await Sweet.findByIdAndUpdate(item.sweet._id, {
                $inc: { quantity: -item.quantity }
            });
        }
    }

    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.sweet", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
