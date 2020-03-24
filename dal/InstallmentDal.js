'use strict';
var index = require('../index')

var Installment = index.models.Installment;

exports.getInstallments = function(callback) {

   Installment.find({}, (err, data) => {
     if (err) {
      return callback(err, null);
    } else if (!data) {
      return callback({error: "Error finding the " + Installment.toString()}, null);
    }else {
      return callback(null, data)
    }
  });
}

