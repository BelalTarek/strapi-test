'use strict';
var index = require('../index')

var dbM = index.dbM
var Installment = index.models.Installment;

exports.getInstallments = function (callback) {
  const q = dbM.connectors.get("mongoose").buildQuery({ model: Installment });
  q.exec((err, data) => {
    if (err) {
      return callback(err, null);
    } else if (!data) {
      return callback({ error: "Error finding the " + Installment.toString() }, null);
    } else {
      return callback(null, data)
    }
  })

}

