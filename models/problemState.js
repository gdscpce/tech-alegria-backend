const mongoose = require("mongoose");

const problemStateSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true],
  },
  status: [
    {
      problemId: {
        type: String,
        required: [true],
      },
      state: {
        type: String,
        required: [true],
        default: "locked",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("problemState", problemStateSchema);
