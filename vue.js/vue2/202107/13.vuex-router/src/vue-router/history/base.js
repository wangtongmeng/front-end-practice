import { createRoute } from "../create-matcher";

class Base {
    constructor(router) {
        this.router = router;
        // 我的想法是将current属性变成响应式的，如果在渲染router-view时候用到了这个current,等会current变化了就可以重新刷新视图
        this.current = createRoute(null,{path:'/'})
    }

    listen(cb){
        this.cb = cb;
    }

    // 根据路径 拿到对应的record
    transitionTo(location,callback) { // 根据路径进行跳转
        // 根据路径进行匹配 ，匹配到对应的记录
        let record = this.router.match(location); // 尽量不要操作别人家类里面的属性

        this.current =  createRoute(record,{path:location});
        // 这里改了 current的指向
        this.cb && this.cb(this.current);
        // 每次record 发生变化 需要渲染页面 （响应式数据）

        callback && callback(); // 你传递了callback才调用，这个callback默认只有第一次传递
    }   
}


export default Base