const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  organizedBy: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
    enum: ["seminar_hall", "ground", "auditorium"],
  },
  register_users: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      
    },
  ],
  approval: {
    dean: {
      type: Boolean,
      default: false,
    },
    general_committee: {
      type: Boolean,
      default: false,
    },
    facultyCount: {
      type: Number,
      default: 0,
    },
    faculty: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("Event", eventSchema);
