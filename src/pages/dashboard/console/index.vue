<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <table-form @on-submit="getData" @on-reset="getData" />
      <table-list ref="table" />
    </Card>
  </div>
</template>
<script>
import tableForm from "./table-form";
import tableList from "./table-list";
export default {
  name: "dashboard-console",
  components: { tableForm, tableList },
  data() {
    return {};
  },
  methods: {
    getData(item) {
      this.$refs.table.getData(item);
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
