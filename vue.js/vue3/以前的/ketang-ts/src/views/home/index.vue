<template>
    <div class="home">
        <!-- 首页头部 -->
        <HomeHeader :category="category" @setCurrentCategory="setCurrentCategory"></HomeHeader>
        <!-- 轮播图 -->
        <HomeSwiper></HomeSwiper>
        <!-- 课程列表 -->
        <HomeList></HomeList>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Store, useStore } from 'vuex'
import { IGlobalState } from '../../store'
import { CATOGORY_TYPES } from '../../typings'
import HomeHeader from './home-header.vue'
import HomeList from './home-list.vue'
import HomeSwiper from './home-swiper.vue'
import * as Types from '@/store/action-types'
// 专门为修改分类使用的 解决了之前的options api 逻辑分散的问题
function useCategory(store: Store<IGlobalState>) {
    let category = computed(() => store.state.home.currentCategory) // vuex中的状态
    function setCurrentCategory(catogory: CATOGORY_TYPES) {
        store.commit(`home/${Types.SET_CATEGORY}`, catogory)
    }
    return {
        category,
        setCurrentCategory
    }
}
// defineComponent 包上这个函数 会有提示功能 vuter也可以
export default defineComponent({
    components: {
        HomeHeader,
        HomeSwiper,
        HomeList
    },
    setup() {
        // 1.需要获取vuex中的分类状态，有个更改状态的功能
        let store = useStore<IGlobalState>()
        let { category, setCurrentCategory } = useCategory(store)
        return {
            category,
            setCurrentCategory
        }
    }
})
</script>