<template>
  <ul>
    <li @mousemove.prevent="handleMove" v-for="(item, index) in list" :key="`item_${index}`">
      <!-- <span v-if="!render">{{ item.name }}</span>
      <render-dom v-else :render-func="render" :name="item.name"></render-dom> -->
      <span v-if="!render">{{ item.number }}</span>
      <!-- <render-dom v-else :render-func="render" :number="item.number"></render-dom> -->
			<!-- 结合具名插槽使用 -->
			<!-- <slot name="aa" :number="item.number"></slot>  -->
			<slot :number="item.number"></slot>
    </li>
  </ul>
</template>
<script>
import RenderDom from '_c/render-dom'
export default {
  name: 'List',
  components: {
    RenderDom
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    render: {
      type: Function,
      default: () => {}
    }
	},
	methods: {
		handleMove (event) {
			// event.preventDefault()，在非模版写法中
		}
	}
}
</script>
