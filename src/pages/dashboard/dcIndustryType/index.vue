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
      <Form ref="createForm" :model="blackFormData" :rules="blackRules" :label-width="150">
        <FormItem label="alias: " prop="weekly">
          <Input v-model="blackFormData.weekly" placeholder="请输入" />
        </FormItem>
        <FormItem label="name: " prop="monthly">
          <Input v-model="blackFormData.monthly" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="url: " prop="delayTime">
          <Input v-model="blackFormData.delayTime" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="query: " prop="ipNotAllow">
          <Input v-model="blackFormData.ipNotAllow" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="sphinx_query: " prop="isAllow">
          <Input v-model="blackFormData.isAllow" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="sphinx_table_name: " prop="ipCount">
          <Input v-model="blackFormData.ipCount" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="sphinx_table_name2: " prop="isPic">
          <Input v-model="blackFormData.ipCount" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="sphinx_area: " prop="allowCopy">
          <Input v-model="blackFormData.ipCount" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="sphinx_cate: " prop="allowCopy">
          <Input v-model="blackFormData.ipCount" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="sphinx_calssaid: " prop="allowCopy">
          <Input v-model="blackFormData.ipCount" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_show_description: " prop="allowCopy">
          <Input v-model="blackFormData.ipCount" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_show_total: " prop="allowCopy">
          <Input v-model="blackFormData.ipCount" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="rp: " prop="allowCopy">
          <Input v-model="blackFormData.ipCount" type="number" placeholder="请输入" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="blackListModal = false">取消</Button>
        <Button type="primary" @click="handleSave">确定</Button>
      </div>
    </Modal>

    <!-- 详情弹出框 -->
    <Modal v-model="blackDetailModal" title="详情" width="600px">
      <Form :model="blackDetail" :label-width="120">
        <FormItem label="每天条数：">
          <!-- <Input v-model="blackDetail.daily" placeholder="请输入" /> -->
          {{blackDetail.daily}}
        </FormItem>
        <FormItem label="每周条数：">
          <!-- <Input v-model="blackDetail.weekly" placeholder="请输入" /> -->
          {{blackDetail.weekly}}
        </FormItem>
        <FormItem label="每月条数：">
          <!-- <Input v-model="blackDetail.monthly" type="number" placeholder="请输入" /> -->
          {{blackDetail.monthly}}
        </FormItem>
        <FormItem label="延时时间：">
          <!-- <Input v-model="blackDetail.delayTime" type="number" placeholder="请输入" /> -->
          {{blackDetail.delayTime}}
        </FormItem>
        <FormItem label="允许登录个数：">
          <!-- <Input v-model="blackDetail.ipCount" type="number" placeholder="请输入" /> -->
          {{blackDetail.ipCount}}
        </FormItem>
        <FormItem label="信息转成图片：">
          <!-- <Radio-group :model.sync="blackDetail.isPic">
            <Radio value="true">是</Radio>
            <Radio value="false">否</Radio>
          </Radio-group>-->
          {{blackDetail.isPic ? '是' : '否'}}
        </FormItem>
        <FormItem label="允许复制：">
          <!-- <Radio-group :model.sync="blackFormData.allowCopy">
            <Radio value="true">是</Radio>
            <Radio value="false">否</Radio>
          </Radio-group>-->
          {{blackDetail.allowCopy ? '是' : '否'}}
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
  name: "dcIndustryType",
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
          title: "sphinx_calssaid",
          key: "sphinx_calssaid",
          minWidth: 100
        },
        {
          title: "is_show_description",
          key: "is_show_description",
          minWidth: 100
        },
        {
          title: "is_show_total",
          key: "is_show_total",
          minWidth: 100
        },
        {
          title: "rp",
          key: "rp",
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
          attachment_code: 'admin',
          attachment_file_name: 200,
          save_abs_path: 300,
          file_type: 1,
          data_timestamp: "202.118.118.1",
          md5: "202.118.118.2",
          notice_id: 11,
          member_id: 1,
          is_deleted: 1,
          create_time: 1,
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
      blackFormData: {
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
      this.$refs.createForm.resetFields()
    },
    handleSave() {}
  }
};
</script>

<style>
</style>