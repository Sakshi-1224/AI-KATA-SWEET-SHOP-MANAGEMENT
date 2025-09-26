// backend/routes/sweets.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const Sweet = require('../models/Sweet');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all sweets with search and filter
router.get('/', auth, async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(query).sort({ createdAt: -1 });
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search sweets
router.get('/search', auth, async (req, res) => {
  try {
    const { q, category } = req.query;
    let query = {};

    if (q) {
      query.name = { $regex: q, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single sweet
router.get('/:id', auth, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new sweet (Admin only)
router.post('/', [auth, adminAuth], [
  body('name').notEmpty().withMessage('Name is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const sweet = new Sweet(req.body);
    await sweet.save();
    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update sweet (Admin only)
router.put('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete sweet (Admin only)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    res.json({ message: 'Sweet deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase sweet
router.post('/:id/purchase', auth, async (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    if (sweet.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient quantity' });
    }

    sweet.quantity -= quantity;
    await sweet.save();

    res.json({ message: 'Purchase successful', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Restock sweet (Admin only)
router.post('/:id/restock', [auth, adminAuth], [
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }

    sweet.quantity += quantity;
    await sweet.save();

    res.json({ message: 'Restock successful', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;