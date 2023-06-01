<template>
  <div class="app-container">
<!--    <div class="header_swipe">-->
<!--      <van-swipe :autoplay="3000" lazy-render>-->
<!--        <van-swipe-item v-for="image in images" :key="image">-->
<!--          <img :src="image" />-->
<!--        </van-swipe-item>-->
<!--      </van-swipe>-->
<!--    </div>-->
    <div>
      <van-search v-model="searchValue" @input="search" placeholder="请输入搜索关键词" />
      <van-tabs v-model:active="active" @click-tab="onClickTab">
        <van-tab v-for="item in tabList" :title="item.name" :key="item.value">
        </van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <van-grid :gutter="10" :column-num="2">
        <van-grid-item v-for="item in currentList" @click="jump(item)">
          <img class="grid_icon" :src="item.url" alt="">
          <h5> {{ item.title }}</h5>
          <div class="message">
            {{ item.message }}
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script setup name="Home">
import { getCurrentInstance, ref } from 'vue';
import {
  images,
  allList,
  tabList,
} from './model'
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useModuleStore from '@/store/modules/module'
import { onMounted } from 'vue';
const { proxy } = getCurrentInstance();

let useModule = useModuleStore()
const router = useRouter()

let active = ref(0)

const searchValue = ref('')

onMounted(() => {
  const contentForm = {
    title: '',
    subTitle: '',
    keys: '',
    upDropBox1: '',
    upDropBox2: '',
    title3: '',
    downDropBox1: '',
    downDropBox2: '',
    title4: '',
    field: '',
    type: '',
    cardTitle: '',
    sycs: '',
    isUseCached: 1
  }
  useModule.contentForm = contentForm
  proxy.$cache.session.setJSON('contentForm', contentForm)
})
const currentList = computed(() => {
  return active.value ? allList.filter(item => item.field == active.value).filter(item => item.title.includes(searchValue.value)) : allList.filter(item => item.title.includes(searchValue.value))
})

const jump = (item) => {
  useModule.itemInfo = item
  localStorage.setItem('itemInfo', JSON.stringify(item))
  router.push({ path: '/module' })
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f1f2f4;

  .header_swipe {
    padding: .2rem;
    background: #fff;

    .van-swipe {
      width: 100%;
      height: 2.5rem;

      img {
        width: 100%;
        height: 2.5rem
      }
    }
  }

  .content {
    overflow-y: scroll;
    padding: .13rem 0;
    flex: 1;

    :deep(.van-grid-item__content.van-grid-item__content--center.van-grid-item__content--surround.van-hairline) {
      align-items: flex-start;
    }

    .grid_icon {
      width: .8rem;
      height: .8rem;
      margin-bottom: .1rem;
    }

    h5 {
      margin-bottom: .1rem;
    }

    .message {
      font-size: .2rem;
      color: #8b8d8d;
      margin-top: .1rem;
      line-height: .4rem;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

    }
  }
}
</style>
