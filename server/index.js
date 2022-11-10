const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const user = require("./model/user");
const post = require("./model/file")
const google = require("./routes/google")
const first = require("./routes/firstpage")
const fileUpload = require("express-fileupload")

const secrete = "pankaj@98+27*3"

const app = express();
mongoose.connect('mongodb://0.0.0.0/todo ', (e) => {
   (e) ? console.log(e.message) : console.log("mongoose is connected")
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload())

app.use("/google", google);
app.use("/api", first)


app.get("/download/:name", async (req, res) => {
   try {
      console.log(req.params.name)

      return res.status(200).download(__dirname+`/uploads/${req.params.name}`)
   } catch (e) {
       if (e) return res.status(400).json({
           message: e.message
       })
   }
})


app.listen(8080, (e) => {
   (e) ? console.log(e.message) : console.log("server is up at 8080")
})