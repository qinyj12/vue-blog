<template>
    <div id="articleDetailComp">
        <!-- 这里是文章 -->
        <div class="article-detail">基本信息</div>
        <!-- 这里是评论区 -->
        <div class="article-comments">
            <!-- 这是是发布评论 -->
            <div class="leave">
                <div class="leave-avatar-name">
                    <img :src="leaveComment.avatar" alt="头像" width="100%" height="100%">
                    <div class="leave-name">{{leaveComment.name}}</div>
                </div>
                <div class="leave-comment">
                    <textarea class="write-comment"></textarea>
                </div>
            </div>
            <!-- 这里是展示评论的 -->
            <ul class="comments-list">
                <li v-for="item in comments" :key="item.comment">
                    <el-divider></el-divider>
                    <div class="avatar-time-comment">
                        <div class="list-avatar">
                            <img :src="item.avatar" alt="头像" width="100%" height="100%">
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
            comments: [
                {
                    comment: 'this is the first message',
                    time: '2020年5月21日',
                    avatar: require("../assets/avatar/avatar2.png"),
                    name: 'cat'
                },
                {
                    comment: 'this is the second message',
                    time: '2020年5月22日',
                    avatar: require("../assets/avatar/avatar1.png"),
                    name: 'dog'
                }
            ],
            leaveComment: {
                avatar: require("../assets/avatar/avatar1.png"),
                name: 'dog'
            }
        }
    },
}
</script>
<style lang="stylus" scoped>
#articleDetailComp
    .article-detail, .article-comments
        border-radius 5px
        padding 40px
        margin-bottom 80px
        box-sizing border-box
        width 892px
        box-shadow 8px 14px 38px rgba(39,44,49,.06), 1px 3px 8px rgba(39,44,49,.03)
        .leave
            box-sizing border-box
            padding 10px
            display flex
            min-height 115px
            .leave-avatar-name
                width 50px
                height 50px
            .leave-comment
                box-sizing border-box
                padding 5px
                flex 1
                textarea.write-comment
                    border-radius 5px
                    height 50px
                    width 100%
                    resize none
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