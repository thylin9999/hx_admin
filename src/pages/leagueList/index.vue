<template>
    <div>
        <div>
            <el-table :cell-style="setSellStyle" :span="24" :row-style="{height:'58px'}"
                      :header-row-style="{height:'40px'}"
                      v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                      style="width: 100%">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="leagueId" label="赛队ID" width="100"></el-table-column>
                <el-table-column prop="nameChs" label="赛队全称"></el-table-column>
                <el-table-column prop="nameChsShort" label="赛队简称"></el-table-column>
                <el-table-column prop="leagueLogo" label="联赛logo">
                    <template slot-scope="scope">
                        <el-image
                                style="max-width: 32px;max-height: 32px"
                                :src="scope.row.leagueLogo"
                                :preview-src-list="[scope.row.leagueLogo,scope.row.leagueLogo]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="hierarchy" sortable label="赛事级别">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.hierarchy" placeholder="请选择"
                                   @change="switchChange(scope.row,1,$event)">
                            <el-option
                                    v-for="item in [1,2,3]"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" sortable label="排序"></el-table-column>
                <el-table-column prop="isHot" label="是否设为热门">
                    <template slot-scope="scope">
                        <el-switch
                                active-color="green"
                                inactive-color="#ccc"
                                @change="switchChange(scope.row,2)"
                                v-model="scope.row.recommend == 1">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="adminUser" label="操作人"></el-table-column>
                <el-table-column prop="update_time	" label="操作时间"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
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
        <el-dialog title="编辑" :visible.sync="dialog" width="20%">
            <el-form :model="form">
                <el-form-item label="赛队ID">
                    <el-input disabled v-model="form.leagueId"></el-input>
                </el-form-item>
                <el-form-item label="赛队简称">
                    <el-input disabled v-model="form.nameChsShort"></el-input>
                </el-form-item>
                <el-form-item label="热门排序">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit()">提交</el-button>
                <el-button @click="dialog = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getLeaguesList, editLeaguesList} from "@/api/control";
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
                form:{
                  leagueId:'',
                  nameChsShort:'',
                  sort:'',
                }
            }
        },
        created() {
            this.init({pageSize:10,pageNum	:1})
        },
        methods: {
            async init(dataJson) {
                this.loading = true
                try {
                    let {data} = await getLeaguesList(dataJson)
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
            async switchChange(row, num, hierarchy) { //num 1 赛事等级  2 热门设置
                if (num === 1) {
                    let {data} = await editLeaguesList({leagueId: row.leagueId, hierarchy})
                    let msg = ''
                    let type = 'success'
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
                } else if (num === 2) {
                    let {data} = await editLeaguesList({leagueId: row.leagueId, recommend: row.recommend == 1 ? 0 : 1})
                    let msg = ''
                    let type = 'success'
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
            handleEdit(index, row) {
                this.dialog = true
                this.form.leagueId = row.leagueId
                this.form.nameChsShort = row.nameChsShort
                this.form.sort = row.sort
            },
            async submit() {
                    let {data} = await editLeaguesList(this.form)
                    let msg = ''
                    let type = 'success'
                    if (data.code === statusCode.success) {
                        msg = '操作成功'
                        this.dialog = false
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
