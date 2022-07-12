<template>
    <div>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="room_id" label="直播间ID" width="100"></el-table-column>
            <el-table-column prop="room_title" label="直播间标题" width="200"></el-table-column>
            <el-table-column prop="heat_num" label="主播热度"></el-table-column>
            <el-table-column prop="nick" label="主播昵称"></el-table-column>
            <el-table-column prop="recommend" label="是否推荐" width="150">
                <template slot-scope="scope">
                    <el-switch
                            active-text="是"
                            inactive-text="否"
                            active-color="green"
                            inactive-color="#ccc"
                            @change="changeSwitch(scope.row,1)"
                            v-model="scope.row.is_position == 2 ">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="sort" sortable label="热门排序"></el-table-column>
            <el-table-column prop="line" label="是否在线">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.line === 1  ?  'circleGreen' : 'circleRed'"></div>
                    {{scope.row.line === 1 ? '在线' : '离线'}}
                </template>
            </el-table-column>
            <el-table-column prop="start_time" label="最近开播时间" width="200"></el-table-column>
            <el-table-column prop="view_num" label="访问人数"></el-table-column>
            <el-table-column prop="live_cover" label="直播封面">
                <template slot-scope="scope">
                    <el-image
                            style="max-width: 32px;max-height: 32px"
                            :src="scope.row.live_cover"
                            :preview-src-list="[scope.row.live_cover,scope.row.live_cover]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="150">
                <template slot-scope="scope">
                    <el-switch
                            active-text="正常"
                            inactive-text="禁播"
                            active-color="green"
                            inactive-color="#ccc"
                            @change="changeSwitch(scope.row,2)"
                            v-model="scope.row.status == 1 ">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</button>-->
                    <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit"
                               circle></el-button>
                </template>
            </el-table-column>
        </el-table>
      <div class="block" v-if="total > 10">
        <el-pagination
            @current-change="changePage"
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
        <el-dialog title="新增/编辑" :visible.sync="dialog" width="40%">
            <el-form ref="ruleForm" :model="formItem" label-width="100px">
                <el-form-item label="直播间标题">
                    <el-input v-model="formItem.room_title"></el-input>
                </el-form-item>
                <el-form-item label="是否推荐">
                    <el-switch v-model="formItem.is_position == 2" active-color="green"
                               inactive-color="#ccc"></el-switch>
                </el-form-item>
                <el-form-item label="推荐排序">
                    <el-input v-model="formItem.sort"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="formItem.status == 1" active-text="正常" inactive-text="禁用"></el-switch>
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
    import {getLiveList, editLive, forbidLive} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        data() {
            return {
                total:0,
                loading: true,
                tableData: [],
                isEditTxt: "详情/编辑",
                currentId: '',
                dialog: false,
                formItem: {
                    room_title: '',
                    is_position: '',
                    sort: '',
                    status: '',
                }
            }
        },
        created() {
            this.init({pageSize: 10, pageNum: 1})
        },
        methods: {
            async init(dataJson) {
                this.loading = true
                try {
                    let {data} = await getLiveList(dataJson)
                    console.log(data)
                    if (data.code === statusCode.success) {
                        this.total = data.total
                        this.tableData = JSON.parse(JSON.stringify(data.rows))
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
            },
            changePage(val){
              this.init({pageSize:10,pageNum	:val})
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 7) return "borderRadius: 0  10px 10px 0"
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
                this.formItem.room_id = row.room_id
            },
            async onSubmit() { //编辑提交
                let msg = ''
                let type = 'success'
                let {data} = await editLive(this.formItem)
                if (data.code === statusCode.success) {
                    msg = '操作成功'
                    this.addDialog = false
                    this.init()
                    this.dialog = false
                } else {
                    msg = data.msg
                    type = 'warning'
                }
                this.$message({
                    message: msg,
                    type,
                    duration: 2000
                });
            },
            async changeSwitch(item, num) {  // 1推荐  2直播间状态
                if (num === 1) {  //设置推荐
                    let msg = ''
                    let type = 'success'
                    let {data} = await editLive({room_id: item.room_id, is_position: item.is_position == 1 ? 2 : 1})
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
                } else { // 禁播
                    let msg = ''
                    let type = 'success'
                    let {data} = await forbidLive({room_id: item.room_id, status: item.status == 1 ? 2 : 1})
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
    //width: 400px !important;
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
