// backend/controllers/waterDataController.js

const WaterData = require('../models/WaterData'); // Mongoose model
const { getPrediction } = require('../utils/mlHelper'); // ML helper

// GET all water data
exports.getAllWaterData = async (req, res) => {
  try {
    const data = await WaterData.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching water data:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET water data by ID
exports.getWaterDataById = async (req, res) => {
  try {
    const data = await WaterData.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Data not found' });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error fetching water data by ID:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// CREATE new water data
exports.createWaterData = async (req, res) => {
  try {
    const newData = new WaterData(req.body);
    await newData.save();

    // Optional: Trigger ML prediction
    const prediction = await getPrediction(newData);

    res.status(201).json({ success: true, data: newData, prediction });
  } catch (error) {
    console.error("Error creating water data:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// UPDATE water data
exports.updateWaterData = async (req, res) => {
  try {
    const updatedData = await WaterData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedData) return res.status(404).json({ success: false, message: 'Data not found' });
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error updating water data:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// DELETE water data
exports.deleteWaterData = async (req, res) => {
  try {
    const deletedData = await WaterData.findByIdAndDelete(req.params.id);
    if (!deletedData) return res.status(404).json({ success: false, message: 'Data not found' });
    res.status(200).json({ success: true, message: 'Data deleted successfully' });
  } catch (error) {
    console.error("Error deleting water data:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
