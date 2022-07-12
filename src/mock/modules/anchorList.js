import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const anchorList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                id:123456,
                username:'绝代天骄',
                pic:'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                nickname:'test01',
                createTime:'2022-10-08 02:20',
                status:false
            },
            {
                id:123456,
                username:'绝代天骄1',
                pic:'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                nickname:'test01',
                createTime:'2022-10-08 02:20',
                status:true
            },
            {
                id:123456,
                username:'绝代天骄2',
                pic:'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                nickname:'test01',
                createTime:'2022-10-08 02:20',
                status:false
            },
        ]
    })
}

Mock.mock(url.anchorList, 'post', anchorList)

