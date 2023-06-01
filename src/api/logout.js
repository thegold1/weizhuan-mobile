import request from "@/utils/request.js";

export function logout() {
  return request({
    url: "/user/logout",
    method: "post",
  });
}
