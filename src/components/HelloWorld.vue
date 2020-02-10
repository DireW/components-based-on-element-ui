<template>
  <div class="hello">
    <h1>完整URL：可用</h1>
    <el-upload
      action="http://localhost:8086/upload/post"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <h1>具体请求：不可用，报404</h1>
    <el-upload
      action="/api/upload/post"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <h1>测试</h1>
    <el-button @click="multiRowMessage">
      换行的弹窗
    </el-button>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {
    },
    methods: {
      multiRowMessage() {
        let errorMessage = '服<br/>务<br/>器<br/>异常';
        // 后端的字符串带有“<br/>”标志的，需要将其换行显示，此处渲染成VNode
        if (errorMessage.includes("<br/>")) {
          const h = this.$createElement;
          errorMessage = {
            message: h("div",
              errorMessage.split("<br/>")
                .map(singleLineMsg => {
                  return h("p", singleLineMsg)
                })
            )
          }
        }
        this.$message.error(errorMessage)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
