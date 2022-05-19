<template>
    <div>
        <el-button style="float: right;border-radius: 10px;margin-bottom: 5px;background-color: #1f1d20;color: #fff"
                   @click="addAdmin">新增管理员+
        </el-button>
        <el-table :cell-style="setSellStyle" :span="24" :row-style="{height:'58px'}" :header-row-style="{height:'40px'}"
                  v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="username" label="管理员账号"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="last_time" label="登录时间"></el-table-column>
            <el-table-column prop="last_ip" label="登录ip"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.status == 1 ?  'circleGreen' : 'circleRed'"></div>
                    {{scope.row.status == 1 ? '正常' : '禁用'}}
                </template>
            </el-table-column>
            <el-table-column prop="create_username" label="操作人"></el-table-column>
            <el-table-column prop="opt" label="操作" v-if="adminInfo.data.username == 'admin'">
                <template slot-scope="scope">
                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</button>
                    <button class="btnDel" @click="handleDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="操作" v-if="adminInfo.data.username != 'admin'">
                <template slot-scope="scope">
                    <button class="btnDetail" v-if="adminInfo.data.username == scope.row.username"
                            @click="handleEdit(scope.$index, scope.row)" type="text">编辑
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
            <el-form :model="formAddAdmin">
                <el-form-item label="账号">
                    <el-input v-model="formAddAdmin.name" placeholder="管理员账号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="formAddAdmin.password" placeholder="管理员密码"></el-input>
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
        props: {
            adminInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            },
        },
        data() {
            return {
                loading: true,
                fileList: [],
                value: true,
                form: {},
                tableData: [],
                isEditTxt: "详情/编辑",
                currentId: '',
                dialogFormVisible: false,
                isComAdminPop: false,
                addAdminDialog: false,
                addDialog: false,
                formAddAdmin: {
                    name: '',
                    password: '',
                },
            }
        },
        created() {
            this.init()
        },
        methods: {
            init() {
                this.getAdmin()
            },
            addAdmin() {
                this.addDialog = true
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 7) return "borderRadius: 0  10px 10px 0"
            },
            handleEdit(index, row) {
                this.value = row.status == '1' ? true : false
                this.isEditTxt = "编辑管理员"
                this.dialogFormVisible = true
                this.currentId = this.tableData[index].id
                this.form.username = row.username
                if (this.adminInfo.data.username != 'admin' && this.adminInfo.data.id == row.id) this.isComAdminPop = true//普通管理员编辑自己
            },
            handleDelete(index, row) {
                this.$confirm(`此操作将永久删除管理员【${row.nick_name}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        url: `${apiUrl}/admin/admin/updateAdmin`,
                        method: 'post',
                        data: {
                            token: this.adminInfo.token,
                            uid: this.adminInfo.data.id,
                            id: this.tableData[index].id,
                            status: '3'
                        }
                    }).then(res => {
                        if (res.data.code == 20000) {
                            this.$message.success('删除成功');
                            this.getAdminList()
                        } else {
                            this.$message(res.data.msg);
                        }
                    }).catch(err => {
                        this.$message.error('删除失败');
                    })
                })
            },
            submit(type) {
                // if (type == 'addAdmin') {
                //     this.axios({
                //         url: `${apiUrl}/admin/admin/addAdmin`,
                //         method: 'post',
                //         data: {
                //             token: this.adminInfo.token,
                //             uid: this.adminInfo.data.id,
                //             username: this.formAddAdmin.name,
                //             password: this.formAddAdmin.password
                //         }
                //     }).then(res => {
                //         if (res.data.code == 20000) {
                //             this.formAddAdmin.name = ""
                //             this.formAddAdmin.password = ""
                //             this.$message.success("新增成功")
                //             this.addDialog = false
                //             this.getAdminList()
                //         } else {
                //             this.$message.error(res.data.msg)
                //         }
                //     }).catch(err => {
                //         this.$message.error('数据获取失败');
                //     })
                // } else {
                //     let data = {
                //         token: this.adminInfo.token,
                //         uid: this.adminInfo.data.id,
                //         password: this.form.password,
                //         id: this.currentId,
                //     }
                //     if (!this.isComAdminPop) data.status = this.value ? '1' : '2'
                //     this.axios({
                //         url: `${apiUrl}/admin/admin/updateAdmin`,
                //         method: 'post',
                //         data
                //     }).then(res => {
                //         if (res.data.code == 20000) {
                //             this.getAdminList()
                //             this.dialogFormVisible = false
                //             this.$message.success('操作成功');
                //         } else {
                //             this.$message.error(res.data.msg);
                //         }
                //     }).catch(err => {
                //         this.$message.error('操作失败');
                //     })
                // }
            },
            async getAdmin(type, index) {
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
                // this.axios({
                //     url: `${apiUrl}/admin/admin/lists`,
                //     method: 'post',
                //     data: {
                //         token: this.adminInfo.token,
                //         uid: this.adminInfo.data.id
                //     }
                // }).then(res => {
                //     if (res.data.code == 20000) {
                //         res.data.data.length && res.data.data.forEach((item, i) => {
                //             this.tableData = JSON.parse(JSON.stringify(res.data.data))
                //         })
                //     } else {
                //         this.$message.error({message: res.data.msg, duration: 1000});
                //         if (res.data.code == '40008') {
                //             this.$router.push({path: '/'})
                //         }
                //     }
                //     this.loading = false
                // }).catch(err => {
                //     this.$message.error('数据获取失败');
                //     this.loading = false
                // })
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