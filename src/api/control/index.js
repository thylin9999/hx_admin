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

export function getAdminList(pageNum,pageSize,account) { //管理员列表
    return request({
        method: 'post',
        url: apiUrl + url.adminList,
        data: {
            pageNum,pageSize,account
        }
    })
}

export function getAnchorList() { //主播列表
    return request({
        method: 'post',
        url: url.anchorList,
        params: {}
    })
}
export function getMemberList() { //会员列表
    return request({
        method: 'post',
        url: url.memberList,
        params: {}
    })
}

export function getMatchList() { //赛事列表
    return request({
        method: 'post',
        url: url.matchList,
        params: {}
    })
}

export function getLiveList() { //直播列表
    return request({
        method: 'post',
        url: url.liveList,
        params: {}
    })
}

export function getContentList() { //内容列表
    return request({
        method: 'post',
        url: url.contentList,
        params: {}
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

export function getAnnounce() {  //公告管理
    return request({
        method: 'post',
        url: url.announceManage,
        params: {}
    })
}

export function getFeedback() {  //用户反馈管理
    return request({
        method: 'post',
        url: url.feedbackManage,
        params: {}
    })
}

export function getWebSet() {  //获取全局网站开关配置
    return request({
        method: 'post',
        url: url.webSet,
        params: {}
    })
}




