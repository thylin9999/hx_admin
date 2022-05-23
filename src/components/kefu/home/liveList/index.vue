<template>
    <div>
        <el-table :cell-style="setSellStyle" :span="24" :row-style="{height:'58px'}" :header-row-style="{height:'40px'}"
                  v-loading="loading" ref="multipleTable" tooltip-effect="dark" :data="tableData" border
                  style="width: 100%">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="ID" label="直播间ID"></el-table-column>
            <el-table-column prop="title" label="直播间标题"></el-table-column>
            <el-table-column prop="anchorAccount" label="主播账号"></el-table-column>
            <el-table-column prop="anchorNickname" label="主播昵称"></el-table-column>
            <el-table-column prop="recommend" label="是否推荐">
                <template slot-scope="scope">
                    <el-switch
                            active-text="否"
                            inactive-text="是"
                            active-color="#ccc"
                            inactive-color="#ff4600"
                            @change="switchChange(scope.row)"
                            v-model="scope.row.recommend">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="推荐热门排序"></el-table-column>
            <el-table-column prop="line" label="是否在线">
                <template slot-scope="scope">
                    <div class="circle" :class="scope.row.line === 1  ?  'circleGreen' : 'circleRed'"></div>
                    {{scope.row.line === 1 ? '在线' : '离线'}}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="recentOpenTime" label="最近开播时间"></el-table-column>
            <el-table-column prop="visitNum" label="访问人数"></el-table-column>
            <el-table-column prop="cover" label="直播封面">
                <template slot-scope="scope">
                    <el-image
                            style="max-width: 32px;max-height: 32px"
                            :src="scope.row.cover"
                            :preview-src-list="[scope.row.cover,scope.row.cover]">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-switch
                            active-text="禁播"
                            inactive-text="正常"
                            active-color="#ccc"
                            inactive-color="#ff4600"
                            @change="switchChange(scope.row)"
                            v-model="scope.row.status">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <button class="btnEditList" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新增/编辑 广告" :visible.sync="dialog" width="40%">
            <el-form ref="ruleForm" :model="formItem" label-width="100px">
                <el-form-item label="直播间标题">
                    <el-input v-model="formItem.title"></el-input>
                </el-form-item>
                <el-form-item label="是否推荐">
                    <el-switch v-model="formItem.recommend" active-color="#ff4600" inactive-color="#ccc"></el-switch>
                </el-form-item>
                <el-form-item label="推荐排序">
                    <el-input v-model="formItem.sort"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch v-model="formItem.status" active-text="正常" inactive-text="禁用">>
                    </el-switch>
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
    import {getLiveList} from "@/api/control";
    import {statusCode} from "@/util/statusCode";

    export default {
        data() {
            return {
                loading: true,
                tableData: [],
                isEditTxt: "详情/编辑",
                currentId: '',
                dialog: false,
                formItem: {
                    title: '',
                    recommend: '',
                    sort: '',
                    status: false,
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
                    let {data} = await getLiveList()
                    console.log(data)
                    if (data.code === statusCode.success) {
                        this.tableData = JSON.parse(JSON.stringify(data.data))
                        this.loading = false
                    }
                } catch (e) {
                    console.log('error--error')
                }
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
            },
            onSubmit(type) {
                // this.dialog = false
                console.log(this.formItem)
            },
            switchChange(row) {
                console.log(row)
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