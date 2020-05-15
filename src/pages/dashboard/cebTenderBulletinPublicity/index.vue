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
      <Form ref="createForm" :model="blackFormData" :rules="blackRules" :label-width="150">
        <FormItem label="cebTenderProject: " prop="weekly">
          <Input v-model="blackFormData.cebTenderProject" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_section_codes: " prop="monthly">
          <Input v-model="blackFormData.bid_section_codes" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="url: " prop="delayTime">
          <Input v-model="blackFormData.url" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="notice_nature: " prop="ipNotAllow">
          <Input v-model="blackFormData.notice_nature" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="doc_get_start_time: " prop="isAllow">
          <Input v-model="blackFormData.doc_get_start_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="notice_nature: " prop="ipCount">
          <Input v-model="blackFormData.notice_nature" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="doc_get_method: " prop="isPic">
          <Input v-model="blackFormData.doc_get_method" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_doc_refer_end_time: " prop="allowCopy">
          <Input v-model="blackFormData.bid_doc_refer_end_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_doc_refer_method: " prop="allowCopy">
          <Input v-model="blackFormData.bid_doc_refer_method" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_doc_price: " prop="allowCopy">
          <Input v-model="blackFormData.bid_doc_price" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_url: " prop="allowCopy">
          <Input v-model="blackFormData.bid_url" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="syndicated_flag: " prop="allowCopy">
          <Input v-model="blackFormData.syndicated_flag" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_postpone: " prop="allowCopy">
          <Input v-model="blackFormData.is_postpone" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_open_time: " prop="allowCopy">
          <Input v-model="blackFormData.bid_open_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bid_open_method: " prop="allowCopy">
          <Input v-model="blackFormData.bid_open_method" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="qual_type: " prop="allowCopy">
          <Input v-model="blackFormData.qual_type" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="other_content: " prop="allowCopy">
          <Input v-model="blackFormData.other_content" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="bulletin_duty: " prop="allowCopy">
          <Input v-model="blackFormData.bulletin_duty" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="examiner_name: " prop="allowCopy">
          <Input v-model="blackFormData.examiner_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="qualify_require: " prop="allowCopy">
          <Input v-model="blackFormData.qualify_require" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="ability_require: " prop="allowCopy">
          <Input v-model="blackFormData.ability_require" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="info_type: " prop="allowCopy">
          <Input v-model="blackFormData.info_type" type="number" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="blackListModal = false">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>

    <!-- 详情弹出框 -->
    <Modal v-model="blackDetailModal" title="详情" width="600px">
      <Form ref="createForm" :model="blackFormData" :rules="blackRules" :label-width="150">
        <FormItem label="cebTenderProject: " prop="weekly">
          <!-- <Input v-model="blackFormData.cebTenderProject" placeholder="请输入" /> -->
          {{blackFormData.cebTenderProject}}
        </FormItem>
        <FormItem label="bid_section_codes: " prop="monthly">
          <!-- <Input v-model="blackFormData.bid_section_codes" type="number" placeholder="请输入" /> -->
          {{blackFormData.bid_section_codes}}
        </FormItem>
        <FormItem label="url: " prop="delayTime">
          <!-- <Input v-model="blackFormData.url" type="number" placeholder="请输入" /> -->
          {{blackFormData.url}}
        </FormItem>
        <FormItem label="notice_nature: " prop="ipNotAllow">
          <!-- <Input v-model="blackFormData.notice_nature" type="number" placeholder="请输入" /> -->
          {{blackFormData.notice_nature}}
        </FormItem>
        <FormItem label="doc_get_start_time: " prop="isAllow">
          <!-- <Input v-model="blackFormData.doc_get_start_time" type="number" placeholder="请输入" /> -->
          {{blackFormData.doc_get_start_time}}
        </FormItem>
        <FormItem label="notice_nature: " prop="ipCount">
          <!-- <Input v-model="blackFormData.notice_nature" type="number" placeholder="请输入" /> -->
          {{blackFormData.notice_nature}}
        </FormItem>
        <FormItem label="doc_get_method: " prop="isPic">
          <!-- <Input v-model="blackFormData.doc_get_method" type="number" placeholder="请输入" /> -->
          {{blackFormData.doc_get_method}}
        </FormItem>
        <FormItem label="bid_doc_refer_end_time: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.bid_doc_refer_end_time" type="number" placeholder="请输入" /> -->
          {{blackFormData.bid_doc_refer_end_time}}
        </FormItem>
        <FormItem label="bid_doc_refer_method: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.bid_doc_refer_method" type="number" placeholder="请输入" /> -->
          {{blackFormData.bid_doc_refer_method}}
        </FormItem>
        <FormItem label="bid_doc_price: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.bid_doc_price" type="number" placeholder="请输入" /> -->
          {{blackFormData.bid_doc_price}}
        </FormItem>
        <FormItem label="bid_url: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.bid_url" type="number" placeholder="请输入" /> -->
          {{blackFormData.bid_url}}
        </FormItem>
        <FormItem label="syndicated_flag: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.syndicated_flag" type="number" placeholder="请输入" /> -->
          {{blackFormData.syndicated_flag}}
        </FormItem>
        <FormItem label="is_postpone: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.is_postpone" type="number" placeholder="请输入" /> -->
          {{blackFormData.is_postpone}}
        </FormItem>
        <FormItem label="bid_open_time: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.bid_open_time" type="number" placeholder="请输入" /> -->
          {{blackFormData.bid_open_time}}
        </FormItem>
        <FormItem label="bid_open_method: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.bid_open_method" type="number" placeholder="请输入" /> -->
          {{blackFormData.bid_open_method}}
        </FormItem>
        <FormItem label="qual_type: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.qual_type" type="number" placeholder="请输入" /> -->
          {{blackFormData.qual_type}}
        </FormItem>
        <FormItem label="other_content: " prop="allowCopy">
        <!-- <Input v-model="blackFormData.other_content" type="number" placeholder="请输入" /> -->
        {{blackFormData.other_content}}
        </FormItem>
        <FormItem label="bulletin_duty: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.bulletin_duty" type="number" placeholder="请输入" /> -->
          {{blackFormData.bulletin_duty}}
        </FormItem>
        <FormItem label="examiner_name: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.examiner_name" type="number" placeholder="请输入" /> -->
          {{blackFormData.examiner_name}}
        </FormItem>
        <FormItem label="qualify_require: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.qualify_require" type="number" placeholder="请输入" /> -->
          {{blackFormData.qualify_require}}
        </FormItem>
        <FormItem label="ability_require: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.ability_require" type="number" placeholder="请输入" /> -->
          {{blackFormData.ability_require}}
        </FormItem>
        <FormItem label="info_type: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.info_type" type="number" placeholder="请输入" /> -->
          {{blackFormData.info_type}}
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
  name: "cebTenderBulletinPublicity",
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
          title: "url",
          key: "url",
          minWidth: 100
        },
        {
          title: "notice_nature",
          key: "notice_nature",
          minWidth: 100
        },
        {
          title: "doc_get_start_time",
          key: "doc_get_start_time",
          minWidth: 100
        },
        {
          title: "doc_get_start_time",
          key: "doc_get_start_time",
          minWidth: 100
        },
        {
          title: "bid_doc_refer_method",
          key: "bid_doc_refer_method",
          minWidth: 120
        },
        {
          title: "bid_doc_price",
          key: "bid_doc_price",
          minWidth: 100
        },
        {
          title: "bid_url",
          key: "bid_url",
          minWidth: 100
        },
        {
          title: "bid_url",
          key: "bid_url",
          minWidth: 100
        },
        {
          title: "syndicated_flag",
          key: "syndicated_flag",
          minWidth: 100
        },
        {
          title: "is_postpone",
          key: "is_postpone",
          minWidth: 100
        },
        {
          title: "bid_open_time",
          key: "bid_open_time",
          minWidth: 100
        },
        {
          title: "bid_open_method",
          key: "bid_open_method",
          minWidth: 100
        },
        {
          title: "qual_type",
          key: "qual_type",
          minWidth: 100
        },
        {
          title: "other_content",
          key: "other_content",
          minWidth: 100
        },
        {
          title: "bulletin_duty",
          key: "bulletin_duty",
          minWidth: 100
        },
        {
          title: "examiner_name",
          key: "examiner_name",
          minWidth: 100
        },
        {
          title: "qualify_require",
          key: "qualify_require",
          minWidth: 100
        },
        {
          title: "ability_require",
          key: "ability_require",
          minWidth: 100
        },
        {
          title: "info_type",
          key: "info_type",
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
          id: 22, // Number
          cebTenderProject: "", // String
          bid_section_codes: "", // String
          url: "", // String
          notice_nature: "", // String
          doc_get_start_time: "", // String
          doc_get_end_time: "", // String
          doc_get_method: "", // String
          bid_doc_refer_end_time: "", // String
          bid_doc_refer_method: "", // String
          bid_doc_price: "", // String
          bid_url: "", // String
          syndicated_flag: "", // Number 0:否，1：是
          is_postpone: "", // String
          bid_open_time: "", // String 开启时间
          bid_open_method: "", // String 开启方式
          qual_type: "", // String 评审办法
          other_content: "", // String
          bulletin_duty: "", // String
          examiner_name: "", // String
          qualify_require: "", // String
          ability_require: "", // String
          info_type: "" // String
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
      blackFormData: {
        id: 22, // Number
        cebTenderProject: "", // String
        bid_section_codes: "", // String
        url: "", // String
        notice_nature: "", // String
        doc_get_start_time: "", // String
        doc_get_end_time: "", // String
        doc_get_method: "", // String
        bid_doc_refer_end_time: "", // String
        bid_doc_refer_method: "", // String
        bid_doc_price: "", // String
        bid_url: "", // String
        syndicated_flag: "", // Number 0:否，1：是
        is_postpone: "", // String
        bid_open_time: "", // String 开启时间
        bid_open_method: "", // String 开启方式
        qual_type: "", // String 评审办法
        other_content: "", // String
        bulletin_duty: "", // String
        examiner_name: "", // String
        qualify_require: "", // String
        ability_require: "", // String
        info_type: "" // String
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
      this.blackFormData = { ...this.dataList[index] };
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