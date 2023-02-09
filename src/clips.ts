import request from './request'

export async function clipsCreate(route: string, title: string, start_time: number, end_time: number, video_type: string, is_public: boolean) {
  return request.post('v1/clips/create', {
    route, title, start_time, end_time, video_type, is_public,
  })
}

export async function clipsList(dongle_id: string) {
  return request.get('v1/clips/list', { dongle_id })
}

export async function clipsDetails(dongle_id: string, clip_id: string) {
  return request.get('v1/clips/details', { dongle_id, clip_id })
}

export async function clipsUpdate(dongle_id: string, clip_id: string, is_public: boolean) {
  return request.patch('v1/clips/update', { dongle_id, clip_id, is_public })
}

export async function clipsDelete(dongle_id: string, clip_id: string) {
  return request.delete('v1/clips/update', { dongle_id, clip_id })
}
