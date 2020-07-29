<template>
    <div id="articleDetailComp">
        <!-- 这里是文章 -->
        <div class="article-detail markdown-body" v-html="articleDetail"></div>

        <!-- 这里是评论区 -->
        <div class="article-comments">
            <!-- 这是是发布评论 -->
            <div class="leave">
                <div class="leave-avatar-name">
                    <img :src="currentUser.avatar" alt="头像" width="100%" height="100%">
                    <div class="leave-name">{{currentUser.name}}</div>
                </div>
                <div class="leave-comment">
                    <el-input
                        type="textarea"
                        :autosize="{minRows:4}"
                        placeholder="说点什么吧"
                        v-model="commentArea"
                        maxlength="100"
                        show-word-limit
                        :disabled="ifDisabled"
                    >
                    </el-input>
                </div>
            </div>
            <div class="leave-button">
                <el-button type="success" v-show="!ifDisabled" @click="sendComment()" :disabled="buttonDisabled">发送</el-button>
                <el-button type="success" v-show="ifDisabled" @click="loginFirst()">去登录</el-button>
            </div>

            <!-- 这里是展示评论的 -->
            <ul class="comments-list">
                <li v-for="item in commentsList" 
                    :key="item.time"
                >
                    <el-divider></el-divider>
                    <div class="avatar-time-comment">
                        <div class="list-avatar">
                            <img :src='item.user_avatar' alt="头像" width="100%" height="100%">
                            <div class="list-avatar-name">{{item.user_name}}</div>
                        </div>
                        <div class="time-comment">
                            <div class="list-time">{{item.time}}</div>
                            <div class="list-comment">{{item.comment}}</div>
                        </div>
                    </div>
                </li>
            </ul>
            <el-pagination 
                layout="prev, pager, next" 
                :total="commentsCounts" 
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import store from '../store';
export default {
    data() {
        return {
            articleDetail: '',
            commentArea: '',
            commentsList: '',
            pageSize: 5,
            currentPage: 1,
            commentsCounts: null
        }
    },
    mounted() {
        this.getArticleDetail(this.$route.params.article_id);
        this.getComments(this.$route.params.article_id);
    },
    methods: {
        // 定义一个拿到article_id的正文的函数
        getArticleDetail(id) {
            this.axios.get('https://47.100.60.198:9999/article/'+id).then(resp => {
                this.articleDetail = resp.data.result
            })
        },
        // 定义一个发布评论的函数
        async sendComment() {
            let data = new FormData();
            data.append('article_id', this.$route.params.article_id);
            data.append('comment', this.commentArea);
            data.append('usid', store.state.currentUserId);
            await this.axios.post('https://47.100.60.198:9999/sendcomment', data);
            this.getComments(this.$route.params.article_id)
        },
        // 如果还没有登录的话，需要先跳转登录
        loginFirst() {
            this.$router.push('/login')
        },
        // 定义一个从后端拿到当前article的评论的函数
        getComments(articleId) {
            let data = new FormData();
            let slicePage = [(this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize];
            data.append('comments_for_single', JSON.stringify(slicePage));
            return this.axios.post('https://47.100.60.198:9999/comments/'+articleId, data).then(resp => {
                if (resp.data.status == 200) {
                    this.commentsList = resp.data.result.commentsList;
                    this.commentsCounts = resp.data.result.count;
                } else {
                    alert('出错了')
                }
            })
        },
        // 这是element-pagination的函数
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getComments(this.$route.params.article_id)
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
        },
        // 监控vuex里user状态的变化。一旦变化立即更新
        currentUser: () => {
            return {
                'avatar':store.state.currentUserAvatar,
                'name':store.state.currentUserName,
                'id':store.state.currentUserId
            }
        },
        // 定义一个函数，用来给一些东西做v-show、disabled之类的。如果不是登录状态就是true
        ifDisabled: () => {
            if (store.state.currentUserId == null) {
                return true;
            } else {
                return false;
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
                .leave-name
                    box-sizing border-box
                    width 50px
                    overflow: hidden
                    white-space: nowrap
                    text-overflow: ellipsis
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
                        .list-avatar-name
                            box-sizing border-box
                            width 50px
                            overflow: hidden
                            white-space: nowrap
                            text-overflow: ellipsis
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
#articleDetailComp
    .article-detail
        *
            max-width 100%
</style>