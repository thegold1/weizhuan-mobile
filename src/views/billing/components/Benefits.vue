<template>
  <div class="benefits">
    <div class="benefits-title">
      <span class="label">{{ title }}</span>
      <div class="right">
        <span class="right-text">查看权益对比</span>
        <van-image class="icon" :src="arrowRight" />
      </div>
    </div>
    <div class="benefit-list">
      <div class="benefit-item" v-for="item of benefits">
        <van-image
          class="benefit-img"
          :src="getImageUrl(`icon/${item.icon}.png`)"
        ></van-image>
        <div class="text-wrap">
          <div class="benefit-text">{{ item.text }}</div>
          <van-image
            class="tip"
            v-if="item.tip"
            :src="getImageUrl(`icon/${item.tip}.png`)"
          ></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Benefits">
import { getImageUrl } from "@/utils";
import arrowRight from "@/assets/images/icon/arrow-right.png";
const { benefits, title } = defineProps({
  benefits: {
    type: Array,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
});
</script>

<style scoped lang="scss">
.benefits {
  padding-bottom: 0.44rem;
  .benefits-title {
    height: 0.48rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.32rem;
    background: #fff;
    font-weight: 500;
    .label {
      font-size: 0.28rem;
      color: #3d3d3d;
    }
    .right {
      display: flex;
      align-items: center;
      .right-text {
        font-size: 0.24rem;
        color: #7f7f7f;
      }
      .icon {
        width: 0.0725rem;
        height: 0.1159rem;
        margin-left: 0.12rem;
      }
    }
  }
  .benefit-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0.2rem 0.32rem 0;
    background: #f7f7f7;
    border-radius: 0.06rem;
    padding: 0.36rem 0.36rem 0;
  }
  .benefit-item {
    flex: 0 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.36rem;
    .benefit-img {
      background: linear-gradient(142deg, #636d86 0%, #282e40 100%);
      width: 0.64rem;
      height: 0.64rem;
      border-radius: 50%;
    }
    .text-wrap {
      position: relative;
    }
    .benefit-text {
      margin-top: 0.16rem;
      font-size: 0.24rem;
      font-weight: 500;
      color: rgba(61, 61, 61, 0.8);
      word-wrap: break-word;
      text-align: center;
    }
    .tip {
      position: absolute;
      right: -0.28rem;
      bottom: 0.04rem;
      width: 0.24rem;
      height: 0.24rem;
    }
  }
  .benefit-btn {
    width: fit-content;
    padding: 0 0.46rem 0 0.42rem;
    height: 0.64rem;
    line-height: 0.64rem;
    background: #00182e;
    border-radius: 0.04rem;
    margin-top: 0.04rem;
    color: #f7e1b4;
    font-size: 0.28rem;
    font-weight: 500;
    margin: 0 auto;
    display: block;
  }
  .benefit-btn:active:before {
    opacity: 0;
  }
}
</style>
