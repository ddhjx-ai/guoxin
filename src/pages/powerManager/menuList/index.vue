<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
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

    <Modal v-model="menuModal" title="新建菜单" @on-visible-change="modalChange">
      <Form ref="create" :model="menuFormData" :rules="menuRules" :label-width="100">
        <FormItem label="菜单名称：" prop="menu_name">
          <Input v-model="menuFormData.menu_name" placeholder="请输入" />
        </FormItem>
        <FormItem label="上级菜单：" prop="parent_id">
          <Select v-model="menuFormData.parent_id" placeholder="请选择">
            <Option
              :value="item.id"
              v-for="item in parentMenuList"
              :key="item.id"
            >{{item.menu_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="菜单路径：" prop="menu_url">
          <Input v-model="menuFormData.menu_url" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="menuModal = false">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getMenuList,
  menuSave,
  menuDelete,
  menuUpdate
} from "@/api/powerManager";
export default {
  name: "menuList",
  data() {
    return {
      menuModal: false,
      loading: false,
      menuRules: {
        menu_name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" }
        ],
        parent_id: [
          { required: true, message: "请选择上级菜单", trigger: "change" }
        ],
        menu_url: [
          { required: true, message: "请输入菜单路径", trigger: "blur" }
        ]
      },
      menuFormData: {
        menu_name: "",
        parent_id: "",
        menu_url: ""
      },
      pageForm: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      },
      dataList: [
        {
          menu_name: "数据列表",
          sup_Name: "数据管理",
          id: 1,
          parent_id: 0
        },
        {
          menu_name: "角色列表",
          sup_Name: "权限管理",
          id: 2,
          parent_id: 1
        }
      ],
      parentMenuList: [
        {
          menu_name: "数据管理",
          id: 0
        },
        {
          menu_name: "权限管理",
          id: 1
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
          key: "menu_name",
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
      ],
      isUpdate: false,
      currentIndex: -1,
      selectIdList: []
    };
  },
  created() {},
  methods: {
    // 获取菜单列表
    getList() {
      getMenuList()
        .then(res => {})
        .catch(err => {});
    },
    handleOpenCreate() {
      this.menuModal = true;
      this.isUpdate = false;
    },
    // 调用删除菜单接口
    handleRemoveAll() {
      if (this.selectIdList.length === 0) {
        return this.$Message.warning("请选择删除项");
      }
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除当前项?</p>",
        onOk: () => {
          menuDelete({
            menuIds: this.selectIdList
          }).then(res => {
            this.$Message.info("删除成功");
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    // 勾选列表项操作
    handleSelect(selection, row) {
      this.selectIdList = selection.map(item => {
        return item.id;
      });
      console.log(this.selectIdList);
    },
    handleSelectCancel(selection, row) {
      this.selectIdList = selection.map(item => {
        return item.id;
      });
      console.log(this.selectIdList);
    },
    handleSelectAll(selection) {
      this.selectIdList = selection.map(item => {
        return item.id;
      });
      console.log(this.selectIdList);
    },
    handleSelectAllCancel() {
      this.selectIdList = [];
    },
    pageChange() {
      console.log(this.pageForm);
    },
    // 添加菜单和编辑菜单
    handleSave() {
      let data;
      if (!this.isUpdate) {
        data = {
          ...this.menuFormData
        };
      } else {
        data = {
          ...this.menuFormData,
          id: this.dataList[this.currentIndex].id
        };
      }
      this.$refs.create.validate(valid => {
        if (valid) {
          if (!this.isUpdate) {
            menuSave(data)
              .then(res => {
                this.$Message.success("添加成功");
                this.menuModal = false;
              })
              .catch(err => {
                this.$Message.warning("添加失败");
                this.menuModal = false;
              });
          } else {
            menuUpdate(data)
              .then(res => {
                this.$Message.success("添加成功");
                this.menuModal = false;
              })
              .catch(err => {
                this.$Message.warning("添加失败");
                this.menuModal = false;
              });
          }
        }
      });
    },
    handleUpdate(index) {
      this.currentIndex = index;
      this.menuModal = true;
      this.isUpdate = true;
      this.menuFormData = { ...this.dataList[index] };
    },
    modalChange(val) {
      console.log(val);
      this.handleReset();
    },
    // 重置表单
    handleReset() {
      this.$refs.create.resetFields();
    }
  }
};
</script>

<style>
</style>