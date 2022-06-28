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

export function getAdminList(pageNum, pageSize) { //管理员列表
    return request({
        method: 'post',
        url: apiUrl + url.adminList,
        data: {
            pageNum, pageSize
        }
    })
}

export function addAdmin(account, password, group_id, status) { //新增管理员
    return request({
        method: 'post',
        url: apiUrl + url.addAdmin,
        data: {
            account, password, group_id, status
        }
    })
}

export function updatePwd(id, password) { //修改管理员密码
    return request({
        method: 'post',
        url: apiUrl + url.updatePwd,
        data: {
            id, password
        }
    })
}

export function updateAdmin(id, status) { //管理员状态管理
    return request({
        method: 'post',
        url: apiUrl + url.updateAdmin,
        data: {
            id, status
        }
    })
}

export function getAnchorList() { //主播列表
    return request({
        method: 'post',
        url: apiUrl + url.anchorList,
    })
}

export function addAnchor(member_id) { //新增主播
    return request({
        method: 'post',
        url: apiUrl + url.anchorList,
        data: {
            member_id
        }
    })
}

export function updateAnchor(id, status) { //编辑主播
    return request({
        method: 'post',
        url: apiUrl + url.updateAnchor,
        data: {
            id, status
        }
    })
}

export function getMemberList() { //会员列表
    return request({
        method: 'post',
        url: apiUrl + url.memberList,
    })
}

export function addMember(account, nickname, password) { //会员列表
    return request({
        method: 'post',
        url: apiUrl + url.addMember,
        data: {
            account, nickname, password
        }
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




