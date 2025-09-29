// backend/routes/waterData.js

const express = require('express');
const router = express.Router();
const waterDataController = require('../controllers/waterDataController');
const auth = require('../middleware/auth'); // optional auth middleware

// @route   GET /api/waterdata
// @desc    Get all water data
// @access  Private/Public depending on auth
router.get('/', auth, waterDataController.getAllWaterData);

// @route   GET /api/waterdata/:id
// @desc    Get water data by ID
// @access  Private/Public depending on auth
router.get('/:id', auth, waterDataController.getWaterDataById);

// @route   POST /api/waterdata
// @desc    Create new water data
// @access  Private
router.post('/', auth, waterDataController.createWaterData);

// @route   PUT /api/waterdata/:id
// @desc    Update water data by ID
// @access  Private
router.put('/:id', auth, waterDataController.updateWaterData);

// @route   DELETE /api/waterdata/:id
// @desc    Delete water data by ID
// @access  Private
router.delete('/:id', auth, waterDataController.deleteWaterData);

module.exports = router;
