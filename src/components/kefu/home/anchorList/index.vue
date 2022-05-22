<template>
    <div id="customerList">
        <div class="topBtnList">
            <button class="btnEdit" @click="optionList('forbid')">禁用</button>
            <button class="btnEdit" @click="optionList('open')">解除</button>
            <button class="btnEdit" @click="toggleSelection()">取消已选</button>
            <button class="btnAdd" @click="addCustomer">新增主播</button>
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
            <el-table-column prop="username" label="主播账号"></el-table-column>
            <el-table-column prop="pic" label="头像">
                <template slot-scope="scope">
                    <el-image
                            style="max-width: 32px;max-height: 32px"
                            :src="scope.row.pic"
                            :preview-src-list="[scope.row.pic,scope.row.pic]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="nickname" label="主播昵称"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.status ?  'circleGreen' : 'circleRed'"></div>
                    {{scope.row.status ? '正常' : '禁用'}}
                </template>
            </el-table-column>
            <el-table-column prop="opt" label="操作" width="200">
                <template slot-scope="scope">
                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)">编辑</button>
                    <button class="btnDel" @click="handleDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="isEditOrAddL" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="主播账号" :label-width="formLabelWidth">
                    <el-input :disabled="popupType === 'editCustomer'" v-model="form.username"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="主播昵称" :label-width="formLabelWidth">
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
    import {getAnchorList} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        data() {
            return {
                popupType: 'addCustomer',    //addCustomer || editCustomer
                loading: true,
                selectList: [],
                dialogFormVisible: false,
                form: {
                    username: '',
                    nickname: '',
                    password: "",
                },
                formLabelWidth: '100px',
                tableData: [],
                isEditOrAddL: "新增主播",
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
            async init() {
                this.loading = true
                try {
                    let {data} = await getAnchorList()
                    console.log(data)
                    if (data.code === statusCode.success) {
                        this.tableData = JSON.parse(JSON.stringify(data.data))
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
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
                this.isEditOrAddL = "新增主播"
                this.dialogFormVisible = true
                this.popupType = "addCustomer"
            },
            handleEdit(index, row) {
                this.isEditOrAddL = "编辑主播"
                this.dialogFormVisible = true
                this.popupType = "editCustomer"
                this.form = {
                    username: row.username,
                    nickname: row.nickname,
                    password: row.password,
                }
            },
            handleDelete(index, row) {
                this.$confirm(`此操作将永久删除主播【${row.username}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                })
            },
            optionList(type) {
                let isForbidOp = type === "forbid" ? true : false
                let itemArr = []
                this.selectList.forEach((item, i) => {
                    itemArr.push(item.id)
                })
                this.axios({
                    // url: `${apiUrl}/admin/customer/batchStatus`,
                    // method: 'post',
                    // data: {
                    //     token: this.adminInfo.token,
                    //     uid: this.adminInfo.data.id,
                    //     list: itemArr,
                    //     status: isForbidOp ? "2" : "1" //状态 1正常 2停用 3删除
                    // }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.$message.success(isForbidOp ? '已批量禁用' : '已批量解除');
                        this.toggleSelection()
                    } else {
                        this.$message(res.data.msg);
                    }
                }).catch(err => {
                    this.$message.error('修改失败');
                })
            },
            submit() {
                console.log(this.form)
                if (this.popupType === 'addCustomer') {  //  增加窗口  无需返现
                    // this.form = {}
                } else if (this.popupType === 'editCustomer') {

                }
                this.axios({
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.$message.success(this.popupType === 'addCustomer' ? '添加成功' : '修改成功');
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