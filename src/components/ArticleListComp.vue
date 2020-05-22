<template>
    <div id="articleListComp">
        <ul class="all-article">
            <li v-for="(item, index) in article" :key="item.tittle">
                <!-- 只是用来赋值方法的，所以才创建了这个父元素 -->
                <div @mouseenter="isHover(index)" @mouseleave="noHover(index)">
                    <div class="picture-abstract">
                        <!-- 这里原来动态绑定了   :style="item.articlePic" -->
                        <div class="article-pic" ref="picture">
                            <img :src="item.articleImg" alt="头图" width="100%" height="100%">
                        </div>
                        <transition name="abstract-fade">
                            <div class="article-abstract" v-show="item.showfooter">{{item.abstract}}</div>
                        </transition>
                    </div>
                    <div class="avatar-tittle-time">
                        <!-- 这里原来动态绑定了   :style="item.avatar" -->
                        <div class="article-avatar">
                            <img :src="item.avatarImg" alt="头像" width="100%" height="100%">
                        </div>
                        <div class="tittle-time">
                            <div class="article-tittle">{{item.tittle}}</div>
                            <div class="article-time">{{item.time}}</div>
                        </div>
                    </div>
                    <div class="article-views-comments">
                        <!-- transition-group要绑定key，不然不能区分内部很多元素 -->
                        <transition-group name="views-comments-fade">
                            <!-- 这里动态决定了哪些 li > div 会显示 -->
                            <div class="article-views" v-show="item.showfooter" :key="item.views">
                                <div class="views-icon"></div>
                                <div class="number">{{item.views}}</div>
                            </div>
                            <!-- 这里动态决定了哪些 li > div 会显示 -->
                            <div class="article-comments" v-show="item.showfooter" :key="item.comments">
                                <div class="comments-icon"></div>
                                <div class="number">{{item.comments}}</div>
                            </div>
                        </transition-group>
                    </div>
                    <div class="article-shadow" ref="shadow"></div>
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
                    abstract: '这是我的第一篇文章，我也不知道写什么。要不就写个自我介绍？',
                    time: '2020年5月16日',
                    views: '100',
                    comments: '5',
                    showfooter: false,
                    articlePic: {backgroundImage: "url(" + require("../assets/article_pic/article-pic.jpg")+")"},
                    articleImg: require("../assets/article_pic/article-pic.jpg"),
                    avatar: {backgroundImage: "url(" + require("../assets/avatar/avatar1.png")+")"},
                    avatarImg: require("../assets/avatar/avatar1.png")
                },
                {
                    tittle: '我的第二篇文章',
                    abstract: '这是我的第二篇文章，我仍然不知道写什么。要不再自我介绍一遍？',
                    time: '2020年5月17日',
                    views: '50',
                    comments: '3',
                    showfooter: false,
                    articlePic: {backgroundImage: "url(" + require("../assets/article_pic/article-pic2.jpg")+")"},
                    articleImg: require("../assets/article_pic/article-pic2.jpg"),
                    avatar: {backgroundImage: "url(" + require("../assets/avatar/avatar2.png")+")"},
                    avatarImg: require("../assets/avatar/avatar2.png")
                },
                {
                    tittle: '我的第3篇文章',
                    abstract: '这是我的第3篇文章，我也不知道写什么。要不就写个自我介绍？',
                    time: '2020年5月16日',
                    views: '100',
                    comments: '5',
                    showfooter: false,
                    articlePic: {backgroundImage: "url(" + require("../assets/article_pic/article-pic.jpg")+")"},
                    articleImg: require("../assets/article_pic/article-pic.jpg"),
                    avatar: {backgroundImage: "url(" + require("../assets/avatar/avatar1.png")+")"},
                    avatarImg: require("../assets/avatar/avatar1.png")
                },
                {
                    tittle: '我的第4篇文章',
                    abstract: '这是我的第4篇文章，我仍然不知道写什么。要不再自我介绍一遍？',
                    time: '2020年5月17日',
                    views: '50',
                    comments: '3',
                    showfooter: false,
                    articlePic: {backgroundImage: "url(" + require("../assets/article_pic/article-pic2.jpg")+")"},
                    articleImg: require("../assets/article_pic/article-pic2.jpg"),
                    avatar: {backgroundImage: "url(" + require("../assets/avatar/avatar2.png")+")"},
                    avatarImg: require("../assets/avatar/avatar2.png")
                },
            ],
            value: 'white',
            count: 0
        }
    },
    methods: {
        isHover(index) {
            this.$refs.shadow[index].classList.add('article-shadow-hover');
            this.article[index].showfooter = !this.article[index].showfooter;
            this.$refs.picture[index].classList.add('article-pic-hover')
        },
        noHover(index) {
            this.$refs.shadow[index].classList.remove('article-shadow-hover');
            this.article[index].showfooter = !this.article[index].showfooter;
            this.$refs.picture[index].classList.remove('article-pic-hover')
        }
    },
}
</script>
<style lang="stylus" scoped>
// 长宽比1.7:1，avatar-tittle-time高度60，views-comments高度30
$articlePicRatio = 1.7
$avatarTittleTimeH = 60px
$viewsCommentsH = 30px
#articleListComp
    width 60%
    padding-left 10%
    box-sizing border-box
    ul.all-article
        list-style none
        display flex
        flex-wrap wrap
        padding 0
        li
            display inline-block
            width 40%
            margin 20px 20px 20px 0
            padding 15px
            position relative
            .picture-abstract
                width 100%
                padding-bottom 'calc(100%/ %s)' % $articlePicRatio
                position relative
                z-index 1
                // 头图
                .article-pic
                    width 100%
                    height 100%
                    position absolute
                    border-radius 6px
                    background-size 100% auto
                    background-repeat no-repeat
                    overflow hidden
                    transition all 0.3s
                    z-index 1
                // 头图-hover
                .article-pic-hover
                    width 90%
                    height 90%
                    // 此处是(1 - 90%) / 2
                    margin 0 5%
                    // 此处是50% * 90%
                    transform translateY(-45%)
                // 摘要，平时隐藏
                .article-abstract
                    position absolute
                    height 50%
                    padding 10px 0
                    box-sizing border-box
                    text-align left
                    font-weight bold
                    color white
                    bottom 0
                    z-index 0
                    overflow hidden
                    transition all 0.3s
                // 摘要动画
                .abstract-fade-enter-active 
                    transition all 0.3s
                .abstract-fade-leave-active 
                    transition all 0.3s
                .abstract-fade-enter, .abstract-fade-leave-to
                    transform translateY(10px)
                    opacity 0
            // 头像-标题-时间
            .avatar-tittle-time
                width 100%
                height $avatarTittleTimeH
                position relative
                z-index 1
                display flex
                align-items center
                // 头像
                .article-avatar
                    width 40px
                    height 40px
                    border-radius 5px
                    background-size contain
                    background-repeat no-repeat
                    overflow hidden
                // 标题-时间
                .tittle-time
                    margin-left 10px
                    color white
                    font-weight bold 
            // 阅读量-评论量
            .article-views-comments
                width 100%
                height $viewsCommentsH
                position relative
                z-index 1
                display flex
                align-items center
                // 阅读量, 评论量
                .article-views, .article-comments
                    height 20px
                    border-radius 3px
                    background-color black
                    color white
                    margin 0 5px
                    display flex
                    flex-direction row
                    align-items center
                // transition-group会多一个span
                span 
                    display flex
                    // 阅读量图标,评论图标
                    .views-icon, .comments-icon
                        margin 0 3px
                        width 20px
                        height 20px
                        background-size contain
                    // 阅读量图标
                    .views-icon
                        background-image url('../assets/icon/eye.png')
                        background-repeat no-repeat
                    // 评论图标
                    .comments-icon
                        background-image url('../assets/icon/comment.png')
                        background-repeat no-repeat
                    // 阅读和评论的数字
                    .number
                        margin 0 3px
                // 阅读-评论的动画
                .views-comments-fade-enter-active 
                    transition all 0.3s
                .views-comments-fade-leave-active 
                    transition all 0.3s
                .views-comments-fade-enter, .views-comments-fade-leave-to
                    transform translateX(10px)
                    opacity 0
            // 背景阴影
            .article-shadow
                background-color silver
                width calc(100% - 30px)
                border-radius 10px
                padding-bottom 'calc((100% - 30px)/ %s + %s)' % ($articlePicRatio $avatarTittleTimeH)
                position absolute
                top 30px
                right 0
                z-index 0
                transition all 0.3s
            // 背景阴影-hover
            .article-shadow-hover
                width 100%
                padding-bottom 'calc((100% - 30px)/ %s + %s + %s + 30px)' % ($articlePicRatio $avatarTittleTimeH $viewsCommentsH)
                top 0
</style>