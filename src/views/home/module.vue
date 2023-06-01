<template>
  <van-notice-bar color="#79798a" background="#f2f3f5">
    不知道该写点什么？试试这个 👉
    <div class="example" @click="fillForm">{{ iteminfo.example }}</div>
  </van-notice-bar>
  <div class="container">

    <div class="cardtop" @click="router.push('/index')">
      <img class="card_iconclass" :src="iteminfo.url" alt="" />
      <div class="topInfo">
        <div class="card_name">{{ iteminfo.title }}</div>
        <div class="card_desc">{{ iteminfo.message }}</div>
      </div>
    </div>
    <div class="main">
      <div class="main_body">
        <div class="content">
          <div v-for="item in iteminfo.formList">
            <div class="input_op" v-if="item.elementType == 'input_op'">
              <div class="input_label">
                <div class="label">{{ item.label }}</div>
                <div class="length">{{ useModule.contentForm[item.value] && useModule.contentForm[item.value].length }}/100</div>
              </div>
              <van-cell-group inset>
                <van-field v-model="useModule.contentForm[item.value]" :placeholder="item.placeholder" />
              </van-cell-group>
            </div>
            <div class="keys_op" v-if="item.elementType == 'keys_op'">
              <div class="input_label">
                <div class="label">{{ item.label }}</div>
                <div class="length">{{ taglength }}/6</div>
              </div>
              <van-cell-group inset>
                <van-field v-model="useModule.contentForm[item.value]" rows="4" autosize type="textarea"
                  :placeholder="item.placeholder" />
              </van-cell-group>

            </div>
            <div class="select_op" v-if="item.elementType == 'select_op'">
              <div class="attem_title">{{ item.label }}</div>
              <div class="attem_list">
                <div class="attem_item"
                  :style="{ 'background': useModule.contentForm[item.value] == list ? '#e5f3ff' : '#fff', 'color': useModule.contentForm[item.value] == list ? '#4a85ff' : '#000' }"
                  @click="useModule.contentForm[item.value] = list" v-for="(list, index) in item.attempt" :key="index">
                  {{ list }}
                </div>
              </div>
            </div>
            <div class="area_op" v-if="item.elementType == 'area_op'">
              <div class="input_label">
                <div class="label">{{ item.label }}</div>
                <div class="length">{{ useModule.contentForm[item.value] && useModule.contentForm[item.value].length }}/2000</div>
              </div>
              <van-cell-group inset>
                <van-field v-model="useModule.contentForm[item.value]" rows="10" autosize type="textarea" maxlength="2000"
                  :placeholder="item.placeholder" show-word-limit />
              </van-cell-group>
            </div>
          </div>
        </div>
        <div class="clear" @click="clear">
          <van-icon name="delete-o" />清空录入
        </div>
      </div>
      <div class="footer">
        <van-divider />
        <van-button type="primary" @click="generatedContent">生成内容</van-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { makeTitle } from "@/api/module.js";
import { ref, reactive, getCurrentInstance } from 'vue';
import useModuleStore from '@/store/modules/module';
import useUserStore from "@/store/modules/user.js";
import { decryptData, encryptData } from "@/utils/index.js";
import { computed } from 'vue';

const { proxy } = getCurrentInstance();

const route = useRoute()

const router = useRouter()

const useModule = useModuleStore();

const { userInfo } = useUserStore();

let sycs = ref(decryptData(proxy.$cache.local.getJSON('sycs')))

let iteminfo = reactive(JSON.parse(localStorage.getItem('itemInfo')))

let mainData = reactive({
  contentForm: useModule.contentForm
})
useModule.contentForm = proxy.$cache.session.getJSON('contentForm')
useModule.contentForm.field = iteminfo.field

useModule.contentForm.type = iteminfo.type

useModule.contentForm.cardTitle = iteminfo.title

useModule.contentForm.sycs = sycs.value


let tags = reactive([])

let value = ref('')

const clear = () => {
  useModule.contentForm = {
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
  proxy.$cache.session.setJSON('contentForm', useModule.contentForm)
}
const taglength = computed(() => {
  let arr1 = useModule.contentForm.keys.split(',')
  arr1.forEach((item, index) => {
    if (!item) {
      arr1.splice(index, 1)
    }
  })
  return arr1.length
})

const generatedContent = async () => {
  iteminfo.formList[0].value !== 'title' && fillForm()
  if (!userInfo.uid) {
    if (sycs.value > 0) {
      return proxy.$modal.showConfirm({ title: '前往登录', message: '当前已无试用次数，请前往登录' })
        .then(() => {
          proxy.$router.replace({ path: '/login' });
        })
        .catch(() => {
          console.log('取消');
        });
    }
  }
  let res = await makeTitle(useModule.contentForm);
  if (!res) return proxy.$modal.msgError('内容不可为空')
  if (res === '401') {
    proxy.$modal.msgError('系统错误')
  } else if (res === '0') {
    proxy.$modal.msgError('请输入标题')
  } else if (res === '101') {
    proxy.$modal.msgError('普通用户每个月只能体验5000字')
  } else if (res === '102') {
    proxy.$modal.msgError('VIP用户每个月只能体验50000字')
  } else {
    sycs.value = sycs.value + 1;
    console.log('-=-', sycs.value)
    proxy.$cache.local.setJSON('sycs', encryptData(sycs.value));
    proxy.$cache.session.setJSON('contentForm', useModule.contentForm);
    router.push({ path: '/content', query: { res, title: useModule.contentForm.title ? useModule.contentForm.title : useModule.contentForm.cardTitle } })
  }
}

const fillForm = () => {
  for (const key in iteminfo.fill) {
    useModule.contentForm[key] = iteminfo.fill[key]
  }
}

</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0;
}

.example {
  color: #0085ff;
  width: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

:deep(.van-notice-bar__content) {
  display: flex;
}

.container {
  width: 100%;
  height: 100%;

  padding: .2rem;

  button.van-button.van-button--primary.van-button--normal {
    width: 80vw;
    border-radius: 1rem;
  }

  .cardtop {
    display: flex;
    align-items: center;

    img {
      margin-right: .2rem;
    }

    .topInfo {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 0.9rem;

      .card_name {
        font-weight: 700;
        font-size: .3rem;
      }

      .card_desc {
        color: #9494aa;
        font-size: .2rem;
        width: 5.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }


  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: calc(100% - 2.8rem);
    overflow: scroll;

    .main_body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .clear {
        align-self: center;
        color: #9d9e9d;
        margin-top: 1vh;
      }

      .input_label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 1vh 0;


        .length {
          font-size: .2rem;
          color: #c0b3ce;
        }
      }

      .content {

        .input_op {
          margin: 2vh 0;



          :deep(.van-cell-group.van-cell-group--inset) {
            border: 1px solid #f3f3f3;
            margin: 0;

            .van-field {
              background: #f7f8fa;
            }

          }

        }

        .select_op,
        .attempt_op {
          .attem_list {
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            margin-top: 10px;
            width: 100%;
          }

          .attem_title {
            font-size: 14px;
            margin-top: 20px;
          }

          .attem_item {
            background: #fff;
            border-radius: 11px;
            border: 1px solid #eceff6;
            /* border: 1px solid rgba(214, 214, 214, 0.3); */
            font-size: 13px;
            color: #4b5563;
            padding: 5px 20px;
            margin-right: 12px;
            cursor: pointer;
            margin-bottom: 8px;
          }
        }

        .keys_op {
          :deep(.van-cell-group.van-cell-group--inset) {
            border: 1px solid #f3f3f3;
            margin: 0;

            .van-field {
              background: #f7f8fa;
            }

          }

          .muli-tags {
            position: relative;
            padding: 10px 10px 10px 10px;
            /* padding: 5px 10px; */
            display: block;
            min-width: 100%;
            max-width: 100%;
            background: #f7f8fa;
            border-radius: .06rem;
            min-height: 1rem;
            border: 1px solid #f3f3f3 !important;


          }

          .muli-tags input {
            background: transparent;
            border: none;
            font-size: 15px;
          }

          .muli-tags .btn {
            margin: 0 5px 3px 0;
            padding: 4px 5px;
            background: #e7edff;
            border: none;
            color: #4880ff;
          }


        }

        .area_op {
          :deep(.van-cell-group.van-cell-group--inset) {
            margin: 0;
            border: 1px solid #f3f3f3;

            .van-field {
              background: #f7f8fa;
            }

          }
        }
      }
    }

    .footer {
      align-self: center;
      position: fixed;
      bottom: .2rem;
    }
  }

}
</style>
