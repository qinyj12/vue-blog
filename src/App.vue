<template>
  <div id="app">
    <div class="app-header">
        <HeaderComp/>
    </div>
    <div class="app-content">
        <NavigationComp/>
        <router-view/>
        <FooterComp/>
    </div>

  </div>
</template>
<script>
import HeaderComp from '@/components/HeaderComp2.vue';
import NavigationComp from '@/components/NavigationComp.vue';
import FooterComp from '@/components/FooterComp.vue'
export default {
    components: {
        HeaderComp,
        NavigationComp,
        FooterComp
    }
}
</script>
<style lang="stylus" scope>
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  position relative
  width 100%
  .app-header
    position fixed
    z-index -1
  .app-content
    position absolute
    width 100%
    top calc(100vh - 56px)
    background-color white
    
    @media screen and (max-width 750px)
      top calc(70vh - 56px)
</style>
