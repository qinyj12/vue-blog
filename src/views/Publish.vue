<template>
    <div id="publish">
        <p>
            <button @click="testApi">test</button>
        </p>
        <p>标题</p>
        <!-- 此处输入标题 -->
        <el-input type="text" placeholder="标题" v-model="title" maxlength="20" show-word-limit></el-input>
        <!-- 此处选择是否输入摘要 -->
        <p>摘要</p>
        <el-switch v-model="ifWriteAbstract" active-color="#13ce66" active-text="写摘要" inactive-text="不写摘要">
        </el-switch>
        <!-- 此处手动输入摘要 -->
        <el-input type="textarea" :rows="2" placeholder="手动写摘要" v-model="abstract" maxlength="100" show-word-limit
            :disabled="!ifWriteAbstract"></el-input>
        <!-- 此处选择头像 -->
        <p>头像</p>
        <ul>
            <li v-for="(item, index) in avatarList" :key="item">
                <img :src="item" alt="头像" width="80px" ref="avatarImg" @click="chooseAvatar(index)" />
                <i class="chosen-icon" ref="avatarChosen" :class="{'if-chosen': index !== chooseWhichAvatar}"></i>
            </li>
        </ul>
        <p>正文</p>
        <mavon-editor @save="saveMavon" />
    </div>
</template>
<script>
export default {
    data() {
        return {
            ifWriteAbstract: false,
            abstract: "",
            title: "",
            avatarList: [],
            chooseWhichAvatar: "",
            chosenAvatar: ''
        };
    },
    mounted() {
        let a = require.context("../assets/avatar", false, /\.png/).keys();
        a.forEach(item => {
            // require本地图片，并且参数不能是纯动态的
            this.avatarList.push(require("../assets/avatar" + item.replace(/./, "")));
        });
    },
    methods: {
        // 选择头像
        chooseAvatar(index) {
            this.chooseWhichAvatar = index;
            this.chosenAvatar = this.avatarList[this.chooseWhichAvatar]
        },
        // 测试后端接口
        testApi() {
            this.axios.post('http://127.0.0.1:5000/hello')
                .then(response => {
                    console.log(response);
                    alert(response.msg)
                })
        },
        // 保存md
        saveMavon(value) {
            console.log(value);
            const h = this.$createElement;
            this.$msgbox({
                title: "保存",
                message: h("p", null, "确定保存吗"),
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                beforeClose: (action, instance, done) => {
                    if (action === "confirm") {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = "保存中...";
                        // 跨域发送cookie
                        this.axios.defaults.withCredentials = true;
                        let data = new FormData();
                        data.append('title', this.title);
                        data.append('abstract', this.abstract);
                        data.append('avatar', this.chosenAvatar);
                        data.append('content', value);
                        this.axios
                            .post('http://127.0.0.1:5000/savearticle', data)
                                .then(response => {
                                        console.log(response);
                                        done()
                                    }
                                )
                        // setTimeout(() => {
                        //     done();
                        //     // setTimeout(() => {
                        //     //     instance.confirmButtonLoading = false;
                        //     // }, 300);
                        // }, 1000);
                    } else {
                        done();
                    }
                }
            }).then(action => {
                this.$message({
                    type: "info",
                    message: "action: " + action
                });
            }).catch(()=>{
                // 点击取消
                console.log("cancel")
            })
        }
    }
};
</script>
<style lang="stylus" scoped>
    #publish {
        box-sizing: border-box;
        padding: 50px;
        * {
            text-align: left;
            margin-bottom: 20px;
        }

        .el-switch {
            display: flex;
        }

        ul {
            list-style: none;
            padding: 0;
            display: flex;

            li {
                height: 80px;
                width: 80px;
                position: relative;
                margin-bottom: 0;
                margin-right: 20px;
                border: 2px solid DimGray;

                img {
                    margin: 0;
                }

                .chosen-icon {
                    display: block;
                    margin-bottom 0;
                    width: 30px;
                    height: 30px;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    background-image: url('../assets/icon/chosen.png');
                    background-size: cover;
                }

                .if-chosen {
                    display: none;
                }
            }
        }

        .markdown-body {
            height: calc(100vh - 100px);
            z-index: 0;
        }
    }
</style>