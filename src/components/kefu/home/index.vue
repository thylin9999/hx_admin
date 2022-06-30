<template src="./index.html"></template>

<script>
    import AdminList from "./adminList/index"
    import AnchorList from "./anchorList/index"
    import MemberList from "./memberList/index"
    import LeagueList from "./leagueList/index"
    import LiveList from "./liveList/index"
    import MatchList from "./matchList/index"
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
            LeagueList,
            LiveList,
            MatchList,
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
                    {title: "联赛管理", path: "leagueList", index: 4},
                    {title: "赛事管理", path: "matchList", index: 5},
                    {title: "直播管理", path: "liveList", index: 6},
                    {title: "内容管理", path: "contentManage", index: 7},
                    {title: "广告管理", path: "advManage", index: 8},
                    {title: "公告管理", path: "announceManage", index: 9},
                    {title: "用户反馈管理", path: "feedbackManage", index: 10},
                    {title: "网站开关配置", path: "webSet", index: 11},
                ],
                defaultIndex: '0',
                index: '0',
                userInfo: {},
            }
        },
        mounted() {
            this.userInfo = JSON.parse(JSON.stringify(localStorage.getItem('userInfo')))
        },
        methods: {
            leftSelect(item) {
                this.index = item.index
                this.page = item.path
            },
            logout() {
            },
        },
    }
</script>
<style scoped lang="scss">
  @import "./index.scss";
</style>
