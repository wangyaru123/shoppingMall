<template>
  <div>
    <el-button type="primary" size="small" round @click="addClick">添加</el-button>
    <el-button type="danger" size="small" round @click="deleteClick">删除</el-button>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="大类名称" width="120">
        <template slot-scope="scope">{{ scope.row.MALL_CATEGORY_NAME }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow( scope.row )"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框 -->
    <el-dialog :visible.sync="dialogVisible" title="请输入名称" class="width-20">
      <el-form label-position="right" label-width="100px" :model="dialogData">
        <el-form-item label="大类名称：">
          <el-input v-model="dialogData.MALL_CATEGORY_NAME" size="small"></el-input>
        </el-form-item>
        <div class="text-c">
          <el-button type="primary" size="medium" @click="submitClick">确定</el-button>
          <el-button type="info" size="medium" @click="cancel">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'

export default {
  data() {
    return {
      tableData: [],
      dialogData: [],
      multipleSelection: [],
      dialogVisible: false,
      act: 'add'
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取大类
    getInfo() {
      axios({
        url: url.getCategoryList
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.tableData = response.data.message
            console.log(this.tableData)
          } else {
            this.$message.error('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 添加大类信息
    addCategory() {
      axios({
        url: url.addCategory,
        method: 'post',
        data: {
          MALL_CATEGORY_NAME: this.dialogData.MALL_CATEGORY_NAME,
          IMAGE: null,
          TYPE: 2,
          SORT: 1,
          COMMENTS: null
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.$message.success('添加成功')
            this.getInfo()
          } else {
            this.$message.error('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 更新大类信息
    updateCategory() {
      axios({
        url: url.updateCategory,
        method: 'post',
        data: {
          ID: this.dialogData.ID,
          MALL_CATEGORY_NAME: this.dialogData.MALL_CATEGORY_NAME
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.$message.success('修改成功')
            this.getInfo()
          } else {
            this.$message.error('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 删除大类信息
    deleteCategory() {
      axios({
        url: url.deleteCategory,
        method: 'post',
        data: {
          ID: this.dialogData.ID,
          MALL_CATEGORY_NAME: this.dialogData.MALL_CATEGORY_NAME
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.$message.success('删除成功')
            this.getInfo()
          } else {
            this.$message.error('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 添加
    addClick() {
      this.act = 'add'
      this.dialogVisible = true
      this.dialogData = { MALL_CATEGORY_NAME: '' }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.act = 'edit'
      this.dialogVisible = true
      this.dialogData = { ID: row.ID, MALL_CATEGORY_NAME: row.MALL_CATEGORY_NAME }
    },
    // 删除
    deleteClick() {
    },
    // 确认删除
    deleteRow(row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => this.deleteCategory(row.ID))
        .catch(() => this.$message.info('取消删除'))
    },
    submitClick() {
      this.dialogVisible = false
      if (this.act === 'add') this.addCategory()
      else this.updateCategory()
    },
    cancel() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped>
</style>
