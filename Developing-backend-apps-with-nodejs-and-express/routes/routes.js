const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const userController = require("../controllers/userController");
router.param("id", (req, res, next, val) => {
  console.log(`Book id is ${val}`);
  next();
});
//! BOOKS
router
  .route("/")
  .get(userController.protect, bookController.getAllBooks)
  .post(userController.protect, bookController.createBook);

router.route("/byname").post(userController.protect, bookController.bookByName);
router
  .route("/byauthor")
  .post(userController.protect, bookController.bookByArthour);
router.route("/:id").get(userController.protect, bookController.bookByID);

//!USERS
router.route("/signup").post(userController.createUser);
router.route("/login").post(userController.login);
router
  .route("/allusers")
  .get(userController.protect, userController.getAllUsers);

module.exports = router;
