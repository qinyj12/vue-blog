<template>
  <div id="home">
    <ArticleListComp/>
  </div>
</template>

<script>
// @ is an alias to /src
import ArticleListComp from '@/components/ArticleListComp.vue'

export default {
  name: 'Home',
  components: {
    ArticleListComp
  }
}
</script>
<style lang="stylus" scoped>
#home
  border 1px solid
</style>