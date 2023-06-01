<template>
  <div class="container">
    <InfoTop :count="content.length" :shareShow="false" @handle-copy-content="handleCopyContent">
    </InfoTop>
    <h3>{{ route.query.title }}</h3>
    <van-loading color="#1989fa" v-show="loading" />
    <div class="content" v-html="content" id="content" v-show="!loading">

    </div>
    <van-tabbar active="{{ active }}" bind:change="onChange">
      <van-tabbar-item icon="search" @click="getContent">重新生成</van-tabbar-item>
      <van-tabbar-item icon="setting-o" @click="router.replace({ path: '/module' })">更改设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script setup name="Content">
import { onMounted } from 'vue';
import { getCurrentInstance } from 'vue';
import { onUnmounted } from 'vue';
import InfoTop from '../document/components/InfoTop.vue';
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { uploadContent } from "@/api/module.js";
import useUserStore from "@/store/modules/user.js";
import { useCopyText } from "@/hooks/index.js";
import useUser from "@/store/modules/user";

const { userInfo } = useUser();



const { copyText } = useCopyText();

const userStore = useUserStore();

let content = ref('')

const route = useRoute()

const router = useRouter()

const { proxy } = getCurrentInstance()

onMounted(() => {
  route.query.res && getContent()
})

onUnmounted(() => {
  clearInterval(timer)
})

const loading = ref(false)

let timer = null

const getContent = () => {
  timer = null
  loading.value = true
  content.value = ''

  var source = new EventSource("https://u69362-8cae-937a2b8b.neimeng.seetacloud.com:6443/chatgpt-clone?question=" + route.query.res)
  let count = 0

  let allContent = []
  source.onmessage = async function (event) {
    if (event.data == '[DONE]') {
      console.log('进来了', { content: content.value, lastContent: allContent[allContent.length - 1] })
      source.close()
      const contentForm = proxy.$cache.session.getJSON('contentForm')
      contentForm.content = allContent[allContent.length - 1];
      let res = await uploadContent(contentForm);
      userInfo.monthCanUseContentLen = JSON.parse(res).user.monthCanUseContentLen
      userInfo.monthUsedContentLen = JSON.parse(res).user.monthUsedContentLen
      proxy.$cache.local.setJSON('userInfo', userInfo);
    } else {
      let i = 0
      loading.value = false
      // todo 不断取event.data更新到卡片上
      // content.value = event.data
      if (document.getElementById('content')) {
        let ele = document.getElementById('content')
        allContent.push(event.data)
        if (timer) {
          count++
          clearInterval(timer)
          timer = setInterval(() => {
            i++
            if (i > allContent[count].replace(content.value, "").length) {
              clearInterval(timer)
            }
            if (allContent[count].replace(content.value, "").slice(0, i).includes('<')) {
              if (allContent[count].replace(content.value, "").length < i + 5) {
                return clearInterval(timer)
              } else {
                i += 5
              }
            }
            content.value += allContent[count].replace(content.value, "").slice(0, i)
            ele.scrollTop = ele.scrollHeight

          }, 40)

        } else {
          timer = setInterval(() => {
            i++
            if (i > allContent[count].length) {
              clearInterval(timer)
            }
            if (allContent[count].slice(0, i).includes('<')) {
              if (allContent[count].length < i + 5) {
                return clearInterval(timer)
              } else {
                i += 5
              }
            }
            content.value = allContent[count].slice(0, i)

          })
        }
      }


    }
  }
}
const handleCopyContent = () => {
  copyText(content.value.replace(/<br \/>/g, "\n"))
  proxy.$modal.msgSuccess('复制成功')
}


</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0;
}

.container {
  padding: .3rem;
  height: calc(100% - 1rem);
  display: flex;
  flex-direction: column;

  .fontNum {
    color: #a2abbb;
    margin-bottom: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      font-size: .4rem;
    }
  }

  h3 {
    margin-bottom: .2rem;
  }

  .content {
    line-height: .5rem;
    flex: 1;
    overflow-y: scroll;
  }
}

.van-tabbar-item--active {
  color: #000;
}
</style>
