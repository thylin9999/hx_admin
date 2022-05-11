<template>
    <div>
        <div class="top">
            <div class="searchTop">
                <div>
                    <el-col :span="6" style="line-height: 40px;text-align: center">
                        客服名称
                    </el-col>
                    <el-col :span="10">
                        <div class="grid-content bg-purple">
                            <el-input :span="4" v-model="usernameQuery" placeholder="请输入客服名称"></el-input>
                        </div>
                    </el-col>
                    <el-col :span="2" style="margin-left: 5px">
                        <div class="grid-content bg-purple">
                            <button class="btnSearch" type="primary" @click="query('username')">查询</button>
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
                            <button class="btnSearch" type="primary" @click="query('no')">查询</button>
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
        <div class="bot" style="margin-top: 10px">
            <el-table
                    :cell-style="setSellStyle"
                    v-loading="loading"
                    ref="multipleTable"
                    tooltip-effect="dark"
                    :data="tableData" border
                    style="width: 100%">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="avatar" label="头像" width="60">
                    <template slot-scope="scope">
                        <el-image
                                style="max-width: 32px;max-height: 32px"
                                :src="scope.row.avatar"
                                :preview-src-list="[scope.row.avatar,scope.row.avatar]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="nick_name" label="客服昵称"></el-table-column>
                <el-table-column prop="customer_no" label="客服编号"></el-table-column>
                <el-table-column prop="group_name" label="组别 ↓"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column prop="djrs" label="对接人数"></el-table-column>
                <el-table-column label="好评数">
                    <template slot-scope="scope">
                        <span :style="Number(scope.row.hps) > 0 ? fontColor.hp : ''">{{ scope.row.hps }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="差评数">
                    <template slot-scope="scope">
                        <span :style="scope.row.cps > 0 ? fontColor.cp : ''">{{ scope.row.cps }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="投诉数">
                    <template slot-scope="scope">
                        <span :style="scope.row.tss > 0 ? fontColor.ts : ''">{{ scope.row.tss }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="opt" label="操作">
                    <template slot-scope="scope">
                        <button
                                class="btnDetail"
                                @click="handleEdit(scope.$index, scope.row)">查看详情
                        </button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="groupDetail" :visible.sync="dialogFormVisible" width="90%">
            <el-table
                    :cell-style="setSellStyle"
                    v-loading="loadingPop"
                    ref="multipleTable"
                    :data="tableDataDetail"
                    style="width: 100%">
                <el-table-column prop="day_time" label="时间"></el-table-column>
                <!--                <el-table-column prop="avatar" label="头像">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <img style="width: 90%;height: 90%;display:block;margin: auto" :src="scope.row.avatar" alt="">-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
                <el-table-column prop="nick_name" label="客服名称"></el-table-column>
                <el-table-column prop="customer_no" label="客服编号"></el-table-column>
                <el-table-column prop="group_name" label="组别 ↓"></el-table-column>
                <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column prop="djrs" label="对接人数"></el-table-column>
                <el-table-column label="好评数">
                    <template slot-scope="scope">
                        <span :style="Number(scope.row.hps) > 0 ? fontColor.hp : ''">{{ scope.row.hps }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="差评数">
                    <template slot-scope="scope">
                        <span :style="scope.row.cps > 0 ? fontColor.cp : ''">{{ scope.row.cps }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="投诉数">
                    <template slot-scope="scope">
                        <span :style="scope.row.tss > 0 ? fontColor.ts : ''">{{ scope.row.tss }}</span>
                    </template>
                </el-table-column>
            </el-table>
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
                loading: true,
                loadingPop: true,
                fontColor: {
                    cp: {
                        color: '#F56C6C'
                    },
                    hp: {
                        color: "#67C23A"
                    },
                    ts: {
                        color: "#E6A23C"
                    }
                },
                usernameQuery: "",
                noQuery: "",
                dialogFormVisible: false,
                groupDetail: "",
                input: "",
                value2: '',
                tableData: [],
                tableDataDetail: [],
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
                value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            }
        },
        watch: {
            value1(newVal, oldVal) {
            },
            value2(newVal, oldVal) {
                this.start_time = newVal[0]
                this.end_time = newVal[1]
                this.query('time')
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getKefuList()
            },
            query(type) {
                this.getKefuList(type)
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (this.dialogFormVisible && columnIndex == 8) return "borderRadius: 0  10px 10px 0"
                if (!this.dialogFormVisible && columnIndex == 11) return "borderRadius: 0  10px 10px 0"
            },
            handleEdit(index, row) {
                this.loadingPop = true
                this.dialogFormVisible = !this.dialogFormVisible
                this.axios({
                    url: `${apiUrl}/admin/customer/details`,
                    method: 'post',
                    data: {
                        uid: this.adminInfo.data.id,
                        token: this.adminInfo.token,
                        id: this.tableData[index].id,
                    },
                }).then(res => {
                    if (res.data.code === 20000) {
                        this.tableDataDetail = JSON.parse(JSON.stringify(res.data.data))
                        this.groupDetail = "客服统计【" + this.tableDataDetail[0].customer_no + '】'
                    }
                    this.loadingPop = false
                }).catch(err => {
                    this.$message.error('数据获取失败');
                    this.loadingPop = false
                })

            },
            getKefuList(type) {
                this.loading = true
                let data = {
                    page_sise: 100,
                    token: this.adminInfo.token,
                    uid: this.adminInfo.data.id
                }
                if (type == 'username') {
                    data.username = this.usernameQuery
                } else if (type == 'no') {
                    data.customer_no = this.noQuery
                } else if (type == 'time') {
                    data.start_time = this.start_time
                    data.end_time = this.end_time
                }
                this.axios({
                    url: `${apiUrl}/admin/customer/lists`,
                    method: 'post',
                    data,
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.tableData = JSON.parse(JSON.stringify(res.data.data))
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
            },
        },
    }
</script>

<style scoped lang="scss">

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

  /deep/ .el-dialog__header {
    background-color: #000;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
  }

  /deep/ .el-table__body {
    border-collapse: separate;
    border-spacing: 0 10px;
    background-color: #f6f6f6;
  }

  /deep/ .el-dialog {
    border-radius: 20px;
  }

  /deep/ .el-dialog__title {
    color: #fff;
  }

  /deep/ .el-dialog__body {
    background-color: #f6f6f6;
    border-radius: 20px;
  }


</style>