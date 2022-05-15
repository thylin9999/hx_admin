import Mock from "mockjs"

let managerList = {  //管理员列表
    status: "1",
    code: 200,
    msg: "success",
    list: [
        {id: '10000', name: 'admin'},
        {id: '10001', name: 'admin1'},
        {id: '10002', name: 'admin2'},
        {id: '10003', name: 'admin3'},
    ]
}

// Mock.mock(api., 'post', managerList)