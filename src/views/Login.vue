<template>
    <div class="loginPage">
        <loginComp/>
    </div>
</template>
<script>
    import loginComp from '@/components/LoginComp.vue';
    export default {
        components: {
            loginComp
        }
    }
</script>
<style lang="stylus" scoped>
    .loginPage
        display flex
        flex-direction column
        justify-content center
        align-items center
</style>