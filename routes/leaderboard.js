const express = require("express");
const router = express.Router();
const {
  initalizeLeaderboardByUserID,
  getAllLeaderboardDetails,
  updateScoreByID,
  getScoreByUserID,
} = require("../controllers/leaderboardController");

// user routes
router.route("/intializeLeaderboard").post(initalizeLeaderboardByUserID);
router.route("/leaderboard").get(getAllLeaderboardDetails);
router.route("/updateScore").put(updateScoreByID);
router.route("/getScore/:userId").get(getScoreByUserID);

module.exports = router;
