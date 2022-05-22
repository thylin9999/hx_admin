import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const memberList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                account:'13318145825',
                pic:'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                nickname:'test01',
                createTime:'2022-10-08 02:20',
                status:false
            },
            {
                account:'13318145825',
                pic:'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                nickname:'test01',
                createTime:'2022-10-08 02:20',
                status:false
            },
            {
                account:'13318145825',
                pic:'https://image.jqiu66.com/status/upload/624be422dd98c.jpeg',
                nickname:'test01',
                createTime:'2022-10-08 02:20',
                status:false
            },
        ]
    })
}

Mock.mock(url.memberList, 'post', memberList)

