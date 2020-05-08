<template>
  <div>
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

    <Modal v-model="roleModal" :title="isUpdate ? '编辑角色' : '新建角色'" :loading="roleModalLoading">
      <Form ref="create" :model="roleFormData" :rules="roleRules" :label-width="100">
        <FormItem label="角色名：" prop="roleName">
          <Input v-model="roleFormData.roleName" placeholder="请输入" />
        </FormItem>
        <FormItem label="备注：" prop="remark">
          <Input v-model="roleFormData.remark" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "roleManager",
  data() {
    return {
      isUpdate: false,
      roleModal: false,
      roleModalLoading: false,
      roleRules: {},
      roleFormData: {},
      searchForm: {
        total: 0,
        pageNumber: 10,
        pageSize: 1
      },
      pageForm: {},
      rules: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "角色名",
          key: "roleName",
          minWidth: 100
        },
        {
          title: "创建日期",
          key: "createDate",
          minWidth: 100
        },
        {
          title: "备注",
          key: "remark",
          minWidth: 100
        },
        
        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 140
        }
      ],
      dataList: [
        {
          roleId: 1,
          roleName: '管理员',
          createDate: '2020-05-07 00:00:00',
          remark: 'AAA',
        },
        {
          roleId: 2,
          roleName: '会长',
          createDate: '2020-05-07 00:00:00',
          remark: 'BBB',
        },
        {
          roleId: 2,
          roleName: '主管',
          createDate: '2020-05-07 00:00:00',
          remark: 'cccc',
        }
        
      ],
      loading: false
    };
  },
  methods: {
    handleSubmit() {},
    handleReset() {},
    handleSelect() {},
    handleSelectCancel() {},
    handleSelectAll() {},
    handleSelectAllCancel() {},
    pageChange() {},
    handleUpdate(index) {
      this.roleFormData = this.dataList[index]
      this.isUpdate = true
      this.roleModal = true
    },
    handleDetail() {},
    handleOpenCreate() {
      this.roleModal = true
    },
    handleRemoveAll() {

    },
    cancelModal() {

    },
    handleSave() {}
  }
};
</script>

<style>
</style>