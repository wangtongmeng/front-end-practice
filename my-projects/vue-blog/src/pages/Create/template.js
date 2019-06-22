import blog from '@/api/blog'

export default {
  data () {
    return {
      title:'',
      description:'',
      content:'',
      atIndex: false,
    }
  },
  methods: {
    onCreate(){
      blog.createBlog({title:this.title,description:this.description,content:this.content,atIndex:this.atIndex})
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push({path:`/detail/${res.data.id}`})
        })
    }
  }
}
