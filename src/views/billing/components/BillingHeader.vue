<template>
  <div class="header-wrap">
    <div class="header">
      <div
        v-for="item of types"
        :class="item.active ? `type-active` : ''"
        class="type"
        :key="item.id"
        @click="choose(item.id)"
      >
        {{ item.text }}
        <div class="active-icon" v-if="item.active"></div>
      </div>
    </div>
    <div class="type-bottom"></div>
  </div>
</template>

<script setup name="BillingHeader">
import { computed, reactive, toRefs, inject } from "vue";
const props = defineProps({
  types: {
    type: Array,
    default: [
      { id: 1, text: "普惠版", active: false },
      { id: 2, text: "高级版", active: true },
      { id: 3, text: "专业版", active: false },
    ],
  },
});
const emit = defineEmits(["update:active"]);
const types = reactive(props.types);
const activeColors = inject("activeColors");

const choose = id => {
  types.forEach(i => (i.active = false));
  types.find(i => i.id == id).active = true;
  emit("update:active", id);
};
const activeId = computed(() => types.find(i => i.active == true).id);
</script>

<style scoped lang="scss">
.header-wrap {
  .header {
    background: url("@/assets/images/billing_header.png");
    height: 1.12rem;
    background-size: 100% 3.5rem;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    .type {
      margin: 0 0.45rem;
      height: 1.11rem;
      line-height: 1.11rem;
      font-size: 0.32rem;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      position: relative;
    }
    .type-active {
      font-size: 0.36rem;
      background-image: v-bind("activeColors.textBackground");
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: 700;
      .active-icon {
        border-bottom: 0.06rem solid v-bind("activeColors.iconColor");
        position: absolute;
        bottom: -0.01rem;
        left: 50%;
        transform: translate(-50%);
        width: 0;
        height: 0;
        border-top: 0.06rem solid transparent;
        border-right: 0.12rem solid transparent;
        border-left: 0.12rem solid transparent;
      }
    }
  }
  .type-bottom {
    height: 0.12rem;
    background: v-bind("activeColors.bottomBackground");
  }
}
</style>
