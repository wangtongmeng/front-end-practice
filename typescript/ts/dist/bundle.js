(function () {
	'use strict';

	// 联合类型 如果不进行初始化操作 必须给类型 否则都是any
	// 默认联合类型 在没有确认类型前 只能调用类型公共的方法
	// 在变量确认类型后 可以设置对应的方法
	// numOrStr.
	// numOrStr = 1
	// numOrStr.
	// numOrStr = 's'
	// numOrStr.
	// 如果赋值类型后，可以根据上下文自动推断对应类型的方法
	// 场景？ 在取值时也会遇到联合类型
	// numOrStr.
	var ele = document.getElementById("app"); // const ele: HTMLElement | null
	// if (ele) {
	//     ele.innerHTML = 'abc'
	// }
	// ele && (ele.innerHTML = 'abc')
	// !非空断言 表示这个东西一定有值，告诉ts 按照我的想法来，如果后续出错我负责 ts特有
	ele.innerHTML = "abc";

}());
//# sourceMappingURL=bundle.js.map
