<template>
	<div>
		<Select v-model="selectData" style="width:200px">
			<virtual-list :size="30" :remain="6">
        <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</virtual-list>
    </Select>
		<Select v-model="selectData" style="width:200px">
			<virtual-list :size="30" :remain="6">
        <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</virtual-list>
    </Select>
		<Select v-model="selectData" style="width:200px">
			<virtual-list :size="30" :remain="6">
        <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</virtual-list>
    </Select>
		<Select v-model="selectData" style="width:200px">
			<virtual-list :size="30" :remain="6">
        <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
			</virtual-list>
    </Select>

	</div>
</template>

<script>
	import { doCustomTimes } from '@/lib/tools'
	import VirtualList from 'vue-virtual-scroll-list'
	export default {
		components: {
			VirtualList,
		},
		data() {
			return {
				list: [],
				selectData: 0
			}
		},
		mounted () {
			let list = []
			doCustomTimes(1000, (index) => {
				list.push({
					value: index,
					label: `select${index}`
				})
			})
			this.list = list
		},
	}
</script>

<style scoped>

</style>