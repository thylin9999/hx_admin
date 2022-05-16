<template>
    <div id="customerList">
        <div class="topBtnList">
            <div style="float: left;margin-top: 22px">
                <el-col :span="6" style="line-height: 40px;text-align: center">
                    客服名称
                </el-col>
                <el-col :span="10">
                    <div class="grid-content bg-purple">
                        <el-input :span="4" placeholder="请输入客服名称"></el-input>
                    </div>
                </el-col>
                <el-col :span="2" style="margin-left: 5px">
                    <div class="grid-content bg-purple">
                        <button class="btnSearch" type="primary" @click="query('username')">查询</button>
                    </div>
                </el-col>
            </div>
            <button class="btnEdit" @click="optionList('forbid')">批量禁用</button>
            <button class="btnEdit" @click="optionList('open')">批量解除</button>
            <button class="btnEdit" @click="toggleSelection()">取消已选</button>
            <button class="btnAdd" @click="addCustomer">新增会员</button>
        </div>
        <el-table
                :cell-style="setSellStyle"
                v-loading="loading"
                ref="multipleTable"
                tooltip-effect="dark"
                @selection-change="handleSelectionChange"
                :data="tableData" border
                style="width: 100%">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="username" label="会员账号"></el-table-column>
            <el-table-column prop="avatar" label="头像">
                <template slot-scope="scope">
                    <el-image
                            style="max-width: 32px;max-height: 32px"
                            :src="scope.row.avatar"
                            :preview-src-list="[scope.row.avatar,scope.row.avatar]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="nick_name" label="会员昵称"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="isForbid" label="是否禁用">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.status == 1 ?  'circleGreen' : 'circleRed'"></div>
                    {{scope.row.status == '1' ? '否' : '是'}}
                </template>
            </el-table-column>
            <!--            <el-table-column prop="online" label="状态">-->
            <!--                <template slot-scope="scope">-->
            <!--                    <div class="circle" :class="scope.row.online == '1' ? 'circleGreen' : 'circleRed'"></div>-->
            <!--                    {{ scope.row.online == '1' ? '在线' : '离线' }}-->

            <!--                </template>-->
            <!--            </el-table-column>-->
            <el-table-column prop="opt" label="操作" width="200">
                <template slot-scope="scope">
                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)">编辑</button>
                    <button class="btnDel" @click="handleDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="isEditOrAddL" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="会员账号" :label-width="formLabelWidth">
                    <el-input :disabled="popupType === 'editCustomer'" v-model="form.account"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="会员昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="popupType === 'addCustomer'" label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-else label="密码" :label-width="formLabelWidth">
                    <el-input placeholder="不填写则默认当前密码" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <button class="btnCancle" @click="dialogFormVisible = false">取 消</button>
                <button class="btnSubmit" type="primary" @click="submit">提 交</button>
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
            },
            groupList: {
                type: Array,
                default: function () {
                    return []
                }
            },
        },
        name: "",
        data() {
            return {
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
                popupType: 'addCustomer',    //addCustomer || editCustomer
                loading: true,
                selectList: [],
                dialogFormVisible: false,
                form: {
                    account: '',
                    nickname: '',
                    password: "",
                },
                formLabelWidth: '100px',
                multipleSelection: [],
                tableData: [],
                isEditOrAddL: "新增会员",
                topList: [{title: "会员列表", path: ""}]
            }
        },
        watch: {
            dialogFormVisible(newVal, oldVal) {
                if (!newVal && this.popupType != 'addCustomer') { //新增窗口 &&  弹窗关闭状态
                    this.form = {account: "", nickname: "", password: "",}
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.getKefuList()
            },
            toggleSelection(rows) { //取消选择
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 16) return "borderRadius: 0  10px 10px 0"
            },
            handleSelectionChange(val) { //选中数组
                this.selectList = val
            },
            addCustomer() {
                this.isEditOrAddL = "新增会员"
                this.dialogFormVisible = true
                this.popupType = "addCustomer"
            },
            handleEdit(index, row) {
                this.isEditOrAddL = "编辑会员"
                this.dialogFormVisible = true
                this.popupType = "editCustomer"
                this.form = {
                    name: row.username,
                    nickname: row.nick_name,
                    num: row.customer_no,
                    password: row.password,
                    group: row.group_id,
                    age: row.age,
                    work_time: row.work_time,
                    introduce: row.introduction,
                    id: row.id,
                    domain: row.domain,
                }
            },
            handleDelete(index, row) {
                this.$confirm(`此操作将永久删除会员【${row.username}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        url: `${apiUrl}/admin/customer/delCostomers`,
                        method: 'post',
                        data: {
                            token: this.adminInfo.token,
                            uid: this.adminInfo.data.id,
                            id: this.tableData[index].id,
                        }
                    }).then(res => {
                        if (res.data.code == 20000) {
                            this.$message.success('删除成功');
                            this.getKefuList()
                            this.toggleSelection()
                        } else {
                            this.$message(res.data.msg);
                        }
                    }).catch(err => {
                        this.$message.error('删除失败');
                    })
                })
            },
            getKefuList() {
                this.loading = true
                this.axios({
                    url: `${apiUrl}/admin/customer/lists`,
                    method: 'post',
                    data: {
                        page_sise: 100,
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        res.data.data && res.data.data.map((item) => {
                            item.hps = Number(item.hps)
                            item.cps = Number(item.cps)
                            item.tss = Number(item.tss)
                        })
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
            optionList(type) {
                let isForbidOp = type === "forbid" ? true : false
                let itemArr = []
                this.selectList.forEach((item, i) => {
                    itemArr.push(item.id)
                })
                this.axios({
                    url: `${apiUrl}/admin/customer/batchStatus`,
                    method: 'post',
                    data: {
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id,
                        list: itemArr,
                        status: isForbidOp ? "2" : "1" //状态 1正常 2停用 3删除
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.$message.success(isForbidOp ? '已批量禁用' : '已批量解除');
                        this.getKefuList()
                        this.toggleSelection()
                    } else {
                        this.$message(res.data.msg);
                    }
                }).catch(err => {
                    this.$message.error('修改失败');
                })
            },
            submit() {
                if (this.popupType === 'addCustomer') {  //  增加窗口  无需返现
                    // this.form = {}
                } else if (this.popupType === 'editCustomer') {

                }
                let url = `${apiUrl}/admin/customer/${this.popupType === 'addCustomer' ? 'addCostomers' : 'updateCostomers'}`
                this.axios({
                    url,
                    method: 'post',
                    data: {
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id,
                        id: this.form.id,
                        username: this.form.name,
                        nick_name: this.form.nickname,
                        customer_no: this.form.num,
                        password: this.form.password,
                        group_id: this.form.group,
                        age: this.form.age,
                        work_time: this.form.work_time,
                        introduction: this.form.introduce,
                        domain: this.form.domain,
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.$message.success(this.popupType === 'addCustomer' ? '添加成功' : '修改成功');
                        this.getKefuList()
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$message(this.popupType === 'addCustomer' ? '添加失败' : '修改失败');
                })
            }
        }
    }
</script>

<style scoped lang="scss">
  #customerList {
    width: 100%;
  }

  /deep/ .el-table .descending .sort-caret.descending {
    border-top-color: #000;
  }

  /deep/ .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #000;
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


  /deep/ .el-table th.el-table__cell > .cell {
    color: #6d6d6e;
    font-size: 14px;
  }

  /deep/ .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
    //padding: 0;
  }

  /deep/ .el-dialog { //弹窗
    width: 600px !important;
    border-radius: 20px;
  }

  /deep/ .el-dialog__header {
    background-color: #000;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
  }

  /deep/ .el-dialog__title {
    color: #fff;
  }

  /deep/ .el-form-item__label {
    color: #000;
    font-size: 14px;
  }

  /deep/ .el-input__inner {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
  }
</style>