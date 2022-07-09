<template>
    <div>
        <div class="search">
            <el-input class="inp" v-model="input" placeholder="主播ID或房间号"></el-input>
            <button class="btnAdd" @click="search">搜索</button>
        </div>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="room_id" label="直播间ID"></el-table-column>
            <el-table-column prop="nick" label="主播昵称"></el-table-column>
            <el-table-column prop="room_title" label="直播间标题"></el-table-column>
            <el-table-column prop="match_id" label="比赛ID"></el-table-column>
            <el-table-column prop="league_id" label="联赛ID"></el-table-column>
            <el-table-column prop="start_time" label="开播时间"></el-table-column>
            <el-table-column prop="end_time" label="结束时间"></el-table-column>
            <el-table-column prop="live_time" label="开播时长"></el-table-column>
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
    import {getLiveRecord} from "@/api/control";
    import {statusCode} from "@/util/statusCode";
    import {Format, MillisecondToTime} from "@/util/common"

    export default {
        data() {
            return {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                loading: true,
                tableData: [],
                input: '',
            }
        },
        mounted() {
            this.search()
        },
        methods: {
            async search() {
                let dataJson = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    room_id: this.input
                }
                this.loading = true
                try {
                    let {data} = await getLiveRecord(dataJson)
                    console.log(data)
                    if (data.code === statusCode.success) {
                        this.total = data.total
                        this.tableData = JSON.parse(JSON.stringify(data.rows))
                        this.tableData.map((item, i) => {
                            item.start_time = Format(item.start_time, '-')
                            item.end_time = Format(item.end_time, '-')
                            item.live_time = MillisecondToTime(item.live_time)
                        })
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
            },
            changePage(val) {
                this.pageNum = val
                this.search()
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 7) return "borderRadius: 0  10px 10px 0"
            },
        }
    }
</script>

<style scoped lang="scss">

    .inp {
        width: 200px;
        margin: 10px 0;
    }
</style>
