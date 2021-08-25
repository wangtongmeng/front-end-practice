export default {
    state: {
        aAge: 200
    },
    mutations: {
        changeAge(state, payload) {
            state.aAge += payload;
        }
    },
    modules: {
        c: {
            state: {
                cAge: 400
            }
        }
    }
}