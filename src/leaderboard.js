import * as request from './request';

export function getLeaderboard() {
  return request.get('v2/leaderboard/');
}