<template>
    <div id="navigationComp">
        <ul>
            <div class="nav-start">
                <li><router-link to="/">首页</router-link></li>
                <li><a href="http://forum.southdog.cool" target="_blank">论坛</a></li>
                <li><router-link :to="'/article/'+1">关于我</router-link></li>
                <li><router-link to="/login">登录</router-link></li>
            </div>
            <div class="nav-end">
                <li v-show="ifDisabled"><router-link to="/publish">发布</router-link></li>
                <li v-show="!ifDisabled"><img src="../assets/logo.png" alt="logo"></li>
            </div>
        </ul>
    </div>
</template>
<script>
import store from '../store'
export default {
    computed: {
        ifDisabled: () => {
            if (store.state.currentUserId == 1) {
                return true;
            } else {
                return false;
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
    #navigationComp
        display flex
        justify-content space-around
        position sticky
        top 0
        background-color rgba(255,255,255,0.95)
        box-shadow 0 2px 1px #eee
        z-index 3
        margin-bottom 50px
        ul
            width 100%
            list-style none
            padding 0
            display flex
            justify-content space-around
            .nav-start
                width 60%
                padding-left 10%
                box-sizing border-box
                @media screen and (max-width 700px)
                    width 80%
                    padding-left 0
            .nav-end
                width 40%
                padding-right 10%
                box-sizing border-box
                justify-content flex-end
                li
                    height 28px
                    img
                        height 100%
                        transform scale(2.5)
                @media screen and (max-width 700px)
                    display none
            div
                display flex
                @media screen and (max-width 700px)
                    justify-content space-around
                li
                    *
                        font-size 18px
                        text-decoration none
                        color black
                        margin 0 20px
                        @media screen and (max-width 700px)
                            margin 0
</style>