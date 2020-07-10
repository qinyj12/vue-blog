<template>
    <div id="articleDetailComp">
        <!-- 这里是文章 -->
        <div class="article-detail markdown-body" v-html="articleDetail"></div>

        <!-- 这里是评论区 -->
        <div class="article-comments">
            <!-- 这是是发布评论 -->
            <div class="leave">
                <div class="leave-avatar-name">
                    <img :src="leaveComment.avatar" alt="头像" width="100%" height="100%">
                    <div class="leave-name">{{leaveComment.name}}</div>
                </div>
                <div class="leave-comment">
                    <el-input
                        type="textarea"
                        :autosize="{minRows:4}"
                        placeholder="说点什么吧"
                        v-model="commentArea"
                        maxlength="100"
                        show-word-limit
                    >
                    </el-input>
                </div>
            </div>
            <div class="leave-button">
                <el-button type="success" @click="sendComment($route.params.article_id)" :disabled="buttonDisabled">发送</el-button>
            </div>

            <!-- 这里是展示评论的 -->
            <ul class="comments-list">
                <li v-for="item in commentsList" :key="item.comment">
                    <el-divider></el-divider>
                    <div class="avatar-time-comment">
                        <div class="list-avatar">
                            <img :src='item.user_avatar' alt="头像" width="100%" height="100%">
                            <div>{{item.user_name}}</div>
                        </div>
                        <div class="time-comment">
                            <div class="list-time">{{item.time}}</div>
                            <div class="list-comment">{{item.comment}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            articleDetail: '',
            commentArea: '',
            commentsList: '',
            leaveComment: {
                avatar: require("../assets/avatar/avatar1.png"),
                name: 'dog'
            }
        }
    },
    mounted() {
        // 从哪个路由进来的，带进来的article_id是多少
        let articleId = this.$route.params.article_id;
        // 调用函数，带article_id为参数
        this.getArticleDetail(articleId);
        this.getComments(articleId).then(resp => {this.commentsList = resp.data})
    },
    methods: {
        // 定义一个拿到article_id的正文的函数
        getArticleDetail(id) {
            this.axios.get('http://127.0.0.1:5000/article/'+id).then(resp => {
                this.articleDetail = resp.data.result
            })
        },
        // 定义一个发布评论的函数
        sendComment(val) {
            console.log(val)
        },
        getComments(articleId) {
            let data = new FormData();
            let slicePage = [0, 4];
            data.append('comments_for_single', JSON.stringify(slicePage));
            return this.axios.post('http://127.0.0.1:5000/comments/'+articleId, data)
        }
    },
    computed: {
        // 判断输入的评论是否全是空格，如果是不可点击确定
        buttonDisabled: function () {
            if (this.commentArea.split(" ").join("").length != 0) {
                return false
            } else {
                return true
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
#articleDetailComp
    width 100%
    display flex
    flex-direction column
    align-items center
    text-align left
    .article-detail, .article-comments
        border-radius 5px
        padding 40px
        margin-bottom 80px
        box-sizing border-box
        width 892px
        box-shadow 8px 14px 38px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03)
        @media screen and (max-width 1000px)
            width 90%
            padding 20px
            
        .leave
            padding 10px
            display flex
            .leave-avatar-name
                width 50px
                height 50px
            .leave-comment
                box-sizing border-box
                padding 5px
                flex 1

        .leave-button
            padding-right 10px
            display flex
            justify-content flex-end
        
        ul.comments-list
            list-style none
            padding 0
            li
                box-sizing border-box
                min-height 115px
                padding 10px
                display flex
                margin-bottom 5px
                flex-direction column
                .avatar-time-comment
                    width 100%
                    display flex
                    .list-avatar
                        width 50px
                        height 50px
                    .time-comment
                        flex 1
                        display flex
                        flex-direction column
                    .list-time, .list-comment
                        box-sizing border-box
                        text-align left
                        padding 5px
                    .list-comment
                        flex 1
</style>
<style lang="stylus">
// 引入mavon-editor定义的css，而且还要给模板语法的class改成markdown-body，不然很多md方言无法渲染
@import '../../node_modules/mavon-editor/dist/css/index.css'
</style>