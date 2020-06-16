<template>
    <div id="headerComp">
        <div class="website-header">MY BLOG</div>
    </div>
</template>
<style lang="stylus" scoped>
#headerComp
    height calc(100vh - 56px)
    width 100vw
    background-image url('../assets/background/animalcrossing3.png')
    background-position-x 60%
    background-size cover
    position relative
    .website-header
        font-size 80px
        font-weight bolder
        font-family "微软雅黑"
        position absolute
        bottom 0
        padding 30px
        color #2F4F4F
        left 10%
        
    @media screen and (max-width 750px)
        height calc(70vh - 56px)
        display flex
        justify-content center
        align-items center
        .website-header
            position relative
            left 0
            @media screen and (max-width 500px)
                font-size 50px
</style>