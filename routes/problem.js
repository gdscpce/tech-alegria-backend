const express = require("express");
const router = express.Router();
const {
  addProblem,
  getAllProblems,
  getOneProblem,
} = require("../controllers/problemController");

//importing all the middlewares
const { isLoggedIn, customRole } = require("../middlewares/user");

// user routes
router.route("/problems").get(getAllProblems);
router.route("/problem/:id").get(getOneProblem);

//admin routes
router
  .route("/admin/problem/add")
  .post(isLoggedIn, customRole("admin"), addProblem);

module.exports = router;
