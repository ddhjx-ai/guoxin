<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <table-form @on-submit="searchGetData" @on-reset="getData" />
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
    searchGetData(item) {
      this.$refs.table.searchList(item);
    },
    getData() {
      this.$refs.table.resGetData();
    },
  },
  mounted() {
  }
};
</script>
