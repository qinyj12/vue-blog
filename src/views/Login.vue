<template>
    <div class="loginPage">
        <headerComp/>
        <loginComp/>
    </div>
</template>
<script>
    import headerComp from '@/components/HeaderComp.vue';
    import loginComp from '@/components/LoginComp.vue';
    export default {
        components: {
            headerComp,
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