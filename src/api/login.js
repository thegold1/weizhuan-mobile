import request from "@/utils/request.js";

export function getCaptcha (data) {
    return request({
        url: "/user/sendMsg",
        method: "post",
        data
    })
}

export function emailLogin (data) {
    return request({
        url: "/user/phoneOrEmailLogin",
        method: "post",
        data
    });
}

export function cookieLogin (params) {
    return request({
        url: '/user/cookieLogin',
        method: 'get',
        params
    });
}
