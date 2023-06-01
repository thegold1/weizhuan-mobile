import request from "@/utils/request.js";
export function chatHistory(data) {
  return request({
    'url': '/api/forward/chatHistory',
    'method': 'post',
    data
  })
}
export function makeChatTitle(data) {
  return request({
    'url': '/chat/makeChatTitle',
    'method': 'post',
    data
  })
}
export function uploadChatContent(data) {
  return request({
    'url': '/chat/uploadChatContent',
    'method': 'post',
    data
  })
}