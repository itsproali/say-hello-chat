const router = require("express").Router();

const {
  createChat,
  getUserChats,
  getChat,
} = require("../controllers/chat.controller");

router.route("/create").post(createChat);
router.route("/get/:userId").get(getUserChats);
router.route("/get-chat/:firstId/:secondId").get(getChat);

module.exports = router;
