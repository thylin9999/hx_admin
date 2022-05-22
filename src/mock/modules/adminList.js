import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const adminList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                "id": 10001,
                "account": "admin",
                "status": false,
                "create_time": "2021-11-06 17:58:35",
                "update_time": "2021-11-06 17:58:35",
                "last_ip": "86.98.63.141",
                "last_time": "2022-05-15 14:22:54",
                "createMan": "test001",
            },
            {
                "id": 10002,
                "account": "alin",
                "status": false,
                "create_time": "2021-11-06 17:58:35",
                "update_time": "2021-11-06 17:58:35",
                "last_ip": "86.98.63.141",
                "last_time": "2022-05-15 14:22:54",
                "createMan": "test001",
            },
            {
                "id": 10001,
                "account": "sober",
                "status": false,
                "create_time": "2021-11-06 17:58:35",
                "update_time": "2021-11-06 17:58:35",
                "last_ip": "86.98.63.141",
                "last_time": "2022-05-15 14:22:54",
                "createMan": "test001",
            },
        ]
    })
}

Mock.mock(url.adminList, 'post', adminList)