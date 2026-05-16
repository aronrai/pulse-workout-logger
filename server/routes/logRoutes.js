const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  createLog,
  getAllLogs,
  getCurrentLogs,
  getTotalVolume,
  getCurrentVolume,
  deleteLog,
} = require("../controllers/logController");

const router = express.Router();

router.post("/", verifyToken, createLog);
router.get("/", verifyToken, getAllLogs);
router.get("/current-logs", verifyToken, getCurrentLogs);
router.get("/total-volume", verifyToken, getTotalVolume);
router.get("/current-volume", verifyToken, getCurrentVolume);
router.delete("/:id", verifyToken, deleteLog);

module.exports = router;
