<template>
    <div id="boardComp">
        <!-- 留言板内容 -->
        <ul ref="boardRef">
            <li v-for="item in discourse.slice((currentPage-1)*pageSize, currentPage*pageSize)" 
                :key="item.message"
            >
                <div class="avatar-name">
                    <div class="board-avatar">
                        <img :src="item.avatar" alt="头像" width="100%" height="100%">
                    </div>
                    <div class="board-name">{{item.name}}</div>
                </div>
                <div class="message-time">
                    <div class="board-message">{{item.message}}</div>
                    <div class="board-time">{{item.time}}</div>
                </div>
            </li>
        </ul>
        <!-- 留言板页码 -->
        <div class="board-pagination">
            <el-pagination 
                layout="prev, pager, next"
                :total="4" 
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
        <!-- demo -->
        <div class="demo">
            <div class="avatar-name">
                <div class="board-avatar">
                    <img src="../assets/avatar/avatar1.png" alt="头像" width="100%" height="100%">
                </div>
                <div class="board-name">dog</div>
            </div>
            <div class="message-time">
                <!-- 发布留言 -->
                <div class="leave-board">
                    <el-input
                        type="textarea"
                        :autosize="{minRows:4}"
                        placeholder="说点什么吧"
                        v-model="boardArea"
                        maxlength="100"
                        show-word-limit
                    >
                    </el-input>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            pageSize: 3,
            currentPage: 1,
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
        this.$refs.boardRef.style.height = boardHeight + 'px'
    },
    methods: {
        handleCurrentChange(val) {
            this.currentPage = val
        }
    }
}
</script>
<style lang="stylus" scoped>
#boardComp
    ul
        list-style none
        padding 0
        margin 0
        li
            border 1px solid
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
                    // border 1px solid
                    font-weight bold
                    height 60%
                    padding 5px
                .board-time
                    flex 1
                    text-align right
                    // border 1px solid
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
    .demo
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