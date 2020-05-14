<template>
  <div>
    <Form ref="form" :model="searchForm" :label-width="120" label-position="right">
      <Row :gutter="24" type="flex">
        <!-- <Col :span="8">
          <FormItem label="名称：">
            <Input v-model="searchForm.searchKey" placeholder="请输入" />
          </FormItem>
        </Col>-->
        <Col :span="8">
          <FormItem label="关键字：">
            <Input v-model="searchForm.searchKey" type="number" placeholder="请输入关键字" />
          </FormItem>
        </Col>
        <!-- <Col :span="8">
          <FormItem label="是否可以复制：">
            <Select v-model="searchForm.allowCopy" placeholder="请选择">
              <Option value="false">否</Option>
              <Option value="true">是</Option>
            </Select>
          </FormItem>
        </Col> -->
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
        <template slot-scope="{ row }" slot="isHunXiao">
          <Badge v-if="row.isHunXiao === 0" status="default" text="否" />
          <Badge v-if="row.isHunXiao === 1" status="processing" text="是" />
        </template>
        <template slot-scope="{ row }" slot="isPic">
          <Badge v-if="row.isPic === 0" status="default" text="否" />
          <Badge v-if="row.isPic === 1" status="processing" text="是" />
        </template>
        <template slot-scope="{ row }" slot="allowCopy">
          <Badge v-if="row.allowCopy === 0" status="default" text="否" />
          <Badge v-if="row.allowCopy === 1" status="processing" text="是" />
        </template>
        <template slot-scope="{ row,index }" slot="action">
          <a @click="handleUpdate(index)">编辑</a>
          <Divider type="vertical" />
          <a @click="handleDetail(index)">详情</a>
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

    <!-- 新增、编辑弹出框 -->
    <Modal
      v-model="blackListModal"
      :title="isUpdate ? '编辑' : '新增'"
      width="600px"
      @on-visible-change="modalChange"
    >
      <Form ref="createForm" :model="cebFormData" :rules="blackRules" :label-width="150">
        <FormItem label="bidder_code_type: " prop="bidder_code_type">
          <Input v-model="cebFormData.bidder_code_type" placeholder="请输入" />
        </FormItem>
        <FormItem label="bidder_code: " prop="bidder_code">
          <Input v-model="cebFormData.bidder_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bidder_name: " prop="bidder_name">
          <Input v-model="cebFormData.bidder_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_unions: " prop="is_unions">
          <Input v-model="cebFormData.is_unions" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="union_code: " prop="isAllow">
          <Input v-model="cebFormData.union_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="union_name: " prop="ipCount">
          <Input v-model="cebFormData.union_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="price_type: " prop="isPic">
          <Input v-model="cebFormData.price_type" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_price: " prop="allowCopy">
          <Input v-model="cebFormData.bid_price" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_proce_currency_code: " prop="allowCopy">
          <Input v-model="cebFormData.bid_proce_currency_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="rate: " prop="allowCopy">
          <Input v-model="cebFormData.rate" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="other_bid_price: " prop="allowCopy">
          <Input v-model="cebFormData.other_bid_price" type="number" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="blackListModal = false">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>

    <!-- 详情弹出框 -->
    <Modal v-model="blackDetailModal" title="详情" width="600px">
      <Form ref="createForm" :model="cebFormData" :rules="blackRules" :label-width="150">
        <FormItem label="bidder_code_type: " prop="bidder_code_type">
          <!-- <Input v-model="cebFormData.bidder_code_type" placeholder="请输入" /> -->
          {{cebFormData.bidder_code_type}}
        </FormItem>
        <FormItem label="bidder_code: " prop="bidder_code">
          <!-- <Input v-model="cebFormData.bidder_code" type="number" placeholder="请输入" /> -->
          {{cebFormData.bidder_code}}
        </FormItem>
        <FormItem label="bidder_name: " prop="bidder_name">
          <!-- <Input v-model="cebFormData.bidder_name" type="number" placeholder="请输入" /> -->
          {{cebFormData.bidder_name}}
        </FormItem>
        <FormItem label="is_unions: " prop="is_unions">
          <!-- <Input v-model="cebFormData.is_unions" type="number" placeholder="请输入" /> -->
          {{cebFormData.is_unions}}
        </FormItem>
        <FormItem label="union_code: " prop="isAllow">
          <!-- <Input v-model="cebFormData.union_code" type="number" placeholder="请输入" /> -->
          {{cebFormData.union_code}}
        </FormItem>
        <FormItem label="union_name: " prop="ipCount">
          <!-- <Input v-model="cebFormData.union_name" type="number" placeholder="请输入" /> -->
          {{cebFormData.union_name}}
        </FormItem>
        <FormItem label="price_type: " prop="isPic">
          <!-- <Input v-model="cebFormData.price_type" type="number" placeholder="请输入" /> -->
          {{cebFormData.price_type}}
        </FormItem>
        <FormItem label="bid_price: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bid_price" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_price}}
        </FormItem>
        <FormItem label="bid_proce_currency_code: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bid_proce_currency_code" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_proce_currency_code}}
        </FormItem>
        <FormItem label="rate: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.rate" type="number" placeholder="请输入" /> -->
          {{cebFormData.rate}}
        </FormItem>
        <FormItem label="other_bid_price: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.other_bid_price" type="number" placeholder="请输入" /> -->
          {{cebFormData.other_bid_price}}
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="text" @click="blackListModal = false">取消</Button> -->
        <Button type="primary" @click="blackDetailModal = false">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "CebChangedBulletin",
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          key: "id",
          minWidth: 100
        },
        {
          title: "bidder_code_type",
          key: "bidder_code_type",
          minWidth: 100
        },
        {
          title: "bidder_code",
          key: "bidder_code",
          minWidth: 100
        },
        {
          title: "bidder_name",
          key: "bidder_name",
          minWidth: 100
        },
        {
          title: "is_unions",
          key: "is_unions",
          minWidth: 100
        },
        {
          title: "union_code",
          key: "union_code",
          minWidth: 100
        },
        {
          title: "union_name",
          key: "union_name",
          minWidth: 100
        },
        {
          title: "price_type",
          key: "price_type",
          minWidth: 120
        },
        {
          title: "bid_price",
          key: "bid_price",
          minWidth: 100
        },
        {
          title: "bid_proce_currency_code",
          key: "bid_proce_currency_code",
          minWidth: 100
        },
        {
          title: "rate",
          key: "rate",
          minWidth: 100
        },
        {
          title: "other_bid_price",
          key: "other_bid_price",
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
          id: 11,
          bidder_code_type: 'admin',
          bidder_code: 200,
          bidder_name: 300,
          is_unions: 1,
          union_code: "202.118.118.1",
          union_name: "202.118.118.2",
          price_type: 11,
          bid_price: 1,
          bid_proce_currency_code: 1,
          rate: 1,
          other_bid_price: 1
        }
      ],
      loading: false,
      pageForm: {
        total: 0,
        pageNumber: 1,
        pageSize: 10
      },
      searchForm: {},
      blackListModal: false,
      isUpdate: false,
      cebFormData: {
        bidder_code_type: "",
        bidder_code: "",
        bidder_name: "",
        is_unions: "",
        union_code: "",
        union_name: "",
        price_type: "",
        bid_price: "",
        bid_proce_currency_code: "",
        rate: "",
        other_bid_price: ""
      },
      blackRules: {},
      // 详情
      blackDetailModal: false,
      blackDetail: {}
    };
  },
  methods: {
    handleOpenCreate() {
      this.blackListModal = true;
      this.isUpdate = false;
    },
    handleRemoveAll() {},
    handleSelect() {},
    handleSelectCancel() {},
    handleSelectAll() {},
    handleSelectAllCancel() {},
    pageChange() {},
    handleUpdate(index) {
      this.blackListModal = true;
      this.isUpdate = true;
      this.cebFormData = { ...this.dataList[index] };
    },
    handleDetail(index) {
      this.blackDetail = { ...this.dataList[index] };
      this.blackDetailModal = true;
    },
    handleSubmit() {},
    handleReset() {},
    modalChange() {
      this.$refs.createForm.resetFields()
    },
    handleSave() {}
  }
};
</script>

<style>
</style>