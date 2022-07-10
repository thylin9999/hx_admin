<template>
    <div>
<!--        <el-button style="float: right;border-radius: 10px;margin-bottom: 5px;background-color: #1f1d20;color: #fff"-->
<!--                   @click="dialog = true">新增开关+-->
<!--        </el-button>-->
        <div class="topBtnList">
            <button class="btnAdd" @click="dialog = true">新增开关+</button>
        </div>
        <el-table :span="24" :row-style="{height:'58px'}" :header-row-style="{height:'40px'}"
                  v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="name" label="名称"></el-table-column>
            <el-table-column prop="remark" label="说明"></el-table-column>
            <el-table-column prop="status" label="状态">
                <!--                <template slot-scope="scope">-->
                <!--                    <div class="circle" :class="scope.row.status?  'circleGreen' : 'circleRed'"></div>-->
                <!--                    {{scope.row.status ? '正常' : '禁用'}}-->
                <!--                </template>-->
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
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="createMan" label="创建人"></el-table-column>
            <el-table-column prop="optTime" label="操作时间"></el-table-column>
            <el-table-column prop="optMan" label="操作人"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
<!--                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</button>-->
<!--                    <button class="btnDel" @click="handleDelete(scope.$index, scope.row)">删除</button>-->
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增/编辑 开关" :visible.sync="dialog" width="20%">
            <el-form ref="ruleForm" :model="formItem" label-width="80px">
                <el-form-item label="标题">
                    <el-input v-model="formItem.title"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="formItem.name"></el-input>
                    <p style="color: red">备注：该字段为前端使用，切勿随意修改 </p>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input type="textarea" v-model="formItem.remark"></el-input>
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
    import {getWebSet} from "@/api/control";
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
                    name: '',
                    status: false,
                    remark: '',
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
                    let {data} = await getWebSet()
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
                this.$confirm(`此操作将永久删除开关【${row.title}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
            },
            onSubmit() {
                console.log(this.formItem)
            },
            resetForm() {
                for (let key in this.formItem) {
                    if (typeof this.formItem[key] !== "boolean") this.formItem[key] = ''
                }
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