const router = require("express").Router();
const Event = require("../models/Event");
const User = require("../models/User");
const { create, login } = require("../controllers/userController");
const verifyLogin = require("../utils/jwt-auth/verifyLogin");

router.post("/register", create);
router.post("/login", verifyLogin, login);

module.exports = router;
