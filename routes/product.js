const express = require("express");
const multer = require("multer");
const router = express.Router();
const Product = require("../models/product");

filename = "";

const mystorage = multer.diskStorage({
  destination: "/uploadimages",
  filename: (req, file, redirect) => {
    let date = Date.now();

    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    filename = fl;
  },
});

const upload = multer({ storage: mystorage });

//CRUD Product

router.post("/createproduct", upload.any("image"), async (req, res) => {
  try {
    data = req.body;
    prod = new Product(data);
    prod.image = filename;
    savedProd = await prod.save();
    filename = "";
    res.status(200).send(savedProd);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/getallproduct", async (req, res) => {
  try {
    products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/deleteoneproduct/:id", async (req, res) => {
  delitprod = req.params.id;
  try {
    product = await Product.deleteOne({ _id: delitprod });
    res.status(200).send(product);
  } catch {
    (err) => {
      res.status(400).send(err);
    };
  }
});

router.put("/updateproduct/:id", (req, res) => {
  id = req.params.id;
  newData = req.body;
  Product.findByIdAndUpdate({ _id: id }, newData)
    .then((updated) => {
      res.status(200).send(updated);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
