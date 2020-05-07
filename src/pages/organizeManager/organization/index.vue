<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Row :gutter="20">
        <Col class="leftCard" :span="6" style="border-right: 2px solid #ccc;">
          <Card :bordered="false" dis-hover class="ivu-mt" style="height:652px;overflow-y: auto;">
            <Row :gutter="24" style="height:58px">
              <Col :span="15">
                <Input v-model="searchKey" placeholder="输入关键字进行过滤" />
              </Col>
              <Col :span="6">
                <Button type="primary">查询</Button>
              </Col>
            </Row>
            <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <i class="el-icon-plus" @click="() => append(data)"></i>
                  <i class="el-icon-edit"></i>
                  <i class="el-icon-delete" @click="() => remove(node, data)"></i>
                  <!-- <el-button class="el-icon-plus" type="text" size="mini" @click="() => append(data)"></el-button>
                <el-button class="el-icon-edit" type="text" size="mini" @click="() => remove(node, data)"></el-button>
                  <el-button class="el-icon-delete" type="text" size="mini" @click="() => remove(node, data)"></el-button>-->
                </span>
              </span>
            </el-tree>
          </Card>
        </Col>
        <Col :span="18">
          <!-- <table-form @on-submit="getData" @on-reset="getData" /> -->
          <table-list ref="table" />
        </Col>
      </Row>
    </Card>

    <!-- 新增部门 -->
    <Modal v-model="departmentModal" title="新增部门" @on-visible-change="changeModal" width="600">
      <Form ref="dataForm" :model="departmentData" :rules="rules" :label-width="100">
        <Row :gutter="20">
          <Col :span="24">
            <FormItem label="部门编码：" prop="name">
              <Input v-model="departmentData.name" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="部门名称：" prop="username">
              <Input v-model="departmentData.username" placeholder="请输入" />
            </FormItem>
          </Col>

          <Col :span="24">
            <FormItem label="部门类型：" prop="phone">
              <Select v-model="departmentData.department" placeholder="请选择">
                <Option v-for="item in departmentList" :key="item" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="公司类型：" prop="department">
              <Select v-model="departmentData.department" placeholder="请选择">
                <Option v-for="item in departmentList" :key="item" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="法人：" prop="status">
              <Input v-model="departmentData.username" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col :span="24">
            <FormItem label="电话：" prop="sex">
              <Input v-model="departmentData.username" placeholder="请输入" />
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
import tableForm from "./table-form";
import tableList from "./table-list";
export default {
  name: "organizeManager",
  components: { tableForm, tableList },
  data() {
    return {
      searchKey: "",
      rules: {},
      departmentList: ["市场部", "技术部", "运营部"],
      data: [
        {
          children: [
            {
              children: [
                {
                  children: [],
                  id: 10005,
                  label: "对外市场"
                },
                {
                  children: [],
                  id: 10008,
                  label: "对内市场"
                },
                {
                  children: [],
                  id: 10003,
                  label: "技术部"
                }
              ],
              id: 10000,
              label: "市场部"
            },
            {
              children: [
                {
                  children: [],
                  id: 10009,
                  label: "开发组"
                },
                {
                  children: [],
                  id: 10010,
                  label: "测试组"
                },
                {
                  children: [],
                  id: 10011,
                  label: "运维组"
                }
              ],
              id: 10001,
              label: "技术部"
            },
            {
              children: [
                {
                  children: [],
                  id: 10012,
                  label: "产品运营"
                },
                {
                  children: [],
                  id: 10013,
                  label: "数据运营"
                }
              ],
              id: 10002,
              label: "运营部"
            },
            {
              children: [
                {
                  children: [],
                  id: 10014,
                  label: "对外法务"
                },
                {
                  children: [],
                  id: 10015,
                  label: "对内法务"
                }
              ],
              id: 10003,
              label: "法务部"
            },
            {
              children: [
                {
                  children: [],
                  id: 10016,
                  label: "对外策划"
                },
                {
                  children: [],
                  id: 10017,
                  label: "对内策划"
                }
              ],
              id: 10004,
              label: "策划部"
            },
            {
              children: [],
              id: 10007,
              label: "财务部"
            }
          ],
          id: 9999,
          label: "市场服务有限公司"
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      departmentData: {},
      departmentModal: false
    };
  },
  methods: {
    getData(item) {
      this.$refs.table.getData(item);
    },
    append(data) {
      console.log(data);
      this.departmentModal = true;
      /* const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild); */
    },

    remove(node, data) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除当前数据</p>",
        onOk: () => {
          this.$Message.info("删除成功");
        },
        onCancel: () => {
          this.$Message.info("删除取消");
        }
      });
      /* const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1); */
    },

    changeModal() {},
    cancelModal() {},
    handleSave() {}
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped lang='less'>
.el-tree {
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  .table-input {
    min-width: 80px;
    max-width: 130px;

    /deep/.el-input__inner {
      height: 22px;
      line-height: 22px;
    }
  }
}

[class*=" el-icon-"],
[class^="el-icon-"] {
  margin: 0 3px;
}
/* .leftCard {
  max-height: 90vh;
  overflow-y: auto;
} */
</style>