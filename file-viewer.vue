<template>
  <div class="dw-file-viewer">
    <div
      v-for='(img,index) in sortedFileList'
      :key="img.src + '-' + index"
      class="dw-file-area"
    >
    <el-image
      :src=img.src
      :style=thumbStyle
      :preview-src-list=previewSrcList
    >
      <div slot="error" class="dw-not-image" @click='openFile(img.src, img.title)'>
        <i class="el-icon-document"></i>
      </div>
    </el-image>
    <div v-if='showTitle' class="dw-file-title" :title='img.title'>
      {{img.title}}
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    // 图片或者文件信息
    fileList: {
      type: Array,
      default: function() {
        return [];
      }
    },
    // 参加预览的图片类型，其余文件类型放到新的窗口中查看
    imageTypeList: {
      type: Array,
      default: function() {
        return ["jpg", 'jpeg', 'png'];
      }
    },
    imageTypeProperty: {
      type: String,
      default: "type"
    },
    // 文件src属性
    srcProperty: {
      type: String,
      default: "src"
    },
    // 显示文件名称
    showTitle: {
      type: Boolean,
      default: true
    },
    // 文件标题属性
    titleProperty: {
      type: String,
      default: "title"
    },
    // 缩略图宽度
    thumbWidth: {
      type: String,
      default: "100px"
    },
    // 缩略图高度
    thumbHeight: {
      type: String,
      default: "100px"
    }
  },
  data () {
    return {
      
    }
  },
  created() {

  },
  methods: {
    openFile(url, title) {
      window.open(url, title);
    }
  },
  computed: {
    thumbStyle() {
      return {
        height: this.thumbHeight,
        width: this.thumbWidth
      }
    },
    // 所有的文件信息
    sortedFileList() {
      // 属于设置的图片类型往前放置
      const imageFileList = this.fileList.filter(file => {
        const type = file[this.imageTypeProperty];
        return this.imageTypeList.includes(type);
      });
      console.info("img", imageFileList)
      // 不属于图片类型的往后放置
      const otherFileList = this.fileList.filter(file => {
        const type = file[this.imageTypeProperty];
        return !this.imageTypeList.includes(type);
      })
      return imageFileList.concat(otherFileList).map(file => {
        const src = file[this.srcProperty];
        const title = file[this.titleProperty] || "file";
        return {
          src,
          title
        }
      });
    },
    previewSrcList() {
      // 得到所有的图片地址用来预览
      return this.fileList
        .filter(file => {
          const type = file[this.imageTypeProperty];
          return this.imageTypeList.includes(type);
        })
        .map(file => file[this.srcProperty]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .dw-file-viewer {
    display: flex;
    flex-wrap: wrap
  }
  .dw-file-area {
    margin: 10px;
  }
  /deep/ .dw-not-image {
    font-size: 85px;
    cursor: pointer;
  }
  .dw-file-title {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
