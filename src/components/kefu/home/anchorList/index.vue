<template>
    <div id="customerList">
        <div class="topBtnList">
            <button class="btnAdd" @click="dialogFormVisible = true">新增主播</button>
        </div>
        <el-table
                :cell-style="setSellStyle"
                v-loading="loading"
                ref="multipleTable"
                tooltip-effect="dark"
                :data="tableData" border
                style="width: 100%">
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
                    <el-switch
                            active-text="禁用"
                            inactive-text="正常"
                            active-color="#ccc"
                            inactive-color="green"
                            @change="changeSwitch(scope.row)"
                            v-model="scope.row.status">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="opt" label="操作" width="200">
                <template slot-scope="scope">
                    <!--                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)">编辑</button>-->
                    <!--                    <button class="btnDel" @click="handleDelete(scope.$index, scope.row)">删除</button>-->
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit"
                               circle></el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"
                               circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑/新增" :visible.sync="dialogFormVisible" width="35%">
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
<!--                <button class="btnCancle" @click="dialogFormVisible = false">取 消</button>-->
<!--                <button class="btnSubmit" type="primary" @click="submit">提 交</button>-->

                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
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
                currentId: '',
                popupType: '',
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
            setSellStyle({columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 16) return "borderRadius: 0  10px 10px 0"
            },
            handleEdit(index, row) {
                this.dialogFormVisible = true
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
            submit() {

            },
            changeSwitch(item) {
                console.log(item.id, item.status)
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