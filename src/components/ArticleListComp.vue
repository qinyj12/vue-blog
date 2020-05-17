<template>
    <div id="articleListComp">
        <ul class="all-article">
            <li v-for="item in article" :key="item">
                <!-- 用于保持纵横比 -->
                <div class="article-container">
                    <!-- 存放正文 -->
                    <div class="article-main">
                        <div class="always-show">
                            <!-- 图片 -->
                            <div class="article-pic" @mouseenter="isHover" @mouseleave="notHover"></div>
                            <!-- 头像-标题-时间 -->
                            <div class="avatar-tittle-time">
                                <div class="article-avatar"></div>
                                <div class="tittle-and-time">
                                    <div class="article-tittle">{{item.tittle}}</div>
                                    <div class="article-time">{{item.time}}</div>
                                </div>
                            </div>
                            <div class="article-abstract" v-show="false">{{item.abstract}}</div>
                            <div class="article-footer" v-show="false">阅读量</div>
                        </div>
                        <!-- 阴影，作为always-show的兄弟，拥有和alway-show一样的宽高 -->
                        <div class="article-shadow" @mouseenter="isHover" @mouseleave="notHover"></div>
                    </div>

                </div>

            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            article: [
                {
                    tittle: '我的第一篇文章',
                    abstract: '这是我的第一篇文章，我也不知道写什么',
                    time: '2020年5月16日'
                },
                {
                    tittle: '我的第二篇文章',
                    abstract: '这是我的第二篇文章，我仍然不知道写什么',
                    time: '2020年5月17日'
                },
            ],
            ifShow: false
        }
    },
    methods: {
        isHover() {
            this.ifShow = true
        },
        notHover() {
            this.ifShow = false
        }
    },
}
</script>
<style lang="stylus" scoped>
$avatarTittleTimeH = 60px
ul.all-article
    list-style none
    li
        box-sizing border-box
        margin 20px
        display inline-block
        width 30%
        padding-bottom 27%
        position relative
        .article-container
            position absolute
            width 100%
            height 100%
            display flex
            justify-content center
            align-items center
            border 1px solid red
            box-sizing border-box
            transition all 0.3s
            .article-main
                position relative
                border 1px solid orange
                box-sizing border-box
                width calc(100% - 30px)
                height calc(100% - 30px)
                z-index 1
                display flex
                flex-direction column
                .always-show
                    border 1px solid yellow
                    box-sizing border-box
                    width 100%
                    padding-bottom 'calc(55% + %s)' % $avatarTittleTimeH
                    position relative
                    .article-pic
                        position absolute
                        width 100%
                        padding-bottom 55%
                        border 1px solid
                        background-color seagreen
                    .avatar-tittle-time
                        position absolute
                        bottom 0
                        border 1px solid blue
                        box-sizing border-box
                        height '%s' % $avatarTittleTimeH
                        display flex
                        align-items center
                        .article-avatar
                            width 40px
                            height 40px
                            background-color lightpink
                .article-shadow
                    position absolute
                    right -15px
                    top 15px
                    width 100%
                    padding-bottom 'calc(55% + %s)' % $avatarTittleTimeH
                    background-color gray
                    z-index -1
                    transition all 0.3s
</style>