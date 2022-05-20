import request from "../request";
import url from "./url";

export function home(t) {   //首页数据
    return request({
        method: "post",
        url: url.home,
        params: {
            t,
        }
    })
}

export function getAdminList(token, uid) { //管理员列表
    return request({
        method: 'post',
        url: url.adminList,
        params: {
            token,
            uid
        }
    })
}

export function getAdvList(t) {  //广告列表
    return request({
        method: 'post',
        url: url.advList,
        params: {
            t
        }
    })
}

export function getWebSet() {  //获取全局网站开关配置
    return request({
        method: 'post',
        url: url.webSet,
        params: {}
    })
}

export function getAnnounce() {  //公告管理
    return request({
        method: 'post',
        url: url.announceManage,
        params: {}
    })
}


