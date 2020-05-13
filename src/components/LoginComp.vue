<template>
    <div class="comp">
        <div class="loginBox">
            <div class="bar leftbar">
                <div>haha</div>
                <transition name="left-slide">
                    <div class="blank" v-if="show">
                        <p v-if="show" class="inner inner1">登录</p>
                    </div>
                </transition>
                
            </div>
            <div class="bar rightbar">
                <transition name="right-slide">
                    <div class="blank" v-if="!show"></div>
                </transition>
                <button @click="show = !show">注册</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            show:true
        }
    },
    methods: {
    },
}
</script>
<style lang="stylus" scoped>
*
    padding 0
    margin 0
    .comp
        width 80vw
        .loginBox
            width 768px
            height 480px
            display flex
            background-color seagreen
            .bar
                width 50%
                border 1px solid green
                box-sizing border-box
                display flex
                justify-content center
                align-items center
                position relative
                .blank
                    width 100%
                    height 100%
                    position absolute
                    background-color white
                    z-index 1
                    display flex
                    justify-content center
                    align-items center
                    .inner
                        transition all 0.5s
                .left-slide-enter-active
                    transition all 0.5s
                .left-slide-leave-active
                    transition all 0.5s
                    .inner1
                        transform translateX(300px)
                .left-slide-enter
                    transform translateX(-100%)
                    .inner1
                        transform translateX(300px)
                .left-slide-leave-to
                    transform translateX(-100%)
                
                .right-slide-enter-active 
                    transition all 0.5s
                .right-slide-leave-active
                    transition all 0.5s
                .right-slide-enter
                    transform translateX(100%)
                .right-slide-leave-to
                    transform translateX(100%)
                button
                    z-index 2
</style>