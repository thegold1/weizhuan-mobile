<template>
  <div class="info-wrapper">
    <van-cell title="头像">
      <template #value>
        <van-image class="avatar" :src="isLogin ? defAva : user"></van-image>
      </template>
    </van-cell>
    <van-cell
      title="昵称"
      :value="
        isLogin ? `用户ID：${userInfo.uid ?? ''}` : `hei! ${VITE_APP_TITLE}`
      "
    >
    </van-cell>
    <van-button type="primary" @click="logout()">退出登录</van-button>
  </div>
</template>

<script setup name="info">
import useUserStore from "@/store/modules/user";
import defAva from "@/assets/images/profile.jpg";
import user from "@/assets/images/user.png";
import { isEmpty } from "lodash-es";

const { userInfo, logout } = useUserStore();
const { VITE_APP_TITLE } = import.meta.env;
const isLogin = !isEmpty(userInfo);
console.log(userInfo);
</script>

<style scoped lang="scss">
$height: 1rem;
.info-wrapper {
  background-color: #f3f4f8;
  min-height: 100%;
  position: relative;
  .van-cell {
    height: $height;
    :deep(.van-cell__title) {
      line-height: calc($height - 20px);
    }
  }
  .avatar {
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 0.12rem;
  }
  .van-button {
    position: absolute;
    left: 0.4rem;
    right: 0.4rem;
    bottom: 0.3rem;
    border-radius: 0.4rem;
  }
}
</style>
