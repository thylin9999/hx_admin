<template>
    <div>
        <div class="topBtnList">
            <button class="btnAdd" @click="handleEdit">新增管理员</button>
        </div>
        <el-table :cell-style="setSellStyle" :span="24" :row-style="{height:'58px'}" :header-row-style="{height:'40px'}"
                  v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="account" label="管理员"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="last_time" label="登录时间"></el-table-column>
            <el-table-column prop="last_ip" label="登录ip"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-switch
                        :disabled="userInfo && userInfo.account !== 'admin'"
                        active-text="正常"
                        inactive-text="禁用"
                        active-color="green"
                        inactive-color="#ccc"
                        @change="changeSwitch(scope.row)"
                        v-model="scope.row.status == 1">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="update_by" label="操作人"></el-table-column>
            <el-table-column prop="username" label="操作">
                <template slot-scope="scope">
                    <el-button :disabled="userInfo && userInfo.account !== 'admin'"
                               @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit"
                               circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑/新增" :visible.sync="addDialog" width="20%">
            <el-form :model="form">
                <el-form-item label="账号">
                    <el-input :disabled="type ==='edit'?true :false" v-model="form.account"
                              placeholder="管理员账号"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" placeholder="管理员密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="addDialog = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState} from "vuex"
    import {getAdminList, addAdmin, updatePwd, updateAdmin} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        name: 'admin',
        data() {
            return {
                type: 'edit',   // edit add
                currentId: '',
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
        computed: {
            ...mapState({
                userInfo: state => state.userInfo
            }),
        },

        methods: {
            async init() {
                this.loading = true
                try {
                    let {data} = await getAdminList(1, 1000)
                    if (data.code === statusCode.success) {
                        data.rows.length && data.rows.forEach((item, i) => {
                            this.tableData = JSON.parse(JSON.stringify(data.rows))
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
                if (row) {
                    this.type = 'edit'
                    this.currentId = row.id
                    this.form.account = row.account
                    // this.form.password = row.password
                } else {
                    this.type = 'add'
                    this.form = {}
                }

            },
            handleDelete(index, row) {
                this.$confirm(`此操作将永久删除管理员【${row.username}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
            },
            async submit() {
                if (this.type === 'add') {
                    let {data} = await addAdmin(this.form.account, this.form.password, 1, 1)
                    let msg = ''
                    let type = 'success'
                    if (data.code === statusCode.success) {
                        msg = '操作成功'
                        this.addDialog = false
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
                } else {
                    let {data} = await updatePwd(this.currentId, this.form.password)
                    let msg = ''
                    let type = 'success'
                    if (data.code === statusCode.success) {
                        msg = '操作成功'
                        this.addDialog = false
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
                let {data} = await updateAdmin(item.id, item.status == 1 ? 2 : 1)
                if (data.code === statusCode.success) {
                    msg = '操作成功'
                    this.addDialog = false
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
        background-color: #189e90;
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
