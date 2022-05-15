<template src="./index.html"></template>

<script>
    import {statusCode} from "../../util/statusCode";
    import {login} from "../../api/user/index"

    export default {
        name: "login",
        data() {
            return {
                fullscreenLoading: false,
                username: "",
                password: "",
                bg: require("@assets/kefu/bg.jpg"),
                circleImg: require("@assets/kefu/d.png"),
                loginImg: require("@assets/kefu/e.png"),
                checked: false
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
                    let {data} = await login()
                    console.log(data)
                    if (data.code === statusCode.success) {
                        this.$message({
                            message: '登录成功',
                            type: 'success',
                            duration: 1000
                        });
                        setTimeout(() => {
                            this.$router.push({name: 'Home'})
                        }, 500)
                    }
                    loading.close();
                } catch (e) {
                    console.log('error---error')
                }

                // this.axios({
                //     url: `${apiUrl}/admin/login/Login`,
                //     method: "post",
                //     data: {
                //         username: this.username,
                //         password: this.password
                //     }
                // }).then(res => {
                //     if (res.data.code == 20000) {
                //         localStorage.setItem("adminInfo", JSON.stringify(res.data))
                //         this.$message({
                //             message: '登录成功',
                //             type: 'success',
                //             duration: 1000
                //         });
                //         setTimeout(() => {
                //             this.$router.push({name: 'Home'})
                //         }, 500)
                //     } else {
                //         this.$message.error(res.data.msg);
                //     }
                //     loading.close();
                // }).catch(err => {
                //     this.$message.error('登录失败');
                //     loading.close();
                // })


            }
        }
    }
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>