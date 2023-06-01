<template>
  <app-main :style="{ height: showTabBar ? 'calc(100% - 50px)' : '100%' }" />
  <app-footer v-if="showTabBar" />
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";
import AppMain from "@/layout/components/AppMain.vue";
import AppFooter from "@/layout/components/AppFooter.vue";
import { showNotify } from "vant";

const { proxy } = getCurrentInstance();

const showTabBar = computed(() => {
  const { showTabBar = true } = proxy.$route.meta;
  return showTabBar;
});
console.log(proxy.$route);
</script>
