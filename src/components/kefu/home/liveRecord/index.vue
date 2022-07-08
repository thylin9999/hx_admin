<template>
    <div>
        <div class="search">
            <el-input v-model="input" placeholder="主播ID"></el-input>
            <el-button @click="search" type="primary">主要按钮</el-button>
        </div>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="room_id" label="直播间ID" width="100"></el-table-column>
            <el-table-column prop="room_title" label="直播间标题" width="200"></el-table-column>
            <el-table-column prop="heat_num" label="主播热度"></el-table-column>
            <el-table-column prop="nick" label="主播昵称"></el-table-column>
            <el-table-column prop="sort" sortable label="热门排序"></el-table-column>
            <el-table-column prop="line" label="是否在线">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.line === 1  ?  'circleGreen' : 'circleRed'"></div>
                    {{ scope.row.line === 1 ? '在线' : '离线' }}
                </template>
            </el-table-column>
            <el-table-column prop="start_time" label="最近开播时间" width="200"></el-table-column>
            <el-table-column prop="view_num" label="访问人数"></el-table-column>
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
    </div>
</template>

<script>
    import {getLiveRecord} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

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
        methods: {
            async search() {
                let dataJson = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    room_id: this.input
                }
                console.log(dataJson)
                this.loading = true
                try {
                    let {data} = await getLiveRecord(dataJson)
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


</style>
