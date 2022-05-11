<template>
    <div id="messageList">
        <div class="top" style="margin-bottom: 10px">
            <div class="searchTop">
                <div>
                    <el-col :span="16">
                        <el-select style="width: 100%" v-model="groupId" placeholder="请选择分组">
                            <el-option
                                    v-for="item in groupList"
                                    :key="item.id"
                                    :label="item.group_name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2" style="margin-left: 5px">
                        <div class="grid-content bg-purple">
                            <button class="btnSearch" @click="query('group_id')">查询</button>
                        </div>
                    </el-col>
                </div>
                <div>
                    <el-col :span="6" style="line-height: 40px;text-align: center">
                        客服编号
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-input :span="4" v-model="noQuery" placeholder="请输入客服编号"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="2" style="margin-left: 5px">
                        <div class="grid-content bg-purple">
                            <button class="btnSearch" @click="query('no')">查询</button>
                        </div>
                    </el-col>
                </div>
                <div>
                    <el-col :span="4">
                        <div class="block">
                            <el-date-picker
                                    v-model="value2"
                                    type="datetimerange"
                                    :picker-options="pickerOptions"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    align="right">
                            </el-date-picker>
                        </div>
                    </el-col>
                </div>
            </div>
        </div>
        <el-table
                height="90%"
                v-loading="loading"
                ref="multipleTable"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                :data="tableData" border
                style="width: 100%;margin-bottom: 60px">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="last_time" label="用户访问时间"></el-table-column>
            <el-table-column prop="username" label="用户 ID"></el-table-column>
            <el-table-column prop="customer_no" label="客服编号"></el-table-column>
            <el-table-column prop="group_name" label="对接组"></el-table-column>
            <el-table-column prop="opt" label="操作">
                <template slot-scope="scope">
                    <button
                            class="btnDetail"
                            @click="handleEdit(scope.$index, scope.row)">详情
                    </button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page_box" v-show="total">
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="current_page"
                        :page-sizes="[10,20,50,100]"
                        :page-size="per_page"
                        layout="sizes, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="isChatDetail" :visible.sync="dialogFormVisible" width="80%">
            <div>
                <el-table
                        v-loading="loadingPop"
                        ref="multipleTable"
                        tooltip-effect="dark"
                        @selection-change="handleSelectionChange"
                        :data="messageDetailList" border
                        style="width: 100%">
                    <el-table-column prop="send_time" label="时间"></el-table-column>
                    <el-table-column prop="send_username" label="用户"></el-table-column>
                    <el-table-column label="内容">
                        <template slot-scope="scope">
                            <div v-if="scope.row.msg_type == '2'">
                                <el-image
                                        style="width: 100px; height: 100px"
                                        :src="scope.row.content_url"
                                        :preview-src-list="[scope.row.content_url,scope.row.content_url]">
                                </el-image>
                            </div>
                            <div v-if="scope.row.msg_type == '1'">
                                <p v-html="scope.row.content"></p>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            adminInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            }
        },
        name: "",
        data() {
            return {
                total: 0,
                current_page: 1,
                per_page: 10,
                loading: true,
                loadingPop: true,
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                noQuery: "",
                usernameQuery: "",
                messageDetailList: [],
                fileList: [],
                value: true,
                groupId: "",
                dialogTableVisible: false,
                dialogFormVisible: false,
                formLabelWidth: '100px',
                multipleSelection: [],
                tableData: [],
                isChatDetail: "聊天详情",
                topList: [{title: "客服列表", path: ""}],
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
                value2: '',
                start_time: "",
                end_time: "",
                groupList: localStorage.getItem("groupList") && JSON.parse(localStorage.groupList)
            }
        },
        watch: {
            value2(newVal, oldVal) {
                this.start_time = newVal[0]
                this.end_time = newVal[1]
                this.getList('time')
            }
        },
        created() {
            this.groupList.unshift({
                group_name: "所有",
                id: ""
            })
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getList()
            },
            handleSizeChange(val) {
             //   console.log(`每页 ${val} 条`);
              //  console.log(val)
                this.per_page = val
                this.getList()
            },
            handleCurrentChange(val) {
               // console.log(`当前页: ${val}`);
               // console.log(val)
                this.current_page = val
                this.getList()
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleEdit(index, row) {
               // console.log(row)
                this.isChatDetail = `聊天详情 【${row.group_name}】 ${row.customer_no} - ${row.nick_name}`
                this.loadingPop = true
                this.dialogFormVisible = !this.dialogFormVisible
                this.axios({
                    url: `${apiUrl}/admin/chat/userLoglist`,
                    method: 'post',
                    data: {
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id,
                        id: this.tableData[index].id
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.messageDetailList = JSON.parse(JSON.stringify(res.data.data))
                    }
                    this.loadingPop = false
                }).catch(err => {
                    this.$message.error('数据获取失败');
                    this.loadingPop = false
                })
            },
            query() {
                this.getList()
            },
            getList() {
                this.loading = true
                let data = {
                    token: this.adminInfo.token,
                    uid: this.adminInfo.data.id,
                    start_time: this.start_time,
                    end_time: this.end_time,
                    group_id: this.groupId,
                    customer_no: this.noQuery,
                    current_page: this.current_page,
                    per_page: this.per_page
                }
                this.axios({
                    url: `${apiUrl}/admin/chat/allMsgList`,
                    method: 'post',
                    data
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.tableData = JSON.parse(JSON.stringify(res.data.data))
                        if (this.tableData) {
                            this.total = Number(res.data.total)
                        }
                    } else {
                        this.$message.error({message: res.data.msg, duration: 1000});
                        if (res.data.code == '40008') {
                            this.$router.push({path: '/'})
                        }
                    }
                    this.loading = false
                }).catch(err => {
                    this.$message.error('数据获取失败');
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped lang="scss">

  #messageList {
    height: 100%;
  }

  .page_box {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 160px;
    background-color: #f6f6f6;
    z-index: 0;
    padding-left: 160px;

    .block {
      height: 30px;
      position: absolute;
      left: 10px;
      top: 5px;
    }
  }

  .editBtn {
    color: #1e82d2;
  }

  .popImg {
    width: 50%;

    img {
      width: 100%;
    }
  }

  .popImgSee {
    width: 100%;
  }

  .searchTop {
    display: flex;
    justify-content: flex-end;
  }

  /deep/ .el-table--border .el-table__cell, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border: 0;
  }

  /deep/ .el-table tr {
    cellspacing: 10px;
    border: 1px solid #CCCCCC;
    padding: 15px 0;
  }

  /deep/ .el-table__body {
    border-collapse: separate;
    border-spacing: 0 10px;
    background-color: #f6f6f6;
  }

  /deep/ .el-dialog { //弹窗
    border-radius: 20px;
  }

  /deep/ .el-dialog__title {
    color: #fff;
  }

  /deep/ .el-dialog__header {
    background-color: #000;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
  }

  /deep/ .el-input__inner {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
  }
</style>