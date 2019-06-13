import * as request from './request';

export function getProfile(dongle_id) {
  let profile = dongle_id || 'me';

  return request.get('v1/' + profile + '/');
}
