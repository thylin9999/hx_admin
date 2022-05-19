import request from "../request"
import url from "./url"

export function login(user, pwd) {  //登录
    return request({
        method: "post",
        url: url.login,
        params: {
            user,
            pwd
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