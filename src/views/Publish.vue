<template>
    <div id="publish">
        <p>
            <button @click="testApi">test</button>
        </p>
        <!-- 此处输入标题 -->
        <p>标题</p>
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
        <!-- 此处选择封面图 -->
        <p>封面图</p>        
        <el-upload
            class="cover-uploader"
            action="http://127.0.0.1:5000/savecover"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
            <img v-if="tempImageUrl" :src="tempImageUrl" class="cover">
            <i v-else class="el-icon-plus cover-uploader-icon"></i>
        </el-upload>
        <!-- 此处是撰写正文 -->
        <p>正文</p>
        <mavon-editor @save="saveMavon" />
    </div>
</template>
<script>

export default {
    data() {
        return {
            ifWriteAbstract: false,
            abstract: null,
            title: null,
            avatarList: [],
            chooseWhichAvatar: null,
            chosenAvatar: null,
            tempImageUrl: null,
            tempImageName: null,
            ifTempImgSuccess: false,
            articleContent: null
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
        // 测试后端接口
        testApi() {
            this.axios.post('http://127.0.0.1:5000/hello')
                .then(response => {
                    console.log(response);
                    alert(response.data.msg)
                })
        },
        // 选择头像
        chooseAvatar(index) {
            this.chooseWhichAvatar = index;
            this.chosenAvatar = this.avatarList[this.chooseWhichAvatar];
        },
        // 上传封面图
        handleAvatarSuccess(res, file) {
            if (res.status == 200) {
                this.tempImageUrl = URL.createObjectURL(file.raw);
                this.tempImageName = res.result;
            } else {
                alert(res.result)
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 定义一个保存博客的方法
        saveArticle() {
            if (this.title && this.abstract && this.chosenAvatar && this.articleContent && this.tempImageName) {
                // 跨域发送cookie
                this.axios.defaults.withCredentials = true;
                let data = new FormData();
                data.append('title', this.title);
                data.append('abstract', this.abstract);
                data.append('avatar', this.chosenAvatar.replace("img/", ""));
                data.append('content', this.articleContent);
                data.append('cover', this.tempImageName);
                return this.axios.post('http://127.0.0.1:5000/savearticle', data)
            } else {
                return '不能为空'
            }

        },
        // 保存md
        saveMavon(value) {
            let that = this;
            const h = this.$createElement;
            this.$msgbox({
                title: "保存",
                message: h("p", null, "确定保存吗"),
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                beforeClose: async (action, instance, done) => {
                    if (action === "confirm") {
                        this.articleContent = value;
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = "保存中...";
                        try {
                            let response = await that.saveArticle();
                            console.log(response.data);
                            instance.confirmButtonLoading = false;
                            done()
                        } catch {
                            console.log('出错了');
                            instance.confirmButtonLoading = false;
                            instance.confirmButtonText = "确定";
                        }

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
        *:not(.cover-uploader-icon):not(.cover):not(.chosen-icon) {
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
<style lang="stylus">
.cover-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    
}
.cover-uploader .el-upload:hover {
    border-color: #409EFF;
}
.cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    display: flex;
    justify-content: center;
    margin-bottom: 0;
}
.cover {
    width: 178px;
    height: 178px;
    display: block;
}
</style>