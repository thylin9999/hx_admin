<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    // 客服端
    export default {
        created() {
            document.querySelector("title").innerHTML = '后台管理系统'
        }
    };
</script>
<style scoped lang="scss">
</style>
