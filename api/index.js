const express = require("express"); 
const cookie = require("cookie-parser")
const routes = require("./routes")

require('./database')

const app = express();
app.use(cookie());
app.use(express.json()); 
app.use(routes); 

app.use((req, res) => {
    res.status(404).json("Mauvaise route")
})
app.listen(3001)