import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '@/vuex'
import a from './module-a';
import b from './module-b'

// 1.需要先实现 一个Vuex插件， 将用户注入的store 变为每个组件的$store
// 实现state，getters，actions，mutations

Vue.use(Vuex)
const store = new Vuex.Store({
    strict: true,
    state: { // 共享的状态 data
        age: 18,
    },
    getters: { // 计算属性，可以根据状态计算出一个新的状态  computed
        getAge(state) { // 学校的年龄 getter
            console.log('run')
            return state.age - 5;
        }
    },
    mutations: { // 同步的更改状态 ， mutation是唯一的更改状态的方式 (在严格模式下只能通过mutation来更改)
        changeAge(state, payload) {
            state.age += payload;
        }
    },
    actions: {
        changeAge({ commit }, payload) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    commit('changeAge', payload);
                    resolve();
                }, 1000);
            })
        }
    },
    modules: {
        a,
        b
    }
})
// 3.8继续
// 逻辑一般会涉及到共享逻辑 

// A: 获取列表的操作 store.dispatch('changeAge',100)
// B: 获取列表的操作 store.dispatch('changeAge',100)
// store.commit('changeAge', 10)

export default store