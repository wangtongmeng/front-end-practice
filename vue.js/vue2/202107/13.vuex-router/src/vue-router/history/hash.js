import Base from "./base";

function ensureHash(){
    if(window.location.hash)return

    window.location.hash = '/'
}


class HashHistroy extends Base{
    constructor(router){
        super(router);
        // 确保刷新的时候有hash #
        ensureHash()
    }
    getCurrentLocation(){ // 获取当前的路径
        return window.location.hash.slice(1)
    }
    setupListener(){
        window.addEventListener('hashchange',()=>{
            this.transitionTo(this.getCurrentLocation())
        })
    }
    updateLocation(location){
        window.location.hash = location
    }
}

export default HashHistroy