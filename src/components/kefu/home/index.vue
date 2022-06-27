<template src="./index.html"></template>

<script>
    import AdminList from "./adminList/index"
    import AnchorList from "./anchorList/index"
    import MemberList from "./memberList/index"
    import MatchList from "./matchList/index"
    import LiveList from "./liveList/index"
    import ContentManage from "./contentManage/index"
    import AdvManage from "./advList"
    import AnnounceManage from "./announceManage"
    import WebSet from "./webSet"
    import FeedbackManage from "./feedbackManage/index"

    export default {
        components: {
            AdminList,
            AnchorList,
            MemberList,
            MatchList,
            LiveList,
            ContentManage,
            AdvManage,
            AnnounceManage,
            WebSet,
            FeedbackManage,
        },
        name: "Home",
        data() {
            return {
                logo: require("@assets/logo.png"),
                page: "home",
                groupList: [],
                adminInfo: JSON.parse(localStorage.getItem("adminInfo")),
                leftList: [
                    // {title: "后台系统", path: "top", index: 0},
                    {title: "首页", path: "home", index: 0},
                    {title: "管理员管理", path: "adminList", index: 1},
                    {title: "主播管理", path: "anchorList", index: 2},
                    {title: "会员管理", path: "memberList", index: 3},
                    {title: "赛事管理", path: "matchList", index: 4},
                    {title: "直播管理", path: "liveList", index: 5},
                    {title: "内容管理", path: "contentManage", index: 6},
                    {title: "广告管理", path: "advManage", index: 7},
                    {title: "公告管理", path: "announceManage", index: 8},
                    {title: "用户反馈管理", path: "feedbackManage", index: 9},
                    {title: "网站开关配置", path: "webSet", index: 10},
                ],
                defaultIndex: '0',
                index: 1,
                userInfo: {},
            }
        },
        mounted() {
            this.getGroup()
            this.userInfo = JSON.parse(JSON.stringify(localStorage.getItem('userInfo')))
        },
        methods: {
            handleSelect(key, keyPath) {
                this.index = key
                this.page = this.leftList[key].path
                this.leftList[0].title = this.leftList[key].title
            },
            leftSelect(item) {
            },
            logout() {
            },
            getGroup() {

            },
        },
    }
</script>
<style scoped lang="scss">
  @import "./index.scss";
</style>
