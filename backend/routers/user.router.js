const router = require("express").Router();

const {
  createUser,
  login,
  getUser,
  updateAvatar,
} = require("../controllers/user.controller");
const upload = require("../utils/upload");

router.route("/create").post(createUser);
router.route("/login").post(login);
router.route("/info/:userId").get(getUser);
router.route("/update/avatar").put(upload.single("avatar"), updateAvatar);

module.exports = router;
