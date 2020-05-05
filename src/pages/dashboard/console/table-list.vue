<template>
  <div class="i-table-no-border">
    <Button type="primary" icon="md-add" @click="handleOpenCreate">新建</Button>
    <Button icon="md-list" class="ivu-ml-8" v-show="selectedData.length">批量删除</Button>

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
      <template slot-scope="{ row }" slot="action">
        <a @click="handleUpdate(index)">编辑</a>
        <Divider type="vertical" />
        <a @click="handleRemove(row)">删除</a>
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

    <Modal v-model="showCreate" title="编辑规则" :loading="creating" @on-ok="handleCreate">
      <Form ref="create" :model="createData" :rules="createRules" :label-width="80">
        <FormItem label="描述：" prop="desc">
          <Input v-model="createData.desc" placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { GetSupList } from "@/api/console";
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
          title: "id",
          key: "id",
          minWidth: 100
        },
        {
          title: "competitor_id",
          key: "competitor_id",
          minWidth: 100
        },
        {
          title: "source_id",
          key: "source_id",
          minWidth: 100
        },
        {
          title: "list_url",
          key: "list_url",
          minWidth: 140
        },
        {
          title: "detail_url",
          key: "detail_url",
          minWidth: 300
        },
        {
          title: "pd",
          key: "pd",
          minWidth: 100
        },
        {
          title: "detail_url_hash",
          key: "detail_url_hash",
          minWidth: 140
        },
        {
          title: "title_hash",
          key: "title_hash",
          minWidth: 140
        },
        {
          title: "create_time",
          key: "create_time",
          minWidth: 140
        },
        {
          title: "publish_date",
          key: "publish_date",
          minWidth: 140
        },
        {
          title: "keyword_hash",
          key: "keyword_hash",
          minWidth: 140
        },
        {
          title: "操作",
          slot: "action",
          align: "center",
          minWidth: 140
        }
      ],
      loading: false,
      selectedData: [],
      showCreate: false,
      createData: {
        desc: ""
      },
      createRules: {
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }]
      },
      creating: true,
      dataList: [],
      pageForm: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      searchForm: {
        
      }
    };
  },
  mounted() {
    this.getAllList();
  },
  methods: {
    // 获取是所有数据
    getAllList() {
      this.loading = true;
      let params = {
        ...this.searchForm,
        ...this.pageForm
      };
      CultureSpecial(params).then(res => {
        this.loading = false;
        this.dataList = res.list;
        this.pageForm.total = res.total;
      }).catch(() => {
        this.loading = false
      })
    },
    // 搜索列表
    searchList(item) {
      this.searchForm.createNameOrCode = item
      this.getAllList()
    },
    resGetData() {
      this.pageForm.pageNumber = 1
      this.searchForm = {
      }
      this.getAllList()
    },
    // 页面改变
    pageChange() {
      this.getAllList();
      this.selectedData = [];
    },
    // 选中一项，将数据添加至已选项中
    handleSelect(selection, row) {
      this.selectedData.push(row.id);
      console.log(this.selectedData);
    },
    // 取消选中一项，将取消的数据从已选项中删除
    handleSelectCancel(selection, row) {
      console.log(row.id);
      let index = this.selectedData.findIndex(item => {
        return item.id === row.id;
      });
      this.selectedData.splice(index, 1);
      console.log(this.selectedData);
    },
    // 当前页全选时，判断已选数据是否存在，不存在则添加
    handleSelectAll(selection) {
      this.selectedData = selection.map(item => {
        return item.id;
      });
      console.log(this.selectedData);
    },
    // 取消当前页全选时，将当前页的数据（即 dataWithPage）从已选项中删除
    handleSelectAllCancel(item) {
      this.selectedData = [];
    },
    handleOpenCreate() {
      this.showCreate = true;
    },
    // 新增数据
    handleCreate() {
      
    },
    // 编辑数据
    handleUpdate(index) {
      this.createData = this.dataList[index];
      this.showCreate = true;
    },
    // 删除数据
    handleRemove(row) {}
  }
};
</script>
