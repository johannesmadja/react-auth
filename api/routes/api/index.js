const router = require("express").Router();
const apiUsers = require("./user");
const apiAuth = require("./auth");

// router.get("/test", (req, res) => {
//   res.json("okay ! ");
// });

router.use("/auth", apiAuth);
router.use("/users", apiUsers);

module.exports = router;
