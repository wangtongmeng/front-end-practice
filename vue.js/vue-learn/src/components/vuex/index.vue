<template>
    <div>
        <div>{{$store.state.count}}个</div>
        <div>{{$store.getters.score}}</div>
        <button @click="add">加一</button>
        <button @click="addAsync">异步加2</button>
    </div>
</template>

<script>
    export default {
        methods: {
            add() {
               this.$store.commit('increment') 
            },
            addAsync() {
                this.$store.dispatch('incrementAsync')
            }
        },
    }
</script>
