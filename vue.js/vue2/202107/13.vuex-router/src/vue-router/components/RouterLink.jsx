// router-link组件的实现
export default {
    name:'RouterLink',
    props: {
        to: String
    },
    render() {
        const handler = () =>{
            this.$router.push(this.to); // 跳转到哪里去
        }
        return <a onClick={handler}>{this.$slots.default}</a>
    }
}