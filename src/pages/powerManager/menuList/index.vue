<template>
  <div>
    <div class="i-table-no-border">
      <Button type="primary" icon="md-add" @click="handleOpenCreate">新建菜单</Button>
      <Button icon="md-trash" class="ivu-ml-8" @click="handleRemoveAll" type="primary">删除</Button>
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
          <!-- <Divider type="vertical" />
          <a @click="handleDetail(row)">详情</a> -->
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

    <Modal v-model="menuModal" title="新建菜单">
      <Form ref="create" :model="roleFormData" :rules="roleRules" :label-width="100">
        <FormItem label="菜单名称：" prop="roleName">
          <Input v-model="roleFormData.roleName" placeholder="请输入" />
        </FormItem>
        <FormItem label="上级菜单：" prop="sup_menu">
            <Select v-model="roleFormData.sup_menu" placeholder="请选择">
              <Option value="0">数据管理</Option>
              <Option value="1">权限管理</Option>
            </Select>
          </FormItem>
        <FormItem label="菜单路径：" prop="roleUrl">
          <Input v-model="roleFormData.roleUrl" placeholder="请输入" />
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
// import menu from '@/menu/modules/powerManager'
export default {
  name:'menuList',
  /* created() {
    console.log(menu.children.length=3)
  }, */
  data() {
    return{
      menuModal: false,
      loading: false,
      roleRules: {},
      roleFormData: {

      },
      pageForm: {
        total: 0,
        pageNumber: 10,
        pageSize: 1
      },
      dataList: [
        {
          roleName: '用户列表',
          sup_Name: '权限管理',
          menuId:1
        },
        {
          roleName: '角色列表',
          sup_Name: '权限管理',
          menuId:2
        }
      ],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "菜单名称",
          key: "roleName",
          minWidth: 100
        },
        {
          title: "上级菜单",
          key: "sup_Name",
          minWidth: 100
        },
        
        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 140
        }
      ]
    }
  },
  methods: {
    handleOpenCreate() {
      this.menuModal = true
    },
    handleRemoveAll() {

    },
    handleSelect() {

    },
    handleSelectCancel() {

    },
    handleSelectAll() {

    },
    handleSelectAllCancel() {},
    pageChange() {

    },
    cancelModal() {

    },
    handleSave() {

    }
  }
}
</script>

<style>

</style>