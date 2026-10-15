const UserModel = require("../../database/models/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email }).exec();

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jsonwebtoken.sign({}, key, {
          subject: user._id.toString(),
          expiresIn: 3600 * 24 * 30 * 6,
          algorithm: "RS256",
        });
        res.cookie("token", token, { httpOnly: true });
        res.json(user);
      } else {
        res.status(400).json({ message: "Email / mot de passe incorrect" });
      }
    } else {
      res.status(400).json({ message: "Email / mot de passe incorrect" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Email / mot de passe incorrect" });
  }
});

router.get("/current", async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, keyPub, {
        algorithms: ["RS256"],
      });
      const currentUser = await UserModel.findById(decodedToken.sub)
        .select("-password -__v")
        .exec();

      if (currentUser) {
        res.json(currentUser);
      } else {
        res.json({ message: "" });
      }
    } catch (e) {
      console.log(e);
      res.json({ message: "" });
    }
  } else {
    res.json({ message: "" });
  }
});

router.delete("/", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

module.exports = router;
