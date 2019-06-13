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

export function updateAnnotation (id, data) {
  return request.patch('v1/annotations/' + id, { data });
}

export function listAnnotations (start, end, dongleId) {
  start = Number(start);
  end = Number(end);

  if (!Number.isFinite(start)) {
    throw new Error('Invalid start time');
  }
  if (!dongleId.length) {
    throw new Error('Invalid or empty dongleId');
  }
  if (!Number.isFinite(end)) {
    throw new Error('Invalid end time');
  }
  return request.get('v1/devices/' + dongleId + '/annotations/', {
    from: start,
    to: end
  });
}