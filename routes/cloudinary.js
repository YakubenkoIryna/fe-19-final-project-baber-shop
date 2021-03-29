const express = require("express");
const router = express.Router();
const passport = require("passport");

//Import controllers
const {
  cloudinaryUpload,
  cloudinaryRemove
} = require("../controllers/cloudinary");

router.post(
  "/uploadimages",
  passport.authenticate("jwt-admin", { session: false }),
  cloudinaryUpload
);

router.post(
  "/removeimage",
  passport.authenticate("jwt-admin", { session: false }),
  cloudinaryRemove
);

module.exports = router;