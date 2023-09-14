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
const Leaderboard = require("../models/leaderboard");
const User = require("../models/user");
const BigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");

//add problem
exports.initalizeLeaderboardByUserID = BigPromise(async (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "UserID is required" });
  }
  //create product instance
  Leaderboard.create({
    userId,
  })
    .then(() => {
      //send response
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
});

exports.updateScoreByID = BigPromise(async (req, res, next) => {
  const { userId, problemId, startTime, timeSubmitted, score } = req.body;
  if (!userId || !problemId || !timeSubmitted || !score) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are mandatory" });
  }
  let submissionTime = Math.abs(timeSubmitted - startTime) / 60;
  let user = await User.findById(userId);
  let data = await Leaderboard.findOne({ userId });
  if (data) {
    data.score = data.score + Number(score);
    data.penalty = data.penalty + Number(timeSubmitted);
    data.time.push({ problemId, submissionTime });
    await data.save();
    res
      .status(200)
      .json({ success: true, message: "Updated Successfully!", data });
  } else {
    Leaderboard.create({
      userId,
      userName: user.name,
      score,
      penalty: timeSubmitted,
      time: [
        {
          problemId,
          submissionTime,
        },
      ],
    })
      .then((instance) => {
        //send response
        res.status(200).json({
          success: true,
          data: instance,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      });
  }
});

//get all data
exports.getAllLeaderboardDetails = BigPromise(async (req, res, next) => {
  Leaderboard.find()
    .then((leaderboard) => {
      res.status(200).json({ success: true, data: leaderboard });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Unable to fetch data !" });
    });
});

exports.getScoreByUserID = BigPromise(async (req, res, next) => {
  const data = await Leaderboard.find({ userId: req.params.userId });
  if (!data) {
    return res.status(200).json({
      success: true,
      score: 0,
    });
  }
  res.status(200).json({
    success: true,
    score: data[0].score,
  });
});

exports.getUnlockRangeByUserID = BigPromise(async (req, res, next) => {
  const data = await Leaderboard.find({ userId: req.params.userId });
  if (!data) {
    return next(new customError("No problem found with this id", 404));
  }

  let range = 1,
    userScocre = data[0].score;

  if (userScocre == 100) range = 2;
  else if (userScocre == 200) range = 3;
  else if (userScocre == 300) range = 4;
  else if (userScocre == 400) range = 5;

  res.status(200).json({
    success: true,
    score: data[0].score,
    unlockTill: range,
  });
});
