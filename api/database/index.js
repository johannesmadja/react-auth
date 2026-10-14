const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://johannesmadja_db_user:XUP872SmIywzWKtC@cluster0.g7qbybt.mongodb.net/r18jwt",
  )
  .then(() => {
    console.log("CONNEXION OKAY !");
  })
  .catch((e) => {
    console.log("CONNEXION KO !", e);
  });
