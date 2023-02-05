const router = require("express").Router();
const Event = require("../models/Event");
const User = require("../models/User");
const {
  approveEvent,
  getEvents,
  createEvent,
  registerEvent,
  getRegisteredEvents,
} = require("../controllers/eventController");
const verifyToken = require("../utils/jwt-auth/verifyToken");
router.post("/get-events", getEvents);
router.post("/create-event", createEvent);
router.post("/approve-event", approveEvent);
router.post("/register-for-event", verifyToken,registerEvent);
router.get('/get-registered-events',verifyToken,getRegisteredEvents)

module.exports = router;
