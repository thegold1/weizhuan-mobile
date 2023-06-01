<template>
  <div class="billing-container">
    <billing-header :types="types" v-model:active="activeId" />
    <div>
      <template v-for="item in priceList" :key="item.id">
        <div
          class="price-list"
          :class="`price-list${item.id}`"
          v-if="item.id == activeId"
        >
          <div
            class="price-list-item"
            @click="choosePrice(info.id)"
            v-for="info in item.priceInfo"
            :key="info.id"
          >
            <div class="tag" v-if="info.tag">
              {{
                `立省${
                  Math.floor(
                    (item.priceInfo.find(i => i.month == 1).price -
                      info.price / info.month) *
                      10
                  ) / 10
                }元/月`
              }}
            </div>
            <div class="item" :class="info.active ? 'item-active' : null">
              <div class="month">{{ `${info.month}个月` }}</div>
              <div class="price-wrap">
                <span class="unit">¥</span>
                <span class="price">{{ info.price }}</span>
              </div>
              <div class="desc">
                {{
                  `折合${
                    info.month == 1
                      ? Math.floor((info.price / 30) * 10) / 10
                      : Math.floor((info.price / info.month) * 10) / 10
                  }元/${info.month == 1 ? "天" : "月"}`
                }}
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div>
      <div class="submit-btn">
        {{ `确认协议并支付${currentPrice}元` }}
      </div>
      <div class="tip">开通前请阅读《快写宝会员服务协议》</div>
      <div class="coupon">
        <div class="coupon-item">
          <van-image class="coupon-icon" :src="coupon"></van-image>
          <span class="coupon-title">使用优惠券</span>
        </div>
        <van-image class="coupon-lead-icon" :src="arrowRight"></van-image>
      </div>
    </div>
    <benefits
      :benefits="activeBenefits.benefits"
      :title="activeBenefits.title"
    />
  </div>
</template>

<script setup name="billing">
import { reactive, ref, computed, provide } from "vue";
import billingHeader from "./components/BillingHeader.vue";
import Benefits from "./components/Benefits.vue";
import { colorMap } from "./data";
import coupon from "@/assets/images/icon/coupon.png";
import arrowRight from "@/assets/images/icon/arrow-right.png";

const types = reactive([
  { id: 1, text: "普惠版", active: false },
  { id: 2, text: "高级版", active: true },
  { id: 3, text: "专业版", active: false },
]);
// 当前页面显示vip版本id
const activeId = ref(types.find(i => i.active == true).id);
const priceList = reactive([
  {
    id: 1,
    priceInfo: [
      { id: 1, month: 1, price: 19, active: false },
      { id: 2, month: 12, price: 188, active: true, tag: true },
    ],
  },
  {
    id: 2,
    priceInfo: [
      { id: 1, month: 1, price: 39, active: false },
      { id: 2, month: 12, price: 388, active: true, tag: true },
    ],
  },
  {
    id: 3,
    priceInfo: [
      { id: 1, month: 1, price: 199, active: false },
      { id: 2, month: 12, price: 1888, active: true, tag: true },
    ],
  },
]);
const comBenefits = {
  title: "普惠版会员权益",
  benefits: [
    { icon: "store", text: "30万字数额度" },
    { icon: "list", text: "内容多输出" },
    { icon: "control", text: "模版编辑器" },
    { icon: "display", text: "支持5台设备" },
    { icon: "save", text: "自动保存" },
    { icon: "tone", text: "多种语气设定" },
    { icon: "batch", text: "批量生成", tip: "tip" },
    { icon: "more", text: "期待更多" },
  ],
};
const benefitsInfoList = [
  {
    id: 1,
    title: "普惠版会员权益",
    benefits: [
      { icon: "store-gold", text: "2万字数额度" },
      { icon: "workflow-gold", text: "文案续写" },
      { icon: "export-gold", text: "支持导出" },
      { icon: "document-gold", text: "文档管理" },
      { icon: "save-gold", text: "自动保存" },
      { icon: "setting-gold", text: "创造性配置" },
      { icon: "tone-gold", text: "多种语气设定" },
      { icon: "more-gold", text: "期待更多" },
    ],
  },
  {
    id: 2,
    title: "高级版会员权益",
    benefits: [
      { icon: "store-gold", text: "5万字数额度" },
      { icon: "len-gold", text: "长度配置" },
      { icon: "writing-gold", text: "步骤式写作" },
      { icon: "editor-gold", text: "模版编辑器" },
      { icon: "save-gold", text: "自动保存" },
      { icon: "tone-gold", text: "多种语气设定" },
      { icon: "rewrite-gold", text: "改写、扩写" },
      { icon: "more-gold", text: "期待更多" },
    ],
  },
  {
    id: 3,
    title: "专业版会员权益",
    benefits: [
      { icon: "store", text: "30万字数额度" },
      { icon: "list", text: "内容多输出" },
      { icon: "control", text: "模版编辑器" },
      { icon: "display", text: "支持5台设备" },
      { icon: "save", text: "自动保存" },
      { icon: "tone", text: "多种语气设定" },
      { icon: "batch", text: "批量生成", tip: "tip" },
      { icon: "more", text: "期待更多" },
    ],
  },
];
const activeBenefits = computed(() =>
  benefitsInfoList.find(i => i.id == activeId.value)
);
const activeColors = computed(
  () => colorMap.find(i => i.id == activeId.value).colors
);
const currentType = computed(() => priceList.find(i => i.id == activeId.value));
const currentPrice = computed(
  () => currentType.value.priceInfo.find(i => i.active).price
);
const choosePrice = priceId => {
  currentType.value.priceInfo.forEach(i => (i.active = false));
  currentType.value.priceInfo.find(i => i.id == priceId).active = true;
};

provide("activeColors", activeColors);
</script>

<style scoped lang="scss">
.billing-container {
  font-family: PingFangSC-Regular, PingFang SC;
  .price-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0.68rem 0.21rem 0.28rem;
    align-items: stretch;
    .price-list-item {
      position: relative;
      padding-bottom: 0.12rem;
      .item {
        height: 100%;
        box-sizing: border-box;
        margin: 0 0.11rem;
        width: 1.96rem;
        padding: 0.24rem 0 0.3rem;
        background: #f7f7f7;
        text-align: center;
        border-radius: 0.06rem;
        .price-wrap {
          color: v-bind("activeColors.priceTextColor");
        }
        .desc {
          background: v-bind("activeColors.priceDescBackground");
          color: v-bind("activeColors.priceDescColor");
        }
      }
      .item-active {
        background: v-bind("activeColors.activePriceItemBackground");
        .month {
          color: rgba(23, 23, 23, 0.8);
        }
        .desc {
          background: v-bind("activeColors.activePriceDescBack");
        }
      }
      .month {
        height: 0.48rem;
        line-height: 0.48rem;
        font-size: 0.26rem;
        font-weight: 600;
        color: #777;
        margin-bottom: 0.08rem;
      }
      .unit {
        font-size: 0.2rem;
      }
      .price {
        padding-left: 0.06rem;
        font-size: 0.48rem;
        font-weight: 600;
        line-height: 0.48rem;
      }
      .tag {
        width: -moz-fit-content;
        width: fit-content;
        position: absolute;
        top: -0.2rem;
        left: 0.23rem;
        height: 0.32rem;
        background: linear-gradient(315deg, #ff4800 0%, #ff9a1e 100%);
        border-radius: 0.04rem;
        line-height: 0.32rem;
        padding: 0 0.08rem;
        font-size: 0.18rem;
        color: #fff;
      }
      .desc {
        margin: 0.22rem auto 0;
        box-sizing: border-box;
        width: 1.6rem;
        border-radius: 0.04rem;
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.4rem;
        word-wrap: break-word;
      }
    }
  }
  .submit-btn {
    margin: 0 0.32rem;
    height: 0.94rem;
    line-height: 0.94rem;
    border-radius: 0.06rem;
    font-size: 0.32rem;
    font-weight: 500;
    color: v-bind("activeColors.payBtnTextColor");
    background: v-bind("activeColors.payBtnBackground");
    text-align: center;
  }
  .tip {
    font-size: 0.22rem;
    color: #777;
    line-height: 0.48rem;
    text-align: center;
    margin: 0.08rem 0 0.4rem;
  }
  .coupon {
    height: 0.56rem;
    background: #f7f7f7;
    border-radius: 0.06rem;
    margin: 0 0.32rem 0.4rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    justify-content: space-between;
    .coupon-icon {
      width: 0.24rem;
      height: 0.24rem;
      margin-right: 0.12rem;
    }
    .coupon-title {
      font-size: 0.26rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
      line-height: 0.36rem;
    }
    .coupon-lead-icon {
      width: 0.1rem;
      height: 0.19rem;
    }
  }
}
</style>
