<template>
    <div>
        <el-button style="float: right;border-radius: 10px;margin-bottom: 5px;background-color: #1f1d20;color: #fff"
                   @click="addDialog = true">新增管理员+
        </el-button>
        <el-table :cell-style="setSellStyle" :span="24" :row-style="{height:'58px'}" :header-row-style="{height:'40px'}"
                  v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="account" label="管理员账号"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="last_time" label="登录时间"></el-table-column>
            <el-table-column prop="last_ip" label="登录ip"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.status ?  'circleGreen' : 'circleRed'"></div>
                    {{scope.row.status ? '正常' : '禁用'}}
                </template>
            </el-table-column>
            <el-table-column prop="createMan" label="操作人"></el-table-column>
            <el-table-column prop="username" label="操作">
                <template slot-scope="scope">
                    <button class="btnDetail" @click="handleEdit(scope.$index, scope.row)" type="text">编辑
                    </button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="isEditTxt" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="账号">
                    <el-input disabled v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" placeholder="不填写则默认当前"></el-input>
                </el-form-item>
            </el-form>
            <el-switch v-if="!isComAdminPop" v-model="value" active-text="开启" inactive-text="禁用" active-color="#409EFF"
                       inactive-color="#DCDFE6">
            </el-switch>
            <div slot="footer" class="dialog-footer">
                <button class="btnCancle" @click="dialogFormVisible = false">取 消</button>
                <button class="btnSubmit" @click="submit">提 交</button>
            </div>
        </el-dialog>
        <el-dialog title="新增管理员" :visible.sync="addDialog" width="20%">
            <el-form :model="form">
                <el-form-item label="账号">
                    <el-input disabled v-model="form.account" placeholder="管理员账号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" placeholder="管理员密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <button class="btnCancle" @click="addDialog = false">取 消</button>
                <button class="btnSubmit" type="primary" @click="submit('addAdmin')">提 交</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getAdminList} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        name: 'adminList',
        data() {
            return {
                loading: true,
                value: true,
                tableData: [],
                isEditTxt: "详情/编辑",
                dialogFormVisible: false,
                isComAdminPop: false,
                addDialog: false,
                form: {
                    account: '',
                    password: '',
                },
            }
        },
        created() {
            this.init()
        },
        methods: {
            async init() {
                this.loading = true
                try {
                    let {data} = await getAdminList()
                    console.log(data)
                    if (data.code === statusCode.success) {
                        data.data.length && data.data.forEach((item, i) => {
                            this.tableData = JSON.parse(JSON.stringify(data.data))
                        })
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 7) return "borderRadius: 0  10px 10px 0"
            },
            handleEdit(index, row) {
                this.addDialog = true
                this.form.account = row.account
            },
            handleDelete(index, row) {
                this.$confirm(`此操作将永久删除管理员【${row.account}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
            },
            submit() {
                console.log(this.form)
            },
        }
    }
</script>

<style scoped lang="scss">
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

  /deep/ .el-table--border .el-table__cell,
  .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
    border: 0;
  }

  /deep/ .el-table tr {
    cellspacing: 10px;
    border: 1px solid #cccccc;
    padding: 15px 0;
  }

  /deep/ .el-table__body {
    border-collapse: separate;
    border-spacing: 0 10px;
    background-color: #f6f6f6;
  }

  /deep/ .el-dialog {
    //弹窗
    width: 400px !important;
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