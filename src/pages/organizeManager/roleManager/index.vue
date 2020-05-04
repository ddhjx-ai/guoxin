<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Row :gutter="20" style="height:50px">
        <Col :span="24">
          <Button type="success" icon="md-add" @click="roleModal=true">新建角色</Button>
        </Col>
      </Row>
      <Row :gutter="20">
        <Col :span="6" style="border-right: 2px solid #ccc;">
          <ul class="roleList">
            <li>
              <h3 style="line-height:40px;padding-left:10px;background:#eee;">所有角色</h3>
            </li>
            <li @click="currentIndex = index" :class="{'active': currentIndex===index}" v-for="(item,index) in roleList" :key="item.id">{{item.roleName}}</li>
          </ul>
        </Col>
        <Col :span="18">
          <h3 style="line-height:40px;padding-left:10px;background:#eee;">功能权限</h3>
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="defaultProps"
          ></el-tree>
        </Col>
      </Row>
    </Card>

    <!-- 新增部门 -->
    <Modal
      v-model="roleModal"
      title="新增角色"
      @on-visible-change="changeModal"
    >
      <Form ref="dataForm" :model="roleFormData" :rules="rules" :label-width="100">
        <Row :gutter="20">
          <Col :span="24">
            <FormItem label="角色编码：" prop="roleCode">
              <Input v-model="roleFormData.roleCode" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="名称：" prop="roleName">
              <Input v-model="roleFormData.roleName" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="备注：">
                <Input v-model="roleFormData.remark" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
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
      roleModal: false,
      roleFormData: {},
      rules: {

      },
      menuList: [
        {
          id: 1,
          label: "人力管理",
          children: [
            {
              id: 4,
              label: "员工管理",
              children: []
            },
            {
              id: 100,
              label: "员工详情",
              children: []
            },
            {
              id: 101,
              label: "员工操作",
              children: []
            }
          ]
        },
        {
          id: 2,
          label: "系统设置",
          children: [
            {
              id: 5,
              label: "新增角色"
            },
            {
              id: 6,
              label: "角色详情"
            },
            {
              id: 102,
              label: "会员管理"
            }
          ]
        },
        {
          id: 3,
          label: "企业管理",
          children: [
            {
              id: 7,
              label: "企业授权列表"
            },
            {
              id: 8,
              label: "查看企业信息"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      roleList: [
        {
          id:1,
          roleName: '总管理员'
        },
        {
          id:2,
          roleName: '系统管理员'
        },
        {
          id:3,
          roleName: '财务总监'
        },
        {
          id:4,
          roleName: '财务经理'
        },
        {
          id:5,
          roleName: '总经理'
        },
        {
          id:6,
          roleName: '内勤人员'
        },
        {
          id:7,
          roleName: '主管'
        },
        {
          id:8,
          roleName: '技术总监'
        },
      ],
      currentIndex: -1
    };
  },
  methods: {
    cancelModal() {

    },
    handleSave() {

    },
    changeModal() {

    }
  }
};
</script>

<style scoped>
.roleList{
list-style: none;
}
.roleList li:not(:first-of-type){
  line-height: 40px;
  padding-left: 10px;
  cursor: pointer;
}
.roleList li.active{
  background: #f1f1f1;
}
</style>