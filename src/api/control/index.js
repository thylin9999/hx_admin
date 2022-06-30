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

export function getAnchorList(data) { //主播列表
    return request({
        method: 'post',
        url: apiUrl + url.anchorList,
        data
    })
}

export function addAnchor(member_id) { //新增主播
    return request({
        method: 'post',
        url: apiUrl + url.addAnchor,
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

export function getMemberList(data) { //会员列表
    return request({
        method: 'post',
        url: apiUrl + url.memberList,
        data
    })
}

export function addMember(data) { //会员列表
    return request({
        method: 'post',
        url: apiUrl + url.addMember,
        data
    })
}

export function updateMember(data) { //编辑会员
    return request({
        method: 'post',
        url: apiUrl + url.updateMember,
        data
    })
}
export function deleteMember(data) { //删除会员
    return request({
        method: 'post',
        url: apiUrl + url.deleteMember,
        data
    })
}

export function getLeaguesList(data) { //获取联赛列表
    return request({
        method: 'post',
        url: apiUrl + url.leaguesList,
        data
    })
}

export function getScheduleList(data) { //编辑联赛
    return request({
        method: 'post',
        url: apiUrl + url.scheduleList,
        data
    })
}
export function editLeaguesList(data) { //赛事列表
    return request({
        method: 'post',
        url: apiUrl + url.editLeagues,
        data
    })
}

export function getLiveList(data) { //直播列表
    return request({
        method: 'post',
        url: apiUrl + url.liveList,
        data
    })
}

export function editLive(data) { //编辑直播间
    return request({
        method: 'post',
        url: apiUrl + url.editLive,
        data
    })
}

export function forbidLive(data) { //禁播
    return request({
        method: 'post',
        url: apiUrl + url.editLiveStatus,
        data
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

export function getAnnounce(data) {  //公告列表
    return request({
        method: 'post',
        url: apiUrl + url.announceManage,
        data
    })
}

export function editAnnounce(data) {  //编辑公告
    return request({
        method: 'post',
        url: apiUrl + url.editAnnouncement,
        data
    })
}

export function announceEditStatus(data) {  //编辑状态管理
    return request({
        method: 'post',
        url: apiUrl + url.announceEditStatus,
        data
    })
}

export function addAnnounce(data) {  //新增公告
    return request({
        method: 'post',
        url: apiUrl + url.addAnnouncement,
        data
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




