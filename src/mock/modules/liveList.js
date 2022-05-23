import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const liveList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                ID: '12345',
                sort:'1',
                anchorAccount: '1234****654',
                anchorNickname: '小妖精',
                title: '直播间标题',
                status: false,
                recommend: true,
                line: 1, //1在线 2下线
                cover: 'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                createTime: '2022-10-08 2:00',
                recentOpenTime: '2022-10-08 2:00',
                visitNum: 20,
            },
            {
                ID: '100002',
                sort:'2',
                anchorAccount: '1834****654',
                anchorNickname: '个收入和',
                title: '直播间标题2',
                status: false,
                recommend: 2,
                line: 2, //1在线 2下线
                cover: 'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                createTime: '2022-10-08 2:00',
                recentOpenTime: '2022-10-08 2:00',
                visitNum: 120,
            },
        ]
    })
}

Mock.mock(url.liveList, 'post', liveList)

