<template>
    <div>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="member_id" label="直播间ID"></el-table-column>
            <el-table-column prop="title" label="直播间标题"></el-table-column>
            <el-table-column prop="anchor_name" label="主播昵称"></el-table-column>
            <el-table-column prop="leagueChsShort" label="联赛名称"></el-table-column>
            <el-table-column prop="leagueId" label="联赛ID "></el-table-column>
            <el-table-column prop="matchId" label="比赛ID "></el-table-column>
            <el-table-column prop="homeChs" label="主队名"></el-table-column>
            <el-table-column prop="awayChs" label="客队名"></el-table-column>
            <el-table-column prop="matchTime" label="比赛时间"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="recommend" label="是否推荐">
                <template slot-scope="scope">
                    <el-switch
                        disabled
                        active-text="是"
                        inactive-text="否"
                        active-color="green"
                        inactive-color="#ccc"
                        @change="changeSwitch(scope.row,1)"
                        v-model="scope.row.is_position == 2 ">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="leagueType" label="联赛类型">
                <template slot-scope="scope">
                        <div>{{leagueTypeList[scope.row.leagueType]}}</div>
                </template>
            </el-table-column>
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
        </el-table>
        <div class="block" v-if="total > 10">
            <el-pagination
                @current-change="changePage"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getLiveList, editLive, forbidLive, getLiveOrder} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        data() {
            return {
                total: 0,
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
                },
                leagueTypeList: {
                    1: '足球', 2: '篮球', 3: '电竞', 4: '其他',
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
                    let {data} = await getLiveOrder(dataJson)
                    if (data.code === statusCode.success) {
                        this.total = data.total
                        this.tableData = JSON.parse(JSON.stringify(data.rows))
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
            },
            changePage(val) {
                this.init({pageSize: 10, pageNum: val})
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
