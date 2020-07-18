<template>
    <div id="boardComp">
        <!-- 留言板内容 -->
        <ul ref="boardRef" class="board-list">
            <li v-for="item in discourseList" :key="item.time">
                <div class="avatar-name">
                    <div class="board-avatar">
                        <img :src="item.user_avatar" alt="头像" width="100%" height="100%">
                    </div>
                    <div class="board-name">{{item.user_name}}</div>
                </div>
                <div class="message-time">
                    <div class="board-message">{{item.comment}}</div>
                    <div class="board-time">{{item.time}}</div>
                </div>
            </li>
        </ul>
        <!-- 留言板页码 -->
        <div class="board-pagination">
            <el-pagination 
                layout="prev, pager, next" 
                :total="commentsCounts" 
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
        <!-- 留言板 -->
        <div class="comments-board">
            <div class="avatar-name">
                <div class="board-avatar">
                    <img :src="currentUser.avatar" alt="头像" width="100%" height="100%">
                </div>
                <div class="board-name">{{currentUser.name}}</div>
            </div>
            <div class="say-something">

                <div class="leave-board">
                    <el-input
                        type="textarea"
                        placeholder="说点什么吧"
                        v-model="boardArea"
                        maxlength="100"
                        show-word-limit
                        :disabled="ifDisabled"
                    >
                    </el-input>
                </div>
                <div class="leave-button">
                    <el-button type="success" v-show="!ifDisabled" @click="sendBoard()" :disabled="buttonDisabled">发送</el-button>
                    <el-button type="success" v-show="ifDisabled" @click="loginFirst()">去登录</el-button>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import store from '../store'
export default {
    data() {
        return {
            pageSize: 2,
            currentPage: 1,
            commentsCounts: null,
            boardArea: '',
            discourseList: '',
            // 给留言板定义一个key，让他更新
            boardKey: 0
        }
    },
    mounted: async function() {
        await this.getBoard();
        // this.fixBoardHeight()
    },
    methods: {
        // 定义一个发布评论的函数
        async sendBoard() {
            let data = new FormData();
            data.append('comment', this.boardArea);
            data.append('usid', store.state.currentUserId);
            await this.axios.post('http://47.100.60.198:5000/sendboard', data).then(resp => {console.log(resp)});
            // 重新获取留言内容，这样就可以更新留言板。也许是因为key变动了组件就会销毁并重新渲染
            this.getBoard()
        },
        // 如果没有登录的话，要先登录才能sendBoard
        loginFirst(){
            this.$router.push('/login')
        },
        // 固定住留言板的高度
        fixBoardHeight() {
            let boardHeight = this.$refs.boardRef.offsetHeight;
            this.$refs.boardRef.style.height = boardHeight + 'px';
        },
        // 定义一个从后端拿到当前article的评论的函数
        getBoard() {
            let data = new FormData();
            let slicePage = [(this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize];
            data.append('comments_for_single', JSON.stringify(slicePage));
            return this.axios.post('http://47.100.60.198:5000/board', data).then(resp => {
                if (resp.data.status == 200) {
                    this.discourseList = resp.data.result.boardList;
                    this.commentsCounts = resp.data.result.count;
                } else {
                    console.log(resp.data.result)
                }
            })
        },
        // 这是element-pagination的函数
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getBoard()
        }
    },
    computed: {
        // 判断输入的评论是否全是空格，如果是不可点击确定
        buttonDisabled: function () {
            if (this.boardArea.split(" ").join("").length != 0) {
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
#boardComp
    ul.board-list
        list-style none
        padding 0
        margin 0
        position relative
        li
            position relative
            display flex
            margin 10px 0
            height 100px
            padding 10px
            .avatar-name
                box-sizing border-box
                height 100px
                display flex
                flex-direction column
                justify-content space-around
                padding 5px 0
                .board-avatar
                    width 50px
                    height 50px
                    box-sizing border-box
                .board-name
                    box-sizing border-box
                    width 50px
            .message-time
                flex 1
                box-sizing border-box
                position relative
                border 1.5px solid rgb(131, 175, 155)
                border-radius 7px
                margin 5px 20px
                display flex
                flex-direction column
                .board-message
                    text-align left
                    font-weight bold
                    height 60%
                    padding 5px
                .board-time
                    flex 1
                    text-align right
                    padding 5px

            // 用来形成对话框的尖角 
            .message-time:before
                content ""
                position absolute
                left -20px
                top calc(50% - 10px)
                border 10px solid
                box-sizing border-box
                border-color transparent rgb(131, 175, 155) transparent transparent
                box-sizing border-box
                width 0px
                height 0px
            .message-time:after
                content ""
                position absolute
                left -18px
                top calc(50% - 10px)
                border 10px solid
                box-sizing border-box
                border-color transparent white transparent transparent
                box-sizing border-box
                width 0px
                height 0px

</style>
<style lang="stylus">
.comments-board
    display flex
    margin 10px 0
    height 100px
    padding 10px
    .avatar-name
        box-sizing border-box
        height 100px
        display flex
        flex-direction column
        justify-content space-around
        padding 5px 0
        .board-avatar
            width 50px
            height 50px
            box-sizing border-box
        .board-name
            box-sizing border-box
            width 50px

    .say-something
        flex 1
        box-sizing border-box
        position relative
        border 1.5px solid rgb(131, 175, 155)
        border-radius 7px
        margin 5px 20px
        display flex
        flex-direction column

        .leave-board
            padding 5px
            height 100%
            .el-textarea
                height 100%
                .el-textarea__inner
                    height 100%
                    padding 0
                    border 0
                    resize none
        .leave-button
            position absolute
            right 0
            bottom -50px

    // 用来形成对话框的尖角 
    .say-something:before
        content ""
        position absolute
        left -20px
        top calc(50% - 10px)
        border 10px solid
        box-sizing border-box
        border-color transparent rgb(131, 175, 155) transparent transparent
        box-sizing border-box
        width 0px
        height 0px
    .say-something:after
        content ""
        position absolute
        left -18px
        top calc(50% - 10px)
        border 10px solid
        box-sizing border-box
        border-color transparent white transparent transparent
        box-sizing border-box
        width 0px
        height 0px

</style>