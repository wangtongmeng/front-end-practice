<template>
  <div class="home">
    <!-- 首页头部 -->
    {{ category }}
    <HomeHeader></HomeHeader>
    <!-- 轮播图 -->
    <HomeSwiper></HomeSwiper>
    <!--课程列表 -->
    <HomeList></HomeList>
  </div>
</template>

<script lang="ts">
import { IGlobalState } from "@/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import HomeHeader from "./home-header.vue";
import HomeList from "./home-list.vue";
import HomeSwiper from "./home-swiper.vue";
import '@/hooks'
export default defineComponent({
  components: {
    HomeHeader,
    HomeList,
    HomeSwiper,
  },
  setup() {
    let store = useStore<IGlobalState>();
    let category = computed(() => {
      return store.state.home.currentCategory;
    });
    return {
      category,
    };
  },
});
</script>