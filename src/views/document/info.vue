<template>
  <div class="app-container">
    <info-top :count="documentInfo.count" @open-shared="handleOpenShared" @handle-copy-content="handleCopyContent" />
    <info-content :title="documentInfo.title" :content="documentInfo.content" />
    <!--    <info-footer @handle-click-setting="handleClickSetting" />-->
  </div>
  <van-action-sheet v-model:show="showActions" :actions="actions" cancel-text="取消" close-on-click-action
    @cancel="onCancel" />
</template>

<script setup name="DocumentInfo">
import { computed, getCurrentInstance, onMounted, reactive, toRefs, watch } from "vue";
import { getDocumentList } from "@/api/document.js";
import { useRouter, useRoute } from 'vue-router';
import InfoTop from "@/views/document/components/InfoTop.vue";
import InfoContent from "@/views/document/components/InfoContent.vue";
import InfoFooter from "@/views/document/components/InfoFooter.vue";
import { useCopyText } from "@/hooks/index.js";
import useUserStore from "@/store/modules/user.js";
import { allList } from "@/views/home/model.js";

const state = reactive({
  queryParams: {
    page: 1,
    pageSize: 1000,
  },
  documentAllList: [],
  documentInfo: {},
  showActions: false,
  active: -1,
  actions: [
    { name: '复制分享链接', callback: () => handleCopyUrl() },
  ],
});

const { queryParams, documentAllList, documentInfo, showActions, actions, active } = toRefs(state);

const { proxy } = getCurrentInstance()

const router = useRouter();

const route = useRoute();

const userStore = useUserStore();

const { copied, copyText } = useCopyText();

const paperId = computed(() => route.query.paperId);

const getDocumentAllList = async () => {
  const { data: { records } } = await getDocumentList(queryParams.value);
  documentAllList.value = records;
}

const getDocumentInfo = async () => {
  return new Promise((resolve, reject) => {
    const info = documentAllList.value.find(item => item.paperId === paperId.value);
    resolve(info);
  });
}

const getInfo = async () => {
  documentInfo.value = await getDocumentInfo()
}

const handleOpenShared = () => {
  showActions.value = true
}

const handleCopyContent = () => {
  copyText(documentInfo.value.content.replace(/<br \/>/g, "\n"))
  proxy.$modal.msgSuccess('复制成功')
}

function handleCopyUrl() {
  copyText(location.href);
}

function onCancel() {
  showActions.value = false
}

const handleClickSetting = () => {
  const { cardTitle } = documentInfo.value
  const itemInfo = allList.find(item => item.title === cardTitle)
  if (itemInfo) {
    proxy.$cache.local.setJSON('itemInfo', itemInfo)
    router.replace({ path: '/module' })
  }
}

onMounted(async () => {
  await getDocumentAllList();
  await getInfo();
});

watch(() => paperId.value, () => {
  getInfo()
});

watch(() => copied.value, (value) => {
  if (value) {
    proxy.$modal.msgSuccess('复制成功')
  }
});
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  //height: calc(100% - 1rem);
  height: 100%;

}
</style>
