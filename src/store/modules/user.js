import { defineStore } from "pinia";
import cache from "@/plugins/cache.js";
import { logout } from "@/api/logout";
import router from "@/router";
import modal from "@/plugins/modal";

const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: cache.local.getJSON("userInfo") || {},
  }),
  actions: {
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    async logout() {
      const { code } = await logout().catch(console.warn);
      if (code === 1) {
        this.userInfo = {};
        cache.local.remove("userInfo");
        router.replace("/login");
        modal.msgSuccess("退出成功");
      } else {
        modal.msgError("退出失败");
      }
    },
  },
});

export default useUserStore;
