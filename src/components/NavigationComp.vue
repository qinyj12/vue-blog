<template>
    <div id="navigationComp">
        <ul>
            <div class="nav-start">
                <li><router-link to="/">首页</router-link></li>
                <li><a href="">论坛</a></li>
                <li><router-link to="/about">关于我</router-link></li>
                <li><router-link to="/login">登录</router-link></li>
            </div>
            <div class="nav-end">
                <li><a href="">发布</a></li>
            </div>
        </ul>
    </div>
</template>
<style lang="stylus" scoped>
    #navigationComp
        display flex
        justify-content space-around
        position sticky
        top 0
        background-color rgba(255,255,255,0.95)
        box-shadow 0 2px 1px #eee
        z-index 3
        margin-bottom 100px
        ul
            width 100%
            list-style none
            padding 0
            display flex
            justify-content space-around
            div.nav-end
                width 300px
                justify-content flex-end
            div
                display flex
                li
                    *
                        font-size 18px
                        text-decoration none
                        color black
                        margin 0 20px
</style>