<template>
    <div id="boardComp">
        <ul>
            <li v-for="item in discourse" :key="item.message">
                <div class="avatar-name">
                    <div class="board-avatar">{{item.avatar}}</div>
                    <div class="board-name">{{item.name}}</div>
                </div>
                
                <div class="time-message">
                    <div>{{item.time}}</div>
                    <div>{{item.message}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            discourse: [
                {
                    message: 'this is the first message',
                    time: '2020年5月21日',
                    avatar: '1',
                    name: 'qinyj'
                }
            ]
        }
    },
}
</script>
<style lang="stylus" scoped>
#boardComp
    border 1px solid blue
    height 500px
    ul
        list-style none
        padding 0
        margin 0
        li
            border 1px solid
            display flex
            margin 10px 0
            height 100px
            .avatar-name
                border 1px solid
                box-sizing border-box
                height 100px
                display flex
                flex-direction column
                justify-content space-around
                padding 10px
                .board-avatar
                    width 50px
                    height 50px
                    border 1px solid
                    box-sizing border-box
                .board-name
                    border 1px solid
                    box-sizing border-box
                    width 50px
            .time-message
                border 1px solid
                
</style>