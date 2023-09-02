const Problem = require("../models/problem");
const BigPromise = require("../middlewares/bigPromise");
const customError = require("../utils/customError");

//add problem
exports.addProblem = BigPromise(async (req, res, next) => {
  const {
    title,
    position,
    redirectURL,
    score,
    specialTestCaseInput,
    specialTestCaseOutput,
  } = req.body;
  if (
    !title ||
    !position ||
    !redirectURL ||
    !specialTestCaseInput ||
    !specialTestCaseOutput ||
    !score
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Some values are missing" });
  }
  //create product instance
  Problem.create({
    title,
    position,
    redirectURL,
    score,
    specialTestCaseInput,
    specialTestCaseOutput,
  })
    .then((problemInstance) => {
      //send response
      res.status(200).json({
        success: true,
        problemInstance,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: false, error: err });
    });
});

//get all products
exports.getAllProblems = BigPromise(async (req, res, next) => {
  Problem.find()
    .then((problems) => {
      res.status(200).json({ success: true, data: problems });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Unable to fetch all problems !" });
    });
});

//get one problem
exports.getOneProblem = BigPromise(async (req, res, next) => {
  const problem = await Problem.findById(req.params.id);

  if (!problem) {
    return next(new customError("No problem found with this id", 404));
  }
  res.status(200).json({
    success: true,
    problem,
  });
});

//TODO Validate Specail Testcase and update score
