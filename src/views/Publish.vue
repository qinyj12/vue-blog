<template>
    <div id="publish">
        <mavon-editor v-model="value"/>
    </div>
</template>
<style lang="stylus" scoped>
#publish
    box-sizing border-box
    height calc(100vh - 56px)
    padding 50px
    .markdown-body
        height 100%
        z-index 0
</style>