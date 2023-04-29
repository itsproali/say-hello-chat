const router = require("express").Router();

const {
  addMessage,
  getMessagesByChatId,
} = require("../controllers/message.controller");

router.route("/add").post(addMessage);
router.route("/get/:chatId").get(getMessagesByChatId);

module.exports = router;
