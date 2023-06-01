import request from "@/utils/request.js";
export function makeTitle(data) {
  return request({
    'url': '/chat/makeTitle',
    'method': 'post',
    data
  })
}

export function uploadContent(data) {
  return request({
    'url': '/chat/uploadContent',
    'method': 'post',
    data
  })
}
