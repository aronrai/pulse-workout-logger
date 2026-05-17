const Log = require("../models/log");
const CustomError = require("../utils/customError");
const logSchema = require("../validations/logSchema");
const mongoose = require("mongoose");

// Create
const createLog = async (req, res, next) => {
  try {
    const { error, value } = logSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details.map((err) => err.message).join(", ");
      return next(new CustomError(`${message}.`, 400));
    }
    const log = await Log.create({ ...value, user: req.userId });
    res.status(201).json({
      success: true,
      data: log,
    });
  } catch (err) {
    next(err);
  }
};

// Read
const getAllLogs = async (req, res, next) => {
  try {
    const logs = await Log.find({ user: req.userId });
    res.json({
      success: true,
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};

const getCurrentLogs = async (req, res, next) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const logs = await Log.find({
      user: req.userId,
      createdAt: { $gte: startOfToday },
    });
    res.json({
      success: true,
      data: logs,
    });
  } catch (err) {
    next(err);
  }
};

const getTotalVolume = async (req, res, next) => {
  try {
    const stats = await Log.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $group: {
          _id: null,
          totalVolume: { $sum: "$volume" },
        },
      },
    ]);
    const total = stats.length > 0 ? stats[0].totalVolume : 0;
    res.json({
      success: true,
      totalVolume: total,
    });
  } catch (err) {
    next(err);
  }
};

const getCurrentVolume = async (req, res) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const stats = await Log.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.userId),
        createdAt: { $gte: startOfToday },
      },
    },
    {
      $group: {
        _id: null,
        totalVolume: { $sum: "$volume" },
      },
    },
  ]);
  const total = stats.length > 0 ? stats[0].totalVolume : 0;
  res.json({ success: true, currentVolume: total });
};

// Delete
const deleteLog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const log = await Log.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "Log deletes successfully.",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createLog,
  getAllLogs,
  getCurrentLogs,
  getTotalVolume,
  getCurrentVolume,
  deleteLog,
};
