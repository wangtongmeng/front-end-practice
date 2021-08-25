import Base from "./base";

class BrowserHistory extends Base {
    constructor(router) {
        super(router);
    }
    getCurrentLocation(){
        return window.location.pathname 
    }
    updateLocation(location) {
        history.pushState({},null,location);
    }
    setupListener() {
        // 监听浏览器的前进后退事件
        window.addEventListener('popstate', (e) => {
            this.transitionTo(this.getCurrentLocation()); // 重新跳转
        })
    }
}
export default BrowserHistory