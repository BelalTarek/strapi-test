'use strict';

var utils = require('../utils/writer.js');
var Installment = require('../service/InstallmentService');

module.exports.getInstallments = function getInstallments (req, res, next) {
  Installment.getInstallments(installmentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
