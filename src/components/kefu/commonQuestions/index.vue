<template>
    <div>
        <div>
            <button style="margin: 5px;float: right" class="btnAdd" @click="addQuestion">新增+</button>
        </div>
        <el-table
                :cell-style="setSellStyle"
                v-loading="loading"
                :default-sort="{prop: 'sort', order: 'descending'}"
                ref="multipleTable"
                tooltip-effect="dark"
                :data="tableData" border
                style="width: 100%">
            <el-table-column type="index" label="序号" width="100"></el-table-column>
            <el-table-column sortable prop="sort" label="排序" width="100"></el-table-column>
            <el-table-column prop="title" label="标题" width="150"></el-table-column>
            <el-table-column prop="djrs" label="点击次数" width="100"></el-table-column>
            <el-table-column prop="zsrs" label="真实人数" width="100"></el-table-column>
            <el-table-column prop="content" label="自动回复">
                <template slot-scope="scope">
                    <el-switch
                            active-color="#ff4600"
                            inactive-color="#ccc"
                            v-model="scope.row.status == '1'">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="opt" label="操作" width="200">
                <template slot-scope="scope">
                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)" type="text" size="small">
                        编辑
                    </button>
                    <button class="btnDel" type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除
                    </button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="dialogTitle"
                   :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="form">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="常见问题">
                                <el-input v-model="form.title" autocomplete="off" placeholder="请输入问题"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="排序" :rules="[{ type: 'number', message: '排序必须为数字值'}]">
                                <el-input v-model="form.sort" autocomplete="off" placeholder="请填写序号"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="自动回复">
                                <el-switch
                                        style="margin-left: 50px"
                                        active-color="#ff4600"
                                        inactive-color="#ccc"
                                        v-model="form.value">
                                </el-switch>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="6">
                        <div class="grid-content bg-purple"></div>
                    </el-col>
                </el-row>
                <editor-bar style="min-height: 200px;background-color: #f6f6f6" v-model="form.content"
                            :isClear="isClear" @change="change"></editor-bar>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <button class="btnCancle" @click="dialogFormVisible = false">取 消</button>
                <button class="btnSubmit" @click="submit">提 交</button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import EditorBar from './editoritem.vue'

    export default {
        components: {EditorBar},
        props: {
            adminInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            props: ['catchData'], // 接收父组件的方法
        },
        name: "",
        data() {
            return {
                loading: true,
                isClear: false,
                detail: "",

                type: "add",  //add || edit
                fileList: [],
                value: true,
                dialogFormVisible: false,
                form: {
                    title: '',
                    sort: '',
                    value: null
                },
                formLabelWidth: '300px',
                multipleSelection: [],
                tableData: [],
                dialogTitle: "",
                listData: []
            }
        },
        watch: {
            value(newVal, oldVal) {
                this.form.status = newVal ? '1' : '2'
            },
            dialogFormVisible(newVal, oldVal) {
                if (!newVal && this.type != 'add') {
                    this.form.title = ""
                    this.form.sort = ""
                    this.form.status = "" //状态 1正常 2禁用 3删除 默认1
                    this.form.content = ""
                    this.form.img_url = ""
                }
            }
        },
        created() {
            this.init()
        },
        mounted() {
        },
        methods: {
            init() {
                this.getQuestionList()
            },
            change(val) {
                // console.log(val)
            },
            handleRemove(file, fileList) {
                // console.log(file, fileList);
            },
            handlePreview(file) {
                // console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`只能上传单张图片`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            clearFiles() {
                this.$refs['myUpload'].clearFiles();
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 6) return "borderRadius: 0  10px 10px 0"
            },
            addQuestion() {
                this.type = "add"
                this.dialogTitle = "新增常见问题"
                this.dialogFormVisible = true
            },
            handleEdit(index, row) {
                this.dialogTitle = "编辑常见问题"
                this.type = "edit"
                this.dialogFormVisible = !this.dialogFormVisible
                this.form.title = row.title
                this.form.sort = row.sort
                this.form.status = row.status //状态 1正常 2禁用 3删除 默认1
                this.form.value = row.status == '1' ? true : false
                this.form.content = row.content
                this.form.img_url = row.img_url
                this.form.id = this.listData[index].id
                // console.log(this.form)
            },
            handleDelete(index, row) {
                this.$confirm(`此操作将永久删除常见问题【${row.title}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        url: `${apiUrl}/admin/reply/delReply`,
                        method: 'post',
                        data: {
                            token: this.adminInfo.token,
                            uid: this.adminInfo.data.id,
                            id: this.tableData[index].id
                        }
                    }).then(res => {
                        if (res.data.code == 20000) {
                            this.$message.success('删除成功');
                            this.getQuestionList()
                        } else {
                            this.$message(res.data.msg);
                        }
                    }).catch(err => {
                        this.$message.error('删除失败');
                    })
                })
            },
            submit(type) {
                this.dialogFormVisible = false
                let url = `${apiUrl}/admin/reply/${this.type == 'add' ? 'addReply' : 'updateReply'}`
                let data = {
                    token: this.adminInfo.token,
                    uid: this.adminInfo.data.id,
                    title: this.form.title,
                    sort: this.form.sort,
                    status: this.form.value ? '1' : '2',  //状态 1正常 2禁用 3删除 默认1
                    content: this.form.content,
                }
                data.img_url = this.uploadUrl ? this.uploadUrl : ''
                this.form.id && (data.id = this.form.id)
                this.axios({
                    url,
                    data,
                    method: 'post',
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.$message.success(this.type == 'add' ? '添加成功' : '修改成功');
                        this.getQuestionList()
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$message.error('请求失败');
                })
            },
            getQuestionList() {
                this.loading = true
                this.axios({
                    url: `${apiUrl}/admin/reply/replyList`,
                    method: 'post',
                    data: {
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.tableData = []
                        res.data.data.length && res.data.data.forEach((item, i) => {
                            this.listData = JSON.parse(JSON.stringify(res.data.data))
                            this.tableData.push(
                                {
                                    sort: Number(item.sort),
                                    content: item.content,
                                    title: item.title,
                                    djrs: item.djrs,
                                    zsrs: item.zsrs,
                                    id: item.id,
                                    status: item.status,
                                    opt: '编辑/操作'
                                }
                            )
                        })
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
        }
    }
</script>

<style scoped lang="scss">

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

  /deep/ .el-input__inner {
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #ccc;
    background-color: #f6f6f6;
  }

  /deep/ .w-e-text {
    background-color: rgb(246, 246, 246);

  }

  /deep/ .placeholder {
    color: #ccc;
    z-index: 100;
  }

  /deep/ .el-dialog__footer {
    background-color: rgb(246, 246, 246)
  }

  /deep/ .el-dialog__footer {
    border-radius: 20px;
  }
</style>