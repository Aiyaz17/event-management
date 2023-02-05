const Event = require("../models/Event");
const User = require("../models/User");
const catchAsync = require("../utils/error-handling/catchAsync");

const createEvent = catchAsync(async (req, res) => {
  const { title, organizedBy, description, scheduledAt, venue } = req.body;
  git;
  const response = await Event.create({
    title,
    organizedBy,
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
  res.status(200).json({
    status: "success",
    data: {
      response,
    },
  });
  //todo - test response
});

const approveEvent = async (req, res) => {
  const { approvedBy, eventId } = req.body;
  // console.log({ approvedBy, eventId });
  if (approvedBy != "faculty") {
    const update = "approval." + approvedBy;
    const updatedEvent = await Event.findOneAndUpdate(
      { _id: eventId },
      { [update]: true },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        updatedEvent,
      },
    });
  } else {
    //increment faculty count
    const response = await Event.findOneAndUpdate(
      { _id: eventId },
      { $inc: { "approval.facultyCount": 1 } },
      { new: true }
    );

    //get total faculty
    const totalFacultyCount = await User.count({ role: "faculty" });
    // console.log({ totalFacultyCount });
    if (response.approval.facultyCount >= totalFacultyCount / 2) {
      //if more than half approved set faculty to true
      const updatedEve = await Event.findOneAndUpdate(
        { _id: eventId, "approval.faculty": false },
        {
          "approval.faculty": true,
        }
      );
      //todo - send response
      res.status(200).json({
        status: "success",
        data: {
          updatedEvent,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
      });
    }
  }
};

const getEvents = async (req, res) => {
  const { isAdmin } = req.body;

  if (isAdmin) {
    const events = await Event.find({}).sort({ scheduledAt: "desc" });
    res.status(200).json({
      status: "success",
      data: {
        events,
      },
    });
    //todo - test response
  } else {
    const events = await Event.find({
      "approval.dean": true,
      "approval.general_committee": true,
      "approval.faculty": true,
    }).sort({ scheduledAt: "desc" });
    res.status(200).json({
      status: "success",
      data: {
        events,
      },
    });
    //todo - test response
  }
};

const registerEvent = catchAsync(async (req, res, next) => {
  const { event_id } = req.body;
  const id = req.user.id;
  await User.findByIdAndUpdate(
    id,
    { $addToSet: { registered_events: event_id } },
    { runValidators: true }
  );
  res.status(200).json({
    status: "success",
  });
});

const getRegisteredEvents = catchAsync(async (req, res, next) => {
  const id = req.user.id;
  const registeredEvents = await User.findOne(
    { _id: id },
    { registered_events: 1 }
  );

  Event.find({ _id: { $in: registeredEvents.registered_events } })
    .sort({ scheduledAt: -1 })
    .exec(function (err, docs) {
      if (err) res.send({ status: "Failed" });
      const now = new Date();
      const pastEvents = docs.filter((doc) => doc.scheduledAt < now);
      const futureEvents = docs.filter((doc) => doc.scheduledAt >= now);
      res.status(200).json({
        status: "success",
        data: {
          pastEvents,
          futureEvents,
        },
      });
    });
});

module.exports = {
  approveEvent,
  getEvents,
  createEvent,
  registerEvent,
  getRegisteredEvents,
};
