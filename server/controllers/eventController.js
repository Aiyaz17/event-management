const Event = require("../models/Event");
const User = require("../models/User");

const createEvent = (req, res) => {
  const { title, description, scheduledAt, venue } = req.body;

  const response = Event.create({
    title,
    description,
    scheduledAt,
    venue,
    register_users: [],
    approval: {
      dean: false,
      general_committee: false,
      facultyCount: 0,
      faculty: false,
    },
  });
  res.send(response);
  //todo - test response
};

const approveEvent = async (req, res) => {
  const { approvedBy, eventId } = req.body;
  console.log({ approvedBy, eventId });
  if (approvedBy != "faculty") {
    const update = "approval." + approvedBy;
    const response = await Event.findOneAndUpdate(
      { _id: eventId },
      { [update]: true },
      { new: true }
    );
    //todo - send response
    res.send(response);
  } else {
    //increment faculty count
    const response = await Event.findOneAndUpdate(
      { _id: eventId },
      { $inc: { "approval.facultyCount": 1 } },
      { new: true }
    );

    //get total faculty
    const totalFacultyCount = await User.count({ role: "faculty" });
    console.log({ totalFacultyCount });
    if (response.approval.facultyCount >= totalFacultyCount / 2) {
      //if more than half approved set faculty to true
      const response = await Event.findOneAndUpdate(
        { _id: eventId, "approval.faculty": false },
        {
          "approval.faculty": true,
        }
      );
      //todo - send response
      res.send(response);
    }
  }
};

const getEvents = async (req, res) => {
  const { isAdmin } = req.body;

  if (isAdmin) {
    const response = await Event.find({}).sort({ scheduledAt: "desc" });
    res.send(response);
    //todo - test response
  } else {
    const response = await Event.find({
      "approval.dean": true,
      "approval.general_committee": true,
      "approval.faculty": true,
    }).sort({ scheduledAt: "desc" });
    res.send(response);
    //todo - test response
  }
};

module.exports = {
  approveEvent,
  getEvents,
  createEvent,
};