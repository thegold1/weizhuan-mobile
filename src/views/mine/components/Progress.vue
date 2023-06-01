<template>
  <div class="progress-back">
    <div class="progress"></div>
    <van-image
      class="progress-icon"
      :src="getImageUrl(`progress_icon${vipType}.png`)"
    />
  </div>
</template>

<script setup name="progress">
import { getImageUrl } from "@/utils";
import { isNil } from "lodash-es";
import { computed } from "vue";

const { vipType, percentage, usedContent, totalContent } = defineProps({
  vipType: {
    type: String,
  },
  percentage: {
    type: Number,
  },
  usedContent: {
    type: Number,
  },
  totalContent: {
    type: Number,
  },
});
// 优先通过usedContent, totalContent计算进度, 其次通过percentage百分比, 都没传则是0%
const progress = computed(() => {
  return isNil(usedContent) || isNil(totalContent)
    ? isNil(percentage)
      ? "0%"
      : percentage + "%"
    : (usedContent / totalContent) * 100 + "%";
});

const progressColorMap = [
  {
    background: "#f6f6f6",
    used: "#00182E",
  },
  {
    background: "#F6F6F6",
    used: "#773529",
  },
  {
    background: "#F6F6F6",
    used: "#7C4700",
  },
  {
    background: "rgba(246,246,246,.4)",
    used: "linear-gradient(217deg,#FACFDA 0%,#CFD9FF 67%,#D9D0EE 100%)",
  },
];
const progressColor = computed(() => progressColorMap[vipType]);
</script>

<style scoped lang="scss">
.progress-back {
  background: v-bind("progressColor.background");
  overflow: visible;
  min-height: 1px;
  display: flex;
  position: relative;
  .progress {
    width: v-bind(progress);
    transition: width ease 0.2s;
    height: 100%;
    background-color: v-bind("progressColor.used");
  }
  .progress-icon {
    -webkit-touch-callout: none;
    user-select: none;
    position: relative;
    width: 0.24rem;
    height: 0.24rem;
    top: -0.27rem;
  }
}
</style>
