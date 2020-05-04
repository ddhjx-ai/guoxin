<template>
  <Form
    ref="form"
    :model="data"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
  >
    <Row :gutter="24" type="flex">
      <Col v-bind="grid">
        <FormItem label="关键字：" prop="name" label-for="name">
          <Input v-model="data.name" placeholder="按姓名、手机号搜索" element-id="name" />
        </FormItem>
      </Col>
      <Col v-bind="grid">
        <FormItem label="状态：" prop="status1" label-for="status1">
          <Select v-model="data.status1" placeholder="请选择" element-id="status1">
            <Option value="0">停用</Option>
            <Option value="1">启用</Option>
          </Select>
        </FormItem>
      </Col>
      <Col v-bind="grid">
        <FormItem label="岗位：" prop="stations" label-for="stations">
          <Select v-model="data.stations" placeholder="请选择" element-id="status1">
            <Option value="0">停用</Option>
            <Option value="1">启用</Option>
          </Select>
        </FormItem>
      </Col>
      <Col v-bind="grid">
        <FormItem label="部门：" prop="department" label-for="department">
          <Select v-model="data.department" placeholder="请选择">
                <Option v-for="item in departmentList" :key="item" :value="item">{{item}}</Option>
              </Select>
        </FormItem>
      </Col>
      <Col v-bind="grid" class="ivu-text-right">
        <FormItem>
          <Button type="primary" @click="handleSubmit">查询</Button>
          <Button class="ivu-ml-8" @click="handleReset">重置</Button>
        </FormItem>
      </Col>
    </Row>
  </Form>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      grid: {
        xl: 8,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      },
      collapse: false,
      data: {
        name: "",
        status1: "",
        count: null,
        date: "",
        status2: "",
        status3: ""
      },
      rules: {},
      departmentList: ["市场部", "技术部", "运营部"],
    };
  },
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    labelWidth() {
      return this.isMobile ? undefined : 100;
    },
    labelPosition() {
      return this.isMobile ? "top" : "right";
    }
  },
  methods: {
    handleSubmit() {
      // this.$emit("on-submit", this.data);
    },
    handleReset() {
      /* this.$refs.form.resetFields();
      this.$emit("on-reset"); */
    }
  }
};
</script>
