if (process.env.VUE_APP_MOCK) {
    require('mockjs')
    require('./modules/home')
    require('./modules/userInfo')
    require('./modules/managerList')
}