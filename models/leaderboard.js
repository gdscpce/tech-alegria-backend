// ID , problemID, [{problemID:timeSubmitted}],

//POST: initalizeLeaderboardByUserID(userID)
// PUT: updateScoreByID(id,problemid,timeSubmitted)
// GET: getAllLeaderboardData
// GET: getScoreByUserID

//model:

/* 
    id,
    userID,
    penalty,
    score,
    time:[{problemId:time}]
    createdAt
*/

const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true],
  },
  userName: {
    type: String,
    required: [true],
  },
  penalty: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    default: 0,
  },
  time: [
    {
      problemId: {
        type: String,
      },
      submissionTime: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
