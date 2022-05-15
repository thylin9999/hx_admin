import Mock from "mockjs";

import {statusCode} from "../../util/statusCode";
import url from "../../api/user/url";

const login = config => {
    return Mock.mock({
        code: statusCode.success,
        data: 'token'
    })
}

const userInfo = config => {
    return Mock.mock({
        code: statusCode.success,
        data: {
            id: 10001,
            name: 'admin'
        }
    })
}


Mock.mock(url.login, 'post', login)
Mock.mock(url.userInfo, 'post', userInfo)