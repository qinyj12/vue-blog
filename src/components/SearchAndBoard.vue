<template>
    <div id="searchAndBoard">
        <!-- <SearchComp/> -->
        <BoardComp/>
    </div>
</template>
<script>
import SearchComp from '@/components/SearchComp.vue'
import BoardComp from '@/components/BoardComp.vue'
export default {
    components: {
        // eslint-disable-next-line vue/no-unused-components
        SearchComp,
        BoardComp
    }
}
</script>
<style lang="stylus" scoped>
#searchAndBoard
    // border 1px solid yellow
    flex 0.8
    padding 35px 0
    @media screen and (max-width 1100px)
        width 80%
        margin 0 auto
</style>