<template>
  <van-form v-if="isPhoneLogin" @submit="onSubmitPhone" style="width: 100%">
    <van-field
        v-model="loginPhoneForm.phone"
        name="validator"
        placeholder="手机号/邮箱"
        :rules="[{ validator, message: '请输入正确邮箱或手机号' }]"
    />
    <van-field
        v-model="loginPhoneForm.code"
        type="number"
        name="验证码"
        placeholder="验证码"
    >
      <template #button>
        <div style="width: 2.4rem;display: grid; grid-template-columns: 1fr 1fr; gap: 0.2rem; align-items: center">
          <p class="line"></p>
          <p style="width: 2.2rem" v-if="isCountingDown">{{ remainingSeconds }} 秒后重新发送</p>
          <p style="width: 1.4rem" :class="{ 'is-allow': validResult }" v-else @click="sendVerificationCode">发送验证码</p>
        </div>
      </template>
    </van-field>
    <div style="margin: 16px;">
      <div class="text">
        <div class="top">未注册手机验证后自动登录，登录即代表同意</div>
        <div class="down">
          <a href="javascript:;" @click.prevent="handleClickUserAgreement">《微撰用户协议》</a>
          <span>及</span>
          <a href="javascript:;" @click.prevent="handleClickDisclaimerStatement">《微撰协议免责声明》</a>
        </div>
      </div>
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
  <van-form v-else @submit="onSubmitEmail" style="width: 100%">
    <van-field
        v-model="loginEmailForm.email"
        name="邮箱"
        placeholder="邮箱"
    />
    <van-field
        v-model="loginPhoneForm.password"
        :type="isViewPassword ? 'text' : 'password'"
        name="密码"
        placeholder="密码"
        :right-icon="passwordIcon"
        @click-right-icon="togglePasswordIcon"
    >
    </van-field>
    <div style="margin: 16px;">
      <div class="forgetPassword">
        <a href="javascript:;" @click.prevent="loginPhoneForm.phone = ''">忘记密码</a>
      </div>
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>
<!--  <div class="loginTypeBtn" @click="isPhoneLogin = !isPhoneLogin">{{ loginType }}</div>-->

</template>

<script setup name="LoginForm">
import { computed, reactive, toRefs, getCurrentInstance, } from "vue";
import { useCountdownTimer } from "@/hooks/index.js";
import { emailLogin, getCaptcha } from "@/api/login.js";
import useUserStore from "@/store/modules/user.js";

const userStore = useUserStore();

const { proxy } = getCurrentInstance();

const state = reactive({
  loginPhoneForm: {
    phone: '',
    code: ''
  },
  loginEmailForm: {},
  isPhoneLogin: true,
  isViewPassword: false,
});

const patternPhone = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;

const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const { loginPhoneForm, loginEmailForm, isPhoneLogin, isViewPassword } = toRefs(state);

const loginType = computed(() => isPhoneLogin.value ? '邮箱登录' : '手机登录');

const passwordIcon = computed(() => isViewPassword.value ? 'eye-o' : 'closed-eye');

const validResult = computed(() => validator(loginPhoneForm.value.phone));

function validator (val) {
  return patternPhone.test(val) || patternEmail.test(val);
}

const onSubmitPhone = async () => {
  const { data, code, msg } = await emailLogin(loginPhoneForm.value);
  if (code === 1) {
    userStore.setUserInfo(data);
    proxy.$cache.local.setJSON('userInfo', data);
    await proxy.$router.replace({ path: proxy.$route.query.redirect || '/index' });
    proxy.$modal.msgSuccess('登录成功');
  } else {
    proxy.$modal.msgError(msg);
  }
  stopCountdown();
};

const onSubmitEmail = () => {
  console.log(loginEmailForm.value);
};

const togglePasswordIcon = () => {
  isViewPassword.value = !isViewPassword.value;
};

const countdownSeconds = 60;

const { isCountingDown, remainingSeconds, startCountdown, stopCountdown } = useCountdownTimer(
    countdownSeconds,
    (remainingSeconds) => {
    },
    () => {
    }
);

const sendVerificationCode = async () => {
  // 发送验证码的逻辑...
  if (!validResult.value) return;
  await getCaptcha(loginPhoneForm.value)

  // 开始倒计时
  startCountdown();
};

const handleClickDisclaimerStatement = () => {
  proxy.$router.push({
    path: '/disclaimer-statement'
  })
}

const handleClickUserAgreement = () => {
  proxy.$router.push({
    path: '/user-agreement'
  })
}

</script>

<style lang="scss" scoped>
@import "../styles/login-form.module.scss";

.is-allow {
  color: $--color-primary;
}
</style>
