<template>
    <div id="searchAndBoard">
        <BoardComp/>
    </div>
</template>
<script>
import BoardComp from '@/components/BoardComp.vue'
export default {
    components: {
        BoardComp
    }
}
</script>
<style lang="stylus" scoped>
#searchAndBoard
    flex 0.8
    padding 35px 0
    @media screen and (max-width 1100px)
        width 80%
        margin 0 auto
</style>