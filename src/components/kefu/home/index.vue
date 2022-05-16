<template src="./index.html"></template>

<script>
    import AdminList from "./adminList/index"
    import AnchorList from "./anchorList/index"
    import MemberList from "./memberList/index"
    import MatchList from "./matchList/index"
    import LiveList from "./liveList/index"
    import ContentManage from "./contentManage/index"
    import FeedbackManage from "./feedbackManage/index"

    export default {
        components: {
            AdminList,
            AnchorList,
            MemberList,
            MatchList,
            LiveList,
            ContentManage,
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
                    {title: "后台系统", path: "top", index: 0},
                    {title: "首页", path: "home", index: 1},
                    {title: "管理员管理", path: "adminList", index: 2},
                    {title: "主播管理", path: "anchorList", index: 3},
                    {title: "会员管理", path: "memberList", index: 4},
                    {title: "赛事管理", path: "matchList", index: 5},
                    {title: "直播管理", path: "liveList", index: 6},
                    {title: "内容管理", path: "contentManage", index: 7},
                    {title: "用户反馈管理", path: "feedbackManage", index: 8},
                    // {title: "消息管理", path: "messageManage", index: 9},
                ],
                topList: [{title: "首页", path: ""}],
                defaultIndex: '0',
                index: 1,
            }
        },
        mounted() {
            this.getGroup()
        },
        methods: {
            leftSelect(item) {
                this.index = item.index
                this.page = item.path
                this.topList[0].title = item.title
            },
            logout() {
                console.log('logout')
            },
            getGroup() {
                this.axios({
                    url: `${apiUrl}/admin/customerGroup/lists`,
                    method: 'post',
                    data: {
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.groupList = res.data.data
                        localStorage.setItem("groupList", JSON.stringify(res.data.data))
                    }
                }).catch(err => {
                    this.$message.error('数据获取失败');
                })
            },
        },
    }
</script>
<style scoped lang="scss">
  @import "./index.scss";
</style>