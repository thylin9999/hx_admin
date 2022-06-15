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
                bg: require("@assets/bg.jpg"),
                bg1: require("@assets/kefu/bg.jpg"),
                checked: false
            }
        },
        methods: {
            login() {
                const loading = this.$loading({
                    lock: true,
                    text: '登录中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                // try {
                //     let {data} = await login()
                //     console.log(data)
                //     if (data.code === statusCode.success) {
                //         this.$message({
                //             message: '登录成功',
                //             type: 'success',
                //             duration: 1000
                //         });
                //         setTimeout(() => {
                //             this.$router.push({name: 'Home'})
                //         }, 500)
                //     }
                //     loading.close();
                // } catch (e) {
                //     console.log('error---error')
                // }
                loading.close();
                this.$router.push({name: 'Home'})
                // setTimeout({
                //     // if (1) {
                //     // this.$message({
                //     //     message: '登录成功',
                //     //     type: 'success',
                //     //     duration: 1000
                //     // })
                //     // this.$router.push({name: 'Home'})
                //     // } else {
                //     // this.$message.error(res.data.msg);
                //     //  }
                // }, 1500)
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "./index.scss";
</style>