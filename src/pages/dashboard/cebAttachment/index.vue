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
        <FormItem label="attachment_code: " prop="weekly">
          <Input v-model="cebFormData.attachment_code" placeholder="请输入" />
        </FormItem>
        <FormItem label="attachment_file_name: " prop="monthly">
          <Input v-model="cebFormData.attachment_file_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="save_abs_path: " prop="delayTime">
          <Input v-model="cebFormData.save_abs_path" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="file_type: " prop="ipNotAllow">
          <Input v-model="cebFormData.file_type" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="data_timestamp: " prop="isAllow">
          <Input v-model="cebFormData.data_timestamp" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="md5: " prop="ipCount">
          <Input v-model="cebFormData.md5" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="notice_id: " prop="isPic">
          <Input v-model="cebFormData.notice_id" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="member_id: " prop="allowCopy">
          <Input v-model="cebFormData.member_id" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_deleted: " prop="allowCopy">
          <Input v-model="cebFormData.is_deleted" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="create_time: " prop="allowCopy">
          <Input v-model="cebFormData.create_time" type="number" placeholder="请输入" />
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
    <Modal v-model="DetailModal" title="详情" width="600px">
      <Form :model="cebFormData" :label-width="120">
        <FormItem label="attachment_code: " prop="weekly">
          <!-- <Input v-model="cebFormData.weekly" placeholder="请输入" /> -->
          {{cebFormData.attachment_code}}
        </FormItem>
        <FormItem label="attachment_file_name: " prop="monthly">
          <!-- <Input v-model="cebFormData.monthly" type="number" placeholder="请输入" /> -->
          {{cebFormData.attachment_file_name}}
        </FormItem>
        <FormItem label="save_abs_path: " prop="delayTime">
          <!-- <Input v-model="cebFormData.delayTime" type="number" placeholder="请输入" /> -->
          {{cebFormData.save_abs_path}}
        </FormItem>
        <FormItem label="file_type: " prop="ipNotAllow">
          <!-- <Input v-model="cebFormData.ipNotAllow" type="number" placeholder="请输入" /> -->
          {{cebFormData.file_type}}
        </FormItem>
        <FormItem label="data_timestamp: " prop="isAllow">
          <!-- <Input v-model="cebFormData.isAllow" type="number" placeholder="请输入" /> -->
          {{cebFormData.data_timestamp}}
        </FormItem>
        <FormItem label="md5: " prop="ipCount">
          <!-- <Input v-model="cebFormData.ipCount" type="number" placeholder="请输入" /> -->
          {{cebFormData.md5}}
        </FormItem>
        <FormItem label="notice_id: " prop="isPic">
          <!-- <Input v-model="cebFormData.ipCount" type="number" placeholder="请输入" /> -->
          {{cebFormData.notice_id}}
        </FormItem>
        <FormItem label="member_id: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.ipCount" type="number" placeholder="请输入" /> -->
          {{cebFormData.member_id}}
        </FormItem>
        <FormItem label="is_deleted: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.ipCount" type="number" placeholder="请输入" /> -->
          {{cebFormData.is_deleted}}
        </FormItem>
        <FormItem label="create_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.ipCount" type="number" placeholder="请输入" /> -->
          {{cebFormData.create_time}}
        </FormItem>
        <FormItem label="last_modified_time: " prop="allowCopy">
          <!-- <Input v-model="cebFormData.ipCount" type="number" placeholder="请输入" /> -->
          {{cebFormData.last_modified_time}}
        </FormItem>
      </Form>
      <div slot="footer">
        <!-- <Button type="text" @click="blackListModal = false">取消</Button> -->
        <Button type="primary" @click="DetailModal = false">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "cebAttachment",
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
          title: "attachment_code",
          key: "attachment_code",
          minWidth: 100
        },
        {
          title: "attachment_file_name",
          key: "attachment_file_name",
          minWidth: 100
        },
        {
          title: "save_abs_path",
          key: "save_abs_path",
          minWidth: 100
        },
        {
          title: "file_type",
          key: "file_type",
          minWidth: 100
        },
        {
          title: "data_timestamp",
          key: "data_timestamp",
          minWidth: 100
        },
        {
          title: "md5",
          key: "md5",
          minWidth: 100
        },
        {
          title: "notice_id",
          key: "notice_id",
          minWidth: 120
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
          title: "create_time",
          key: "create_time",
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
          attachment_code: '',
          attachment_file_name: '',
          save_abs_path: '',
          file_type: '',
          data_timestamp: "",
          md5: "",
          notice_id: '',
          member_id: '',
          is_deleted: '',
          create_time: '',
          last_modified_time: ''
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
        daily: "",
        weekly: "",
        monthly: "",
        delayTime: "",
        ipNotAllow: "",
        isAllow: "",
        ipCount: "",
        isHunXiao: "",
        isPic: "",
        allowCopy: ""
      },
      blackRules: {},
      // 详情
      DetailModal: false,
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
      this.DetailModal = true;
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