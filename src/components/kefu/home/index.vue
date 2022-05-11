<template src="./index.html"></template>

<script>
    import CustomerList from "../customerList/index"
    import AdminList from "../adminList/index"
    import KefuSensus from "../kefuSensus/index"
    import CommonQuestions from "../commonQuestions/index"
    import ComplainList from "../complainList/index"
    import SuggestList from "../suggestList/index"
    import MessageManage from "../messageManage/index"

    import api from '../../../../src/router/api.js'

    export default {
        components: {
            CustomerList, AdminList, KefuSensus, CommonQuestions, ComplainList, SuggestList, MessageManage
        },
        name: "Home",
        data() {
            return {
                imgUrl: require("@assets/kefu/t.png"),
                page: "home",
                loading: true,
                groupList: [],
                logo: require("@assets/logo.png"),
                adminInfo: JSON.parse(localStorage.getItem("adminInfo")),
                leftlist: [
                    {title: "后台系统", path: "top", icon: "el-icon-s-home", index: 0},
                    {title: "首页", path: "home", icon: "el-icon-s-home", index: 1},
                    // { title: "角色管理", path: "adminList", icon: "el-icon-s-custom", index: 2 },
                    {title: "管理员管理", path: "adminList", icon: "el-icon-s-custom", index: 2},
                    {title: "客服列表", path: "customerList", icon: "el-icon-headset", index: 3},
                    {title: "客服统计", path: "kefuSensus", icon: "el-icon-s-check", index: 4},
                    {title: "常见问题", path: "commonQuestions", icon: "el-icon-s-opportunity", index: 5},
                    {title: "投诉列表", path: "complainList", icon: "el-icon-s-open", index: 6},
                    {title: "建议列表", path: "suggestList", icon: "el-icon-s-grid", index: 7},
                    {title: "消息管理", path: "messageManage", icon: "el-icon-s-promotion", index: 8},
                ],
                tableHome: [{today: '0', yesterday: '0', week: '0', lastWeek: "0", this_month: "0", last_month: "0"},],
                tableHomeMessage: [{
                    today: '0',
                    yesterday: '0',
                    week: '0',
                    lastWeek: "0",
                    this_month: "0",
                    last_month: "0"
                },],
                wailDealList: [{dclts: 0, dcljy: 0}],
                todaySpeak: [{jrfy: 0}],
                feedback: null,
                topList: [{title: "首页", path: ""}],
                activeIndex: '0',
                defaultIndex: '0',
                index: 1,
            }
        },
        mounted() {
            this.getInitdata()
            this.getGroup()
            console.log("--------------------")
            console.log("--------------------")
            api.mockdata('/data/home').then(res => {
                console.log(res);
            })
            api.mockdata('/data/manager').then(res => {
                console.log(res);
            })
        },
        methods: {
            leftSelect(item) {
                this.index = item.index
                this.page = item.path
                this.topList[0].title = item.title
                if (this.page === 'home') {
                    this.getInitdata()
                }
            },
            handleSelect(key, keyPath) {
                // console.log(key, keyPath);
            },
            formatNumber2(value, seperator, digitNum) {//数字格式化  值 分隔字符 后置0个数
                var initV = value;
                if ((value = ((value = value + "").replace(/^\s*|\s*$|,*/g, ''))).match(/^\d*\.?\d*$/) == null)
                    return initV;
                value = digitNum >= 0 ? (Number(value).toFixed(digitNum) + "") : value;
                var r = [], tl = value.split(".")[0], tr = value.split(".")[1];
                tr = typeof tr != "undefined" ? tr : "";
                if (seperator != null && seperator != "") {
                    while (tl.length >= 3) {
                        r.push(tl.substring(tl.length - 3));
                        tl = tl.substring(0, tl.length - 3);
                    }
                    if (tl.length > 0)
                        r.push(tl);
                    r.reverse();
                    r = r.join(seperator);
                    return tr == "" ? r : r + "." + tr;
                }
                return value;
            },
            logout() {
                // this.$confirm('确认退出此账号?', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                //     this.axios({
                //         url: `${apiUrl}/admin/login/LogOut`,
                //         method: 'post',
                //         data: {
                //             token: this.adminInfo.token,
                //             uid: this.adminInfo.data.id
                //         }
                //     }).then(res => {
                //         if (res.data.code == 20000) {
                //             localStorage.removeItem("adminInfo")
                this.$router.push({name: 'Login'})
                //         } else {
                //             this.$message.error(res.data.msg);
                //         }
                //     }).catch(err => {
                //         this.$message.error('操作失败');
                //     })
                // })
            },
            goWaitDeal(str) {
                if (str == 'c') {
                    this.leftlist.forEach((item, i) => {
                        if (item.path == "complainList") {
                            this.defaultIndex = String(i)
                            this.leftSelect(item)
                        }
                    })
                }
                if (str == 's') {
                    this.leftlist.forEach((item, i) => {
                        if (item.path == "suggestList") {
                            this.defaultIndex = String(i)
                            this.leftSelect(item)
                        }
                    })
                }
            },
            getInitdata() {
                this.loading = true
                this.axios({
                    url: `${apiUrl}/admin/statistics/lists`,
                    method: 'post',
                    data: {
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                       // console.log(res)
                        this.tableHome[0].today = this.formatNumber2(res.data.data.today, ',')
                        this.tableHome[0].yesterday = this.formatNumber2(res.data.data.yesterday, ',')
                        this.tableHome[0].week = this.formatNumber2(res.data.data.this_week, ',')
                        this.tableHome[0].lastWeek = this.formatNumber2(res.data.data.last_week, ',')
                        this.tableHome[0].this_month = this.formatNumber2(res.data.data.this_month, ',')
                        this.tableHome[0].last_month = this.formatNumber2(res.data.data.last_month, ',')
                        this.tableHomeMessage[0].today = this.formatNumber2(res.data.data.today_fy, ',')
                        this.tableHomeMessage[0].yesterday = this.formatNumber2(res.data.data.yesterday_fy, ',')
                        this.tableHomeMessage[0].week = this.formatNumber2(res.data.data.this_week_fy, ',')
                        this.tableHomeMessage[0].lastWeek = this.formatNumber2(res.data.data.last_week_fy, ',')
                        this.tableHomeMessage[0].this_month = this.formatNumber2(res.data.data.this_month_fy, ',')
                        this.tableHomeMessage[0].last_month = this.formatNumber2(res.data.data.last_month_fy, ',')
                        this.wailDealList[0].dclts = this.formatNumber2(res.data.data.dclts, ',')
                        this.wailDealList[0].dcljy = this.formatNumber2(res.data.data.dcljy, ',')
                        this.todaySpeak[0].jrfy = this.formatNumber2(res.data.data.jrfy, ',')
                    } else {
                        this.$message.error({message: res.data.msg, duration: 1000});
                        if (res.data.code == '40008') {
                            this.$router.push({path: '/'})
                        }
                    }
                    this.loading = false
                }).catch(err => {
                    this.$message.error('获取数据失败');
                    this.loading = false
                })
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