<template>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item v-for="tab of tabBarList" :key="tab.url" :icon="tab.icon" :name="tab.url">
      {{ tab.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup name="AppFooter">
import { computed, ref } from "vue";
import { getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router'

const { proxy } = getCurrentInstance();

const router = useRouter();

// const active = ref(initActive());
const active = computed(() => proxy.$route.path)
const tabBarList = [
  { title: '首页', url: '/index', icon: 'home-o' },
  { title: 'AI聊天', url: '/ai-chat', icon: 'comment-o' },
  { title: '文档', url: '/document', icon: 'orders-o' },
  { title: '我的', url: '/mine', icon: 'manager-o' }
];
function initActive() {
  return proxy.$route.path
}

const onChange = (path) => {
  router.replace({ path });
}
</script>
