'use strict';
const tokenValidation = require('../utils/tokenValidation')
var Installment = require("../controllers/Installment");

module.exports.getInstallments = function getInstallments (req, res, next) {
  // tokenValidation(req, res, (succes) => {
  //   if (succes)
  Installment.getInstallments(req, res);
  //});
};
