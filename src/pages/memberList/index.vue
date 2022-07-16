<template>
    <div id="customerList">
        <div class="topBtnList">
            <button class="btnAdd" @click="add">新增</button>
        </div>
        <el-table
                :cell-style="setSellStyle"
                v-loading="loading"
                ref="multipleTable"
                tooltip-effect="dark"
                :data="tableData" border
                style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="account" label="账号"></el-table-column>
            <el-table-column prop="member_id" label="ID"></el-table-column>
            <el-table-column prop="nickname" label="昵称"></el-table-column>
            <el-table-column prop="id" label="用户ID"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="registerIp" label="登录IP"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope" label="状态">
                    <el-switch
                            active-text="正常"
                            inactive-text="禁用"
                            active-color="green"
                            inactive-color="#ccc"
                            @change="changeSwitch(scope.row)"
                            v-model="scope.row.status == 1">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column prop="opt" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit"
                               circle></el-button>
<!--                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"-->
<!--                               circle></el-button>-->
                </template>
            </el-table-column>
        </el-table>
        <div class="block" v-if="total > 10">
          <el-pagination
              @current-change="changePage"
              layout="prev, pager, next"
              :total="total">
          </el-pagination>
        </div>
        <el-dialog title="编辑/修改" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input disabled :disabled="popupType === 'edit'" v-model="form.account"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.nickname" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="popupType === 'add'" label="登录密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-else label="密码" :label-width="formLabelWidth">
                    <el-input placeholder="不填写则默认当前密码" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <!--                <button class="btnCancle" @click="dialogFormVisible = false">取 消</button>-->
                <!--                <button class="btnSubmit" type="primary" @click="submit">提 交</button>-->

                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import {getMemberList, addMember, updateMember, deleteMember} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        data() {
            return {
                total:0,
                currentId:'',
                popupType: 'add',    //add || edit
                loading: true,
                selectList: [],
                dialogFormVisible: false,
                form: {
                    account: '',
                    nickname: '',
                    password: "",
                },
                formLabelWidth: '100px',
                tableData: [],
            }
        },
        watch: {
            dialogFormVisible(newVal, oldVal) {
                if (!newVal && this.popupType != 'add') { //新增窗口 &&  弹窗关闭状态
                    this.form = {account: "", nickname: "", password: "",}
                }
            }
        },
        mounted() {
            this.init({pageSize: 10, pageNum: 1})
        },
        methods: {
            async init(dataJson) {
                this.loading = true
                try {
                    let {data} = await getMemberList(dataJson)
                    if (data.code === statusCode.success) {
                        this.total = data.total
                        if (data.rows && data.rows.length) this.tableData = JSON.parse(JSON.stringify(data.rows))
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
            },
            changePage(val){
              this.init({pageSize:10,pageNum	:val})
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 16) return "borderRadius: 0  10px 10px 0"
            },
            add() {
                this.dialogFormVisible = true
                this.popupType = "add"
            },
            handleEdit(index, row) {
                this.currentId = row.member_id
                this.dialogFormVisible = true
                this.popupType = "edit"
                this.form = {
                    account: row.account,
                    nickname: row.nickname,
                    password: row.password,
                }
            },
          handleDelete(index, row) {
                this.$confirm(`此操作将永久删除会员【${row.account}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( async () => {
                  let {data} = await deleteMember({member_id:row.member_id})
                  let msg = ''
                  let type = 'success'
                  if (data.code === statusCode.success) {
                    msg = '操作成功'
                    this.dialogFormVisible = false
                    this.init()
                  } else {
                    msg = data.msg
                    type = 'warning'
                  }
                  this.$message({
                    message: msg,
                    type,
                    duration: 2000
                  });
                })
            },
            async submit() {
                if(this.popupType === 'add'){
                  let dataJson = {
                    account:  this.form.account,
                    nickname: this.form.nickname,
                    password:  this.form.password
                  }
                    let {data} = await addMember(dataJson)
                    let msg = ''
                    let type = 'success'
                    if (data.code === statusCode.success) {
                        msg = '操作成功'
                        this.dialogFormVisible = false
                        this.init()
                    } else {
                        msg = data.msg
                        type = 'warning'
                    }
                    this.$message({
                        message: msg,
                        type,
                        duration: 2000
                    });
                }else{
                  let dataJson = {
                    member_id:  this.currentId,
                    nickname: this.form.nickname,
                    password:  this.form.password
                  }
                    let {data} = await updateMember(dataJson)
                    let msg = ''
                    let type = 'success'
                    if (data.code === statusCode.success) {
                        msg = '操作成功'
                        this.dialogFormVisible = false
                        this.init()
                    } else {
                        msg = data.msg
                        type = 'warning'
                    }
                    this.$message({
                        message: msg,
                        type,
                        duration: 2000
                    });
                }
            },
            async changeSwitch(item) {
                console.log(item.id, !item.status)
                let msg = ''
                let type = 'success'
                let {data} = await updateMember({member_id:item.member_id, status:item.status == 1 ? 2 : 1})
                if (data.code === statusCode.success) {
                    msg = '操作成功'
                    this.addDialog = false
                    this.init()
                }else{
                    msg = data.msg
                    type = 'warning'
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  #customerList {
    width: 100%;
  }

  /deep/ .el-table .descending .sort-caret.descending {
    border-top-color: #189e90;
  }

  /deep/ .el-table .ascending .sort-caret.ascending {
    border-bottom-color: #189e90;
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
    background-color: #189e90;
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
