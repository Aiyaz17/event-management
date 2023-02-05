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
router.get('/getRegisteredEvents',verifyToken,getRegisteredEvents)
router.post("/approve-event", approveEvent);
router.post("/get-events", getEvents);
router.post("/create-event", createEvent);
router.post("/register-for-event", verifyToken,registerEvent);

module.exports = router;
