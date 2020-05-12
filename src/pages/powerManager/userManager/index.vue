<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form ref="form" :model="searchForm" :label-width="80" label-position="right">
        <Row :gutter="24" type="flex">
          <Col :span="8">
            <FormItem label="名称：">
              <Input v-model="searchForm.searchKey" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col :span="8">
            <FormItem label="状态：">
              <Select v-model="searchForm.isuse" placeholder="请选择">
                <Option :value="0">停用</Option>
                <Option :value="1">启用</Option>
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
          <template slot-scope="{ row }" slot="isuse">
            <Badge v-if="row.isuse === 0" status="default" text="停用" />
            <Badge v-if="row.isuse === 1" status="processing" text="启用" />
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
    </Card>

    <Modal v-model="userModal" :title="isUpdate ? '编辑用户' : '新增用户'" @on-visible-change="modalChange">
      <Form ref="createForm" :model="userFormData" :rules="userRules" :label-width="100">
        <FormItem label="用户名：" prop="user_name">
          <Input v-model="userFormData.user_name" placeholder="请输入" />
        </FormItem>
        <FormItem label="真实姓名：" prop="name">
          <Input v-model="userFormData.name" placeholder="请输入" />
        </FormItem>
        <FormItem label="手机号：" prop="phone">
          <Input v-model="userFormData.phone" placeholder="请输入" />
        </FormItem>
        <!-- <FormItem label="状态：" prop="isuse">
          <Select v-model="userFormData.isuse" placeholder="请选择">
            <Option :value="0">停用</Option>
            <Option :value="1">启用</Option>
          </Select>
        </FormItem>-->

        <FormItem label="密码：" prop="user_pwd">
          <Input v-model="userFormData.user_pwd" type="password" placeholder="请输入" />
        </FormItem>
        <FormItem label="确认密码：" prop="confirmPassword">
          <Input v-model="userFormData.confirmPassword" type="password" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="userModal = false">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>

    <!-- 用户详情 -->
    <Modal v-model="detailModal" title="用户详情">
      <Form :model="userFormData" :label-width="100">
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
        <Button type="primary" @click="detailModal=false">确定</Button>
      </div>
    </Modal>

    <!-- 分配角色 -->
    <Modal v-model="roleModal" width="500" @on-visible-change="roleModalChange" title="分配角色">
      <Form>
        <Row :gutter="20">
          <Col :span="12">
            <FormItem>
              <Input v-model="searchRoleName" placeholder="请输入角色名称" />
            </FormItem>
          </Col>
          <Col :span="6">
            <FormItem>
              <Button type="primary" @click="searchByRoleName">查询</Button>
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
        @on-selection-change="roleSelectChange"
      ></Table>
      <div class="ivu-mt ivu-text-center">
        <Page
          :total="rolePageForm.total"
          :current.sync="rolePageForm.pageNumber"
          :page-size="rolePageForm.pageSize"
          @on-change="rolePageChange"
        />
      </div>
      <div slot="footer">
        <Button type="text" @click="cancelRoleModal">取消</Button>
        <Button type="primary" @click="handleRoleSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getUserList,
  userDelete,
  userSave,
  userUpdate,
  userAddRole,
  getRoleList
} from "@/api/powerManager";
export default {
  name: "userManager",
  data() {
    // 密码验证
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (value.trim().length < 6 || value.trim().length > 16) {
        callback(new Error("请输入6-12位密码"));
      } else {
        callback();
      }
    };
    // 确认密码
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userFormData.user_pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    // 手机号校验
    const validateTel = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号"));
      } else if (value.trim().length !== 11) {
        callback(new Error("手机号位数不正确"));
      } else if (
        !/^1(3|5|8|9)\d{9}|4[5-9]\d{8}|6[^0389]\d{8}|7[0-8]\d{8}$/.test(value)
      ) {
        callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      searchRoleName: "",
      userModal: false,
      detailModal: false,
      userModalLoading: false,
      userRules: {
        user_name: [
          { required: true, message: "请输入用户名名称", trigger: "blur" }
        ],
        /* isuse: [
          {
            required: true,
            type: "number",
            message: "请选择状态",
            trigger: "change"
          }
        ], */
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [{ required: true, validator: validateTel, trigger: "blur" }],
        user_pwd: [
          { required: true, validator: validatePassword, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      userFormData: {
        user_name: "",
        isuse: 1,
        phone: "",
        user_pwd: ""
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
          id: 1,
          roleName: "管理员",
          createDate: "2020-05-07 00:00:00",
          remark: "AAA"
        },
        {
          id: 2,
          roleName: "会长",
          createDate: "2020-05-07 00:00:00",
          remark: "BBB"
        },
        {
          id: 3,
          roleName: "主管",
          createDate: "2020-05-07 00:00:00",
          remark: "cccc"
        },
        {
          id: 4,
          roleName: "管理员",
          createDate: "2020-05-07 00:00:00",
          remark: "AAA"
        },
        {
          id: 5,
          roleName: "会长",
          createDate: "2020-05-07 00:00:00",
          remark: "BBB"
        },
        {
          id: 6,
          roleName: "主管",
          createDate: "2020-05-07 00:00:00",
          remark: "cccc"
        },
        {
          id: 7,
          roleName: "管理员",
          createDate: "2020-05-07 00:00:00",
          remark: "AAA"
        },
        {
          id: 8,
          roleName: "会长",
          createDate: "2020-05-07 00:00:00",
          remark: "BBB"
        },
        {
          id: 9,
          roleName: "主管",
          createDate: "2020-05-07 00:00:00",
          remark: "cccc"
        },
        {
          id: 10,
          roleName: "管理员",
          createDate: "2020-05-07 00:00:00",
          remark: "AAA"
        },
        {
          id: 11,
          roleName: "会长",
          createDate: "2020-05-07 00:00:00",
          remark: "BBB"
        },
        {
          id: 12,
          roleName: "主管",
          createDate: "2020-05-07 00:00:00",
          remark: "cccc"
        }
      ],
      searchForm: {
        searchKey: "",
        isuse: ""
      },
      pageForm: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      },
      rolePageForm: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "user_name",
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
          slot: "isuse",
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
          id: 1,
          user_name: "admin",
          createDate: "2020-05-07 00:00:00",
          phone: 13000000001,
          isuse: 1,
          roleIdList: [1]
        },
        {
          id: 2,
          user_name: "master",
          createDate: "2020-05-07 00:00:00",
          phone: 13000000001,
          isuse: 0,
          roleIdList: [1, 2]
        },
        {
          id: 3,
          user_name: "user",
          createDate: "2020-05-07 00:00:00",
          phone: 13000000002,
          isuse: 1,
          roleIdList: [1, 2, 3]
        }
      ],
      loading: false,
      isUpdate: false,
      selectIdList: [],
      currentIndex: -1,
      selectRoleIdList: [] // 选中的角色id列表
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取用户列表
    getList() {
      getUserList({
        ...this.searchForm,
        ...this.pageForm
      }).then(res => {});
    },
    handleSubmit() {
      this.pageForm.pageNumber = 1;
      this.getList();
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
    // 删除用户接口
    handleRemoveAll() {
      if (this.selectIdList.length === 0) {
        return this.$Message.warning("请选择删除项");
      }
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除当前项?</p>",
        onOk: () => {
          menuDelete({
            userIds: this.selectIdList
          }).then(res => {
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    handleDetail() {
      this.detailModal = true;
    },
    pageChange() {},
    // 打开编辑弹框，显示当前项数据
    handleUpdate(index) {
      this.currentIndex = index;
      let data = this.dataList[index];
      this.userFormData = {
        user_name: data.user_name,
        isuse: data.isuse,
        phone: data.phone
      };
      this.isUpdate = true;
      this.userModal = true;
    },
    handleOpenCreate() {
      this.isUpdate = false;
      this.userModal = true;
    },
    cancelModal() {},
    // 新增、编辑用户
    handleSave() {
      console.log(this.userFormData);
      let data;
      if (!this.isUpdate) {
        data = {
          ...this.userFormData
        };
      } else {
        data = {
          ...this.userFormData,
          id: this.dataList[this.currentIndex].id
        };
      }
      this.$refs.createForm.validate(valid => {
        if (valid) {
          if (!this.isUpdate) {
            userSave(data)
              .then(res => {
                this.$Message.success("添加成功");
                this.userModal = false;
              })
              .catch(err => {
                this.$Message.warning("添加失败");
                this.userModal = false;
              });
          } else {
            userUpdate(data)
              .then(res => {
                this.$Message.success("添加成功");
                this.userModal = false;
              })
              .catch(err => {
                this.$Message.warning("添加失败");
                this.userModal = false;
              });
          }
        }
      });
    },
    // 打开分配角色弹框
    partRole(row) {
      this.roleModal = true;
      this.getRoleData();
    },
    // 根据角色字段获取角色列表
    searchByRoleName() {
      this.getRoleData();
    },
    // 发送获取角色列表的请求
    getRoleData() {
      getRoleList({
        pageSize: this.rolePageForm.pageSize,
        pageNumber: this.rolePageForm.pageNumber,
        searchKey: this.searchRoleName
      }).then(res => {
        this.roleDataList = res.data.list;
      });
    },
    roleSelect(selection) {
      this.selectList(selection);
    },
    roleSelectCancel(selection) {
      this.selectList(selection);
    },
    roleSelectAll(selection) {
      this.selectList(selection);
    },
    roleSelectAllCancel(selection) {
      this.selectList(selection);
    },
    // 操作角色id列表
    selectList(list) {
      this.selectRoleIdList = list.map(item => {
        return item.id;
      });
      console.log(this.selectRoleIdList);
    },
    roleModalChange() {},
    roleSelectChange(row) {
      console.log(row);
    },
    // 关闭分配角色弹框
    cancelRoleModal() {
      (this.searchRoleName = ""), (this.roleModal = false);
    },
    // 调用分配角色接口
    handleRoleSave() {
      if (this.selectRoleIdList.length === 0) {
        return this.$Message.warning("请选择角色");
      }
    },
    modalChange(val) {
      this.handleFormReset();
    },
    // 重置表单
    handleFormReset() {
      this.$refs.createForm.resetFields();
    },
    rolePageChange() {}
  }
};
</script>

<style>
</style>