<template>
  <div>
    <Row :gutter="24">
      <Col :xl="6" :lg="6" :md="0" :sm="0" :xs="0">
        <Card shadow title="个人设置" icon="md-options" :padding="0">
          <CellGroup @on-click="handleChangeCell" class="ivu-pt-8 ivu-pb-8">
            <Cell title="基本设置" name="info" label="个人账户信息设置" :selected="currentType === 'info'" />
          </CellGroup>
        </Card>
      </Col>
      <Col :xl="18" :lg="18" :md="24" :sm="24" :xs="24">
        <Card :bordered="false" dis-hover>
          <Row>
            <Col :xl="0" :lg="0" :md="24" :sm="24" :xs="24">
              <Tabs :value="currentType" @on-click="handleChangeCell">
                <TabPane label="基本设置" name="info" />
                <TabPane label="安全设置" name="safety" />
                <TabPane label="账号绑定" name="account" />
                <TabPane label="新消息通知" name="notification" />
              </Tabs>
            </Col>
          </Row>
          <info v-if="currentType === 'info'" />
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import info from "./info";
export default {
name: 'personal',
components: { info },
  data() {
    return {
      currentType: "info" // info | safety | account | notification
    };
  },
  methods: {
    handleChangeCell(name) {
      this.currentType = name;
    }
  }
}
</script>

<style>

</style>