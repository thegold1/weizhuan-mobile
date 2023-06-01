import request from "@/utils/request.js";

export function getDocumentList(params) {
    return request({
        url: "/paper/purchased",
        method: "get",
        params
    });
}
export function getFavoriteList(params) {
    return request({
        url: "/paper/likedPaperList",
        method: "get",
        params
    });
}

export function addFavorite(paperId) {
    return request({
        url: "/paper/likePaper?paperId=" + paperId,
        method: "get"
    });
}

export function cancelFavorites(paperId) {
    return request({
        url: "/paper/unlikePaper?paperId=" + paperId,
        method: "get"
    });
}

export function deleteSelectedList(params) {
    return request({
        url: '/paper/deletes',
        method: 'get',
        params
    })
}
