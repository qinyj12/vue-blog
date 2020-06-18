<template>
    <div id="login">
        <vue-scroll>
            <loginComp/>
        </vue-scroll>
        
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
    #login
        
        ::-webkit-scrollbar
            width 0 !important
        ::-webkit-scrollbar
            width: 0 !important
            height: 0        

</style>