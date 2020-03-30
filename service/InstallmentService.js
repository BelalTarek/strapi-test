'use strict';

const Installment = require('../dal/InstallmentDal');

exports.getInstallments = function () {
  return new Promise(function (resolve, reject) {
    Installment.getInstallments( (err, data) => {
      if (err || !data) {
        reject({
          resBody: {
            payload: null,
            msg: err
          }
        })
      } else {
        resolve({
          resBody: {
            payload: data,
            msg: "succeed msg",
            code: 200
          },
        })
      }
    })
  });
}

