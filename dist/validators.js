'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Joi = require('joi-browser');

var AnnotationValidator = exports.AnnotationValidator = Joi.object().keys({
  canonical_segment_name: Joi.string().required(),
  offset_nanos_part: Joi.number().required(),
  offset_millis: Joi.number().required(),
  start_time_utc_millis: Joi.number().required(),
  end_time_utc_millis: Joi.number().required(),
  type: Joi.string().required(),
  data: Joi.object().keys({
    reason: Joi.string().required(),
    comment: Joi.string().allow('').optional()
  })
});