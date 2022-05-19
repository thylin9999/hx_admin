<template>
    <div>
        <el-button style="float: right;border-radius: 10px;margin-bottom: 5px;background-color: #1f1d20;color: #fff"
                   @click="addAdmin">新增广告+
        </el-button>
        <el-table :cell-style="setSellStyle" :span="24" :row-style="{height:'58px'}" :header-row-style="{height:'40px'}"
                  v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="title" label="广告标题"></el-table-column>
            <el-table-column prop="avatar" label="广告图片">
                <template slot-scope="scope">
                    <el-image
                            style="max-width: 32px;max-height: 32px"
                            :src="scope.row.pic"
                            :preview-src-list="[scope.row.pic,scope.row.pic]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="equipment" label="设备"></el-table-column>
            <el-table-column prop="linkType" label="跳转方式"></el-table-column>
            <el-table-column prop="createMan" label="创建人"></el-table-column>
            <el-table-column prop="lastTimeOpt" label="上次操作时间"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.status == 1 ?  'circleGreen' : 'circleRed'"></div>
                    {{scope.row.status == 1 ? '正常' : '禁用'}}
                </template>
            </el-table-column>
            <el-table-column prop="optMan" label="操作人"></el-table-column>
            <el-table-column prop="opt" label="操作">
                <template slot-scope="scope">
                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</button>
                    <button class="btnDel" @click="handleDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="isEditTxt" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="标题">
                    <el-input disabled v-model="form.username"></el-input>
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
        <el-dialog title="新增广告" :visible.sync="addDialog" width="20%">
            <el-form :model="formAddAdmin">
                <el-form-item label="标题">
                    <el-input v-model="formAddAdmin.name" placeholder="广告账号"></el-input>
                </el-form-item>
                <el-form-item label="作用域">
                    <el-input v-model="formAddAdmin.password" placeholder="广告密码"></el-input>
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
    import {getAdvList} from "@/api/control";
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
                this.isEditTxt = "编辑广告"
                this.dialogFormVisible = true
                this.currentId = this.tableData[index].id
                this.form.username = row.username
                if (this.adminInfo.data.username != 'admin' && this.adminInfo.data.id == row.id) this.isComAdminPop = true//普通广告编辑自己
            },
            handleDelete(index, row) {
                this.$confirm(`此操作将永久删除广告【${row.nick_name}】, 是否继续?`, '提示', {
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
            },
            async getAdmin() {
                this.loading = true
                try {
                    let {data} = await getAdvList()
                    console.log(data)
                    if (data.code === statusCode.success) {
                        this.tableData = JSON.parse(JSON.stringify(data.data))
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
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