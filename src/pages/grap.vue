<template>
  <div id="grap">
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-row type="flex" justify="space-around" align="middle" :gutter="20">
        <el-col :span="6">
          <el-form-item label="链接" prop="link">
            <el-input v-model="formData.link" placeholder="请输入链接" clearable :style="{width: '100%'}"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="起始章节" prop="startTitle">
            <el-input v-model="formData.startTitle" placeholder="请输入起始章节" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="结束章节" prop="endTitle">
            <el-input v-model="formData.endTitle" placeholder="请输入结束章节" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" align="middle" :gutter="20">
        <el-col :span="6">
          <el-form-item label="标题过滤" prop="titleFilter">
            <el-input v-model="formData.titleFilter" placeholder="请输入标题过滤" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="正文过滤" prop="contentFilter">
            <el-input v-model="formData.contentFilter" placeholder="请输入正文过滤" clearable :style="{width: '100%'}">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-row type="flex" justify="space-around" align="middle" :gutter="6">
            <el-button type="primary" size="small" @click="resetForm">重置</el-button>
            <el-button type="primary" size="small" @click="doSomething"> 解析 </el-button>
            <el-button type="primary" size="small" v-if="tableData.length > 0" @click="doDownLoad"> 下载 </el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <el-divider></el-divider>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 60%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="标题" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.text }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import Tools from '../tools/utils';

export default {
  name: "grap",
  data () {
    return {
      formData: {
        link: 'https://www.lewen123.net/6/6994/', //基础url
        startTitle: "第1章",
        endTitle: undefined,
        titleFilter: undefined,
        contentFilter: undefined,
      },
      rules: {
        link: [{
          required: true,
          message: '请输入链接',
          trigger: 'blur'
        }],
      },
      tableData: [], //解析列表
      multipleSelection: [],
      queryUrl: '',
    };
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    doSomething: async function () {
      let postData = this.formData;
      let result = await axios.post('vue-api/fetchCatalog',postData);
      let resultData = result.data;
      let temp = resultData&&resultData.data;
      this.tableData = temp;
      this.queryUrl = this.formData&&this.formData.link;
    },
    doDownLoad: async function () {
      if (!Tools.isDataValid(this.multipleSelection) || this.multipleSelection.length < 1) {
        console.log('===TODO 完善错误提示===');
        return;
      }
      let postData = {url: this.queryUrl,list: this.multipleSelection};
      let result = await axios.post('vue-api/doDownload', postData);
      console.log('===result===',result);
      await Tools.writeFile('测试', result&&result.data);
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
  },
};
</script>

<style>
.el-divider {
  margin: 0;
}
</style>