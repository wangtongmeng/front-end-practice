import { KeywordModel } from '../../models/keyword.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
	/**
	 * 组件的属性列表
	 */
	behaviors: [paginationBev],
	properties: {
		more: {
			type: String,
			observer: 'loadMore',
		},
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		historyWords: [],
		hotWords: [],
		searching: false,
		q: '',
		loading: false,
	},

	attached() {
		this.setData({
			historyWords: keywordModel.getHistory(),
		})

		keywordModel.getHot().then(res => {
			this.setData({
				hotWords: res.hot,
			})
		})
	},

	/**s
	 * 组件的方法列表
	 */
	methods: {
		loadMore() {
			if (!this.data.q) {
				return
			}
			if (this._isLocked()) {
				return
			}
			if (this.hasMore()) {
				this.data.loading = true
				bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
					const tempArray = this.data.dataArray.concat(res.books)
					this.setMoreData(res.books)
					this.data.loading = false // 若 wxml 没绑定，可直接复制改变；若wxml绑定了，需要更新，则需要使用 setData
				})
			}
		},
		onCancel(event) {
			this.triggerEvent('cancel', {}, {})
		},
		onDelete(event) {
			this.setData({
				searching: false,
			})
		},
		onConfirm(event) {
			this._showResult()
			this.initialize()
			const q = event.detail.value || event.detail.text
			bookModel.search(0, q).then(res => {
				this.setMoreData(res.books)
				this.setTotal(res.total)
				this.setData({
					q,
				})
				keywordModel.addToHistory(q)
			})
		},

		_showResult() {
			this.setData({
				searching: true,
			})
		},

		_isLocked() {
			return this.data.loading ? true : false
		},

		_locked() {
			this.data.loading = true
		}
	},
})
