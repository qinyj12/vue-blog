<template>
    <div id="searchBar">
        <el-input
            placeholder="请输入内容"
            v-model="input"
            clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
</template>
<script>
export default {
    data() {
        return {
            input: null
        }
    },
}
</script>
<style lang="stylus" scoped>
#searchBar
    flex 1
    height 60px
    display flex
    justify-content center
    align-items center
    .el-input
        max-width 400px
</style>