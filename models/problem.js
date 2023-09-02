const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide problem name"],
    trim: true,
  },
  position: {
    type: Number,
    required: [true, "please provide position"],
  },
  redirectURL: {
    type: String,
    required: [true, "please provide problem url"],
  },
  specialTestCaseInput: {
    type: String,
    required: [true, "Please provide special test case Input"],
  },
  specialTestCaseOutput: {
    type: String,
    required: [true, "Please provide special test case Output"],
  },
  score: {
    type: Number,
    required: [true, "Please provide the score of the problem !"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Problem", problemSchema);
