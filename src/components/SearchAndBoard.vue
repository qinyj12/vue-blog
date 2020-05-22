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
    flex 1
    padding 35px 0
</style>