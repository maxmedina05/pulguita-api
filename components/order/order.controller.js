// -------------------------------------------
const Order = require('./order.model');
const Product = require('../product/product.model');
const mongoose = require('mongoose');
const LOG_TAG = "order.controller.js";

function getAll(req, res) {
  let skip = (req.query.skip) ? parseInt(req.query.skip) : 0;
  let limit = (req.query.limit) ? parseInt(req.query.limit) : 0;

  Order.find()
    .skip(skip)
    .limit(limit)
    .exec()
    .then(result => {
      res.json(_GeneralResponse(result));
    })
    .catch(err => {
      res.json(_ErrorResponse(err));
    });
}

function addOne(req, res) {
  if (_validateBody(req.body)) {

    _checkProductsInStock(req.body.products)
      .then(result => {
        let newOrder = new Order(req.body);
        newOrder.save()
          .then(result => {
            _decreaseStock(req.body.products)
            .then((x) => {
              res.json(_GeneralResponse(result));
            })
          })
          .catch(err => {
            res.json(_ErrorResponse(err));
          });
        // res.json("ok");
      })
      .catch(err => {
        res.json(_ErrorResponse(err));
      })
  } else {
    res.json(_ErrorResponse("Invalid parameters!"));
  }
}

function getOne(req, res) {
  let objectId = req.params.objectId;

  Order.findById(objectId)
    .exec()
    .then(result => {
      res.json(_GeneralResponse(result));
    })
    .catch(err => {
      res.json(_ErrorResponse(err));
    });
}

function updateOne(req, res) {
  let objectId = req.params.objectId;

  let editedOrder = req.body;

  Order.findByIdAndUpdate(objectId, {
      $set: editedOrder
    }).then(result => {
      res.json(_GeneralResponse(result));
    })
    .catch(err => {
      res.json(_ErrorResponse(err));
    });
}

function removeOne(req, res) {
  let objectId = req.params.objectId;

  Order.remove({
      id: objectId
    })
    .then(result => {
      res.json(_GeneralResponse(result));
    })
    .catch(err => {
      res.json(_ErrorResponse(err));
    });
}

function removeAll(req, res) {
  Order.remove({})
    .then(result => {
      res.json(_GeneralResponse(result));
    })
    .catch(err => {
      res.json(_ErrorResponse(err));
    });
}

function _validateBody(body) {
  return true;
}

function _GeneralResponse(data) {
  return {
    data: data,
    success: true
  };
}

function _ErrorResponse(err) {
  return {
    data: [],
    message: err.message || err,
    success: false
  };
}

function _checkProductsInStock(products) {
  console.log(LOG_TAG, "_checkProductsInStock");
  let response = {
    success: true
  };

  let ids = [];
  let myMap = {};

  for (idx in products) {
    let product = products[idx];
    ids.push(product.productId);
    myMap[product.productId] = product.quantity;
  }

  return new Promise((resolve, reject) => {
    Product.find({
        _id: {
          $in: ids
        }
      }).exec()
      .then(result => {
        for (idx in result) {
          let p = result[idx];
          let err = {
            message: 'Not implemented yet'
          };

          if (p.inStock <= 0) {
            err = new Error(`Sorry, there are no more ${p.name} in stock.`);
            return reject(err);
          } else if (myMap[p._id.toString()] > p.inStock) {
            err = new Error(`Sorry, There are only ${p.inStock} ${p.name} in stock.`);
            return reject(err);
          }

          // p.inStock -= myMap[p._id.toString()];
          // p.save( (err, x) => {
          //   if(err) {
          //     return reject(err);
          //   }
          // });
        }
        resolve(response);
      })
      .catch(err => reject(err))
  });
}

function _decreaseStock(products) {
  console.log(LOG_TAG, "_decreaseStock");
  let response = {
    success: true
  };

  let ids = [];
  let myMap = {};

  for (idx in products) {
    let product = products[idx];
    ids.push(product.productId);
    myMap[product.productId] = product.quantity;
  }

  return new Promise((resolve, reject) => {
    Product.find({
        _id: {
          $in: ids
        }
      }).exec()
      .then(result => {
        for (idx in result) {
          let p = result[idx];
          p.inStock -= myMap[p._id.toString()];
          p.save( (err, x) => {
            if(err) {
              return reject(err);
            }
          });
        }
        resolve(response);
      })
      .catch(err => reject(err))
  });
}

module.exports = {
  getAll: getAll,
  addOne: addOne,
  getOne: getOne,
  updateOne: updateOne,
  removeOne: removeOne,
  removeAll: removeAll
};
