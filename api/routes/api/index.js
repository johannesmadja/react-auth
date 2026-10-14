const router = require("express").Router();
const apiUsers = require("./user");

// router.get("/test", (req, res) => {
//   res.json("okay ! ");
// });

router.use("/users", apiUsers);

module.exports = router;
