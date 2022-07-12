import Mock from "mockjs";
import {statusCode} from "@/util/statusCode";
import url from "@/api/control/url";

const memberList = config => {
    return Mock.mock({
        code: statusCode.success,
        data: [
            {
                account:'133****825',
                nickname:'test01',
                id:"1234",
                createTime:'2022-10-08 02:20',
                loginTime:'2022-10-08 02:20',
                status:false,
                registerIp:'86.98.63.141',
                sb:'PC',
                optMan:'ssss',
            },
            {
                account:'133****5825',
                nickname:'test01',
                id:"5678",
                createTime:'2022-10-08 02:20',
                loginTime:'2022-10-08 02:20',
                status:false,
                registerIp:'86.98.63.141',
                sb:'PC',
                optMan:'bbbb',
            },
            {
                account:'133****825',
                nickname:'test01',
                id:"9898",
                createTime:'2022-10-08 02:20',
                loginTime:'2022-10-08 02:20',
                status:false,
                registerIp:'86.98.63.141',
                sb:'PC',
                optMan:'cccc',
            },
        ]
    })
}

Mock.mock(url.memberList, 'post', memberList)

