'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (resolve, reject) {
  return handle;

  function handle(err, data, response) {
    if (err) {
      if (err.statusCode === 0) {
        err = new Error('There was an unexpected server error, please try again later.');
      }
      return reject(err);
    }
    resolve(data);
  }
};