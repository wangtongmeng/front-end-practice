const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: null,
    noneResult: false
  },

  methods: {
    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray)
      this.setMoreData({
        dataArray: tempArray
      })
    },

    getCurrentStart() {
      return this.data.dataArray.length
    },

    setTotal(total) {
      this.data.total = total
      if(total == 0) {
        this.setMoreData({
          noneResult: true
        })
      }
    },
    hasMore() {
      if(this.data.dataArray.length >= this.data.total) {
        return false
      } else {
        return true
      }
    },
    initialize() {
      this.setMoreData({
        dataArray: [],
        noneResult: false
      })
      this.data.total = null
    },
    isLocked() {
			return this.data.loading ? true : false
		},

		locked() {
			this.setData({
				loading: true
			})
		},

		unLocked() {
			this.setData({
				loading: false
			})
		}
  }
})

export {paginationBev}