export async function getProfile(dongle_id) {
  let profile = dongle_id || 'me';

  return request.get(profile + '/');
}
