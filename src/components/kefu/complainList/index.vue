<template>
    <div>
        <el-table
                v-loading="loading"
                ref="multipleTable"
                tooltip-effect="dark"
                :data="tableData" border
                style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="create_time" label="时间"></el-table-column>
            <el-table-column prop="customer_no" label="投诉 客服编号"></el-table-column>
            <el-table-column prop="type_name" label="投诉类型"></el-table-column>
            <el-table-column prop="title" label="投诉标题"></el-table-column>
            <el-table-column prop="accept" label="是否受理"></el-table-column>
            <el-table-column prop="admin_name" label="操作人"></el-table-column>
            <el-table-column prop="group_name" label="受理组"></el-table-column>
            <el-table-column prop="opt" label="操作">
                <template slot-scope="scope">
                    <button
                            class="btnDetail"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="isEditOrAddL" :visible.sync="dialogFormVisible" width="35%">
            <el-form :model="form">
                <el-form-item label="客服编号" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.customer_no" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="投诉类型" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.type_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="投诉内容" :label-width="formLabelWidth">
                    <el-input disabled type="textarea" v-model="form.content" aria-placeholder="填写投诉内容"></el-input>
                </el-form-item>
                <el-form-item label="" v-if="form.content_url" :label-width="formLabelWidth">
                    <div class="popImg" style="vertical-align: bottom">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="form.content_url"
                                :preview-src-list="[form.content_url,form.content_url]">
                        </el-image>
                    </div>

                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="受理组" :label-width="formLabelWidth">
                    <el-select disabled v-model="form.group_id" placeholder="请选择分组">
                        <el-option v-for="(item,i) in groupList" :label="item.group_name" :value="item.id"
                                   :key="i"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否受理" :label-width="formLabelWidth">
                    <el-switch
                            v-model="switchValue"
                            active-color="#ff4600"
                            inactive-color="#ccc"
                            active-text="已经受理"
                            inactive-text="未受理">
                    </el-switch>
                    <!--                    <el-input v-show="value" v-model="form.name" autocomplete="off"></el-input>-->
                </el-form-item>
                <el-form-item label="操作人" :label-width="formLabelWidth">
                    <el-input disabled v-model="form.admin_name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <button class="btnCancle" @click="dialogFormVisible = false">取 消</button>
                <button class="btnSubmit" type="primary" @click="submit">确 定</button>
            </div>
        </el-dialog>
    </div>

</template>


<script>
    export default {
        props: {
            adminInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            groupList: {
                type: Array,
                default: function () {
                    return []
                }
            },
        },
        name: "",
        data() {
            return {
                loading: true,
                switchValue: false,
                fileList: [],
                value: true,
                dialogTableVisible: false,
                dialogFormVisible: false,
                form: {},
                formLabelWidth: '100px',
                multipleSelection: [],
                tableData: [],
                isEditOrAddL: "编辑",
                topList: [{title: "客服列表", path: ""}],
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
            init() {
                this.getQuestionList()
            },
            handleEdit(index, row) {
                this.isEditOrAddL = `投诉详情 【${row.customer_no}】`
                this.dialogFormVisible = true
                this.form.customer_no = this.listData[index].customer_no
                this.form.type_name = this.listData[index].type_name
                this.form.content = this.listData[index].content
                this.form.content_url = this.listData[index].content_url
                this.form.phone = this.listData[index].phone
                this.form.group_id = this.listData[index].group_id
                this.form.group_name = this.listData[index].group_name
                this.form.accept = this.listData[index].accept
                this.form.admin_name = this.listData[index].admin_name
                this.currentId = this.listData[index].id
                if (this.listData[index].accept == 2) {
                    this.switchValue = true
                }
                if (this.listData[index].accept == 1) {
                    this.switchValue = false
                }
            },
            submit() {
                this.axios({
                    url: `${apiUrl}/admin/feedback/updateFeedback`,
                    method: 'post',
                    data: {
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id,
                        accept: this.switchValue ? "2" : "1",
                        id: this.currentId,
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        this.tableData = []
                        this.getQuestionList()
                        this.dialogFormVisible = false
                        this.$message.success('操作成功');
                    } else {
                        this.$message.error(res.data.msg);
                    }
                }).catch(err => {
                    this.$message.error('操作失败');
                })
            },
            getQuestionList() {
                this.loading = true
                this.axios({
                    url: `${apiUrl}/admin/feedback/lists`,
                    method: 'post',
                    data: {
                        token: this.adminInfo.token,
                        uid: this.adminInfo.data.id
                    }
                }).then(res => {
                    if (res.data.code == 20000) {
                        res.data.data.length && res.data.data.forEach((item, i) => {
                            this.listData = JSON.parse(JSON.stringify(res.data.data))
                            this.tableData.push(
                                {
                                    create_time: item.create_time,
                                    customer_no: item.customer_no,
                                    type_name: item.type_name,
                                    title: item.title,
                                    accept: item.accept == 1 ? "否" : "是",  //是否受理 1未受理 2已受理 3忽略', 默认 1未受理
                                    admin_name: item.admin_name,//'编辑/操作',
                                    group_name: item.group_name
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