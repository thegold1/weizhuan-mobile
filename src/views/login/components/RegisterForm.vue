<template>
  <van-form @submit="onSubmit" style="width: 100%">
    <van-field
        v-model.number="registerForm.email"
        name="邮箱"
        placeholder="邮箱"
    />
    <van-field
        v-model="registerForm.captcha"
        type="number"
        name="验证码"
        placeholder="验证码"
    >
      <template #button>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.2rem; align-items: center">
          <p class="line"></p>
          <p style="width: 2.1rem" v-if="isCountingDown">{{ remainingSeconds }} 秒后重新发送</p>
          <p style="width: 1.4rem" v-else @click="sendVerificationCode">发送验证码</p>
        </div>
      </template>
    </van-field>
    <div style="margin: 16px;">
      <div class="text">
        <div class="top">注册即代表同意</div>
        <div class="down">
          <a href="javascript:;" @click.prevent="registerForm.phone = ''">《微撰服务条款》</a>
          <span>及</span>
          <a href="javascript:;" @click.prevent="registerForm.captcha = ''">《微撰协议免责声明》</a>
        </div>
      </div>
      <van-button round block type="primary" native-type="submit">
        下一步
      </van-button>
    </div>
  </van-form>
</template>

<script setup name="RegisterForm">
import { reactive } from "vue";
import { useCountdownTimer } from "@/hooks/index.js";

const registerForm = reactive({});

const countdownSeconds = 60;

const { isCountingDown, remainingSeconds, startCountdown } = useCountdownTimer(
    countdownSeconds,
    (remainingSeconds) => {
      console.log(`剩余 ${remainingSeconds} 秒`);
    },
    () => {
      console.log('倒计时结束');
    }
);

const sendVerificationCode = () => {
  // 发送验证码的逻辑...
  console.log(`向 发送验证码`);

  // 开始倒计时
  startCountdown();
};

</script>

<style lang="scss" scoped>
@import "../styles/login-form.module.scss";
</style>
