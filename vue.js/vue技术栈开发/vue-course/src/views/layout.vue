<template>
	<div class="layout-wrapper">
		<Layout class="layout-outer">
			<Sider collapsible v-model="collapsed" hide-trigger breakpoint="sm"></Sider>
			<Layout>
				<Header class="header-wrapper">
					<Icon :class="triggerClasses" @click.native="handleCollapsed" type="md-menu" :size="32"></Icon>
				</Header>
				<Content class="content-con">
					<Card shadow class="page-card">
						<router-view />
					</Card>
				</Content>
			</Layout>
		</Layout>
	</div>
</template>
<script>
export default {
	data () {
		return {
			collapsed: false
		}
	},
	computed: {
		triggerClasses () {
			return [
				'trigger-icon',
				this.collapsed ? 'rotate': ''
			]
		}
	},
	methods: {
		handleCollapsed () {
			this.collapsed = !this.collapsed
		}
	}
}
</script>
<style lang="less" scoped>
.layout-wrapper, .layout-outer{
	height: 100%;
	.header-wrapper {
		background: #fff;
		box-shadow: 0 1px 1px 1px rgba(0,0,0,.1);
		padding: 0 23px;
		.trigger-icon {
			cursor: pointer;
			transition: transform .3s ease;
			&.rotate {
				transform: rotateZ(-90deg);
				transition: transform .3s ease;
			}
		}
	}
	.content-con{
		padding:10px;
	}
	.page-card{
		min-height:~"calc(100vh - 84px)";
	}

}
</style>

