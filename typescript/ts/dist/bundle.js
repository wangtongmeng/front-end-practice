(function () {
	'use strict';

	// 元组 ts中自己实现的 内容固定 类型固定
	var tuple = ['a', true, 1]; // 初始化 必须按照要求填入数据
	// 操作元组
	tuple.pop(); // pop的有可能是这四种类型 let r: string | number | boolean | undefined
	tuple.push('str'); // 在放入时 可以放入元组中定义的类型
	tuple[2] = 100;
	// tuple[3] = 100 // 利用索引不能超出长度 Type '100' is not assignable to type 'undefined'.ts(2322)
	// 数据交换 会用到元素 结合泛型

}());
//# sourceMappingURL=bundle.js.map
