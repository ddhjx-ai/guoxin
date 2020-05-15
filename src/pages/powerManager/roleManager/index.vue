<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form ref="form" :model="searchForm" :rules="rules" :label-width="100" label-position="right">
        <Row :gutter="24" type="flex">
          <Col :span="8">
            <FormItem label="名称：" prop="name" label-for="name">
              <Input v-model="searchForm.name" placeholder="请输入" element-id="name" />
            </FormItem>
          </Col>
          <Col :span="8" class="ivu-text-right">
            <FormItem>
              <Button type="primary" @click="handleSubmit">查询</Button>
              <Button class="ivu-ml-8" @click="handleReset">重置</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>

      <div class="i-table-no-border">
        <Button type="primary" icon="md-add" @click="handleOpenCreate">新建角色</Button>
        <Button icon="md-trash" class="ivu-ml-8" @click="handleRemoveAll" type="primary">批量删除</Button>
        <Table
          ref="table"
          :columns="columns"
          :data="dataList"
          :loading="loading"
          class="ivu-mt"
          @on-select="handleSelect"
          @on-select-cancel="handleSelectCancel"
          @on-select-all="handleSelectAll"
          @on-select-all-cancel="handleSelectAllCancel"
        >
          <template slot-scope="{ row,index }" slot="action">
            <a @click="handleUpdate(index)">编辑</a>
            <Divider type="vertical" />
            <a @click="handleDetail(row)">详情</a>
          </template>
        </Table>
        <div class="ivu-mt ivu-text-center">
          <Page
            :total="pageForm.total"
            :current.sync="pageForm.pageNumber"
            :page-size="pageForm.pageSize"
            @on-change="pageChange"
          />
        </div>
      </div>
    </Card>

    <Modal v-model="roleModal" :title="isUpdate ? '编辑角色' : '新建角色'" :loading="roleModalLoading"  @on-visible-change="modalChange">
      <Form ref="createForm" :model="roleFormData" :rules="roleRules" :label-width="100">
        <FormItem label="角色名：" prop="role_name">
          <Input v-model="roleFormData.role_name" placeholder="请输入" />
        </FormItem>
        <FormItem label="备注：" prop="remark">
          <Input v-model="roleFormData.remark" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="roleModal = false">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {getRoleList,roleDelete,roleSave,roleUpdate} from '@/api/powerManager'
export default {
  name: "roleManager",
  data() {
    return {
      isUpdate: false,
      roleModal: false,
      roleModalLoading: false,
      roleRules: {
        role_name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      },
      roleFormData: {
        role_name:'',
        remark: ''
      },
      searchForm: {
        
      },
      pageForm: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      },
      rules: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id",
          minWidth: 100
        },
        {
          title: "角色名",
          key: "role_name",
          minWidth: 100
        },
        /* {
          title: "创建日期",
          key: "createDate",
          minWidth: 100
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 100
        }, */
        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 140
        }
      ],
      dataList: [
        /* {
          roleId: 1,
          roleName: "管理员",
          createDate: "2020-05-07 00:00:00",
          remark: "AAA"
        },
        {
          roleId: 2,
          roleName: "会长",
          createDate: "2020-05-07 00:00:00",
          remark: "BBB"
        },
        {
          roleId: 2,
          roleName: "主管",
          createDate: "2020-05-07 00:00:00",
          remark: "cccc"
        } */
      ],
      loading: false,
      currentIndex: -1,
      selectIdList: []
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getRoleList({
        pageSize: this.pageForm.pageSize,
        pageNumber: this.pageForm.pageNumber
      }).then(res => {
        if(res.code == 200){
          this.dataList = res.data.data;
        }
      });
    },
    handleSubmit() {
      this.pageForm.pageNumber = 1
      queryCondition({
        pageSize: this.pageForm.pageSize,
        pageNumber: this.pageForm.pageNumber,
        role_name: this.searchForm.role_name
      }).then(res => {

      })
    },
    handleReset() {},
    // 勾选列表项操作
    handleSelect(selection) {
      this.selectIdList = selection.map(item => {
        return item.id;
      });
    },
    handleSelectCancel(selection) {
      this.selectIdList = selection.map(item => {
        return item.id;
      });
    },
    handleSelectAll(selection) {
      this.selectIdList = selection.map(item => {
        return item.id;
      });
    },
    handleSelectAllCancel(selection) {
      this.selectIdList = [];
    },
    pageChange() {},
    handleUpdate(index) {
      this.currentIndex = index
      this.roleFormData = {...this.dataList[index]};
      this.isUpdate = true;
      this.roleModal = true;
    },
    handleDetail() {},
    // 打开新建角色弹框
    handleOpenCreate() {
      this.isUpdate = false
      this.roleModal = true;
    },
    // 批量删除
    handleRemoveAll() {
      if (this.selectIdList.length === 0) {
        return this.$Message.warning("请选择删除项");
      }
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除当前项?</p>",
        onOk: () => {
          roleDelete({
            roleIds: this.selectIdList.toString() + ','
          }).then(res => {
            if(res.code == 200){
              this.$Message.info("删除成功");
              this.getList()
            }
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    cancelModal() {},
    handleSave() {
      let data;
      if (!this.isUpdate) {
        data = {
          role_name: this.roleFormData.role_name,
          remark: this.roleFormData.remark
        };
      } else {
        data = {
          id: this.dataList[this.currentIndex].id,
          role_name: this.roleFormData.role_name,
          remark: this.roleFormData.remark
        };
      }
      this.$refs.createForm.validate(valid => {
        if(valid){
          if(!this.isUpdate){
            roleSave(data).then(res => {
              if(res.code == 200) {
                this.getList()
                this.roleModal = false;
              }
            })
          }else{
            roleUpdate(data).then(res => {
              if(res.code == 200){
                 this.getList()
                this.roleModal = false;
              }
            }) 
          }
        }else{

        }
      })
    },
    modalChange() {
      this.$refs.createForm.resetFields();
    }
  }
};
</script>

<style>
</style>