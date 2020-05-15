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
        <FormItem label="projectCode: " prop="weekly">
          <Input v-model="blackFormData.projectCode" placeholder="请输入" />
        </FormItem>
        <FormItem label="projectName: " prop="monthly">
          <Input v-model="blackFormData.projectName" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="invesProjectCode: " prop="delayTime">
          <Input v-model="blackFormData.invesProjectCode" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="region: " prop="ipNotAllow">
          <Input v-model="blackFormData.region" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="member_id: " prop="isAllow">
          <Input v-model="blackFormData.member_id" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_deleted: " prop="ipCount">
          <Input v-model="blackFormData.is_deleted" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="status: " prop="isPic">
          <Input v-model="blackFormData.status" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="created_time: " prop="allowCopy">
          <Input v-model="blackFormData.created_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="last_modified_time: " prop="allowCopy">
          <Input v-model="blackFormData.last_modified_time" type="number" placeholder="请输入" />
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
        <FormItem label="projectCode: " prop="weekly">
          <!-- <Input v-model="blackFormData.projectCode" placeholder="请输入" /> -->
          {{blackFormData.projectCode}}
        </FormItem>
        <FormItem label="projectName: " prop="monthly">
          <!-- <Input v-model="blackFormData.projectName" type="number" placeholder="请输入" /> -->
          {{blackFormData.projectName}}
        </FormItem>
        <FormItem label="invesProjectCode: " prop="delayTime">
          <!-- <Input v-model="blackFormData.invesProjectCode" type="number" placeholder="请输入" /> -->
          {{blackFormData.invesProjectCode}}
        </FormItem>
        <FormItem label="region: " prop="ipNotAllow">
          <!-- <Input v-model="blackFormData.region" type="number" placeholder="请输入" /> -->
          {{blackFormData.region}}
        </FormItem>
        <FormItem label="member_id: " prop="isAllow">
          <!-- <Input v-model="blackFormData.member_id" type="number" placeholder="请输入" /> -->
          {{blackFormData.member_id}}
        </FormItem>
        <FormItem label="is_deleted: " prop="ipCount">
          <!-- <Input v-model="blackFormData.is_deleted" type="number" placeholder="请输入" /> -->
          {{blackFormData.is_deleted}}
        </FormItem>
        <FormItem label="status: " prop="isPic">
          <!-- <Input v-model="blackFormData.status" type="number" placeholder="请输入" /> -->
          {{blackFormData.status}}
        </FormItem>
        <FormItem label="created_time: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.created_time" type="number" placeholder="请输入" /> -->
          {{blackFormData.created_time}}
        </FormItem>
        <FormItem label="last_modified_time: " prop="allowCopy">
          <!-- <Input v-model="blackFormData.last_modified_time" type="number" placeholder="请输入" /> -->
          {{blackFormData.last_modified_time}}
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
  name: "cebProject",
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
          title: "projectCode",
          key: "projectCode",
          minWidth: 100
        },
        {
          title: "projectName",
          key: "projectName",
          minWidth: 100
        },
        {
          title: "invesProjectCode",
          key: "invesProjectCode",
          minWidth: 100
        },
        {
          title: "region",
          key: "region",
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
          minWidth: 120
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
          id: 22, // Number
          projectCode: "", // String
          projectName: "", // String
          invesProjectCode: "", // String
          region: "", // Number
          member_id: "", // String
          is_deleted: "", // String
          status: "", // String
          created_time: "", // Number
          last_modified_time: ""
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
        projectCode: "", // String
        projectName: "", // String
        invesProjectCode: "", // String
        region: "", // Number
        member_id: "", // String
        is_deleted: "", // String
        status: "", // String
        created_time: "", // Number
        last_modified_time: ""
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