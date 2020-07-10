<template>
    <div id="articleListComp">
        <ul class="all-article" ref="articleListRef">
            <li v-for="(item, index) in articleList" :key="item.id+'id'">
                <!-- 放一个router-link做动态路由，点击后进入对应的文章详情 -->
                <router-link :to="'/article/'+item.id" style="text-decoration: none">
                <!-- 只是用来赋值方法的，所以才创建了这个父元素 -->
                <div @mouseenter="isHover(index)" @mouseleave="noHover(index)">
                    <div class="picture-abstract">
                        <div class="article-pic" ref="picture">
                            <img :src="'http://127.0.0.1:5000/static/articles/'+item.id+'/cover/'+item.cover" alt="头图" class="cover">
                        </div>
                    </div>
                    <div class="avatar-title-time">
                        <div class="article-avatar">
                            <img :src="'./img/'+item.avatar" alt="头像" width="100%" height="100%">
                        </div>

                        <transition-group name="abstract-fade">
                            <div class="title-time" v-show="!(index === currentIndex)" :key="item.title+'title'">
                                <div class="article-title">{{item.title}}</div>
                                <div class="article-time">{{item.time}}</div>
                            </div>
                            <div class="article-abstract" v-show="(index === currentIndex)" :key="item.abstract+'abstract'">
                                {{item.abstract}}
                            </div>
                        </transition-group>
                    </div>
                    <div class="article-views-comments">
                        <!-- transition-group要绑定key，不然不能区分内部很多元素 -->
                        <transition-group name="views-comments-fade">
                            <!-- 这里动态决定了哪些 li > div 会显示 -->
                            <div class="article-views" v-show="(index === currentIndex)" :key="item.views+'views'">
                                <div class="views-icon"></div>
                                <div class="number">{{item.views}}</div>
                            </div>
                            <!-- 这里动态决定了哪些 li > div 会显示 -->
                            <div class="article-comments" v-show="(index === currentIndex)" :key="item.comments+'comments'">
                                <div class="comments-icon"></div>
                                <div class="number">{{item.comments}}</div>
                            </div>
                        </transition-group>
                    </div>
                    <div class="article-shadow" ref="shadow"></div>
                </div>
                </router-link>
            </li>
        </ul>
        <div class="article-pagination">
            <el-pagination 
                layout="prev, pager, next" 
                :total="articleCounts" 
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // el-pagination的参数，前者是每页有多少元素，后者是当前所在页
            pageSize: 2,
            currentPage: 1,
            articleCounts: null,
            // 从后端拿到的articlelist
            articleList: [],
            // 获取鼠标hover的index
            currentIndex: null
        }
    },
    mounted: async function() {
        // 拿到axios的返回值，因为返回对象是一个promise，所以要用.then来拿到值，并且通过await达到阻塞的效果，似乎也不是完全的阻塞？
        let res = this.getArticle();
        await res;
        this.getUlHeight()
    },

    methods: {
        // 定义一个拿到后端article列表的函数
        getArticle() {
            let data = new FormData();
            let slicePage = [(this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize];
            data.append('articles_for_single', JSON.stringify(slicePage));
            return this.axios.post('http://127.0.0.1:5000/getarticle', data).then(r => {
                this.articleList = r.data.result.articleList;
                this.articleCounts = r.data.result.count
            })
        },
        // 定义一个拿到ul高度的函数
        getUlHeight() {
            this.$refs.articleListRef.style.height = this.$refs.articleListRef.offsetHeight + 'px';
        },
        // 鼠标hover时的动画
        isHover(index) {
            this.$refs.shadow[index].classList.add('article-shadow-hover');
            this.currentIndex = index;
        },
        noHover(index) {
            this.$refs.shadow[index].classList.remove('article-shadow-hover');
            this.currentIndex = null;
        },
        // 供el-pagination切换页码时使用
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getArticle()
        }
    },
}
</script>
<style lang="stylus" scoped>
// 长宽比1.7:1，avatar-title-time高度60，views-comments高度30
$articlePicRatio = 1.7
$avatartitleTimeH = 60px
$viewsCommentsH = 30px
#articleListComp
    width 60%
    padding-left 10%
    flex-direction column
    @media screen and (max-width 1100px)
        width 90%
        padding-left 0
        margin 0 auto

    ul.all-article
        list-style none
        display flex
        justify-content flex-start
        flex-wrap wrap
        padding 0
        li
            display inline-block
            width 40%
            padding 15px
            // 这里妄图通过百分比margin来达到space-around的效果
            margin 15px 2%
            position relative
            @media screen and (max-width 750px)
                width 80%
            @media screen and (max-width 500px)
                width 90%
                margin 5px 0

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
                    // 封面
                    .cover
                        width 100%

            // 头像-标题-时间
            .avatar-title-time
                width 100%
                height $avatartitleTimeH
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
                // transition-group会多一个span
                span
                    // 因为子元素abstract，所以必须给span一个高度和relative，不然子元素就脱离span了
                    height 42px
                    position relative
                    flex 1
                    text-align left
                    color white
                    padding-left 10px
                    // 标题-时间
                    .title-time
                        font-weight bold
                    // 摘要，平时隐藏
                    .article-abstract
                        height 42px
                        position absolute
                        top 0
                        overflow hidden
                        font-size 14px
                // 摘要动画
                .abstract-fade-enter-active 
                    transition all 0.3s
                .abstract-fade-leave-active 
                    transition all 0.3s
                .abstract-fade-enter, .abstract-fade-leave-to
                    transform translateX(-10px)
                    opacity 0 

            // 阅读量-评论量
            .article-views-comments
                width 100%
                height $viewsCommentsH
                position relative
                z-index 1
                display flex
                align-items center
                // transition-group会多一个span
                span 
                    display flex
                    
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
                padding-bottom 'calc((100% - 30px)/ %s + %s)' % ($articlePicRatio $avatartitleTimeH)
                position absolute
                top 30px
                right 0
                z-index 0
                transition all 0.3s
            // 背景阴影-hover
            .article-shadow-hover
                width 100%
                padding-bottom 'calc((100% - 30px)/ %s + %s + %s + 30px)' % ($articlePicRatio $avatartitleTimeH $viewsCommentsH)
                top 0
</style>