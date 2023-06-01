<template>
  <van-tabbar v-model="active" bind:change="onChange">
<!--    <van-tabbar-item icon="search" @click="getContent">-->
<!--      <span>续写</span>-->
<!--      <template #icon="props">-->
<!--        <van-icon-->
<!--            style="width:0.44rem; height: 0.44rem;"-->
<!--            badge="vip"-->
<!--            :badge-props="{ color: '#f1d165', offset: [ '0.1rem', '0rem' ] }"-->
<!--            :name="getImageUrl('icon/pen-icon.png')"-->
<!--        />-->
<!--      </template>-->
<!--    </van-tabbar-item>-->
    <van-tabbar-item icon="search" @click="getContent">重新生成</van-tabbar-item>
    <van-tabbar-item icon="setting-o" @click="handleClickSetting">更改设置</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>

import { getImageUrl } from "@/utils/index.js";
import { useRouter } from "vue-router";

const emits = defineEmits([ 'handleClickSetting' ])

const active = -1

const router = useRouter()

const handleClickSetting = () => {
  emits('handleClickSetting')
}

</script>
