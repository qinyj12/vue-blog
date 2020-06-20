<template>
    <div id="publish">
        <div class="publish-header">
            <p>标题</p>
            <!-- 此处输入标题 -->
            <el-input
                type="text"
                placeholder="标题"
                v-model="title"
                maxlength="20"
                show-word-limit
            >
            </el-input>
            <!-- 此处选择是否输入摘要 -->
            <p>摘要</p>
            <el-switch
                v-model="ifWriteAbstract"
                active-color="#13ce66"
                active-text="写摘要"
                inactive-text="不写摘要"
            >
            </el-switch>
            <!-- 此处手动输入摘要 -->
            <el-input
                type="textarea"
                :rows="2"
                placeholder="手动写摘要"
                v-model="abstract"
                maxlength="100"
                show-word-limit
                :disabled="!ifWriteAbstract"
            >
            </el-input>
            <!-- 此处选择头像 -->
            <p>头像</p>
            <ul>
                <li v-for="(item, index) in avatarList" :key="item">
                    <img :src="item" alt="头像" width="80px" ref="avatarImg" @click="chooseAvatar(index)">
                    <i class="chosen-icon" ref="avatarChosen" :class="{'if-chosen': index !== chooseWhichAvatar}"></i>
                </li>
            </ul>

        </div>

        <mavon-editor v-model="mavonContent"/>
    </div>
</template>
<script>
export default {
    data() {
        return {
            mavonContent: '',
            ifWriteAbstract: false,
            abstract: '',
            title: '',
            avatarList: [],
            chooseWhichAvatar: '',
        }
    },
    mounted() {
        let a = require.context('../assets/avatar', false, /\.png/).keys();
        a.forEach((item) => {
            // require本地图片，并且参数不能是纯动态的
            this.avatarList.push(require('../assets/avatar' + item.replace(/./,'')))
        });
    },
    methods: {
        chooseAvatar(index) {
            this.chooseWhichAvatar = index
        }
    },
}
</script>
<style lang="stylus" scoped>
#publish
    box-sizing border-box
    padding 50px
    .publish-header
        margin 20px
        text-align left
        *
            margin-bottom 20px
        ul
            border 1px solid
            list-style none
            padding 0
            display flex
            li
                height 80px
                width 80px
                position relative
                margin 0
                border 1px solid
                img
                    margin 0
                .chosen-icon
                    display block
                    width 30px
                    height 30px
                    position absolute
                    right 0
                    bottom -20px
                    background-image url('../assets/icon/chosen.png')
                    background-size cover
                .if-chosen
                    display none
    .markdown-body
        height calc(100vh - 100px)
        z-index 0
</style>