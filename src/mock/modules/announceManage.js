import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";


const announceList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                title: '首页公告',
                status: false,
                createTime: '2022-10-08',
                remark: '公告配置',
                createMan: 'draw',
                optTime: '2022-10-08',
                optMan: 'test1',
                content:'这个是内容1'
            },
            {
                title: '直播间顶部公告',
                status: true,
                createTime: '2022-10-08',
                remark: '公告配置',
                createMan: 'draw',
                optTime: '',
                optMan: 'test2',
                content:'这个是内容2'
            },
            {
                title: '直播间聊天区公告',
                status: false,
                createTime: '2022-10-08',
                remark: '公告配置',
                createMan: 'draw',
                optTime: '',
                optMan: 'test3',
                content:'这个是内容3'
            },
        ]
    })
}

Mock.mock(url.announceManage, 'post', announceList)