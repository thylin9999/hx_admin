import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const feedback = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            // {
            //     time: '2022-10-08 02:20',
            //     title: '首页广告图配置',
            //     content:'首页广告图配置内容',
            //     status: false,
            //     optMan: 'draw',
            // },
            // {
            //     time: '2022-10-08 02:20',
            //     title: '首页广告图配置',
            //     content:'首页广告图配置内容',
            //     status: true,
            //     optMan: 'draw',
            // },
            // {
            //     time: '2022-10-08 02:20',
            //     title: '首页广告图配置',
            //     content:'首页广告图配置内容',
            //     status: false,
            //     optMan: 'draw',
            // },
        ]
    })
}

Mock.mock(url.feedbackManage, 'post', feedback)

