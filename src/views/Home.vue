<template>
<div id="home">
    <ArticleListComp/>
    <SearchAndBoard/>
</div>
</template>

<script>
// @ is an alias to /src
import ArticleListComp from '@/components/ArticleListComp.vue'
import SearchAndBoard from '@/components/SearchAndBoard.vue'

export default {
name: 'Home',
components: {
    ArticleListComp,
    SearchAndBoard
}
}
</script>
<style lang="stylus" scoped>
#home
    display flex
</style>