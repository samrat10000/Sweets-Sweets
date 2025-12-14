// controllers/sweetController.js
import Sweet from "../models/Sweet.js";

/**
 * POST /api/sweets
 */
export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    const sweet = await Sweet.create({
      name,
      category,
      price,
      quantity,
      image: imageUrl,
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/sweets
 */
export const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/sweets/search
 */
export const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;

    let filter = {};

    if (name) filter.name = new RegExp(name, "i");
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * PUT /api/sweets/:id
 */
export const updateSweet = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    if (req.file) {
      updates.image = req.file.path;
    }

    const sweet = await Sweet.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE /api/sweets/:id (Admin only)
 */
export const deleteSweet = async (req, res) => {
  try {
    await Sweet.findByIdAndDelete(req.params.id);
    res.json({ message: "Sweet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/sweets/:id/purchase
 */
export const purchaseSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet || sweet.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({ message: "Purchase successful", sweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * POST /api/sweets/:id/restock (Admin only)
 */
export const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    const sweet = await Sweet.findById(req.params.id);
    sweet.quantity += quantity;
    await sweet.save();

    res.json({ message: "Sweet restocked", sweet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
