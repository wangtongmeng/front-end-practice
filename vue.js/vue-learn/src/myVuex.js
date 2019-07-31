let Vue

class Store {
    constructor(options) {
        this.state = new Vue({
            data: options.state
        })

        this.mutations = options.mutations
        this.actions = options.actions

        options.getters && this.handleGetters(options.getters)
    }
    // 声明为箭头函数，为什么？是this一直执行store
    commit = (type, arg) => {
        this.mutations[type](this.state, arg)
    }

    dispatch(type, arg) { // dispatch不会被别人引用了，所以内部this会一直指向store
        this.actions[type]({
            commit: this.commit,
            state: this.state
        }, arg)
    }

    handleGetters(getters) {
        this.getters = {}
        // 遍历getters所有key
        Object.keys(getters).forEach(key => {
            // 为this.getters定义若干属性，这些属性是只读的
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return getters[key](this.state)
                }
            })
        })
    }
}

function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install }