import request from "../request"
import url from "./url"


export function login(account, password) {  //登录
    return request({
        method: "post",
        url: apiUrl + url.login,
        data: {
            account,
            password
        }
    })
}
export function getAdminList(pageNum,pageSize,account) {  //管理员列表
    return request({
        method: "post",
        url: apiUrl + url.adminList,
        data: {
            pageNum,pageSize,account
        }
    })
}

export function getUserInfo(id) {  //获取个人信息
    return request({
        method: "post",
        url: url.userInfo,
        params: {
            id
        }
    })
}
