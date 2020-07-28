<template>
    <div id="footerComp">
        <div class="header">
            <!--Waves Container-->
            <div>
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave"
                            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(68,106,112,0.7)" />
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(68,106,112,0.5)" />
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(68,106,112,0.3)" />
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(68,106,112)" />
                    </g>
                </svg>
            </div>
            <!--Waves end-->
        </div>
        <!--Header ends-->
        <div class="content">
            <div class="contact-icon">
                <i class="wechat-icon" @mouseenter="showCode" @mouseleave="hideCode">
                    <i class="wechat-code" ref="wechatCode"></i>
                </i>
                <a href="https://github.com/qinyj12" target="_blank"><i class="github-icon"></i></a>
            </div>
            <p>京ICP备20012830号-1</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        methods: {
            showCode() {
                this.$refs.wechatCode.style.display = "block"
            },
            hideCode() {
                this.$refs.wechatCode.style.display = "none"
            }
        },
    }
</script>
<style scoped>
    * {
        margin: 0;
    }

    #footerComp {
        margin-top: 100px;
    }

    .header {
        position: relative;
        text-align: center;
        background-color: white;
    }

    .waves {
        position: relative;
        width: 100%;
        height: 15vh;
        margin-bottom: -7px;
        min-height: 100px;
        max-height: 150px;
    }

    /* Animation */
    .parallax>use {
        animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
    }

    .parallax>use:nth-child(1) {
        animation-delay: -2s;
        animation-duration: 7s;
    }

    .parallax>use:nth-child(2) {
        animation-delay: -3s;
        animation-duration: 10s;
    }

    .parallax>use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 13s;
    }

    .parallax>use:nth-child(4) {
        animation-delay: -5s;
        animation-duration: 20s;
    }

    .content {
        background-color: rgba(68, 106, 112);
        padding: 20px;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .contact-icon {
        display: flex;
        margin-bottom: 10px;
    }
    .wechat-icon, .github-icon {
        display: block;
        width: 30px;
        height: 30px;
    }
    .wechat-icon {
        background: url('../assets/icon/wechat.png') no-repeat;
        background-size: contain;
        margin-right: 10px;
        position: relative;
    }
    .wechat-code {
        background: url('../assets/contact/wechat_code.png') no-repeat;
        background-size: contain;
        width: 100px;
        height: 100px;
        position: absolute;
        top: -110px;
        left: -35px;
        display: none;
    }
    .github-icon {
        background: url('../assets/icon/github.png') no-repeat;
        background-size: contain; 
    }
    .content > p {
        text-align: right;
    }

    @keyframes move-forever {
        0% {
            transform: translate3d(-90px, 0, 0);
        }

        100% {
            transform: translate3d(85px, 0, 0);
        }
    }

    /*Shrinking for mobile*/
    @media (max-width: 768px) {
        .waves {
            height: 40px;
            min-height: 40px;
        }
        h1 {
            font-size: 24px;
        }
    }
</style>