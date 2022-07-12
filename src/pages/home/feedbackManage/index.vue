<template>
    <div>
        <el-table
                v-loading="loading"
                ref="multipleTable"
                tooltip-effect="dark"
                :data="tableData" border
                style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
            <el-table-column prop="status" label="是否受理">
                <template slot-scope="scope">
                    <el-switch
                            active-text="未受理"
                            inactive-text="已受理"
                            active-color="#ccc"
                            inactive-color="green"
                            @change="changeSwitch(scope.row)"
                            v-model="scope.row.status">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="optMan" label="操作人"></el-table-column>
            <el-table-column prop="opt" label="操作">
                <template slot-scope="scope">
<!--                    <button-->
<!--                            class="btnDetail"-->
<!--                            @click="handleEdit(scope.$index, scope.row)">编辑-->
<!--                    </button>-->
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
<!--                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="isEditOrAddL" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="反馈标题" :label-width="formLabelWidth">
                    <el-input disabled type="input" v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="反馈内容" :label-width="formLabelWidth">
                    <el-input disabled type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="操作人" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.optMan"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
<!--                <button class="btnCancle" @click="dialogFormVisible = false">取 消</button>-->
<!--                <button class="btnSubmit" type="primary" @click="submit">确 定</button>-->

                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="dialogFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>

</template>


<script>
    import {getFeedback} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        props: {
            adminInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            },
        },
        name: "",
        data() {
            return {
                loading: true,
                switchValue: false,
                dialogFormVisible: false,
                form: {
                    title: '',
                    status: false,
                    content: '',
                    optMan: ""
                },
                formLabelWidth: '100px',
                tableData: [],
                isEditOrAddL: "编辑",
                currentId: '',
            }
        },
        watch: {
            dialogFormVisible(newVal, oldVal) {
                !newVal && (this.form.content_url = null)
            }
        },
        created() {
            this.init()
        },
        methods: {
            async init() {
                this.loading = true
                try {
                    let {data} = await getFeedback()
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
                this.dialogFormVisible = true
                this.switchValue = row.status
                this.currentId = this.tableData[index].id
                for (let k in row) {
                    for (let key in this.form) {
                        if (k === key) {
                            this.form[key] = row[k]
                        }
                    }
                }
            },
            submit() {
                console.log(this.currentId)
                console.log(this.switchValue)
            },
            changeSwitch(item) {
                console.log(item)
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

  /deep/ .el-dialog { //弹窗
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