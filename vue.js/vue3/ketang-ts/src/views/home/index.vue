<template>
    <div class="home">
        <!-- 首页头部 -->
        <HomeHeader></HomeHeader>  
        <!-- 轮播图 -->
        <HomeSwiper></HomeSwiper>
        <!-- 课程列表 -->
        <HomeList></HomeList>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import HomeHeader from './home-header.vue'
import HomeList from './home-list.vue'
import HomeSwiper from './home-swiper.vue'
// defineComponent 包上这个函数 会有提示功能 vuter也可以
export default defineComponent({
    components: {
        HomeHeader,
        HomeSwiper,
        HomeList
    }
})
</script>