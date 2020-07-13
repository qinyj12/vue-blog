<template>
    <div id="about">
        <ArticleDetailComp/>
    </div>
</template>
<script>
import ArticleDetailComp from '@/components/ArticleDetailComp.vue'
export default {
    components: {
        ArticleDetailComp
    }
}
</script>
<style lang="stylus" scoped>
#about
    display flex
    justify-content center
</style>