<template>
    <div class="page">
        <!-- 页面名 -->
        <div class="page-title">
            <slot name="page-title">页面总标题</slot>
        </div>
        <!-- 页面子部分 -->
        <div class="page-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "PageTemplate"
};
</script>
<style lang="less" scoped>
.page {
    .page-title {
        height: 30px;
        line-height: 30px;
        padding: 20px;
        font-size: 28px;
    }
    .page-content {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding-bottom: 100px;
    }
}
</style>
