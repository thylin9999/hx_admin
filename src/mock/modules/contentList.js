import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const contentList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                title:'内容标题',
                status:false,
                content:"content12"
            },
            {
                title:'内容标题1',
                status:true,
                content:"content1"
            },
        ]
    })
}

Mock.mock(url.contentList, 'post', contentList)

