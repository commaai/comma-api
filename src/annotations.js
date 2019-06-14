import * as request from './request';
import { AnnotationValidator } from './validators';

export function createAnnotation (data) {
  data = AnnotationValidator.validate(data);
  if (data.error) {
    throw data.error;
  }
  data = data.value;

  return request.post('v1/annotations/new', data);
}

export function getAnnotation (id) {
  return request.get('v1/annotations/' + id);
}

export function updateAnnotation (id, data) {
  return request.patch('v1/annotations/' + id, { data });
}

export function listAnnotations (_start, _end, dongleId) {
  if (!dongleId.length) {
    throw new Error('Invalid or empty dongleId');
  }

  let { start, end } = verifyAnnotationStartEnd(_start, _end);

  return request.get('v1/devices/' + dongleId + '/annotations/', {
    from: start,
    to: end
  });
}

export function listMyAnnotations (_start, _end) {
  let { start, end } = verifyAnnotationStartEnd(_start, _end);

  return request.get('v1/me/annotations/', {
    from: start,
    to: end
  });
}

function verifyAnnotationStartEnd(start, end) {
  start = Number(start);
  end = Number(end);

  if (!Number.isFinite(start)) {
    throw new Error('Invalid start time');
  }
  if (!Number.isFinite(end)) {
    throw new Error('Invalid end time');
  }

  return { start, end };
}