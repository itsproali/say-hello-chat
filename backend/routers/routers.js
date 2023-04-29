const router = require("express").Router();

router.use("/user", require("./user.router"));
router.use("/chat", require("./chat.router"));
router.use("/message", require("./message.router"));

module.exports = router;
