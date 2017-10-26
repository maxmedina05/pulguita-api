// -------------------------------------------
const Order = require('./order.model');
const Product = require('../product/product.model');
const mongoose = require('mongoose');

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
    let newOrder = {
    	products: req.body.products,
  		totalPrice: req.body.totalPrice
    };

    newOrder.save()
      .then(result => {
        res.json(_GeneralResponse(result));
      })
      .catch(err => {
        res.json(_ErrorResponse(err));
      });
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

module.exports = {
  getAll: getAll,
  addOne: addOne,
  getOne: getOne,
  updateOne: updateOne,
  removeOne: removeOne,
  removeAll: removeAll
};






