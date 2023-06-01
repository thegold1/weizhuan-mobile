<template>
  <section class="app-main">
    <router-view :key="key" />
  </section>
</template>

<script setup>
import { computed, getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();

const key = computed(() => proxy.$route.path);
</script>

<style lang="scss">
.app-main {
  width: 100%;
  overflow: auto;
}
</style>
