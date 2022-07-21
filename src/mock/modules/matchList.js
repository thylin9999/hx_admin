import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const matchList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                "id":1,
                "teamId": 58,
                "nameChs": "斯托克城",
                "leagueId": 37,
                "leagueType": 1,
                "logo": "http://tyimage.tyltxt.com/status/upload/62498388d2857.png",
                "isHot": true,
                "optMan": "annie",
                "updateTime": "2022-04-03 19:22:50",
                'remark': '暂无备注'
            },
            {
                "id":2,
                "teamId": 58,
                "nameChs": "斯托克城",
                "leagueId": 37,
                "leagueType": 1,
                "logo": "http://tyimage.tyltxt.com/status/upload/62498388d2857.png",
                "isHot": false,
                "optMan": "annie",
                "updateTime": "2022-04-03 19:22:50",
                'remark': '暂无备注'
            },
            {
                "id":3,
                "teamId": 58,
                "nameChs": "斯托克城",
                "leagueId": 37,
                "leagueType": 1,
                "logo": "http://tyimage.tyltxt.com/status/upload/62498388d2857.png",
                "isHot": false,
                "optMan": "annie",
                "updateTime": "2022-04-03 19:22:50",
                'remark': '暂无备注'
            },
        ]
    })
}

Mock.mock(url.matchList, 'post', matchList)

