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
        <FormItem label="industryType: " prop="bidder_code_type">
          <Input v-model="cebFormData.industryType" placeholder="请输入" />
        </FormItem>
        <FormItem label="cebTenderProject: " prop="bidder_code">
          <Input v-model="cebFormData.cebTenderProject" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_section_name: " prop="bidder_name">
          <Input v-model="cebFormData.bid_section_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_section_code: " prop="is_unions">
          <Input v-model="cebFormData.bid_section_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_section_content: " prop="isAllow">
          <Input v-model="cebFormData.bid_section_content" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="contract_reckon_price: " prop="ipCount">
          <Input v-model="cebFormData.contract_reckon_price" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="currency_code: " prop="isPic">
          <Input v-model="cebFormData.currency_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bidding_eligibility: " prop="allowCopy">
          <Input v-model="cebFormData.bidding_eligibility" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_proce_currency_code: " prop="allowCopy">
          <Input v-model="cebFormData.bid_proce_currency_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="member_id: " prop="allowCopy">
          <Input v-model="cebFormData.member_id" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_deleted: " prop="allowCopy">
          <Input v-model="cebFormData.is_deleted" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="status: " prop="allowCopy">
          <Input v-model="cebFormData.status" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="created_time: " prop="allowCopy">
          <Input v-model="cebFormData.created_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="last_modified_time: " prop="allowCopy">
          <Input v-model="cebFormData.last_modified_time" type="number" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="blackListModal = false">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>

    <!-- 详情弹出框 -->
    <Modal v-model="blackDetailModal" title="详情" width="600px">
       <Form :model="cebFormData" :rules="blackRules" :label-width="150">
        <FormItem label="industryType: " prop="bidder_code_type">
          <!-- <Input v-model="cebFormData.industryType" placeholder="请输入" /> -->
          {{cebFormData.industryType}}
        </FormItem>
        <FormItem label="cebTenderProject: " prop="bidder_code">
          <!-- <Input v-model="cebFormData.cebTenderProject" type="number" placeholder="请输入" /> -->
          {{cebFormData.cebTenderProject}}
        </FormItem>
        <FormItem label="bid_section_name: " prop="bidder_name">
          <!-- <Input v-model="cebFormData.bid_section_name" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_section_name}}
        </FormItem>
        <FormItem label="bid_section_code: " prop="is_unions">
          <!-- <Input v-model="cebFormData.bid_section_code" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_section_code}}
        </FormItem>
        <FormItem label="bid_section_content: " prop="isAllow">
          <!-- <Input v-model="cebFormData.bid_section_content" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_section_content}}
        </FormItem>
        <FormItem label="contract_reckon_price: " prop="ipCount">
          <!-- <Input v-model="cebFormData.contract_reckon_price" type="number" placeholder="请输入" /> -->
          {{cebFormData.contract_reckon_price}}
        </FormItem>
        <FormItem label="currency_code: " prop="isPic">
          <!-- <Input v-model="cebFormData.currency_code" type="number" placeholder="请输入" /> -->
          {{cebFormData.currency_code}}
        </FormItem>
        <FormItem label="bidding_eligibility: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bidding_eligibility" type="number" placeholder="请输入" /> -->
          {{cebFormData.bidding_eligibility}}
        </FormItem>
        <FormItem label="bid_proce_currency_code: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bid_proce_currency_code" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_proce_currency_code}}
        </FormItem>
        <FormItem label="member_id: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.member_id" type="number" placeholder="请输入" /> -->
          {{cebFormData.member_id}}
        </FormItem>
        <FormItem label="is_deleted: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.is_deleted" type="number" placeholder="请输入" /> -->
          {{cebFormData.is_deleted}}
        </FormItem>
        <FormItem label="status: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.status" type="number" placeholder="请输入" /> -->
          {{cebFormData.status}}
        </FormItem>
        <FormItem label="created_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.created_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.created_time}}
        </FormItem>
        <FormItem label="last_modified_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.last_modified_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.last_modified_time}}
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
  name: "CebBidSection",
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
          title: "industryType",
          key: "industryType",
          minWidth: 100
        },
        {
          title: "cebTenderProject",
          key: "cebTenderProject",
          minWidth: 100
        },
        {
          title: "bid_section_name",
          key: "bid_section_name",
          minWidth: 100
        },
        {
          title: "bid_section_code",
          key: "bid_section_code",
          minWidth: 100
        },
        {
          title: "bid_section_content",
          key: "bid_section_content",
          minWidth: 100
        },
        {
          title: "contract_reckon_price",
          key: "contract_reckon_price",
          minWidth: 100
        },
        {
          title: "currency_code",
          key: "currency_code",
          minWidth: 120
        },
        {
          title: "bidding_eligibility",
          key: "bidding_eligibility",
          minWidth: 100
        },
        {
          title: "member_id",
          key: "member_id",
          minWidth: 100
        },
        {
          title: "is_deleted",
          key: "is_deleted",
          minWidth: 100
        },
        {
          title: "status",
          key: "status",
          minWidth: 100
        },
        {
          title: "created_time",
          key: "created_time",
          minWidth: 100
        },
        {
          title: "last_modified_time",
          key: "last_modified_time",
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
          industryType: 'admin',
          cebTenderProject: 200,
          bid_section_name: 300,
          bid_section_code: 1,
          bid_section_content: "202.118.118.1",
          contract_reckon_price: "202.118.118.2",
          currency_code: 11,
          bidding_eligibility: 1,
          bid_proce_currency_code: 1,
          member_id: 1,
          is_deleted: 1,
          status: 1,
          created_time: 1,
          last_modified_time: 1
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
          industryType: 'admin',
          cebTenderProject: 200,
          bid_section_name: 300,
          bid_section_code: 1,
          bid_section_content: "202.118.118.1",
          contract_reckon_price: "202.118.118.2",
          currency_code: 11,
          bidding_eligibility: 1,
          bid_proce_currency_code: 1,
          member_id: 1,
          is_deleted: 1,
          status: 1,
          created_time: 1,
          last_modified_time: 1
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