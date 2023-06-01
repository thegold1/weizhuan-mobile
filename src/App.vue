<script setup>
import cache from "@/plugins/cache.js";
import { encryptData } from "@/utils/index.js";
import { onMounted } from "vue";
import { isEmpty } from "lodash-es";
import { cookieLogin } from "@/api/login.js";
import { useCheckDeviceType } from "@/hooks/index.js";



const initSycs = () => {
  try {
    const sycs = cache.local.getJSON('sycs')
    if (!sycs) {
      cache.local.setJSON('sycs', encryptData(0));
    }
  } catch (e) {

  }
}

const checkLogin = async () => {
  try {
    const userInfo = cache.local.getJSON('userInfo');
    if (!isEmpty(userInfo)) {
      const params = {
        uid: userInfo.uid,
        logonWay: userInfo.logonWay,
        wechatOld: userInfo.wechat,
        emailOld: userInfo.email,
        phoneOld: userInfo.phone
      };
      await cookieLogin(params)
    }
  } catch (e) {

  }
};

const { isMobile } = useCheckDeviceType();

onMounted(() => {

  checkLogin();
  initSycs();
});

</script>

<template>
  <router-view />
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
