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
import store from './store'
import HeaderComp from '@/components/HeaderComp2.vue';
import NavigationComp from '@/components/NavigationComp.vue';
import FooterComp from '@/components/FooterComp.vue'
export default {
    components: {
        HeaderComp,
        NavigationComp,
        FooterComp
    },
    created() {
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem("store",JSON.stringify(store.state))
        });

        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("store")) {
            store.replaceState(Object.assign({}, store.state,JSON.parse(sessionStorage.getItem("store"))));
            // console.log(sessionStorage.store)
        } else {
            // console.log(sessionStorage.store)
        }
    },
    mounted() {
        this.axios.defaults.withCredentials = true;
        this.axios.post('http://127.0.0.1:5000/getsession').then(resp => {
            if (resp.data.status == 200) {
                console.log('登录成功');
                store.commit('getCurrentUserInfo', resp.data.result)
            } else {
                console.log('先登录哦')
            }
        })
    },
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
    // 这是供网站大标题使用的
    @media screen and (max-width 750px)
      top calc(70vh - 56px)
</style>
