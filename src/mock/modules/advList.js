import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const advList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                pic: 'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                title: '首页广告',
                equipment: "PC",
                linkType: '外跳',
                createMan: 'pi',
                lastTimeOpt: '2022-10-08',
                remark: '首页广告图配置',
                status: 2,
                optMan: 'draw',
                opt: ''
            },
            {
                pic: 'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                title: '首页广告',
                equipment: "H5",
                linkType: '外跳',
                createMan: 'pi',
                lastTimeOpt: '2022-10-08',
                remark: '首页广告图配置',
                status: 1,
                optMan: 'draw',
                opt: ''
            },
            {
                pic: 'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                title: '首页广告',
                equipment: "Android",
                linkType: '外跳',
                createMan: 'pi',
                lastTimeOpt: '2022-10-08',
                remark: '首页广告图配置',
                status: 1,
                optMan: 'draw',
                opt: ''
            },
        ]
    })
}

Mock.mock(url.advList, 'post', advList)

