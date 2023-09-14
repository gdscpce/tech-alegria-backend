const ProblemState = require("../models/problemState");
const User = require("../models/user");
const Problem = require("../models/problem");
const BigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");

//add problem
exports.initalizeProblemStatus = BigPromise(async (req, res, next) => {
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

exports.updateProblemStateByUserId = BigPromise(async (req, res, next) => {
  const { state, problemId } = req.body;
  const obj = await ProblemState.findOne({ userId: req.params.userId });
  if (!obj) {
    const myProblems = await Problem.find();
    let statusArr = new Array();
    myProblems.forEach((ele) => {
      statusArr.push({
        problemId: ele._id,
        status: "locked",
      });
    });
    console.log(statusArr);
    await ProblemState.create({
      userId: req.params.userId,
      status: statusArr,
    });
  } else {
    obj.status.forEach((ele) => {
      if (ele.problemId == problemId) {
        ele.state = state;
      }
    });
    await obj.save();
    return res
      .status(200)
      .json({ success: true, message: "Updated Successfully" });
  }
  res.status(200).json({ success: true, message: "Check out" });
});

//get all data
exports.getAllProblemStateByUserId = BigPromise(async (req, res, next) => {
  const data = await ProblemState.findOne({ userId: req.params.userId });

  if (!data) {
    const myProblems = await Problem.find();
    console.log(myProblems);
    var statusArr = [];
    myProblems.forEach((ele) => {
      statusArr.push({
        problemId: ele._id,
        status: "locked",
      });
    });

    ProblemState.create({
      userId: req.params.userId,
      status: statusArr,
    })
      .then((ans) => {
        return res.status(200).json({ success: true, data: ans });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ success: false, err });
      });
  } else {
    return res.status(200).json({ success: true, data });
  }
});
