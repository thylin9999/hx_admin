<template>
    <div>
        <el-button style="float: right;border-radius: 10px;margin-bottom: 5px;background-color: #1f1d20;color: #fff"
                   @click="dialog = true">新增公告+
        </el-button>
        <el-table :span="24" :row-style="{height:'58px'}" :header-row-style="{height:'40px'}"
                  v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="remark" label="说明"></el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.status?  'circleGreen' : 'circleRed'"></div>
                    {{scope.row.status ? '开启' : '关闭'}}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="createMan" label="创建人"></el-table-column>
            <el-table-column prop="optTime" label="操作时间"></el-table-column>
            <el-table-column prop="optMan" label="操作人"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</button>
                    <button class="btnDel" @click="handleDelete(scope.$index, scope.row)">删除</button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增/编辑 公告" :visible.sync="dialog" width="20%">
            <el-form ref="ruleForm" :model="formItem" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="formItem.title"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input type="textarea" v-model="formItem.remark"></el-input>
                </el-form-item>
                <el-form-item label="公告内容">
                    <el-input type="textarea" v-model="formItem.content"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="formItem.status"></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <el-button @click="dialog = false">取消</el-button>
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {getAnnounce, getWebSet} from "@/api/control";
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
                tableData: [],
                isEditTxt: "详情/编辑",
                currentId: '',
                dialog: false,
                formItem: {
                    title: '',
                    status: false,
                    remark: '',
                    content:''
                }
            }
        },
        created() {
            this.init()
        },
        methods: {
            async init() {
                this.loading = true
                try {
                    let {data} = await getAnnounce()
                    console.log(data)
                    if (data.code === statusCode.success) {
                        this.tableData = JSON.parse(JSON.stringify(data.data))
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
            },
            handleEdit(index, row) {
                this.dialog = true
                this.status = row.status
                this.currentId = this.tableData[index].id
                for (let k in row) {
                    for (let key in this.formItem) {
                        if (k === key) {
                            this.formItem[key] = row[k]
                        }
                    }
                }
            },
            handleDelete(index, row) {
                this.$confirm(`此操作将永久删除公告【${row.title}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.axios({
                    //     url: `${apiUrl}/admin/admin/updateAdmin`,
                    //     method: 'post',
                    //     data: {
                    //         token: this.adminInfo.token,
                    //         uid: this.adminInfo.data.id,
                    //         id: this.tableData[index].id,
                    //         status: '3'
                    //     }
                    // }).then(res => {
                    //     if (res.data.code == 20000) {
                    //         this.$message.success('删除成功');
                    //         this.getAdminList()
                    //     } else {
                    //         this.$message(res.data.msg);
                    //     }
                    // }).catch(err => {
                    //     this.$message.error('删除失败');
                    // })
                })
            },
            onSubmit(type) {
                // this.dialog = false
                console.log(this.formItem)
            },
            resetForm() {
                for (let key in this.formItem) {
                    if (typeof this.formItem[key] !== "boolean") this.formItem[key] = ''
                }
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