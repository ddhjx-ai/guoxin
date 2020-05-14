<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
    <Row :gutter="20">
      <Col :span="8">
        <Card :bordered="false" dis-hover class="ivu-mt" style="height:500px">
          <ul class="roleList">
            <li>
              <h3 style="line-height:40px;padding-left:10px;background:#eee;">角色列表</h3>
            </li>
            <li
              @click="currentIndex = index"
              :class="{'active': currentIndex===index}"
              v-for="(item,index) in roleList"
              :key="item.id"
            >{{item.roleName}}</li>
          </ul>
        </Card>
      </Col>
      <Col :span="16">
        <Card :bordered="false" dis-hover class="ivu-mt" style="height:500px">
          <h3 style="line-height:40px;padding-left:10px;background:#eee;">菜单列表</h3>
          <el-tree :data="menuList" :default-expanded-keys="[1,2]" show-checkbox node-key="id" @check="handleCheck" @node-click="nodeClick" :props="defaultProps" ></el-tree>
          <Row :gutter="20" style="height:50px;line-height:50px;margin-top:50px">
            <Col :span="6" style="display:flex;justify-content: center;">
              <Button type="success" @click="submit">确认</Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

    </Card>
  </div>
</template>

<script>
export default {
  name: "powerSet",
  data() {
    return {
      roleModal: false,
      roleFormData: {},
      rules: {},
      menuList: [
        {
          id: 1,
          label: "数据管理",
          children: [
            {
              id: 4,
              label: "数据列表",
              children: []
            }
          ]
        },
        {
          id: 2,
          label: "权限管理",
          children: [
            {
              id: 5,
              label: "用户列表"
            },
            {
              id: 6,
              label: "角色列表"
            },
            {
              id: 102,
              label: "权限设置"
            }
            ,
            {
              id: 103,
              label: "菜单列表"
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
      currentIndex: -1
    };
  },
  methods: {
    cancelModal() {},
    handleSave() {},
    changeModal() {},
    nodeClick(data, node, currentNode) {
      console.log(data, node, currentNode)
    },
    handleCheck(data,list){
      console.log(data,list)
    },
    submit() {
      // this.$router.push({name: '403'})
    }
  }
};
</script>

<style scoped>
.roleList {
  list-style: none;
}
.roleList li:not(:first-of-type) {
  line-height: 40px;
  padding-left: 10px;
  cursor: pointer;
}
.roleList li.active {
  background: #f1f1f1;
}
</style>