<template>
    <div>
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
    div
        display flex
        justify-content center
</style>