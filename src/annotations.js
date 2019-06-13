import * as request from './request';
import { AnnotationValidator } from './validators';

export async function createAnnotation (data) {
  data = AnnotationValidator.validate(data);
  if (data.error) {
    throw data.error;
  }
  data = data.value;

  return request.post('annotations/new', data);
}

export async function updateAnnotation (id, data) {
  return request.patch('annotations/' + id, { data });
}

export async function listAnnotations (start, end, dongleId) {
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
  return request.get('devices/' + dongleId + '/annotations/', {
    from: start,
    to: end
  });
}