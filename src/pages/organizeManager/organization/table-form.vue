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
        <FormItem label="规则名称：" prop="name" label-for="name">
          <Input v-model="data.name" placeholder="请输入" element-id="name" />
        </FormItem>
      </Col>
      <Col v-bind="grid">
        <FormItem label="使用状态：" prop="status1" label-for="status1">
          <Select v-model="data.status1" placeholder="请选择" element-id="status1">
            <Option :value="0">关闭</Option>
            <Option :value="1">运行中</Option>
          </Select>
        </FormItem>
      </Col>
        <Col v-bind="grid">
          <FormItem label="调用次数：" prop="count" label-for="count">
            <InputNumber
              v-width="'100%'"
              v-model="data.count"
              placeholder="请输入"
              element-id="count"
            />
          </FormItem>
        </Col>
        <Col v-bind="grid">
          <FormItem label="更新日期：" prop="date" label-for="date">
            <DatePicker v-width="'100%'" v-model="data.date" placeholder="请选择" element-id="date" />
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
      data: {
        name: "",
        status1: "",
        count: null,
        date: "",
        status2: "",
        status3: ""
      },
      rules: {}
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
      this.$emit("on-submit", this.data);
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.$emit("on-reset");
    }
  }
};
</script>
