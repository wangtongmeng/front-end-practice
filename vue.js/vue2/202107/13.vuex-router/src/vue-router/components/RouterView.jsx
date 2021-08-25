export default {
    name:'RouterView',
    mounted(){
        console.log()
    },
    render(){
        return <div>{this.$route.path}</div>
    }
}