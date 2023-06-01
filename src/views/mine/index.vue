<template>
  <div class="mine-container">
    <div class="main-top">
      <div class="user-Info" @click="isLogin ? router.push('/info') : void 0">
        <van-image class="avatar" :src="isLogin ? defAva : user" />
        <div class="info">
          <div>
            <div class="name">
              {{
                isLogin
                ? `用户ID：${userInfo.uid ?? ""}`
                : `hei! ${VITE_APP_TITLE}`
              }}
            </div>
            <div class="expire-time">
              {{
                isLogin
                ? userInfo.isVip != "1"
                  ? isNil(userInfo.vipExpireTime)
                    ? "立即付费, 额外赠送7天"
                    : `${typeMap[+userInfo.vipType]}已过期${Math.floor(
                      (new Date() - new Date(userInfo.vipExpireTime)) /
                      86400000
                    )}天`
                  : `vip到期时间: ${parseTime(
                    userInfo.vipExpireTime,
                    "{y}-{m}-{d}"
                  )}`
                : "登录享受更多服务"
              }}
            </div>
          </div>
          <div v-if="!isLogin" class="login-btn" @click="router.replace('/login')">
            注册/登录
          </div>
        </div>
      </div>
      <div class="member-wrap" v-if="isLogin">
        <div class="member-top">
          <div class="member-title" :style="userInfo.vipType == '3' ? { color: '#c7deff' } : void 0">
            {{
              isVipExpired
              ? `您的${typeMap[userInfo.vipType]}会员已过期`
              : userInfo.vipType == "0"
                ? "您还不是会员"
                : `个人${typeMap[userInfo.vipType] ?? ""}VIP`
            }}
          </div>
          <CustomProgress class="progress" :vip-type="isVipExpired ? '0' : userInfo.vipType"
            :usedContent="+userInfo.monthUsedContentLen" :totalContent="+userInfo.monthCanUseContentLen" />
          <div :class="`word${isVipExpired ? 0 : userInfo.vipType}`">
            <span class="used">{{
              formatAmount(userInfo.monthUsedContentLen)
            }}</span>
            <span class="total">{{
              `/${formatAmount(userInfo.monthCanUseContentLen)} 字`
            }}</span>
          </div>
        </div>
        <div class="member-bottom">
          <div>
            <van-image class="left-icon" :src="userInfo.vipType == '3' ? getImageUrl('member4.png') : member
                "></van-image>
            <span>我的会员</span>
          </div>
          <!-- <div class="right" v-if="userInfo.vipType !== '3'" @click="toBilling()">
            <span>解锁更多权益</span>
            <van-image class="right-icon" :src="arrowRight"></van-image>
          </div> -->
        </div>
      </div>
      <div v-if="userInfo.isVip == '0'" class="benefits">
        <div class="benefits-title">升级会员享受权益</div>
        <div class="benefit-list">
          <div class="benefit-item" v-for="item of benefitList">
            <van-image class="benefit-img" :src="getImageUrl(`icon/${item.icon}.png`)"></van-image>
            <div class="text-wrap">
              <div class="benefit-text">{{ item.text }}</div>
              <van-image class="tip" v-if="item.tip" :src="getImageUrl(`icon/${item.tip}.png`)"></van-image>
            </div>
          </div>
        </div>
        <van-button class="benefit-btn" :icon="getImageUrl(`icon/crown.png`)" type="primary"
          @click="toBilling()">立即升级</van-button>
      </div>
    </div>
    <div class="lead-wrap">
      <van-cell title="常见问题" is-link />
      <van-cell title="电脑网页版" @click="copyText('weizhuan6.com')">
        <template #value>
          <div class="website">weizhuan6.com</div>
        </template>
      </van-cell>
      <!-- <van-cell v-if="isLogin" title="礼品码" is-link /> -->
      <van-cell title="版权说明" @click="router.push('/copyright')" is-link />
      <van-cell title="关于我们" @click="router.push('/about')" is-link />
    </div>
  </div>
</template>

<script setup name="Mine">
import { reactive, computed, getCurrentInstance } from "vue";
import { isEmpty, isNil } from "lodash-es";
import CustomProgress from "./components/Progress.vue";
import useUser from "@/store/modules/user";
import defAva from "@/assets/images/profile.jpg";
import user from "@/assets/images/user.png";
import member from "@/assets/images/icon/member.png";
import arrowRight from "@/assets/images/icon/arrow-right.png";
import { formatAmount, getImageUrl } from "@/utils";
import { useRouter } from "vue-router";
import { parseTime } from "@/utils";
import { watch } from "vue";
import { useCopyText } from "@/hooks/index.js";

const { proxy } = getCurrentInstance();

const { VITE_APP_TITLE } = import.meta.env;
const router = useRouter();
const { userInfo } = useUser();
const isLogin = !isEmpty(userInfo);
const { copied, copyText } = useCopyText();
const vipMap = {
  1: "初级",
  2: "中级",
  3: "高级",
};
const typeMap = {
  1: "普惠版",
  2: "高级版",
  3: "专业版",
};
const benefitList = reactive([
  { icon: "store", text: "30万字数额度" },
  { icon: "list", text: "内容多输出" },
  { icon: "control", text: "模版编辑器" },
  { icon: "display", text: "支持5台设备" },
  { icon: "save", text: "自动保存" },
  { icon: "tone", text: "多种语气设定" },
  { icon: "batch", text: "批量生成", tip: "tip" },
  { icon: "more", text: "期待更多" },
]);
const vipCardColorMap = [
  {
    cardBack: "linear-gradient(270deg, #eeeff5 0%, #dadce4 100%)",
    cardBottom: "#dee08",
    bottomText: "#192b38",
  },
  {
    cardBack: "linear-gradient(270deg,#F3D5C7 0%,#DBA384 100%)",
    cardBottom: "#EAC3AF",
    bottomText: "#192b38",
  },
  {
    cardBack: "linear-gradient(229deg,#F7E0AF 0%,#F4CA84 100%)",
    cardBottom: "#F5D294",
    bottomText: "#192b38",
  },
  {
    cardBack: "linear-gradient(229deg,#36365C 0%,#161A34 100%)",
    cardBottom: "#252747",
    bottomText: "#e6cbbb",
  },
];

const isVipExpired = computed(
  () =>
    userInfo.isVip == "0" && new Date() - new Date(userInfo.vipExpireTime) > 0
);
window.isVipExpired = isVipExpired;
const vipCardColor = computed(() => {
  return (
    (isVipExpired.value
      ? vipCardColorMap[0]
      : vipCardColorMap[+userInfo.vipType]) ?? {}
  );
});
const toBilling = () => router.push("/billing");

watch(
  () => copied.value,
  value => {
    if (value) {
      proxy.$modal.msgSuccess("复制成功");
    }
  }
);
</script>
<style lang="scss" scoped>
.mine-container {
  background: #f2f3f5;
  min-height: 100%;
}

.main-top {
  padding: 0 0.32rem 0.4rem;
  background: #ffffff;
  font-family: PingFangSC-Regular, PingFang SC;

  .user-Info {
    display: flex;
    align-items: center;
    width: 100%;
    padding-top: 0.26rem;

    .avatar {
      flex: 0 0.8rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.12rem;
    }

    .info {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .name {
        max-width: 4.8rem;
        font-size: 0.3rem;
        font-weight: 600;
        color: #191919;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .expire-time {
        margin-top: 0.04rem;
        font-size: 0.22rem;
        color: rgba(0, 27, 52, 0.5);
        height: 0.32rem;
      }

      .login-btn {
        height: 0.56rem;
        line-height: 0.56rem;
        background: #00182e;
        border-radius: 0.04rem;
        padding: 0 0.42rem;
        font-size: 0.26rem;
        font-weight: 500;
        color: #fff;
        margin: 0;
      }
    }
  }

  .member-wrap {
    // background: linear-gradient(270deg, #eeeff5 0%, #dadce4 100%);
    background: v-bind("vipCardColor.cardBack");
    border-radius: 0.16rem;
    overflow: hidden;
    position: relative;
    margin: 0.28rem 0 0;

    .member-top {
      padding: 0.4rem 0 0.22rem 0.4rem;

      .member-title {
        height: 0.48rem;
        line-height: 0.48rem;
        font-size: 0.22rem;
        color: rgba(0, 24, 46, 0.5);
        margin-bottom: 0.44rem;
      }

      .progress {
        width: 3.8rem;
        height: 0.0399rem;
      }

      .word0 {
        color: rgba(0, 24, 46, 0.6);

        .total {
          color: #2e4154;
        }
      }

      .word1 {
        color: rgba(119, 53, 41, 0.65);

        .total {
          color: #925447;
        }
      }

      .word2 {
        color: rgba(119, 53, 41, 0.65);

        .total {
          color: #94621b;
        }
      }

      .word3 {
        color: #c7deff;
      }

      .used {
        font-size: 0.26rem;
        line-height: 0.36rem;
        font-weight: 600;
        // color: rgba(0, 24, 46, 0.6);
      }

      .total {
        font-size: 0.2rem;
        line-height: 0.36rem;
        // color: #2e4154;
      }
    }

    .member-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.4rem;
      height: 0.88rem;
      line-height: 0.88rem;
      font-size: 0.26rem;
      font-weight: 500;
      // background: #dee0e8;
      background: v-bind("vipCardColor.cardBottom");
      color: v-bind("vipCardColor.bottomText");

      .left-icon {
        width: 0.24rem;
        height: 0.18rem;
        margin-right: 0.12rem;
      }

      .right {
        font-size: 0.24rem;
        font-weight: 400;
        display: flex;
        align-items: center;
      }

      .right-icon {
        width: 0.1rem;
        height: 0.16rem;
        margin-left: 0.14rem;
      }
    }
  }

  .benefits {
    padding-top: 0.4rem;

    .benefits-title {
      line-height: 0.48rem;
      font-size: 0.3rem;
      font-weight: 600;
      color: #3d3d3d;
      margin-bottom: 0.24rem;
    }

    .benefit-list {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
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
}

.lead-wrap {
  padding-bottom: 1.5rem;

  .van-cell {
    padding-top: 0.28rem;
    padding-bottom: 0.28rem;
    margin-top: 0.06rem;
  }

  .van-cell--clickable:active {
    background-color: var(--van-cell-background);
  }

  .website {
    width: fit-content;
    float: right;
    height: 0.48rem;
    line-height: 0.48rem;
    background: rgba(229, 229, 229, 0.5);
    border-radius: 0.04rem;
    padding: 0 0.3rem;
    color: #7f7f7f;
    font-size: 0.24rem;
    font-weight: 500;
  }
}
</style>
