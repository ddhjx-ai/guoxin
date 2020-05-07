<template>
  <div class="i-table-no-border">
    <Button type="primary" icon="md-add" @click="handleAdd">新增</Button>
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
        <Badge v-if="row.status === '0'" status="default" text="停用" />
        <Badge v-if="row.status === '1'" status="processing" text="启用" />
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <a @click="handleUpdate(index)">编辑</a>
        <Divider type="vertical" />
        <a @click="handleRemove(index)">详情</a>
        <Divider type="vertical" />
        <a @click="handlePost(row.id)">分配岗位</a>
      </template>
    </Table>
    <div class="ivu-mt ivu-text-center">
      <Page :total="dataList.length" :current.sync="current" />
    </div>

    <!-- 新增、编辑用户 -->
    <Modal
      v-model="showCreate"
      :title="isAdd ? '新增用户' : '编辑用户'"
      @on-visible-change="changeModal"
      width="800"
    >
      <Form ref="dataForm" :model="editData" :rules="createRules" :label-width="80">
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="姓名：" prop="name">
              <Input v-model="editData.name" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="用户名：" prop="username">
              <Input v-model="editData.username" placeholder="请输入" />
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="手机号：" prop="phone">
              <Input v-model="editData.phone" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="部门：" prop="department">
              <Select v-model="editData.department" placeholder="请选择">
                <Option v-for="item in departmentList" :key="item" :value="item">{{item}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row :gutter="20">
          <Col span="12">
            <FormItem label="状态：" prop="status">
              <Select v-model="editData.status" placeholder="请选择">
                <Option value="0">停用</Option>
                <Option value="1">启用</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="性别：" prop="sex">
              <Select v-model="editData.sex" placeholder="请选择">
                <Option value="0">男</Option>
                <Option value="1">女</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancelModal">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>

    <!-- 分配岗位 -->
    <Modal v-model="postModal" width="800" @on-visible-change="postModalChange" title="分配岗位">
      <Form>
        <Row :gutter="20">
          <Col span="6">
            <FormItem>
              <Input v-model="searchKey" placeholder="请输入岗位名称" />
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <Button type="primary">查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Table
      :columns="postColumns"
      :data="postDataList"
      @on-select="postSelect"
      @on-select-cancel="postSelectCancel"
      @on-select-all="postSelectAll"
      @on-select-all-cancel="postSelectAllCancel"
    >
    </Table>
      <div slot="footer">
        <Button type="text" @click="cancelPostModal">取消</Button>
        <Button type="primary" @click="handlePostSave">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "username",
          minWidth: 100
        },
        {
          title: "姓名",
          key: "name",
          minWidth: 100
        },
        {
          title: "电话",
          key: "phone",
          minWidth: 100
        },
        {
          title: "状态",
          slot: "status",
          minWidth: 100
        },
        {
          title: "部门",
          key: "department",
          minWidth: 140
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 140
        }
      ],
      postColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "岗位名称",
          key: "postName",
          minWidth: 100,
        },
        {
          title: "岗位编码",
          key: "postCode",
          minWidth: 100
        },
        {
          title: "部门",
          key: "postDep",
          minWidth: 100
        }
      ],
      departmentList: ["市场部", "技术部", "运营部"],
      postDataList: [
        {
          postId: 1,
          postName: '开发组',
          postCode: 'AA',
          postDep: '技术部'
        },
        {
          postId: 2,
          postName: '测试组',
          postCode: 'BB',
          postDep: '技术部'
        },
        {
          postId: 3,
          postName: '对外市场',
          postCode: 'CC',
          postDep: '市场部'
        },
        {
          postId: 4,
          postName: '对内市场',
          postCode: 'DD',
          postDep: '市场部'
        },
        {
          postId: 5,
          postName: '产品运营',
          postCode: 'EE',
          postDep: '运营部'
        },
        {
          postId: 6,
          postName: '数据运营',
          postCode: 'FF',
          postDep: '运营部'
        },
      ],
      loading: false,
      dataList: [
        {
          id: 1,
          username: "aaa",
          name: "zhangshan",
          phone: "12345678",
          status: "1",
          department: "技术部",
          sex: "1"
        },
        {
          id: 2,
          username: "aaa",
          name: "zhangshan",
          phone: "12345678",
          status: "1",
          department: "技术部",
          sex: "1"
        },
        {
          id: 3,
          username: "aaa",
          name: "zhangshan",
          phone: "12345678",
          status: "1",
          department: "技术部",
          sex: "1"
        },
        {
          id: 4,
          username: "aaa",
          name: "zhangshan",
          phone: "12345678",
          status: "1",
          department: "技术部",
          sex: "1"
        },
        {
          id: 5,
          username: "aaa",
          name: "zhangshan",
          phone: "12345678",
          status: "1",
          department: "技术部",
          sex: "1"
        },
        {
          id: 6,
          username: "aaa",
          name: "zhangshan",
          phone: "12345678",
          status: "1",
          department: "技术部",
          sex: "1"
        },
        {
          id: 7,
          username: "aaa",
          name: "zhangshan",
          phone: "12345678",
          status: "1",
          department: "技术部",
          sex: "1"
        }
      ],
      selectedData: [],
      postIdList: [],
      current: 1,
      size: 10,
      sortType: "normal",
      sortColumns: "",
      filterType: undefined,
      showCreate: false,
      postModal: false,
      isAdd: false,
      editData: {
        username: "",
        name: "",
        phone: "",
        status: "",
        department: "",
        sex: ""
      },
      searchKey: '',
      createRules: {
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: "blur"
          }
        ],
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change"
          }
        ],
        department: [
          {
            required: true,
            message: "请选择部门",
            trigger: "change"
          }
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: "change"
          }
        ]
      },
      creating: true,
      currentIndex: -1,
      currentPostId: ''
    };
  },
  methods: {
    // 选中一项，将数据添加至已选项中
    handleSelect(selection, row) {},
    // 取消选中一项，将取消的数据从已选项中删除
    handleSelectCancel(selection, row) {},
    // 当前页全选时，判断已选数据是否存在，不存在则添加
    handleSelectAll(selection) {},
    // 取消当前页全选时，将当前页的数据（即 dataWithPage）从已选项中删除
    handleSelectAllCancel() {},

    handleRemoveAll() {
      if (this.selectedData.length === 0) {
        return this.$Message.warning("请选择要删除的数据");
      }
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除当前数据</p>",
        onOk: () => {
          this.selectedData.forEach(item => {
            const index = this.list.findIndex(i => i.name === item.name);
            if (index >= 0) {
              this.list.splice(index, 1);
            }
          });
          this.$Message.info("删除成功");
          this.selectedData = [];
        },
        onCancel: () => {
          this.$Message.info("删除取消");
          this.selectedData = [];
        }
      });
    },
    handleAdd() {
      this.showCreate = true;
      this.isAdd = true;
    },
    // 新增数据
    handleSave() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.isAdd) {
            this.dataList.unshift({ ...this.editData });
            this.$Message.success("添加成功！");
          } else {
            this.dataList.splice(this.currentIndex, 1, { ...this.editData });
            this.$Message.success("编辑成功！");
          }
          this.showCreate = false;
        } else {
        }
      });
      return;
    },
    // 取消操作
    cancelModal() {
      this.showCreate = false;
    },
    changeModal(value) {
      this.$refs["dataForm"].resetFields();
    },
    // 编辑数据
    handleUpdate(index) {
      this.currentIndex = index;
      this.isAdd = false;
      let data = this.dataList[index];
      this.editData = { ...data };
      this.showCreate = true;
    },
    // 删除数据
    handleRemove(index) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除当前数据</p>",
        onOk: () => {
          this.list.splice(index, 1);
          this.$Message.info("删除成功");
          this.selectedData = [];
        },
        onCancel: () => {
          this.$Message.info("删除取消");
          this.selectedData = [];
        }
      });
    },
    // 分配岗位操作
    cancelPostModal() {

    },
    handlePostSave() {

    },
    handlePost(id) {
      this.currentPostId = id
      this.postModal = true
    },
    postSelect() {

    },
    postSelectCancel() {

    },
    postSelectAll() {

    },
    postSelectAllCancel(){

    },
    postModalChange() {
      
    }
  }
};
</script>
