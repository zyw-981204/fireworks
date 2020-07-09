<template>
  <div>
    <!-- <el-upload
      action="/api/v1/photo/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      show-file-list="true"
      :file-list="fileList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" v-for="file in fileList" :key="file.name">
      <img width="100%" :src="dialogImageUrl" alt="图片" />
    </el-dialog> -->
    <input type="file" @change="getFile" ref="uploadNode">
    123123123
  </div>
</template>

<script>
export default {
  name: "photoWall",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      i:0,
      fileList: [],
       dialogImageUrl: '',
        dialogVisible: false
    };
  },
  methods: {
    getFile(event){
      fileList[i].id = i;
      fileList[i].file = event.target.file;
      FileList.ownerId = this.$store.state.userId

    }
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
