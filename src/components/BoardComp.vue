<template>
    <div id="boardComp">
        <!-- 留言板内容 -->
        <ul ref="boardRef">
            <li v-for="item in discourseList" 
                :key="item.time"
            >
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
                    <img src="../assets/avatar/avatar1.png" alt="头像" width="100%" height="100%">
                </div>
                <div class="board-name">dog</div>
            </div>
            <div class="say-something">
                <!-- 发布留言 -->
                <div class="leave-board">
                    <el-input
                        type="textarea"
                        placeholder="说点什么吧"
                        v-model="boardArea"
                        maxlength="100"
                        show-word-limit
                    >
                    </el-input>
                </div>
                <div class="leave-button">
                    <el-button type="success" @click="sendBoard()" :disabled="buttonDisabled">发送</el-button>
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
            discourse: [
                {
                    message: 'this is the first message',
                    time: '2020年5月21日',
                    avatar: require("../assets/avatar/avatar2.png"),
                    name: 'cat'
                },
                {
                    message: '祝网站早日完工',
                    time: '2020年5月22日',
                    avatar: require("../assets/avatar/avatar1.png"),
                    name: 'dog'
                },
                {
                    message: '我是第三条评论',
                    time: '2020年6月14日',
                    avatar: require("../assets/avatar/avatar1.png"),
                    name: '第三条'
                },
                {
                    message: '我是第四条评论',
                    time: '2020年6月14日',
                    avatar: require("../assets/avatar/avatar1.png"),
                    name: '第四条'
                }
            ]
        }
    },
    mounted: function() {
        let boardHeight = this.$refs.boardRef.offsetHeight;
        this.$refs.boardRef.style.height = boardHeight + 'px';
        this.getBoard();
    },
    methods: {
        // 定义一个发布评论的函数
        sendBoard() {
            let data = new FormData();
            data.append('comment', this.boardArea);
            data.append('usid', store.state.currentUserId);
            this.axios.post('http://127.0.0.1:5000/sendboard', data).then(resp => {console.log(resp)})
        },
        // 定义一个从后端拿到当前article的评论的函数
        getBoard() {
            let data = new FormData();
            let slicePage = [(this.currentPage-1)*this.pageSize, this.currentPage*this.pageSize];
            data.append('comments_for_single', JSON.stringify(slicePage));
            return this.axios.post('http://127.0.0.1:5000/board/', data).then(resp => {
                if (resp.data.status == 200) {
                    this.discourseList = resp.data.result.commentsList;
                    this.commentsCounts = resp.data.result.count;
                } else {
                    alert('出错了')
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
        }
    },
}
</script>
<style lang="stylus" scoped>
#boardComp
    ul
        list-style none
        padding 0
        margin 0
        li
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