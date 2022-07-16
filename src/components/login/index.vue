<template src="./index.html"></template>

<script>
    import {statusCode} from "@/util/statusCode";
    import {login} from "../../api/user/index"
    import {setToken} from "@/util/cookie"

    export default {
        name: "login",
        data() {
            return {
                fullscreenLoading: false,
                username: "",
                password: "",
                bg: require("@assets/bg.jpg"),
                checked: false,
                userInfo: null,
            }
        },
        methods: {
            async login() {
                const loading = this.$loading({
                    lock: true,
                    text: '登录中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                try {
                    let {data} = await login(this.username, this.password)
                    if (data.code === statusCode.success) {
                        this.userInfo = data.data
                        this.userInfo.token = data.token
                        window.sessionStorage.setItem('token', data.token)
                        window.sessionStorage.setItem('userInfo', JSON.stringify(data.data))
                        setToken(data.token)
                        this.$store.commit('loginInfo',data.data)
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 1000
                        });
                        setTimeout(() => {
                            this.$router.push({path: '/admin'})
                        }, 500)

                    } else {
                        this.$message({
                            message: data.msg,
                            type: 'warning',
                            duration: 1000
                        });
                    }
                    loading.close();
                } catch (e) {
                    console.log('error---error')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>
