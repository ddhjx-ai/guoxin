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
        <FormItem label="isunion: " prop="weekly">
          <Input v-model="blackFormData.isunion" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_code_type: " prop="monthly">
          <Input v-model="blackFormData.tender_code_type" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_code: " prop="delayTime">
          <Input v-model="blackFormData.tender_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_name: " prop="ipNotAllow">
          <Input v-model="blackFormData.tender_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_address: " prop="isAllow">
          <Input v-model="blackFormData.tender_address" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_contactor: " prop="ipCount">
          <Input v-model="blackFormData.tender_contactor" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_phone_number: " prop="isPic">
          <Input v-model="blackFormData.tender_phone_number" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_email: " prop="allowCopy">
          <Input v-model="blackFormData.tender_email" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="project_scale: " prop="allowCopy">
          <Input v-model="blackFormData.project_scale" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="total_fund: " prop="allowCopy">
          <Input v-model="blackFormData.total_fund" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="foregin_company_fund: " prop="allowCopy">
          <Input v-model="blackFormData.foregin_company_fund" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="self_source: " prop="allowCopy">
          <Input v-model="blackFormData.self_source" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="overseas_fund: " prop="allowCopy">
          <Input v-model="blackFormData.overseas_fund" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="private_fund: " prop="ipNotAllow">
          <Input v-model="blackFormData.private_fund" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="state_fund: " prop="isAllow">
          <Input v-model="blackFormData.state_fund" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_mode: " prop="ipCount">
          <Input v-model="blackFormData.tender_mode" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="create_time: " prop="isPic">
          <Input v-model="blackFormData.create_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_origanize_form: " prop="allowCopy">
          <Input v-model="blackFormData.tender_origanize_form" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="supervise_dept_code: " prop="allowCopy">
          <Input v-model="blackFormData.supervise_dept_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="supervise_dept_name: " prop="allowCopy">
          <Input v-model="blackFormData.supervise_dept_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="approve_dept_code: " prop="allowCopy">
          <Input v-model="blackFormData.approve_dept_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="approve_dept_name: " prop="allowCopy">
          <Input v-model="blackFormData.approve_dept_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="report_duty: " prop="allowCopy">
          <Input v-model="blackFormData.report_duty" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_agency_code_type: " prop="allowCopy">
          <Input v-model="blackFormData.tender_agency_code_type" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_agency_code: " prop="allowCopy">
          <Input v-model="blackFormData.tender_agency_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_agency_name: " prop="allowCopy">
          <Input v-model="blackFormData.tender_agency_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_agency_address: " prop="allowCopy">
          <Input v-model="blackFormData.tender_agency_address" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_agency_contactor: " prop="allowCopy">
          <Input v-model="blackFormData.tender_agency_contactor" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_agency_phone_number: " prop="allowCopy">
          <Input v-model="blackFormData.tender_agency_phone_number" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="tender_agency_email: " prop="allowCopy">
          <Input v-model="blackFormData.tender_agency_email" type="number" placeholder="请输入" />
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
        <FormItem label="isunion: " prop="weekly">
          <!-- <Input v-model="blackFormData.isunion" placeholder="请输入" /> -->
          {{blackFormData.isunion}}
        </FormItem>
        <FormItem label="tender_code_type: " prop="monthly">
          <!-- <Input v-model="blackFormData.tender_code_type" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_code_type}}
        </FormItem>
        <FormItem label="tender_code: " prop="delayTime">
          <!-- <Input v-model="blackFormData.tender_code" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_code}}
        </FormItem>
        <FormItem label="tender_name: " prop="ipNotAllow">
          <!-- <Input v-model="blackFormData.tender_name" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_name}}
        </FormItem>
        <FormItem label="tender_address: " prop="isAllow">
          <!-- <Input v-model="blackFormData.tender_address" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_address}}
        </FormItem>
        <FormItem label="tender_contactor: " prop="ipCount">
          <!-- <Input v-model="blackFormData.tender_contactor" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_contactor}}
        </FormItem>
        <FormItem label="tender_phone_number: " prop="isPic">
          <!-- <Input v-model="blackFormData.tender_phone_number" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_phone_number}}
        </FormItem>
        <FormItem label="tender_email: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_email" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_email}}
        </FormItem>
        <FormItem label="project_scale: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.project_scale" type="number" placeholder="请输入" /> -->
          {{blackFormData.project_scale}}
        </FormItem>
        <FormItem label="total_fund: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.total_fund" type="number" placeholder="请输入" /> -->
          {{blackFormData.total_fund}}
        </FormItem>
        <FormItem label="foregin_company_fund: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.foregin_company_fund" type="number" placeholder="请输入" /> -->
          {{blackFormData.foregin_company_fund}}
        </FormItem>
        <FormItem label="self_source: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.self_source" type="number" placeholder="请输入" /> -->
          {{blackFormData.self_source}}
        </FormItem>
        <FormItem label="overseas_fund: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.overseas_fund" type="number" placeholder="请输入" /> -->
          {{blackFormData.overseas_fund}}
        </FormItem>
        <FormItem label="private_fund: " prop="ipNotAllow">
          <!-- <Input v-model="blackFormData.private_fund" type="number" placeholder="请输入" /> -->
          {{blackFormData.private_fund}}
        </FormItem>
        <FormItem label="state_fund: " prop="isAllow">
          <!-- <Input v-model="blackFormData.state_fund" type="number" placeholder="请输入" /> -->
          {{blackFormData.state_fund}}
        </FormItem>
        <FormItem label="tender_mode: " prop="ipCount">
          <!-- <Input v-model="blackFormData.tender_mode" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_mode}}
        </FormItem>
        <FormItem label="create_time: " prop="isPic">
          <!-- <Input v-model="blackFormData.create_time" type="number" placeholder="请输入" /> -->
          {{blackFormData.create_time}}
        </FormItem>
        <FormItem label="tender_origanize_form: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_origanize_form" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_origanize_form}}
        </FormItem>
        <FormItem label="supervise_dept_code: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.supervise_dept_code" type="number" placeholder="请输入" /> -->
          {{blackFormData.supervise_dept_code}}
        </FormItem>
        <FormItem label="supervise_dept_name: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.supervise_dept_name" type="number" placeholder="请输入" /> -->
          {{blackFormData.supervise_dept_name}}
        </FormItem>
        <FormItem label="approve_dept_code: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.approve_dept_code" type="number" placeholder="请输入" /> -->
          {{blackFormData.approve_dept_code}}
        </FormItem>
        <FormItem label="approve_dept_name: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.approve_dept_name" type="number" placeholder="请输入" /> -->
          {{blackFormData.approve_dept_name}}
        </FormItem>
        <FormItem label="report_duty: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.report_duty" type="number" placeholder="请输入" /> -->
          {{blackFormData.report_duty}}
        </FormItem>
        <FormItem label="tender_agency_code_type: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_agency_code_type" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_agency_code_type}}
        </FormItem>
        <FormItem label="tender_agency_code: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_agency_code" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_agency_code}}
        </FormItem>
        <FormItem label="tender_agency_name: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_agency_name" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_agency_name}}
        </FormItem>
        <FormItem label="tender_agency_address: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_agency_address" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_agency_address}}
        </FormItem>
        <FormItem label="tender_agency_contactor: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_agency_contactor" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_agency_contactor}}
        </FormItem>
        <FormItem label="tender_agency_phone_number: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_agency_phone_number" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_agency_phone_number}}
        </FormItem>
        <FormItem label="tender_agency_email: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.tender_agency_email" type="number" placeholder="请输入" /> -->
          {{blackFormData.tender_agency_email}}
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
  name: "cebTenderProject",
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
          title: "isunion",
          key: "isunion",
          minWidth: 100
        },
        {
          title: "tender_code_type",
          key: "tender_code_type",
          minWidth: 100
        },
        {
          title: "tender_code",
          key: "tender_code",
          minWidth: 100
        },
        {
          title: "tender_name",
          key: "tender_name",
          minWidth: 100
        },
        {
          title: "tender_address",
          key: "tender_address",
          minWidth: 100
        },
        {
          title: "tender_contactor",
          key: "tender_contactor",
          minWidth: 100
        },
        {
          title: "tender_phone_number",
          key: "tender_phone_number",
          minWidth: 120
        },
        {
          title: "tender_email",
          key: "tender_email",
          minWidth: 100
        },
        {
          title: "project_scale",
          key: "project_scale",
          minWidth: 100
        },
        {
          title: "total_fund",
          key: "total_fund",
          minWidth: 100
        },
        {
          title: "foregin_company_fund",
          key: "foregin_company_fund",
          minWidth: 100
        },
        {
          title: "self_source",
          key: "self_source",
          minWidth: 100
        },
        {
          title: "overseas_fund",
          key: "overseas_fund",
          minWidth: 100
        },
        {
          title: "private_fund",
          key: "private_fund",
          minWidth: 100
        },
        {
          title: "state_fund",
          key: "state_fund",
          minWidth: 100
        },
        {
          title: "tender_mode",
          key: "tender_mode",
          minWidth: 100
        },
        {
          title: "create_time",
          key: "create_time",
          minWidth: 120
        },
        {
          title: "tender_origanize_form",
          key: "tender_origanize_form",
          minWidth: 100
        },
        {
          title: "supervise_dept_code",
          key: "supervise_dept_code",
          minWidth: 100
        },
        {
          title: "supervise_dept_name",
          key: "supervise_dept_name",
          minWidth: 100
        },
        {
          title: "approve_dept_code",
          key: "approve_dept_code",
          minWidth: 100
        },
        {
          title: "approve_dept_name",
          key: "approve_dept_name",
          minWidth: 100
        },
        {
          title: "report_duty",
          key: "report_duty",
          minWidth: 100
        },
        {
          title: "tender_agency_code_type",
          key: "tender_agency_code_type",
          minWidth: 100
        },
        {
          title: "tender_agency_code",
          key: "tender_agency_code",
          minWidth: 100
        },
        {
          title: "tender_agency_name",
          key: "tender_agency_name",
          minWidth: 100
        },
        {
          title: "tender_agency_address",
          key: "tender_agency_address",
          minWidth: 100
        },
        {
          title: "tender_agency_contactor",
          key: "tender_agency_contactor",
          minWidth: 100
        },
        {
          title: "tender_agency_phone_number",
          key: "tender_agency_phone_number",
          minWidth: 100
        },
        {
          title: "tender_agency_email",
          key: "tender_agency_email",
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
          isunion: "", // Number
          tender_code_type: "", // String
          tender_code: "", // String
          tender_name: "", // String
          tender_address: "", // String
          tender_contactor: "", // String
          tender_phone_number: "", // String
          tender_email: "", // String
          project_scale: "", // String
          total_fund: "", // Number
          foregin_company_fund: "", // Number
          self_source: "", // Number
          overseas_fund: "", // Number
          private_fund: "", // Number
          state_fund: "", // Number
          tender_mode: "", // String
          create_time: "", // String
          tender_origanize_form: "", // String
          supervise_dept_code: "", // String
          supervise_dept_name: "", // String
          approve_dept_code: "", // String
          approve_dept_name: "", // String
          report_duty: "", // String
          tender_agency_code_type: "", // String
          tender_agency_code: "", // String
          tender_agency_name: "", // String
          tender_agency_address: "", // String
          tender_agency_contactor: "", // String
          tender_agency_phone_number: "", // String
          tender_agency_email: "" // String
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
        id: 11,
        isunion: "", // Number
        tender_code_type: "", // String
        tender_code: "", // String
        tender_name: "", // String
        tender_address: "", // String
        tender_contactor: "", // String
        tender_phone_number: "", // String
        tender_email: "", // String
        project_scale: "", // String
        total_fund: "", // Number
        foregin_company_fund: "", // Number
        self_source: "", // Number
        overseas_fund: "", // Number
        private_fund: "", // Number
        state_fund: "", // Number
        tender_mode: "", // String
        create_time: "", // String
        tender_origanize_form: "", // String
        supervise_dept_code: "", // String
        supervise_dept_name: "", // String
        approve_dept_code: "", // String
        approve_dept_name: "", // String
        report_duty: "", // String
        tender_agency_code_type: "", // String
        tender_agency_code: "", // String
        tender_agency_name: "", // String
        tender_agency_address: "", // String
        tender_agency_contactor: "", // String
        tender_agency_phone_number: "", // String
        tender_agency_email: "" // String
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