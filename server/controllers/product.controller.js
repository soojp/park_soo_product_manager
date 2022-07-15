const Product = require("../models/product.model");

module.exports = {
  getProducts: (req, res) => {
    Product.find({})
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        console.log("ERROR IN Getting Products", err);
        res.status(400).json({
          message: "something went wrong in finding all products",
          error: err,
        });
      });
  },
  getProductById: (req, res) => {
    Product.findOne({ _id: req.params.id })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log("ERROR IN Getting Product", err);
        res.status(400).json({
          message: "something went wrong in finding the product",
          error: err,
        });
      });
  },
  createProduct: (req, res) => {
    Product.create(req.body)
      .then((newProduct) => {
        res.status(201).json(newProduct);
      })
      .catch((err) => {
        console.log("ERROR IN Creating Product", err);
        res.status(400).json({
          message: "something went wrong in creating product",
          error: err,
        });
      });
  },
  updateProduct: (req, res) => {
    console.log(
      `@@@@@@@REQUEST UPDATE PRODUCT@@@ -- ${JSON.stringify(req.params)}`
    );
    Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log("ERROR IN Updating Product", err);
        res.status(400).json({
          message: "something went wrong in updating product",
          error: err,
        });
      });
  },
  deleteProduct: (req, res) => {
    Product.deleteOne({ _id: req.params.id })
      .then((product) => {
        res.json(product);
      })
      .catch((err) => {
        console.log("ERROR IN Deleting Product", err);
        res.status(400).json({
          message: "something went wrong in deleting product",
          error: err,
        });
      });
  },
};
