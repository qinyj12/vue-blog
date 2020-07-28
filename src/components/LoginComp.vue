<template>
    <!-- 最外层盒子，用于存放组件 -->
    <div id="loginComp">
        <!-- 组件 -->
        <div class="login-box">
            <div class="bar">
                <transition name="left-bar-slide">
                    <!-- 点击按钮切换登录 -->
                    <div v-if="!login" class="login-or-signup">
                        <h1>Welcom Back!</h1>
                        <p>老铁，现在就登录吧！</p>
                        <el-button @click="login = true" round>登录</el-button>
                    </div>
                </transition>

                <transition name="left-blank-slide">
                    <!-- 登录表单 -->
                    <div class="blank left-blank" v-if="login">
                        <div v-if="login" class="login-signup-form login-form">
                            <h1>登录</h1>
                            <el-input placeholder="请输入邮箱" v-model="email" clearable></el-input>
                            <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                            <p>忘记密码啦？</p>
                            <el-button type="success" round :loading="false" @click="confirmLogin()">登录</el-button>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="bar">
                <transition name="right-bar-slide">
                    <!-- 点击按钮切换注册 -->
                    <div v-if="login" class="login-or-signup">
                        <h1>Hello, Friend!</h1>
                        <p>来我博客灌水吧！</p>
                        <el-button @click="login = false" round>注册</el-button>
                    </div>
                </transition>

                <transition name="right-blank-slide">
                    <!-- 注册表单 -->
                    <div class="blank right-blank" v-if="!login">
                        <div v-if="!login" class="login-signup-form signup-form">
                            <h1>注册</h1>
                            <!-- 第一步 -->
                            <div class="father-box-for-step">
                                <transition name="first-step">
                                    <div v-show="!ifNextStep" class="first-step-box">
                                        <el-input placeholder="请输入邮箱" v-model="emailForSignup" clearable></el-input>
                                        <div class="mailcode-btn">
                                            <el-input placeholder="输入验证码" v-model="mailcode" clearable></el-input>
                                            <el-button class="btn-get-mailcode" type="primary" :loading="ifGettingMailcode" @click="sendMailcode">获取验证码</el-button>
                                        </div>
                                        <el-button type="warning" round @click="signupNextStep()">下一步</el-button>
                                    </div>
                                </transition>

                                <transition name="next-step">
                                    <!-- 点击下一步 -->
                                    <div v-show="ifNextStep" class="next-step-box">
                                        <el-input placeholder="请输入昵称" v-model="nicknameForSignup" clearable></el-input>
                                        <el-input placeholder="请输入密码" v-model="passwordForSignup" show-password></el-input>
                                        <el-button type="warning" round :loading="false" @click="confirmSignup()">注册</el-button>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import store from '../store'
export default {
    data() {
        return {
            login: true,
            email: null,
            password: null,
            emailForSignup: null,
            passwordForSignup: null,
            nicknameForSignup: null,
            mailcode: null,
            ifGettingMailcode: false, // 用于获取验证码后button的loading
            ifNextStep: false,
            confirmEmail: null // 用户点击发送验证码后，把email赋值过来
        }
    },
    methods: {
        async confirmLogin() {
            let data = new FormData;
            data.append('email', this.email);
            data.append('password', this.password);
            await this.axios.post('http://47.100.60.198:5000/login', data).then(resp => {
                if (resp.data.status == 200) {
                    this.$message({
                        message: '登录成功，3秒后跳转首页',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 3000);
                    
                } else {
                    this.$message.error(resp.data.result);
                }
            });
            this.getSession()
        },
        getSession() {
            this.axios.defaults.withCredentials = true;
            this.axios.post('http://47.100.60.198:5000/getsession').then(resp => {
                if (resp.data.status == 200) {
                    console.log(resp.data);
                    store.commit('getCurrentUserInfo', resp.data.result)
                } else {
                    store.commit('getCurrentUserInfo', {'avatar':'img/avatar0.png', 'nickname':'未登录'})
                }
            })
        },
        async confirmSignup() {
            let data = new FormData;
            data.append('email', this.confirmEmail);
            data.append('password', this.passwordForSignup);
            data.append('nickname', this.nicknameForSignup);
            data.append('mailcode', this.mailcode);
            await this.axios.post('http://47.100.60.198:5000/signup', data).then(resp => {
                if (resp.data.status == 200) {
                    this.$message({
                        message: '注册成功，3秒后跳转首页',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push('/')
                    }, 3000);
                    
                } else {
                    this.$message.error(resp.data.result);
                    this.$router.go(0)
                }
            });
            this.getSession()
        },
        sendMailcode() {
            this.ifGettingMailcode = true;
            this.confirmEmail = this.emailForSignup;
            this.axios.get('http://47.100.60.198:5000/mailcode?email='+this.confirmEmail+'&purpose=signup')
                .then(resp=>{
                    if (resp.data.status == 200) {
                        this.ifGettingMailcode = false;
                        // console.log(resp.data.result);
                    } else {
                        alert(resp.data.result)
                        this.ifGettingMailcode = false;
                    }
                });
        },
        signupNextStep() {
            this.axios.get('http://47.100.60.198:5000/checkcode?email='+this.confirmEmail+'&mailcode='+this.mailcode+'&purpose=signup')
                .then(resp => {
                    console.log(resp.data);
                    if (resp.data.status == 200) {
                        // alert('验证通过');
                        this.ifNextStep = true
                    } else {
                        alert(resp.data.result)
                    }
                })
        },
        testNextStep() {
            this.ifNextStep = !this.ifNextStep
        }
    },
}
</script>
<style lang="stylus">
.el-input__inner
    background-color #eee
.el-button--default
    background-color transparent
    color white
 
</style>
<style lang="stylus" scoped>
#loginComp
    padding 20px
    margin-bottom 20px
    @media screen and (max-width 800px)
        transform scale(0.9, 0.9)
    @media screen and (max-width 550px)
        transform scale(0.8, 0.8)
        transform-origin 0 center
    
    // 组件外框架
    .login-box
        width 768px
        height 480px
        margin 0 auto
        display flex
        background-image url('../assets/background/animalcrossing2.png')
        background-size cover
        border-radius 15px
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        overflow-x hidden

        // 组件分成左右两半
        .bar
            width 50%
            box-sizing border-box
            display flex
            justify-content center
            align-items center
            position relative
            background-color rgba(0,0,0, 0.6) // 在background-image上加遮罩
            // 点击按钮切换注册或登录
            .login-or-signup
                width 75%
                transition all 0.5s
                height 80%
                display flex
                flex-direction column
                justify-content center
                align-items center
                *
                    margin-top 20px
                h1
                    margin 20px 0
                h1, p
                    color white

            // 左边绿色组件
            .left-bar-slide-enter-active
                transition all 0.5s
            .left-bar-slide-leave-active
                transition all 0.5s
            .left-bar-slide-enter
                transform translateX(-10%)
            .left-bar-slide-leave-to
                transform translateX(-10%)

            // 右边绿色组件
            .right-bar-slide-enter-active
                transition all 0.5s
            .right-bar-slide-leave-active
                transition all 0.5s
            .right-bar-slide-enter
                transform translateX(10%)
            .right-bar-slide-leave-to
                transform translateX(10%)

            // 白色组件
            .blank
                width 100%
                height 100%
                position absolute
                background-color white
                z-index 1
                display flex
                flex-direction column
                justify-content center
                align-items center
                overflow hidden
                // 登录表单/注册表单
                .login-signup-form
                    width 75%
                    transition all 0.5s
                    height 80%
                    display flex
                    flex-direction column
                    justify-content center
                    align-items center
                    *
                        margin-top 20px
                    h1
                        margin 20px 0
                    p
                        color dimgray
                    .father-box-for-step
                        position relative
                        width 100%
                        height 100%

                        .first-step-box
                            .mailcode-btn
                                display flex
                                margin 0
                                .btn-get-mailcode
                                    padding 5px
                                    margin-left 10px

                        .next-step-box
                            position absolute
                            top 0
                        
                        .first-step-leave-active
                            transition all 1s
                            // animation flipInY 1s
                        .first-step-leave-to
                            transform translateX(50%)
                            opacity 0
                        .next-step-enter-active
                            transition all 1s
                            // animation flipOutY 1s
                        .next-step-enter
                            transform translateX(-50%)
                            opacity 0

            .left-blank
                border-radius 15px 0 0 15px
            .right-blank
                border-radius 0 15px 15px 0

            // 左边白色组件的动画
            .left-blank-slide-enter-active
                transition all 0.5s

            .left-blank-slide-leave-active
                transition all 0.5s
                .login-form
                    transform translateX(200%)

            .left-blank-slide-enter
                transform translateX(-100%)
                .login-form
                    transform translateX(200%)

            .left-blank-slide-leave-to
                transform translateX(-100%)

            // 右边白色组件的动画
            .right-blank-slide-enter-active 
                transition all 0.5s

            .right-blank-slide-leave-active
                transition all 0.5s
                .signup-form
                    transform translateX(-200%)

            .right-blank-slide-enter
                transform translateX(100%)
                .signup-form
                    transform translateX(-200%)

            .right-blank-slide-leave-to
                transform translateX(100%)
</style>