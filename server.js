const express = require("express");
const { update } = require("./models/user");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
require("./config/connect");

const app = express();
app.use(express.json());

//127.0.0.1:3000/
app.use("/product", productRoute);
app.use("/user", userRoute);
app.use("/getimage", express.static("./uploadimages"));

app.listen(3001, () => {
  console.log("server work");
});
