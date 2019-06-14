'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFinite = require('babel-runtime/core-js/number/is-finite');

var _isFinite2 = _interopRequireDefault(_isFinite);

exports.createAnnotation = createAnnotation;
exports.getAnnotation = getAnnotation;
exports.updateAnnotation = updateAnnotation;
exports.listAnnotations = listAnnotations;
exports.listMyAnnotations = listMyAnnotations;

var _request = require('./request');

var request = _interopRequireWildcard(_request);

var _validators = require('./validators');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAnnotation(data) {
  data = _validators.AnnotationValidator.validate(data);
  if (data.error) {
    throw data.error;
  }
  data = data.value;

  return request.post('v1/annotations/new', data);
}

function getAnnotation(id) {
  return request.get('v1/annotations/' + id);
}

function updateAnnotation(id, data) {
  return request.patch('v1/annotations/' + id, { data: data });
}

function listAnnotations(_start, _end, dongleId) {
  if (!dongleId.length) {
    throw new Error('Invalid or empty dongleId');
  }

  var _verifyAnnotationStar = verifyAnnotationStartEnd(_start, _end),
      start = _verifyAnnotationStar.start,
      end = _verifyAnnotationStar.end;

  return request.get('v1/devices/' + dongleId + '/annotations/', {
    from: start,
    to: end
  });
}

function listMyAnnotations(_start, _end) {
  var _verifyAnnotationStar2 = verifyAnnotationStartEnd(_start, _end),
      start = _verifyAnnotationStar2.start,
      end = _verifyAnnotationStar2.end;

  return request.get('v1/me/annotations/', {
    from: start,
    to: end
  });
}

function verifyAnnotationStartEnd(start, end) {
  start = Number(start);
  end = Number(end);

  if (!(0, _isFinite2.default)(start)) {
    throw new Error('Invalid start time');
  }
  if (!(0, _isFinite2.default)(end)) {
    throw new Error('Invalid end time');
  }

  return { start: start, end: end };
}