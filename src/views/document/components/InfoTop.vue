<template>
  <div class="top-container">
    <div class="left"> 共 {{ count }} 字</div>
    <div class="right">
      <van-icon style="width: 0.56rem; height: 0.56rem;" :name="getImageUrl('icon/copy-icon.png')"
        @click="handleCopyContent" />
      <van-icon v-if="shareShow" style="width: 0.56rem; height: 0.56rem;margin-left: .3rem;"
        :name="getImageUrl('icon/shared-icon.png')" @click="handleOpenShared" />
    </div>
  </div>
</template>

<script setup name="DocumentInfoTop">
import { computed } from "vue";
import { getImageUrl } from "@/utils";

const props = defineProps({
  count: {
    type: String,
    required: true,
    default: 0
  },
  shareShow: {
    type: Boolean,
    default: true
  },
});

const emits = defineEmits(['openShared', 'handleCopyContent']);

const count = computed(() => props.count);

const shareShow = computed(() => props.shareShow);


const handleOpenShared = () => {
  emits('openShared');
}

const handleCopyContent = () => {
  emits('handleCopyContent');
}

</script>

<style lang="scss" scoped>
.top-container {
  width: 100%;
  height: 1rem;
  color: rgba(0, 0, 0, .5);
  padding: 0 0.16rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right {
    display: flex;
    align-items: center;
  }

  :deep(.van-icon__image) {
    width: 0.36rem;
    height: 100%;
  }

  :deep(.van-badge) {
    color: #7d551f;
    font-weight: unset;
  }
}
</style>
