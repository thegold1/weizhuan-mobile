<template>
  <div class="app-container">
    <div class="loginWrapper" v-if="isLoginPage">
      <top-title model-value="欢迎登录微撰" style="margin-bottom: .3rem" />
      <login-form />
    </div>
    <div class="registerWrapper" v-else>
      <top-title model-value="注册账号" style="margin-bottom: .3rem" />
      <register-form />
    </div>

<!--    <div class="register">-->
<!--      <a v-if="isLoginPage" href="javascript:;" @click.prevent="isLoginPage = false"> 邮箱注册 </a>-->
<!--      <p v-if="!isLoginPage">-->
<!--        <span>已有账号？ </span>-->
<!--        <a href="javascript:;" @click.prevent="isLoginPage = true"> 邮箱注册 </a>-->
<!--      </p>-->


<!--    </div>-->
  </div>
</template>

<script setup name="Login">
import LoginForm from "@/views/login/components/LoginForm.vue";
import RegisterForm from "@/views/login/components/RegisterForm.vue";
import TopTitle from "@/views/login/components/TopTitle.vue"
import { ref } from "vue";

const isLoginPage = ref(true);
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: .4rem;
  background-color: #fff;

  .loginWrapper {
    height: 70%;
  }

  .registerWrapper {
    height: 70%;
  }

  .register {

    a {
      color: $--color-primary;
    }

    span {
      color: rgba(0, 0, 0, 0.3);
    }

  }
}
</style>
