import request from "../request"
import url from "./url"

export function login(user, pwd) {
    return request({
        method: "post",
        url: url.login,
        params: {
            user,
            pwd
        }
    })
}

export function getUserInfo(id) {
    return request({
        method: "post",
        url: url.userInfo,
        params: {
            id
        }
    })
}