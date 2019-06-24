<template>
  <div class="home">
    <text-document
      :title.sync="doc.title"
    ></text-document>
  </div>
</template>

<script>
import TextDocument from '@/components/TextDocument.vue'
export default {
  name: 'home',
  components: {
    TextDocument
  },
  data () {
    return {
      doc: {
        title: '文档标题'
      }
    }
  }
}
</script>
