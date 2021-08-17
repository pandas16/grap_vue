<template>
  <div id="demo">
    <el-row type="flex" class="row-bg" justify="center" :gutter="7">
      <el-col :span="5">
        <el-input v-model="input" placeholder="请输入网址"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" v-on:click="doSomething">解析</el-button>
      </el-col>
      <el-col :span="1" v-if="tableData.length > 0">
        <el-button type="primary" v-on:click="doDownLoad">下载</el-button>
      </el-col>
    </el-row>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 60%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="标题" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import * as cheerio from "cheerio";
import Tools from '../tools/utils';

export default {
  name: "demo",
  data () {
    return {
      input: "",
      tableData: [], //解析列表
      multipleSelection: [],
      baseUrl: "/18_18099/", //基础url
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
      /***********************以下是测试代码********************/
      let isHasEndFlag = true;
      let initIndex = -1;
      let endName = ``;
      let urls = [];
      let captionList = []; //标题数组 
      let startName = `第六百三十章`;
      /************************华丽的分割线*********************/

      let data = await axios.get(this.baseUrl, { responseType: "blob" });
      let resultText = await this.getGBKResult(data.data);
      let $ = cheerio.load(resultText, { decodeEntities: false }); //用cheerio解析页面数据
      this.tableData = [];

      $($("dd:nth-of-type(n+7) a").toArray().reverse()).each(
        (index, element) => {
          let $text = $(element).text();
          let $url = $(element).attr("href");
          if (isHasEndFlag && $text.includes(endName)) {
            initIndex = index;
          }
          if (((isHasEndFlag && initIndex > -1) || !isHasEndFlag) && /第.*章.*/.test($text)) {
            captionList.unshift($text);
            urls.unshift($url);
            this.tableData.unshift({ name: $text, url: $url });
          }
          if ($text.includes(startName)) {
            return false;
          }
        }
      );
      console.log("获取数组完成:", JSON.stringify(urls), "数组长度:", urls.length);
    },
    getGBKResult: function (data) {
      return new Promise(function (resolve) {
        let reader = new FileReader();
        reader.readAsText(data, "GBK");
        reader.onload = function () {
          resolve(reader.result);
        };
      });
    },
    doDownLoad: async function () {
      console.log('===Tools===',Tools);
      if (!Tools.isDataValid(this.multipleSelection) || this.multipleSelection.length < 1) {
        console.log('===TODO 完善错误提示===');
        return;
      }
      let result = '';
      for (let index = 0; index < this.multipleSelection.length; index++) {
        try {
          await Tools.delay(250);
          let chapterText = await this.fetchChapter(this.multipleSelection[index]);
          if (Tools.isDataValid(chapterText)) {
            result += chapterText;
          }
          // if (resStr && resStr.length > 0) {
          //   await Tools.writeFile('测试', resStr);
          // } else {
          //   console.log('===TODO 完善错误提示===', '抓取失败');
          // }
        } catch (error) {
          console.log('===TODO 完善错误提示===', error);
        }
      }
      await Tools.writeFile('测试', result);
    },
    fetchChapter: async function (row) {
      console.log('===row===', JSON.stringify(row));
      let url = `${this.baseUrl}${row && row.url}`;
      var str = ``;
      console.log('===url===',url);
      let data = await axios.get(url, { responseType: "blob" });
      let resultText = await this.getGBKResult(data.data);
      let $ = cheerio.load(resultText, { decodeEntities: false }); //用cheerio解析页面数据
      let header = $('h1').text().trim();
      header = header.replace(/（.*?）/, '');
      header = header.replace(/【.*?】/, '');
      str += ('\r\n' + header + '\r\n');
      console.log('===str===', str);
      $('div#content').contents().each((index, element) => {
        let $text = $(element).text().trim();
        if ($text.indexOf('PS：') != -1 || $text.indexOf('PS:') != -1 || $text.indexOf('booktxt') != -1) {
          return false;
        }
        if ($text && $text.length > 0) { //不需要空行
          str += (`    ` + $text + '\r\n');
        }
      });
      return str;
    }
  },
};
</script>

<style>
</style>