const express = require("express");
const router = express.Router();
const {
  initalizeLeaderboardByUserID,
  getAllLeaderboardDetails,
  updateScoreByID,
  getScoreByUserID,
  getUnlockRangeByUserID,
} = require("../controllers/leaderboardController");

// user routes
router.route("/intializeLeaderboard").post(initalizeLeaderboardByUserID);
router.route("/leaderboard").get(getAllLeaderboardDetails);
router.route("/updateScore").put(updateScoreByID);
router.route("/getScore/:userId").get(getScoreByUserID);
router.route("/getUnlockTill/:userId").get(getUnlockRangeByUserID);

module.exports = router;
