
// 函数会在 store 实例初始化时调用
export default store => {
	if (localStorage.state) store.replaceState(JSON.parse(localStorage.state))
	store.subscribe((mutations, state) => {
		// 每次提交 mutation 时，都会调用此回调函数
		localStorage.state = JSON.stringify(state)
	})
}