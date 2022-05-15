<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import {getUserInfo} from "./api/user"
    import {statusCode} from "./util/statusCode";

    export default {
        created() {
            document.querySelector("title").innerHTML = '后台管理系统'
            // this.init()
        },
        methods: {
            // async init() {
            //     try {
            //         const {data} = await getUserInfo()
            //         console.log(data)
            //         if (data.code === statusCode.success) {
            //             console.log('getUserInfo')
            //         }
            //     } catch (e) {
            //         console.log("error---------error")
            //     }
            // }
        }
    };
</script>
<style scoped lang="scss">
</style>
