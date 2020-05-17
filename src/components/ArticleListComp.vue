<template>
    <div id="articleListComp">
        <ul class="all-article">
            <li v-for="item in article" :key="item">
                <!-- 用于保持纵横比 -->
                <div class="article-container">
                    <!-- 存放正文 -->
                    <div class="article-main">
                        <!-- 图片 -->
                        <div class="article-pic"></div>
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
                    <div class="article-shadow"></div>
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
            ]
        }
    },
}
</script>
<style lang="stylus" scoped>
ul.all-article
    list-style none
    li
        border 1px solid
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
            .article-main
                border 1px solid
                box-sizing border-box
                width calc(100% - 30px)
                height calc(100% - 30px)
                z-index 1
                .article-pic
                    width 100%
                    padding-bottom 56%
                    border 1px solid
                    box-sizing border-box
                    background-color seagreen
                .avatar-tittle-time
                    border 1px solid
                    box-sizing border-box
                    display flex
                    .article-avatar
                        width 40px
                        height 40px
                        border 1px solid
                        background-color lightpink
            .article-shadow
                position absolute
                right 0
                top 30px
                width calc(100% - 30px)
                height calc(56% + 38.2px)
                background-color gray
                z-index 0
                transition all 0.3s
        .article-container:hover
            .article-shadow
                width 100%
                height 100%
                top 0
                
</style>