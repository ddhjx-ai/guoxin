<template>
  <div>
    <Form ref="form" :model="searchForm" :rules="rules" :label-width="100" label-position="right">
      <Row :gutter="24" type="flex">
        <Col :span="8">
          <FormItem label="名称：" prop="name" label-for="name">
            <Input v-model="searchForm.name" placeholder="请输入" element-id="name" />
          </FormItem>
        </Col>
        <Col :span="8">
          <FormItem label="状态：" prop="status">
            <Select v-model="searchForm.status" placeholder="请选择">
              <Option value="0">停用</Option>
              <Option value="1">启用</Option>
            </Select>
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
      <Button type="primary" icon="md-add" @click="handleOpenCreate">新建用户</Button>
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
        <template slot-scope="{ row }" slot="status">
          <Badge v-if="row.status === 0" status="default" text="停用" />
          <Badge v-if="row.status === 1" status="processing" text="启用" />
        </template>
        <template slot-scope="{ row,index }" slot="action">
          <a @click="handleUpdate(index)">编辑</a>
          <Divider type="vertical" />
          <a @click="handleDetail(row)">详情</a>
          <Divider type="vertical" />
          <a @click="partRole(row)">分配角色</a>
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

    <Modal v-model="userModal" :title="isUpdate ? '编辑用户' : '新增用户'" :loading="userModalLoading">
      <Form ref="create" :model="userFormData" :rules="userRules" :label-width="100">
        <FormItem label="用户名：" prop="userName">
          <Input v-model="userFormData.userName" placeholder="请输入" />
        </FormItem>
        <FormItem label="手机号" prop="phone">
          <Input v-model="userFormData.phone" placeholder="请输入" />
        </FormItem>
        <FormItem label="状态：" prop="status">
          <Select v-model="userFormData.status" placeholder="请选择">
            <Option :value="0">停用</Option>
            <Option :value="1">启用</Option>
          </Select>
        </FormItem>
        <FormItem label="密码：" prop="password">
          <Input v-model="userFormData.password" type="password" placeholder="请输入" />
        </FormItem>
        <FormItem label="确认密码：" prop="confirmPassword">
          <Input v-model="userFormData.confirmPassword" type="password" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>

    <!-- 用户详情 -->
    <Modal v-model="detailModal" title="用户详情">
      <Form ref="create" :model="userFormData" :label-width="100">
        <FormItem label="用户名：">
          <!-- {{userFormData.userName}} -->
          admin
        </FormItem>
        <FormItem label="手机号：" prop="phone">
          <!-- {{userFormData.phone}} -->
          13000000001
        </FormItem>
        <FormItem label="状态：">{{ userFormData.status == 1 ? '启用' : '禁用'}}</FormItem>
        <FormItem label="创建时间：">
          <!-- {{ userFormData.status == 1 ? '启用' : '禁用'}} -->
          2020-05-07 00:00:00
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>

    <!-- 分配角色 -->
    <Modal v-model="roleModal" width="500" @on-visible-change="roleModalChange" title="分配角色">
      <Form>
        <Row :gutter="20">
          <Col :span="12">
            <FormItem>
              <Input v-model="searchKey" placeholder="请输入角色名称" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem>
              <Button type="primary">查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
        :columns="roleColumns"
        :data="roleDataList"
        @on-select="roleSelect"
        @on-select-cancel="roleSelectCancel"
        @on-select-all="roleSelectAll"
        @on-select-all-cancel="roleSelectAllCancel"
      ></Table>
      <div class="ivu-mt ivu-text-center">
        <Page :total="dataList.length" />
      </div>
      <div slot="footer">
        <Button type="text" @click="cancelRoleModal">取消</Button>
        <Button type="primary" @click="handleRoleSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "userManager",
  data() {
    return {
      searchKey: "",
      userModal: false,
      detailModal: false,
      userModalLoading: false,
      userRules: {},
      userFormData: {
        status: 1
      },
      roleModal: false,
      roleColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          minWidth: 100
        }
      ],
      roleDataList: [
        {
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
        }
      ],
      searchForm: {},
      pageForm: {
        total: 0,
        pageNumber: 10,
        pageSize: 1
      },
      rules: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "userName",
          minWidth: 100
        },
        {
          title: "创建日期",
          key: "createDate",
          minWidth: 100
        },
        {
          title: "手机号",
          key: "phone",
          minWidth: 100
        },
        {
          title: "状态",
          slot: "status",
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
          userId: 1,
          userName: "admin",
          createDate: "2020-05-07 00:00:00",
          phone: 13000000001,
          status: 1
        },
        {
          userId: 2,
          userName: "master",
          createDate: "2020-05-07 00:00:00",
          phone: 13000000001,
          status: 0
        },
        {
          userId: 3,
          userName: "user",
          createDate: "2020-05-07 00:00:00",
          phone: 13000000002,
          status: 1
        }
      ],
      loading: false,
      isUpdate: false
    };
  },
  methods: {
    handleSubmit() {},
    handleReset() {},
    handleSelect() {},
    handleSelectCancel() {},
    handleSelectAll() {},
    handleSelectAllCancel() {},
    handleRemoveAll() {},
    handleDetail() {
      this.detailModal = true;
    },
    pageChange() {},
    handleUpdate() {
      console.log(11111);
      this.isUpdate = true;
      this.userModal = true;
    },
    handleRemove() {},
    handleOpenCreate() {
      this.userModal = true;
    },
    cancelModal() {},
    handleSave() {},
    partRole() {
      this.roleModal = true;
    },
    roleSelect() {},
    roleSelectCancel() {},
    roleSelectAll() {},
    roleSelectAllCancel() {},
    roleModalChange() {},
    cancelRoleModal() {},
    handleRoleSave() {}
  }
};
</script>

<style>
</style>