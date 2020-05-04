<template>
  <span class="i-layout-header-trigger i-layout-header-trigger-min">
    <Button icon="md-power" @click="handleClick"></Button>
  </span>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "iHeaderUser",
  computed: {
    ...mapState("admin/user", ["info"]),
    ...mapState("admin/layout", ["isMobile", "logoutConfirm"])
  },
  methods: {
    ...mapActions("admin/account", ["logout"]),
    handleClick() {
        this.logout({
          confirm: this.logoutConfirm,
          vm: this
        });
    }
  }
};
</script>
