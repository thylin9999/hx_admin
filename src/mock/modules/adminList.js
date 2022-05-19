import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const adminList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                "id": "1",
                "username": "admin",
                "phone": "",
                "status": "1",
                "nick_name": "admin",
                "create_time": "2021-11-06 17:58:35",
                "update_time": "",
                "last_ip": "86.98.63.141",
                "last_ip_address": "阿联酋",
                "last_time": "2022-05-15 14:22:54",
                "add_user_id": "",
                "update_user_id": "",
                "create_username": ""
            },
            {
                "id": "5",
                "username": "jayba",
                "phone": "",
                "status": "1",
                "nick_name": "jayba",
                "create_time": "2022-02-23 22:40:35",
                "update_time": "2022-02-23 22:40:35",
                "last_ip": "114.199.68.51",
                "last_ip_address": "香港",
                "last_time": "2022-02-24 23:46:09",
                "add_user_id": "1",
                "update_user_id": "",
                "create_username": "admin"
            },
            {
                "id": "4",
                "username": "derby",
                "phone": "",
                "status": "1",
                "nick_name": "derby",
                "create_time": "2022-02-19 18:54:24",
                "update_time": "2022-02-19 18:54:24",
                "last_ip": "114.199.68.52",
                "last_ip_address": "香港",
                "last_time": "2022-04-07 22:44:39",
                "add_user_id": "1",
                "update_user_id": "",
                "create_username": "admin"
            },
            {
                "id": "3",
                "username": "viper1",
                "phone": "",
                "status": "1",
                "nick_name": "viper1",
                "create_time": "2022-02-15 14:47:49",
                "update_time": "2022-02-15 14:47:49",
                "last_ip": "114.199.68.51",
                "last_ip_address": "香港",
                "last_time": "2022-02-20 23:59:00",
                "add_user_id": "1",
                "update_user_id": "",
                "create_username": "admin"
            },
            {
                "id": "2",
                "username": "god01",
                "phone": "",
                "status": "1",
                "nick_name": "god01",
                "create_time": "2022-02-14 19:26:36",
                "update_time": "2022-02-14 19:26:36",
                "last_ip": "114.199.68.51",
                "last_ip_address": "香港",
                "last_time": "2022-04-04 20:06:20",
                "add_user_id": "1",
                "update_user_id": "",
                "create_username": "admin"
            }
        ]
    })
}

Mock.mock(url.adminList, 'post', adminList)