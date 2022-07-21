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
            <el-table-column prop="title" label="标题" width="150"></el-table-column>
            <el-table-column prop="status" label="是否开启">
                <template slot-scope="scope">
                    <el-switch
                            active-color="#ccc"
                            inactive-color="green"
                            @change="switchChange(scope.row)"
                            active-text="关"
                            inactive-text="开"
                            v-model="scope.row.status">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="内容">
                <template slot-scope="scope">
                    <div v-html="scope.row.content"></div>
                </template>
            </el-table-column>
            <el-table-column prop="opt" label="操作" width="200">
                <template slot-scope="scope">
<!--                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)" type="text" size="small">-->
<!--                        编辑-->
<!--                    </button>-->
<!--                    <button class="btnDel" type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除-->
<!--                    </button>-->
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="dialogTitle"
                   :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="form">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <div class="grid-content bg-purple">
                            <el-form-item label="标题">
                                <el-input v-model="form.title" autocomplete="off" placeholder="请输入内容"></el-input>
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
<!--                <button class="btnCancle" @click="dialogFormVisible = false">取 消</button>-->
<!--                <button class="btnSubmit" @click="submit">提 交</button>-->

                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import EditorBar from './editoritem.vue'
    import {getContentList} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        components: {EditorBar},
        data() {
            return {
                loading: true,
                isClear: false,
                type: "add",  //add || edit
                fileList: [],
                dialogFormVisible: false,
                form: {
                    title: '',
                    status: false,
                    content: null
                },
                tableData: [],
                dialogTitle: "",
            }
        },
        watch: {},
        created() {
            this.init()
        },
        mounted() {
        },
        methods: {
            async init() {
                this.loading = true
                try {
                    let {data} = await getContentList()
                    console.log(data)
                    if (data.code === statusCode.success) {
                        this.tableData = JSON.parse(JSON.stringify(data.data))
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
            },
            change(){

            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 6) return "borderRadius: 0  10px 10px 0"
            },
            addQuestion() {
                this.type = "add"
                this.dialogFormVisible = true
            },
            handleEdit(index, row) {
                this.type = "edit"
                this.dialogFormVisible = true
                this.form.title = row.title
                this.form.content = row.content
            },
            handleDelete(index, row) {
                this.$confirm(`此操作将删除内容【${row.title}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
            },
            submit() {
                this.dialogFormVisible = false
            },
            switchChange(item) {
                console.log(item)
            }
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
    background-color: #189e90;
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