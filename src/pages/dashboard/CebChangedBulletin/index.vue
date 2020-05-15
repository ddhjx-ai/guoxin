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
        </Col>-->
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
        <FormItem label="cebTenderProject: " prop="bidder_code_type">
          <Input v-model="cebFormData.cebTenderProject" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_section_codes: " prop="bidder_code">
          <Input v-model="cebFormData.bid_section_codes" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_change_file: " prop="bidder_name">
          <Input v-model="cebFormData.is_change_file" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_change_time: " prop="is_unions">
          <Input v-model="cebFormData.is_change_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="apply_start_time: " prop="isAllow">
          <Input v-model="cebFormData.apply_start_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="apply_end_time: " prop="ipCount">
          <Input v-model="cebFormData.apply_end_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="file_download_start_time: " prop="isPic">
          <Input v-model="cebFormData.file_download_start_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="file_download_end_time: " prop="allowCopy">
          <Input v-model="cebFormData.file_download_end_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_start_time: " prop="allowCopy">
          <Input v-model="cebFormData.bid_start_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_end_time: " prop="allowCopy">
          <Input v-model="cebFormData.bid_end_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_open_time: " prop="allowCopy">
          <Input v-model="cebFormData.bid_open_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_doc_start_time: " prop="allowCopy">
          <Input v-model="cebFormData.bid_doc_start_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_doc_end_time: " prop="allowCopy">
          <Input v-model="cebFormData.bid_doc_end_time" type="number" placeholder="请输入" />
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
        <FormItem label="cebTenderProject: " prop="bidder_code_type">
          <!-- <Input v-model="cebFormData.cebTenderProject" placeholder="请输入" /> -->
          {{cebFormData.cebTenderProject}}
        </FormItem>
        <FormItem label="bid_section_codes: " prop="bidder_code">
          <!-- <Input v-model="cebFormData.bid_section_codes" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_section_codes}}
        </FormItem>
        <FormItem label="is_change_file: " prop="bidder_name">
          <!-- <Input v-model="cebFormData.is_change_file" type="number" placeholder="请输入" /> -->
          {{cebFormData.is_change_file}}
        </FormItem>
        <FormItem label="is_change_time: " prop="is_unions">
          <!-- <Input v-model="cebFormData.is_change_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.is_change_time}}
        </FormItem>
        <FormItem label="apply_start_time: " prop="isAllow">
          <!-- <Input v-model="cebFormData.apply_start_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.apply_start_time}}
        </FormItem>
        <FormItem label="apply_end_time: " prop="ipCount">
          <!-- <Input v-model="cebFormData.apply_end_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.apply_end_time}}
        </FormItem>
        <FormItem label="file_download_start_time: " prop="isPic">
          <!-- <Input v-model="cebFormData.file_download_start_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.file_download_start_time}}
        </FormItem>
        <FormItem label="file_download_end_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.file_download_end_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.file_download_end_time}}
        </FormItem>
        <FormItem label="bid_start_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bid_start_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_start_time}}
        </FormItem>
        <FormItem label="bid_end_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bid_end_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_end_time}}
        </FormItem>
        <FormItem label="bid_open_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bid_open_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_open_time}}
        </FormItem>
        <FormItem label="bid_doc_start_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bid_doc_start_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_doc_start_time}}
        </FormItem>
        <FormItem label="bid_doc_end_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.bid_doc_end_time" type="number" placeholder="请输入" /> -->
          {{cebFormData.bid_doc_end_time}}
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
          key: "serialVersionUID",
          minWidth: 100
        },
        {
          title: "cebTenderProject",
          key: "cebTenderProject",
          minWidth: 100
        },
        {
          title: "bid_section_codes",
          key: "bid_section_codes",
          minWidth: 100
        },
        {
          title: "is_change_file",
          key: "is_change_file",
          minWidth: 100
        },
        {
          title: "is_change_time",
          key: "is_change_time",
          minWidth: 100
        },
        {
          title: "apply_start_time",
          key: "apply_start_time",
          minWidth: 100
        },
        {
          title: "apply_end_time",
          key: "apply_end_time",
          minWidth: 100
        },
        {
          title: "file_download_start_time",
          key: "file_download_start_time",
          minWidth: 120
        },
        {
          title: "file_download_end_time",
          key: "file_download_end_time",
          minWidth: 100
        },
        {
          title: "bid_proce_currency_code",
          key: "bid_proce_currency_code",
          minWidth: 100
        },
        {
          title: "bid_start_time",
          key: "bid_start_time",
          minWidth: 100
        },
        {
          title: "bid_end_time",
          key: "bid_end_time",
          minWidth: 100
        },
        {
          title: "bid_open_time",
          key: "bid_open_time",
          minWidth: 100
        },
        {
          title: "bid_doc_start_time",
          key: "bid_doc_start_time",
          minWidth: 100
        },
        {
          title: "bid_doc_end_time",
          key: "bid_doc_end_time",
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
          serialVersionUID: 11, // Number
          cebTenderProject: "", // String
          bid_section_codes: "", // String
          is_change_file: "", // Number
          is_change_time: "", // Number
          apply_start_time: "", // String
          apply_end_time: "", // String
          file_download_start_time: "", // String
          file_download_end_time: "", // String
          bid_start_time: "", // String
          bid_end_time: "", // String
          bid_open_time: "", // String
          bid_doc_start_time: "", // String
          bid_doc_end_time: "" // String
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
      this.$refs.createForm.resetFields();
    },
    handleSave() {}
  }
};
</script>

<style>
</style>