<template>
  <van-swipe v-if="sliderList.length">
    <van-swipe-item v-for="l in sliderList" :key="l.url">
        <img :src="l.url" style="max-width:100%;">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { IGlobalState } from '@/store';
import { computed, defineComponent } from "vue";
import { useStore } from 'vuex';
import * as Types from '@/store/action-types'

export default defineComponent({
    async setup(){
        // 页面一加载就要获取数据
        let store = useStore<IGlobalState>();
        let sliderList = computed(()=> store.state.home.sliders);
        if(sliderList.value.length == 0){ // 缓存 如果数据没有获取过财获取
           await store.dispatch(`home/${Types.SET_SLIDER_LIST}`)
        }
        return {
            sliderList
        }
    }
});
</script>