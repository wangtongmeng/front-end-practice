export default {
    state: {
        bAge: 300
    },
    mutations: {
        changeAge(state, payload) {
            state.bAge += payload;
        }
    }
}