<template>
  <div class="home">
    <v-card>
      <v-card-text>
        <form class="form-horizontal" role="form">
          <div class="form-group" style="margin-top:15px">
            <label class="control-label col-md-1" style="margin-top: 11px;">微信群简称</label>
            <div class="col-md-2">
              <v-text-field dense hide-details outlined
                            v-model="searchParams.weChatName"></v-text-field>
            </div>
          </div>
        </form>
        <v-data-table
            :headers="headers"
            :items="guideWechatList"
            :loading="tableLoading"
            hide-default-footer
            class="elevation-1"
        >
          <template v-slot:item.managerimgid="{item}">
            <img v-if="item.managerImgId" style="width: 150px; height: auto;" class="ma-1"
                 :src="showPicUrl + item.managerImgId">
          </template>
          <template v-slot:item.wechatimgid="{item}">
            <img v-if="item.weChatImgId" style="width: 150px; height: auto;" class="pa-1"
                 :src="showPicUrl + item.weChatImgId">
          </template>
          <template v-slot:item.operate="{item}">
            <v-btn x-small @click="showEditFun(item)">编辑</v-btn>
            <v-btn x-small @click="deleteFun(item)" color="error">删除</v-btn>

          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-row>
                <v-col class="text-end">
                  <v-btn small color="primary" dark class="ma-2"
                         @click="showAddFun">新增
                  </v-btn>
                  <v-btn small color="primary" dark class="ma-2" @click="listGuideWechatsFun">
                    查询
                  </v-btn>
                  <v-btn small color="primary" dark class="ma-2"
                         @click="resetSearchParamsFun">重置
                  </v-btn>
                </v-col>
              </v-row>
            </v-toolbar>
          </template>

        </v-data-table>
        <div class="text-center pt-2">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="searchParams.pageNow"
              :page-sizes="[5, 10, 20, 30]"
              :page-size="searchParams.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="searchParams.total"
          >
          </el-pagination>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog
        v-model="dialog"
        max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">{{form.title}}</span>
        </v-card-title>
        <v-card-text>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <v-text-field v-model="form.weChatName" outlined dense hide-details></v-text-field>
            </el-form-item>
            <el-form-item label="有效时间">
              <el-date-picker
                  v-model="form.startTimeStrAndEndTimeStr"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="群管理员二维码">
              <el-upload
                  class="uploadPic pb-3"
                  name="files"
                  :action="uploadPicUrl"
                  :file-list="managerImgFileList"
                  :limit="1"
                  :before-upload="beforeUpload"
                  :on-exceed="onExceed"
                  :on-success="managerImgOnSuccess"
                  :on-remove="managerImgOnRemove"
                  list-type="picture"
                  accept="image/png, image/jpeg, image/gif"
              >
                <v-btn
                    color="warning"
                    small
                    :disabled="uploadBtnDisabled"
                >
                  点击上传
                </v-btn>
                <div slot="tip" class="el-upload__tip">只能上传一张jpg/png/gif文件，且不超过120kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="群加入二维码">
              <el-upload
                  class="uploadPic pb-3"
                  name="files"
                  :action="uploadPicUrl"
                  :file-list="weChatImgFileList"
                  :limit="1"
                  :before-upload="beforeUpload"
                  :on-exceed="onExceed"
                  :on-success="weChatImgOnSuccess"
                  :on-remove="weChatImgOnRemove"
                  list-type="picture"
                  accept="image/png, image/jpeg, image/gif"
              >
                <v-btn
                    color="warning"
                    small
                    :disabled="uploadBtnDisabled"
                >
                  点击上传
                </v-btn>
                <div slot="tip" class="el-upload__tip">只能上传一张jpg/png/gif文件，且不超过120kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="是否启用">
              <v-switch class="mt-1"
                        v-model="form.alreadyUse"
                        :label="form.alreadyUse ? '启用' : '停用'"
              ></v-switch>
            </el-form-item>
          </el-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="Error" text @click="dialog = false">
            关 闭
          </v-btn>
          <v-btn color="primary" @click="toSaveFun" :loading="saveBtnLoading" :disabled="saveBtnLoading">
            保 存
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
  },
  data: () => {
    return {
      showPic: '',
      tableLoading: false,
      guideWechatList: [],
      searchParams: {
        weChatName: '',
        pageNow: 1,
        pageSize: 10,
        total: 0,
      },
      headers: [
        {text: '微信群简称', align: 'start', sortable: false, value: 'weChatName'},
        {text: '生效时间', align: 'start', sortable: false, value: 'startTimeStr'},
        {text: '失效时间', align: 'start', sortable: false, value: 'endTimeStr'},
        {text: '群管理员二维码', align: 'center', sortable: false, value: 'managerimgid'},
        {text: '群加入二维码', align: 'start', sortable: false, value: 'wechatimgid'},
        {text: '状态', align: 'start', sortable: false, value: 'statusText'},
        {text: '操作', align: 'start', sortable: false, value: 'operate'},
      ],
      dialog: false,
      form: {
        saveType: 'add',
        title: '新增',
        weChatName: '',
        startTimeStrAndEndTimeStr: '',
        startTimeStr: '',
        endTimeStr: '',
        managerImgId: 0,
        weChatImgId: 0,
        status: '',
        alreadyUse: true,
      },
      defaultForm: {
        saveType: 'add',
        title: '新增',
        weChatName: '',
        startTimeStrAndEndTimeStr: '',
        startTimeStr: '',
        endTimeStr: '',
        managerImgId: '',
        weChatImgId: '',
        status: '',
        alreadyUse: true,
      },

      showPicUrl: '',
      uploadPicUrl: '',
      managerImgFileList: [], // 上传图片列表
      weChatImgFileList: [], // 上传图片列表
      uploadBtnDisabled: false, // 上传图片按钮的禁用，上传一张后禁用
      saveBtnDisabled: false, // 上传图片按钮的禁用，上传一张后禁用
      saveBtnLoading: false,

    };
  },
  mounted() {
    this.listGuideWechatsFun();
  },
  watch: {
    'dialog': function (val) {
      if (!val) {
        this.form = {
          saveType: 'add',
          title: '新增',
          weChatName: '',
          startTimeStrAndEndTimeStr: '',
          startTimeStr: '',
          endTimeStr: '',
          managerImgId: '',
          weChatImgId: '',
          status: '',
          alreadyUse: true,
        };
        this.managerImgFileList = []; // 上传图片列表
        this.weChatImgFileList = []; // 上传图片列表
      }
    },
    'form.startTimeStrAndEndTimeStr': function (val) {
      if (!val) {
        this.form.startTimeStr = '';
        this.form.endTimeStr = '';
      }
      this.form.startTimeStr = val[0] ? moment(val[0]).format('YYYY-MM-DD HH:mm:ss') : '';
      this.form.endTimeStr = val[1] ? moment(val[1]).format('YYYY-MM-DD HH:mm:ss') : '';
    }
  },
  methods: {
    // 去保存数据
    toSaveFun() {
      let that = this;
      that.saveBtnLoading = true;
      that.axios.post(that.$appProp.url.saveGuideWechat, that.$qs.stringify(that.form))
          .then(res => {
            if (res.data.code == 0) {
              that.listGuideWechatsFun();
              that.dialog = false;
            }
            that.saveBtnLoading = false;
          })
    },
    showAddFun() {
      this.dialog = true;
    },
    showEditFun(item) {
      this.form = {
        saveType: 'edit',
        title: '编辑',
        guideWechatId: item.guideWechatId,
        weChatName: item.weChatName,
        startTimeStrAndEndTimeStr: [item.startTimeStr, item.endTimeStr],
        startTimeStr: item.startTimeStr,
        endTimeStr: item.endTimeStr,
        managerImgId: item.managerImgId,
        weChatImgId: item.weChatImgId,
        status: item.status,
        alreadyUse: item.status == 'alreadyUse',
      }
      this.managerImgFileList = [{url: this.showPic + item.managerImgId}]; // 上传图片列表
      this.weChatImgFileList = [{url: this.showPic + item.weChatImgId}]; // 上传图片列表
      this.dialog = true;
    },
    deleteFun(item) {
      let that = this;

      that.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.axios.post(that.$appProp.url.deleteGuideWechat, that.$qs.stringify({guideWechatId: item.guideWechatId}))
            .then(res => {
              if (res.data.code == 0) {
                that.listGuideWechatsFun();
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }
            })
      });


    },
    resetSearchParamsFun() {
      this.searchParams = {
        weChatName: '',
        pageNow: 1,
        pageSize: 10,
        total: 0,
      };
      this.listGuideWechatsFun();
    },
    listGuideWechatsFun() {
      let that = this;
      that.tableLoading = true;
      that.axios.post(that.$appProp.url.listGuideWechats, that.$qs.stringify(that.searchParams))
          .then(res => {
            if (res.data.code == 0) {
              that.searchParams.total = res.data.result.total;
              that.guideWechatList = res.data.result.rows;
            }
            that.tableLoading = false;
          })
    },
    handleSizeChange: function (size) {
      this.searchParams.pageSize = size;
      this.listGuideWechatsFun();
    },
    handleCurrentChange: function (current) {
      this.searchParams.pageNow = current;
      this.listGuideWechatsFun();
    },
    /**
     * 文件上传时的钩子
     * @param file
     */
    beforeUpload(file) {
      if (file.size > 120000) { // 120kb
        this.$notify({
          title: '图片大小不能超过120KB',
          type: 'warning'
        });
        return false;
      }
    },
    /**
     * 上传文件超出个数时的钩子
     * @param files
     * @param fileList
     */
    onExceed(files, fileList) {
      this.$notify({
        title: '只能上传一张图片',
        type: 'warning'
      });
    },
    /**
     * 上传成功之后的钩子
     * @param response
     * @param file
     * @param fileList
     */
    managerImgOnSuccess(response, file, fileList) {
      if (response.mes == 'Y') {
        this.form.managerImgId = response.resourceIds[0];
      }
    },
    weChatImgOnSuccess(response, file, fileList) {
      if (response.mes == 'Y') {
        this.form.weChatImgId = response.resourceIds[0];
      }
    },
    managerImgOnRemove(file, fileList) {
      this.form.managerImgId = 0;
    },
    weChatImgOnRemove(file, fileList) {
      this.form.weChatImgId = 0;
    },
  },
}
</script>
