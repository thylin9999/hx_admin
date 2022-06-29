import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";


const webSet = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            // {
            //     title: '首页广告开关',
            //     name: 'home_1',
            //     status: false,
            //     createTime: '2022-10-08',
            //     remark: '首页广告图配置',
            //     createMan: 'draw',
            //     optTime: '2022-10-08',
            //     optMan: 'test1',
            // },
            // {
            //     title: '房间推广二维码展示',
            //     name: 'home_2',
            //     status: true,
            //     createTime: '2022-10-08',
            //     remark: '首页广告图配置',
            //     createMan: 'draw',
            //     optTime: '',
            //     optMan: 'test2',
            // },
            // {
            //     title: '房间推广链接开关',
            //     name: 'room_3',
            //     status: false,
            //     createTime: '2022-10-08',
            //     remark: '首页广告图配置',
            //     createMan: 'draw',
            //     optTime: '',
            //     optMan: 'test3',
            // },
        ]
    })
}

Mock.mock(url.webSet, 'post', webSet)
