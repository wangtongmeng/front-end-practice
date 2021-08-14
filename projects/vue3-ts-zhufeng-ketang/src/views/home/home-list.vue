<template>
  <div>
    <van-card
      v-for="ll in lessonList"
      :key="ll.id"
      :price="ll.price"
      :title="ll.title"
      :thumb="ll.poster"
    >
      <template #tags>
        <van-tag plain type="danger">
          {{ formatCategory(ll.category) }}
        </van-tag>
      </template>
    </van-card>
  </div>
</template>
<script lang="ts">
import { ILesson, ILessons } from "@/typings";
import { computed, defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    lessonList: {
      type: Array as PropType<ILesson[]>,
    },
  },
  setup() {
    // 页面一加载就要获取数据
    function formatCategory(type: number) {
      switch (type) {
        case 1:
          return "react课程";
        case 2:
          return "vue课程";
      }
    }
    return {
      formatCategory,
    };
  },
});
</script>