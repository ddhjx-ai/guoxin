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
        <FormItem label="name: " prop="bidder_code_type">
          <Input v-model="cebFormData.name" placeholder="请输入" />
        </FormItem>
        <FormItem label="org_code: " prop="bidder_code">
          <Input v-model="cebFormData.org_code" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="regCode: " prop="bidder_name">
          <Input v-model="cebFormData.regCode" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="taxCode: " prop="is_unions">
          <Input v-model="cebFormData.taxCode" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="legal_person: " prop="isAllow">
          <Input v-model="cebFormData.legal_person" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="regist_time: " prop="ipCount">
          <Input v-model="cebFormData.regist_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="is_agency: " prop="isPic">
          <Input v-model="cebFormData.is_agency" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="admin_realname: " prop="allowCopy">
          <Input v-model="cebFormData.admin_realname" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="mobile_phone: " prop="allowCopy">
          <Input v-model="cebFormData.mobile_phone" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="mail: " prop="allowCopy">
          <Input v-model="cebFormData.mail" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="id_card_num: " prop="allowCopy">
          <Input v-model="cebFormData.id_card_num" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="legal_person_auth: " prop="bidder_code_type">
          <Input v-model="cebFormData.legal_person_auth" placeholder="请输入" />
        </FormItem>
        <FormItem label="approve_result: " prop="bidder_code">
          <Input v-model="cebFormData.approve_result" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="approve_person: " prop="bidder_name">
          <Input v-model="cebFormData.approve_person" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="approve_time: " prop="is_unions">
          <Input v-model="cebFormData.approve_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="member_id: " prop="isAllow">
          <Input v-model="cebFormData.member_id" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="status: " prop="ipCount">
          <Input v-model="cebFormData.status" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="create_time: " prop="isPic">
          <Input v-model="cebFormData.create_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="last_modified_time: " prop="allowCopy">
          <Input v-model="cebFormData.last_modified_time" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="certifycate_auth: " prop="allowCopy">
          <Input v-model="cebFormData.certifycate_auth" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="certifycate_auth_name: " prop="allowCopy">
          <Input v-model="cebFormData.certifycate_auth_name" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="electronic_seal: " prop="allowCopy">
          <Input v-model="cebFormData.electronic_seal" type="number" placeholder="请输入" />
        </FormItem>
        <FormItem label="electronic_seal_name: " prop="allowCopy">
          <Input v-model="cebFormData.electronic_seal_name" type="number" placeholder="请输入" />
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
  name: "CebEnergy",
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
          title: "serialVersionUID",
          key: "serialVersionUID",
          minWidth: 100
        },
        {
          title: "name",
          key: "name",
          minWidth: 100
        },
        {
          title: "org_code",
          key: "org_code",
          minWidth: 100
        },
        {
          title: "regCode",
          key: "regCode",
          minWidth: 100
        },
        {
          title: "taxCode",
          key: "taxCode",
          minWidth: 100
        },
        {
          title: "legal_person",
          key: "legal_person",
          minWidth: 100
        },
        {
          title: "regist_time",
          key: "regist_time",
          minWidth: 120
        },
        {
          title: "is_agency",
          key: "is_agency",
          minWidth: 100
        },
        {
          title: "admin_realname",
          key: "admin_realname",
          minWidth: 100
        },
        {
          title: "mobile_phone",
          key: "mobile_phone",
          minWidth: 100
        },
        {
          title: "mail",
          key: "mail",
          minWidth: 100
        },
        {
          title: "id_card_num",
          key: "id_card_num",
          minWidth: 100
        },
        {
          title: "legal_person_auth",
          key: "legal_person_auth",
          minWidth: 100
        },
        {
          title: "approve_result",
          key: "approve_result",
          minWidth: 100
        },
        {
          title: "approve_person",
          key: "approve_person",
          minWidth: 100
        },
        {
          title: "approve_time",
          key: "approve_time",
          minWidth: 100
        },
        {
          title: "member_id",
          key: "member_id",
          minWidth: 100
        },
        {
          title: "status",
          key: "status",
          minWidth: 120
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
          title: "certifycate_auth",
          key: "certifycate_auth",
          minWidth: 100
        },
        {
          title: "certifycate_auth_name",
          key: "certifycate_auth_name",
          minWidth: 100
        },
        {
          title: "electronic_seal",
          key: "electronic_seal",
          minWidth: 100
        },
        {
          title: "electronic_seal_name",
          key: "electronic_seal_name",
          minWidth: 100
        },
        {
          title: "business_license",
          key: "business_license",
          minWidth: 100
        },
        {
          title: "business_license_name",
          key: "business_license_name",
          minWidth: 100
        },
        {
          title: "account",
          key: "account",
          minWidth: 100
        },
        {
          title: "province",
          key: "province",
          minWidth: 120
        },
        {
          title: "city",
          key: "city",
          minWidth: 100
        },
        {
          title: "address",
          key: "address",
          minWidth: 100
        },
        {
          title: "reject_reason",
          key: "reject_reason",
          minWidth: 100
        },
        {
          title: "chapter",
          key: "chapter",
          minWidth: 100
        },
        {
          title: "sign",
          key: "sign",
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
          id: 22, // Number
          name: "", // String
          org_code: "", // String
          regCode: "", // Number
          taxCode: "", // Number
          legal_person: "", // String
          regist_time: "", // String
          is_agency: "", // String
          admin_realname: "", // String
          mobile_phone: "", // String
          mail: "", // String
          id_card_num: "", // String
          legal_person_auth: "", // String
          approve_result: "", // String
          approve_person: "", // String
          approve_time: "", // String
          member_id: "", // String
          status: "", // String
          create_time: "", // String
          last_modified_time: "", // String
          certifycate_auth: "", // String
          certifycate_auth_name: "", // String
          electronic_seal: "", // String
          electronic_seal_name: "", // String
          business_license: "", // String
          business_license_name: "", // String
          account: "", // String
          province: "", // String
          city: "", // String
          address: "", // String
          reject_reason: "", // String
          chapter: "", // String
          sign: "" // String
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
        serialVersionUID: 11, // Number
        name: "", // String
        org_code: "", // String
        regCode: "", // Number
        taxCode: "", // Number
        legal_person: "", // String
        regist_time: "", // String
        is_agency: "", // String
        admin_realname: "", // String
        mobile_phone: "", // String
        mail: "", // String
        id_card_num: "", // String
        legal_person_auth: "", // String
        approve_result: "", // String
        approve_person: "", // String
        approve_time: "", // String
        member_id: "", // String
        status: "", // String
        create_time: "", // String
        last_modified_time: "", // String
        certifycate_auth: "", // String
        certifycate_auth_name: "", // String
        electronic_seal: "", // String
        electronic_seal_name: "", // String
        business_license: "", // String
        business_license_name: "", // String
        account: "", // String
        province: "", // String
        city: "", // String
        address: "", // String
        reject_reason: "", // String
        chapter: "", // String
        sign: "" // String
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