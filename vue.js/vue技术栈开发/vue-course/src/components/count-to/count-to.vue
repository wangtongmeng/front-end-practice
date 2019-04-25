<template>
	<div>
		<span :class="countClass" :id="eleId"></span>
	</div>
</template>
<script>
import CountUp from 'countup'
// import CountUp from 'countup.js'
export default {
	name: 'CountTo',
	data () {
		return {
			counter: {}
		}
	},
	computed: {
		eleId () {
			return `count_up_${this._uid}`
		},
		countClass () {
			return [
				'count-to-number',
				this.className
			]
		}
	},
	props: {
		/**
		 * @description 起始值
		 */
		startVal: {
			type: Number,
			default: 0
		},
		/**
		 * @description 最终值
		 */
		endVal: {
			type: Number,
			required: true
		},
		/**
		 * @description 小数点后保留几位小数
		 */
		decimals: {
			type: Number,
			default: 0
		},
		/**
		 * @description 动画延迟开始时间
		 */
		delay: {
			type: Number,
			default: 0
		},
		/**
		 * @description 渐变时长
		 */
		duration: {
			type: Number,
			default: 1
		},
		/**
		 * @description 是否使用变速效果
		 */
		useEasing: {
			type: Boolean,
			default: false
		},
		/**
		 * @description 数字是否分组
		 */
		useGrouping: {
			type: Boolean,
			default: true
		},
		/**
		 * @description 分组符号
		 */
		separator: {
			type: String,
			default: ','
		},
		/**
		 * @description 整数和小数分割符号
		 */
		decimal: {
			type: String,
			default: '.'
		},
		className: {
			type: String,
			default: ''
		}

	},
	
	mounted () {
		this.$nextTick(() => {
			this.counter = new CountUp(this.eleId, this.startVal, this.endVal, this.decimals,this.duration, {
				useEasing: this.useEasing,
				useGrouping: this.useGrouping,
				separator: this.separator,
				decimal: this.decimal
			})
			setTimeout(() => {
				this.counter.start()
			}, this.delay)
		})
	}
}
</script>
