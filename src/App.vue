<template>
    <div class="Nav">
        <div class="navBox" v-if="$route.path !== '/'">
            <div class="navTop">
                <!--                <img class="logo" :src="require('@assets/logo.png')" alt="">-->
                <el-radio-group v-model="isCollapse">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
            </div>
            <div class="navBottom">
                <el-menu
                    router
                    :collapse="isCollapse"
                    :default-active="active"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-submenu v-for="(item,i) in menu" :index="String(i+1)" :key="i">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-if="item.route.length">
                            <el-menu-item v-for="(tem,n) in item.route" :index="tem.path" :key="n">{{ tem.txt }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                    <!--                    <el-submenu index="2">-->
                    <!--                        <template slot="title">-->
                    <!--                            <i class="el-icon-menu"></i>-->
                    <!--                            <span>直播管理</span>-->
                    <!--                        </template>-->
                    <!--                        <el-menu-item index="/anchorList">主播管理</el-menu-item>-->
                    <!--                        <el-menu-item index="/liveList">直播间管理</el-menu-item>-->
                    <!--                        <el-menu-item index="/liveRecord">直播记录</el-menu-item>-->
                    <!--                    </el-submenu>-->
                    <!--                    <el-submenu index="3">-->
                    <!--                        <template slot="title">-->
                    <!--                            <i class="el-icon-setting"></i>-->
                    <!--                            <span>赛事管理</span>-->
                    <!--                        </template>-->
                    <!--                        <el-menu-item index="/leagueList">联赛管理</el-menu-item>-->
                    <!--                        <el-menu-item index="/matchList">赛事管理</el-menu-item>-->
                    <!--                    </el-submenu>-->
                    <!--                    <el-submenu index="4">-->
                    <!--                        <template slot="title">-->
                    <!--                            <i class="el-icon-location"></i>-->
                    <!--                            <span>网站管理</span>-->
                    <!--                        </template>-->
                    <!--                        <el-menu-item index="/advList">广告管理</el-menu-item>-->
                    <!--                        <el-menu-item index="/contentManage">内容管理</el-menu-item>-->
                    <!--                        <el-menu-item index="/announceManage">公告管理</el-menu-item>-->
                    <!--                        <el-menu-item index="/feedbackManage">用户反馈</el-menu-item>-->
                    <!--                        <el-menu-item index="/webSet">全局开关</el-menu-item>-->
                    <!--                    </el-submenu>-->
                </el-menu>
            </div>
        </div>
        <div id="app">
            <div class="app_top" v-if="$route.path !== '/'">
                <div class="top_title">
                    <!--                    {{ active }}-{{}}-->
                </div>
                <div class="username" style="float: right">
                    <div class="account">{{userInfo && userInfo.account }}</div>
                    <button class="btn" @click="logout">退出</button>
                </div>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import {removeToken} from "@/util/cookie";

    export default {
        created() {
            document.querySelector("title").innerHTML = '后台管理系统'
        },
        data() {
            return {
                menu: [
                    {
                        title: "角色管理",
                        icon: 'el-icon-location',
                        route: [
                            {path: '/admin', txt: '管理员'},
                            {path: '/memberList', txt: '会员管理'},
                            {path: '/anchorList', txt: '主播管理'},
                        ]
                    },
                    {
                        title: "直播管理",
                        icon: 'el-icon-menu',
                        route: [
                            {path: '/liveList', txt: '直播间管理'},
                            {path: '/liveOrder', txt: '预约列表'},
                            {path: '/livingList', txt: '正在直播'},
                            {path: '/liveRecord', txt: '直播记录'},
                        ]
                    },
                    {
                        title: "赛事管理",
                        icon: 'el-icon-setting',
                        route: [
                            {path: '/leagueList', txt: '联赛管理'},
                            {path: '/matchList', txt: '赛事管理'},
                        ]
                    },
                    {
                        title: "网站管理",
                        icon: 'el-icon-location',
                        route: [
                            {path: '/advList', txt: '广告管理'},
                            {path: '/contentManage', txt: '内容管理'},
                            {path: '/announceManage', txt: '公告管理'},
                            {path: '/feedbackManage', txt: '用户反馈'},
                            {path: '/webSet', txt: '全局开关'},
                        ]
                    },
                ],
                active: '1',
                isCollapse: false,
                userInfo: sessionStorage.userInfo && JSON.parse(JSON.parse(JSON.stringify(sessionStorage.getItem('userInfo'))))
            }
        },
        methods: {
            async init() {

            },
            logout() {
                removeToken()
                this.$router.push({path: '/'})
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        },
    };
</script>
<style scoped lang="scss">
    .el-menu {
        //width: 200px;
        height: 100vh;
        text-align: left;
    }

    .Nav {
        height: 100%;
        display: flex;
    }

    .el-submenu .el-menu-item {
        min-width: 182px;
    }

    .navBottom {
        width: 100%;
    }

    .navTop {
        font-size: 0;
        //width: 200px;
        //background-color: rgb(84, 92, 100);

        .logo {
            width: 40px;
        }
    }

    #app {
        flex: 1;
        padding: 10px;

        .app_top {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-between;

            .top_title {
                font-size: 20px;
            }

            .username {
                display: flex;

                .account {
                    color: dodgerblue;
                    line-height: 30px;
                }

                .btn {
                    cursor: pointer;
                    width: 100px;
                    height: 30px;
                    margin: 0 10px;
                    padding: 5px 10px;
                    border-radius: 6px;
                    border: solid 1px #000;
                }
            }
        }


    }
</style>
