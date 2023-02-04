const router = require("express").Router();
const Event = require("../models/Event");
const User = require("../models/User");
const {
  approveEvent,
  getEvents,
  createEvent,
} = require("../controllers/eventController");

router.post("/approve-event", approveEvent);
router.post("/get-events", getEvents);
router.post("/create-event", createEvent);

module.exports = router;
