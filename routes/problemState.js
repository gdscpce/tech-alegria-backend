const express = require("express");
const router = express.Router();
const {
  getAllProblemStateByUserId,
  updateProblemStateByUserId,
} = require("../controllers/problemStateController");

//importing all the middlewares
const { isLoggedIn, customRole } = require("../middlewares/user");

// user routes
router.route("/updateProblemStatus/:userId").put(updateProblemStateByUserId);
router.route("/getAllProblemsState/:userId").get(getAllProblemStateByUserId);

module.exports = router;
