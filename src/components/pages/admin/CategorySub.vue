<template>
  <div class="flexdiv">
    <div class="flexdiv-left">
      <navMenu />
    </div>
    <div class="flexdiv-right p-20">
      <el-row class="text-l">
        <el-button type="primary" size="small" round @click="addClick">添加小类</el-button>
        <!-- <el-button type="danger" size="small" round @click="deleteRow('many' )">删除</el-button> -->
      </el-row>
      <el-table class="mt-20" ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" height="80vh">
        <el-table-column label="序号" width="100" type="index" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column label="小类名称" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.MALL_SUB_NAME }}</template>
        </el-table-column>
        <el-table-column label="所属大类" width="300" align="center">
          <template slot-scope="scope">{{ scope.row.MALL_CATEGORY_NAME }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="editRow( scope.row )"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteRow('one',scope.row )"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框 -->
    <el-dialog :visible.sync="dialogVisible" title="请输入名称">
      <el-form label-position="right" label-width="100px" :model="dialogData">
        <el-form-item label="小类名称：">
          <el-input v-model="dialogData.MALL_SUB_NAME" size="small"></el-input>
        </el-form-item>
        <el-form-item label="所属大类：">
          <el-select v-model="dialogData.MALL_CATEGORY_ID" placeholder="请选择" size="small">
            <el-option v-for="item in categoryList" :key="item._id" :value="item._id" :label="item.MALL_CATEGORY_NAME"></el-option>
          </el-select>
        </el-form-item>
        <div>
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
import navMenu from '@/components/component/navMenu'

export default {
  components: {
    navMenu
  },
  data() {
    return {
      categoryList: [],
      tableData: [],
      dialogData: [],
      // multipleSelection: [],
      dialogVisible: false,
      act: 'add'
    }
  },
  created() {
    this.getInfo()
    this.getCategoryList()
  },
  methods: {
    // handleSelectionChange(val) {
    //   this.multipleSelection = val
    //   console.log(this.multipleSelection)
    // },
    // 获取大类
    getCategoryList() {
      axios({
        url: url.getCategoryList
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categoryList = response.data.message
            console.log(this.categoryList)
          } else {
            this.$message.error('服务器错误，数据取得失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 获取小类
    getInfo() {
      axios({
        url: url.getCategorySubList
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
    // 添加小类信息
    addCategory() {
      this.dialogData.MALL_CATEGORY_NAME = this.categoryList.filter(item => item._id === this.dialogData.MALL_CATEGORY_ID)[0].MALL_CATEGORY_NAME
      console.log(this.dialogData)
      axios({
        url: url.addCategorySub,
        method: 'post',
        data: {
          MALL_SUB_NAME: this.dialogData.MALL_SUB_NAME,
          MALL_CATEGORY_ID: this.dialogData.MALL_CATEGORY_ID,
          MALL_CATEGORY_NAME: this.dialogData.MALL_CATEGORY_NAME,
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
    // 更新小类信息
    updateCategory() {
      this.dialogData.MALL_CATEGORY_NAME = this.categoryList.filter(item => item._id === this.dialogData.MALL_CATEGORY_ID)[0].MALL_CATEGORY_NAME
      console.log(this.dialogData)
      axios({
        url: url.updateCategorySub,
        method: 'post',
        data: {
          ID: this.dialogData.ID,
          MALL_SUB_NAME: this.dialogData.MALL_SUB_NAME,
          MALL_CATEGORY_ID: this.dialogData.MALL_CATEGORY_ID,
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
    // 删除小类信息
    deleteCategory(ID) {
      axios({
        url: url.deleteCategorySub,
        method: 'post',
        data: {
          ID: ID
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
      this.dialogData = { MALL_SUB_NAME: '', MALL_CATEGORY_ID: '', MALL_CATEGORY_NAME: '' }
    },
    // 点击编辑按钮，弹框显示，并回显数据
    editRow(row) {
      this.act = 'edit'
      this.dialogVisible = true
      console.log(row)
      this.dialogData = { ID: row._id, MALL_SUB_NAME: row.MALL_SUB_NAME, MALL_CATEGORY_ID: row.MALL_CATEGORY_ID }
    },
    // 确认删除
    deleteRow(once, row) {
      this.$confirm('此操作将删除该行, 是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCategory(row._id)
        // 复选框
        // if (once === 'many') this.deleteCategory(this.multipleSelection)
        // 单行
        // else {
        //   const deleteData = {
        //     ID: row.ID,
        //     MALL_SUB_NAME: row.MALL_SUB_NAME
        //   }
        //   this.deleteCategory(deleteData)
        // }
      }).catch(() => this.$message.info('取消删除'))
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
