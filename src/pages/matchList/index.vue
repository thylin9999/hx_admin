<template>
    <div>
        <div class="top">
<!--            <div class="searchTop">-->
<!--                <div>-->
<!--                    <el-col :span="16">-->
<!--                        <el-select style="width: 100%" v-model="currentType" placeholder="请选择分组">-->
<!--                            <el-option-->
<!--                                    v-for="item in groupList"-->
<!--                                    :key="item.id"-->
<!--                                    :label="item.name"-->
<!--                                    :value="item.id">-->
<!--                            </el-option>-->
<!--                        </el-select>-->
<!--                    </el-col>-->
<!--                    <el-col :span="2" style="margin-left: 5px">-->
<!--                        <div class="grid-content bg-purple">-->
<!--                            <button class="btnSearch" @click="query('group_id')">赛事分类</button>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <el-col :span="6" style="line-height: 40px;text-align: center">-->
<!--                        赛事名称-->
<!--                    </el-col>-->
<!--                    <el-col :span="10">-->
<!--                        <div class="grid-content bg-purple">-->
<!--                            <el-input :span="4" v-model="usernameQuery" placeholder="请输入赛事名称"></el-input>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                    <el-col :span="2" style="margin-left: 5px">-->
<!--                        <div class="grid-content bg-purple">-->
<!--                            <button class="btnSearch" type="primary" @click="query('username')">查询</button>-->
<!--                        </div>-->
<!--                    </el-col>-->
<!--                </div>-->
<!--            </div>-->
        </div>
        <div>
            <el-table :cell-style="setSellStyle" :span="24" :row-style="{height:'58px'}"
                      :header-row-style="{height:'40px'}"
                      v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                      style="width: 100%">
                <el-table-column type="index" label="序号"></el-table-column>
                <el-table-column prop="matchId" label="比赛ID"></el-table-column>
               <el-table-column prop="homeChs" label="主队名"></el-table-column>
               <el-table-column prop="homeId" label="主队ID"></el-table-column>
               <el-table-column prop="awayChs" label="客队名"></el-table-column>
               <el-table-column prop="awayId" label="客队ID"></el-table-column>
               <el-table-column prop="state" label="比赛状态">
                 <template slot-scope="scope">
                   <div>{{state[scope.row.state]}}</div>
                 </template>
               </el-table-column>
               <el-table-column prop="matchTime" label="比赛时间" width="180"></el-table-column>
              <el-table-column prop="follow" label="关注人数"></el-table-column>
              <el-table-column prop="reserveNum" label="预约人数"></el-table-column>
              <el-table-column prop="matchLevel" label="赛事等级"></el-table-column>
                <el-table-column prop="logo" label="是否推荐">
                    <template slot-scope="scope">
                       <div>{{scope.row.isPosition ==2 ? '是' : '不是'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
<!--                <el-table-column label="操作">-->
<!--                    <template slot-scope="scope">-->
                        <!--                        <button class="btnDel" @click="handleDelete(scope.$index, scope.row)">删除</button>-->
<!--                        <el-button @click="handleEdit(scope.$index, scope.row)" type="primary" icon="el-icon-edit"-->
<!--                                   circle></el-button>-->
<!--                        <el-button type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"-->
<!--                                   circle></el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
          <div class="block" v-if="total > 10">
            <el-pagination
                @current-change="changePage"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
          </div>
        </div>
    </div>
</template>

<script>
    import {getScheduleList} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        data() {
            return {
                total:0,
                currentType: '',
                usernameQuery: '',
                loading: true,
                tableData: [],
                dialog: false,
                groupList: [
                    {id: 1, name: '全部'},
                    {id: 2, name: '足球'},
                    {id: 3, name: '篮球'},
                    {id: 4, name: '电竞'},
                    {id: 5, name: '其他'},
                ],
              state:{
                '0':'未开',
                '1':'上半场',
                '2':'中场',
                '3':'下半场',
                '4':'加时',
                '5':'点球',
                '-1':'完场',
                '-10':'取消',
                '-11':'待定',
                '-12':'腰斩',
                '-13':'中断',
                '-14':'推迟',
              }

            }
        },
        created() {
            this.init({pageSize:10,pageNum	:1})
        },
        methods: {
            async init(dataJSon) {
                this.loading = true
                try {
                    let {data} = await getScheduleList(dataJSon)
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
            addAdmin() {
                this.dialog = true
            },
            setSellStyle({row, column, rowIndex, columnIndex}) {
                if (columnIndex == 0) return "borderRadius: 10px  0 0 10px"
                if (columnIndex == 7) return "borderRadius: 0  10px 10px 0"
            },
            switchChange(row) {
                console.log(row)
            },
            handleEdit(index, row) {
                console.log(index, row)
            },
            handleDelete(index, row) {
                this.$confirm(`删除此项联赛【${row.nameChs}】, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                })
            },
        }
    }
</script>
<style scoped lang="scss">

  .searchTop {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

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
