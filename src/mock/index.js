if (process.env.VUE_APP_MOCK) {
    require('mockjs')
    require('./modules/home')
    require('./modules/userInfo')
    require('./modules/adminList')
    require('./modules/anchorList')
    require('./modules/memberList')
    require('./modules/advList')
    require('./modules/announceManage')
    require('./modules/feedback')
    require('./modules/webSet')
}