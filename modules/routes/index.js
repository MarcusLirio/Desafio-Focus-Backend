const express = require("express");
const router = express.Router();

const userRouter = require("./user.route");
const authenticationRouter = require("./authentication.route");

router.use(userRouter);
router.use(authenticationRouter);

module.exports = router;
