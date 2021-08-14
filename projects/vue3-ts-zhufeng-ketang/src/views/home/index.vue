<template>
  <div class="home">
    <!-- 首页头部 -->
    <HomeHeader
      :category="category"
      @setCurrentCategory="setCurrentCategory"
    ></HomeHeader>

    <div class="home-container" ref="refreshElm">
      <!-- 轮播图 -->
      <Suspense>
        <template #default>
          <HomeSwiper></HomeSwiper>
        </template>
        <template #fallback>
          <div>loading...</div>
        </template>
      </Suspense>

      <!--课程列表 -->
      <HomeList :lessonList="lessonList"></HomeList>
      <div v-if="isLoading">正在加载....</div>
      <div v-if="!hasMore">我是有底线的....</div>
    </div>
  </div>
</template>
<style lang="scss">
.home-container {
  position: absolute;
  top: 65px;
  bottom: 50px;
  width: 100%;
  overflow-y: scroll;
}
</style>
<script lang="ts">
import { IGlobalState } from "@/store";
import { CATOGORY_TYPES } from "@/typings";
import { computed, defineComponent, onMounted, ref } from "vue";
import { Store, useStore } from "vuex";
import HomeHeader from "./home-header.vue";
import HomeList from "./home-list.vue";
import HomeSwiper from "./home-swiper.vue";
import * as Types from "@/store/action-types";
import { useLoadMore } from "@/hooks/useLoadMore";
// 专门为修改分类使用的 options api
function useCategory(store: Store<IGlobalState>) {
  let category = computed(() => store.state.home.currentCategory); // vuex中的状态
  function setCurrentCategory(category: CATOGORY_TYPES) {
    store.commit(`home/${Types.SET_CATEGORY}`, category);
  }
  return {
    category,
    setCurrentCategory,
  };
}
function useLessonList(store: Store<IGlobalState>) {
  const lessonList = computed(() => store.state.home.lessons.list);
  onMounted(() => {
    // 初始化加载 如果vuex中已经有数据了 就不用继续加载了
    if (lessonList.value.length == 0) {
      store.dispatch(`home/${Types.SET_LESSON_LIST}`);
    }
  });
  return {
    lessonList,
  };
}
export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  setup() {
    // 1.需要获取vuex 中的分类状态 ， 有个更改状态的功能
    let store = useStore<IGlobalState>();
    // 分类
    let { category, setCurrentCategory } = useCategory(store);

    // 课程获取
    let { lessonList } = useLessonList(store);

    // 获取真实dom
    const refreshElm = ref<null | HTMLElement>(null);
    const { isLoading, hasMore } = useLoadMore(
      refreshElm,
      store,
      `home/${Types.SET_LESSON_LIST}`
    );

    return {
      category,
      setCurrentCategory,
      lessonList,
      refreshElm,
      isLoading,
      hasMore,
    };
  },
});
</script>