<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        created() {
            document.querySelector("title").innerHTML = '后台管理系统'
        },
    };
</script>
<style scoped lang="scss">
</style>
