<template>
  <div class="container">
    <div style="display: flex;">
      <van-icon name="chat-o" style="font-size: .4rem;" @click="mainData.showHistory = true" />
      <div class="header"> {{ mainData.title }}</div>
    </div>
    <div class="content" id="content" @click="isAsking = false">

      <div class="desc" v-show="!mainData.currentSessionList.length">
        <div class="title">你好,</div>
        <div class="title">我是微撰 ERNIE Bot</div>
        <p class="intro">作为一个人工智能语言模型，我可以回答你的问题，为你提供有用信息，帮助你完成创作。</p>
        <div class="tip">
          <p>友情提示:</p>
          <p>
            擅长中文，也会英文，其他语言正在学习;请遵循测试规则，我可能无法回答不合适的问题，我正在持续学习成长中，希望获得你的反馈，这将有助于我变得更好。
          </p>
        </div>
      </div>
      <div v-for="(item, index) in mainData.currentSessionList" :key="index">
        <div style="display: flex;margin-bottom: .2rem; align-items: center;justify-content: flex-end;">
          <div class="session_content">{{ item.title }}</div>
        </div>
        <div style="display: flex;margin-bottom:.2rem;    align-items:center;">
          <div class=" answer" style="display: flex;background: #fff;align-items: center;" v-html="item.content"
            v-show="!mainData.isProducting || index !== mainData.currentSessionList.length - 1">

          </div>
          <div class=" answer" v-show="mainData.isProducting && index == mainData.currentSessionList.length - 1">
            <div class="dot1"> </div>
            <div class="dot2"></div>
            <div class="dot3"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="keyWord">
      <img src="../../assets/images/key.png" alt="" @click="mainData.showKey = true">
      <div class="key_ask" @click="question = '怎么组织跨部门项目的会议?'">
        怎么组织跨部门项目的会议?
      </div>
      <div class="key_ask key_ask2 " @click="question = '为什么总是先看见闪电?'">
        为什么总是先看见闪电?
      </div>
    </div>
    <div v-show="!isAsking" class="question">
      <div class="ask_content" @click="showAsk">{{ question ? question : '有问题尽管问我~' }}</div>
      <div class="send_border" @click="sendQuestion">
        <van-icon name="guide-o" />
      </div>
    </div>

    <div class="session" v-show="isAsking">
      <van-cell-group>
        <van-field v-model="question" auto-focus="true" ref="ask" type="textarea" rows="3" />
      </van-cell-group>
      <div class="send">
        <div class="send_border" @click="sendQuestion">
          <van-icon name="guide-o" />
        </div>
      </div>
    </div>
    <!-- 弹窗key -->
    <van-popup class="popup" v-model:show="mainData.showKey" round position="bottom" :lock-scroll="false"
      :style="{ height: '80%' }">
      <h5>请选择以下话题，快速与我对话</h5>
      <div v-for="item in mainData.keyWordClassify">
        <div class="title">{{ item.title }}</div>
        <div class="content">
          <div class="content_list">
            <div v-for="list in item.dataList" class="item_content" @click="selectKey(list.key)">
              <div>
                {{ list.key }}
              </div>
              <div><van-icon style=" color: #d6dcea;" name="checked" /></div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model:show="mainData.showHistory" position="left" :lock-scroll="false"
      :style="{ width: '80%', height: '100%', background: '#0d0d0d' }">
      <div class="history_main">
        <div class="history_title">
          <div> 历史记忆</div>
          <van-icon name="delete-o" />
        </div>
        <div class="history_content">

          <div class="history_list">
            <div class="history_item"
              :style="{ 'background': mainData.currentTid == item.tid ? 'rgba(234,234,237,0.26)' : '#1b1c20' }"
              v-for="item in   mainData.historyData  " @click='chooseItemHistory(item)'>
              <div>{{ item.title }}</div>
            </div>
          </div>
        </div>
        <div class="history_footer" @click="addSession(true)">
          <van-icon name="plus" />
          新建AI对话
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script setup name="AiChat">
import { reactive } from 'vue';
import { getCurrentInstance } from 'vue';
import { chatHistory, makeChatTitle, uploadChatContent } from "@/api/aichat.js";
import { ref } from 'vue'
import useUserStore from "@/store/modules/user.js";
import { onMounted } from 'vue';
import { decryptData, encryptData } from "@/utils/index.js";

const { proxy } = getCurrentInstance()

const question = ref('')

const { userInfo } = useUserStore();

let sycs = ref(decryptData(proxy.$cache.local.getJSON('sycs')))

const isAsking = ref(false)

const ask = ref()

const showAsk = () => {
  isAsking.value = true
  proxy.$nextTick(() => {
    ask.value.focus()
    proxy.$forceUpdate()
  })
}

onMounted(() => {
  addSession(true)
  init()
})

const init = async () => {
  const res = await chatHistory();
  mainData.historyData = res ? JSON.parse(res).qaBeans : []
  console.log(mainData.historyData);
}

const selectKey = (key) => {
  question.value = key
  mainData.showKey = false
}

const chooseItemHistory = (item) => {
  if (mainData.isPosting) {
    return proxy.$modal.msgError('正在生成中，请稍候切换');
  }
  item.data.forEach(list => {
    list.content = list.content.replace(/\n/g, '<br/>')
  })
  mainData.currentTid = item.tid
  mainData.title = item.title
  mainData.currentSessionList = item.data
  mainData.showHistory = false
}

const sendQuestion = () => {

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
  sycs.value = sycs.value + 1;
  proxy.$cache.local.setJSON('sycs', encryptData(sycs.value));
  if (mainData.isPosting) {
    return proxy.$modal.msgError('正在生成中，请稍候提问');
  }
  if (!question.value) {
    return proxy.$modal.msgError('请输入问题');
  }
  mainData.isExample = false
  isAsking.value = false
  mainData.historyData.forEach(item => {
    if (item.tid == mainData.currentTid) {
      item.data.push(
        { "content": '', "title": question.value }
      )
      mainData.currentSessionList = item.data
    }
  });
  if (!mainData.historyData.filter(item => item.tid == mainData.currentTid).length) {
    mainData.historyData.push({
      data: [{ "content": "", "title": question.value }
      ],
      "tid": mainData.currentTid,
      "title": question.value
    })
    mainData.currentSessionList = [{ "content": "", "title": question.value }]
  }

  getAnswer()
}

const getAnswer = async () => {
  let answer = document.getElementById('content')
  proxy.$nextTick(() => {
    answer.scrollTop = answer.scrollHeight
    console.log(answer.scrollHeight);
  })
  mainData.isProducting = true
  mainData.isPosting = true
  let title = question.value
  let tid = mainData.currentTid
  let sycs = mainData.sycs
  let params = {
    title: title,
    tid: tid,
    sycs: sycs,
  }
  let res = await makeChatTitle(params);
  mainData.count = 0
  let allContent = []
  var source = new EventSource("https://u69362-8cae-937a2b8b.neimeng.seetacloud.com:6443/chatgpt-clone?question=" + res)
  question.value = ''
  source.onmessage = async function (event) {
    if (event.data == '[DONE]') {
      mainData.isPosting = false
      source.close()
      const params2 = {
        title: title,
        tid: tid,
        sycs: sycs,
        content: mainData.currentSessionList[mainData.currentSessionList.length - 1].content
      };
      mainData.sycs++
      let res = await uploadChatContent(params2);
      userInfo.monthCanUseContentLen = JSON.parse(res).user.monthCanUseContentLen
      userInfo.monthUsedContentLen = JSON.parse(res).user.monthUsedContentLen
      proxy.$cache.local.setJSON('userInfo', userInfo);
    } else {
      mainData.isProducting = false
      // todo 不断取event.data更新到卡片上
      allContent.push(event.data)

      if (mainData.timer) {

        if (mainData.count < allContent.length - 1) {
          mainData.count++
        }
        clearInterval(mainData.timer)
        let i = 0
        mainData.timer = setInterval(() => {
          i++

          if (!allContent[mainData.count]?.replace(mainData.currentSessionList[mainData.currentSessionList.length - 1].content, "") || i > allContent[mainData.count]?.replace(mainData.currentSessionList[mainData.currentSessionList.length - 1].content, "").length) {
            clearInterval(mainData.timer)
          }
          if (allContent[mainData.count]?.replace(mainData.currentSessionList[mainData.currentSessionList.length - 1].content, "").slice(0, i).includes('<')) {
            if (allContent[mainData.count]?.replace(mainData.currentSessionList[mainData.currentSessionList.length - 1].content, "").length < i + 5) {
              return clearInterval(mainData.timer)
            } else {
              i += 5
            }
          }
          mainData.historyData.forEach(item => {
            if (item.tid == mainData.currentTid) {
              item.data[item.data.length - 1].content += allContent[mainData.count]?.replace(mainData.currentSessionList[mainData.currentSessionList.length - 1].content, "").slice(0, i)
            }
          });
          mainData.currentSessionList[mainData.currentSessionList.length - 1].content += allContent[mainData.count]?.replace(mainData.currentSessionList[mainData.currentSessionList.length - 1].content, "").slice(0, i)
          answer.scrollTop = answer.scrollHeight
          console.log(answer.scrollHeight);
        }, 40)

      } else {
        let i = 0
        mainData.timer = setInterval(() => {
          i++
          if (i > allContent[mainData.count].length) {
            clearInterval(mainData.timer)
          }
          mainData.historyData.forEach(item => {
            if (item.tid == mainData.currentTid) {
              item.data[item.data.length - 1].content = allContent[mainData.count].slice(0, i)
            }
          });
          if (allContent[mainData.count].slice(0, i).includes('<')) {
            if (allContent[mainData.count].length < i + 5) {
              return clearInterval(mainData.timer)
            } else {
              i += 5
            }
          }
          mainData.currentSessionList[mainData.currentSessionList.length - 1].content = allContent[mainData.count].slice(0, i)
        }, 10)
      }
    }
  }
}

const mainData = reactive({
  historyData: [],
  currentSessionList: [],
  isPosting: false,
  isExample: false,
  isProducting: false,
  currentTid: '',
  title: '微撰',
  count: 0,
  showHistory: false,
  sycs: 0,
  showKey: false,
  timer: null,
  keyWordClassify: [{
    title: '精选推荐',
    dataList: [{
      key: '写一个介绍大模型技术的ppt提纲'
    }, {
      key: '画一幅紫薇花盛开'
    }, {
      key: '以“五一假期”为题，作一首应景诗'
    }, {
      key: '写一篇互联网AI产品经理招聘JD'
    }, {
      key: '你是一名幼儿园老师，请向5岁小朋友介绍宇宙的奥秘'
    }]
  }, {
    title: '休闲娱乐',
    dataList: [{
      key: '有什么适合周末的运动'
    }, {
      key: '有什么评分高的国产喜剧电影'
    }, {
      key: '我想入门摄影，推荐几款照相机'
    }, {
      key: '北京周边有哪些适合露营的地方'
    }]
  }, {
    title: '推理分析',
    dataList: [{
      key: '八大山人是哪八个人'
    }, {
      key: '李白和苏东坡谁更厉害'
    }, {
      key: '企鹅有膝盖吗'
    }, {
      key: '为什么中国的乒乓球实力这么强'
    }, {
      key: '结合庄子的思想谈一谈为什么我们会犯错误'
    }]
  }, {
    title: '校园生活',
    dataList: [{
      key: '大学生兼职有什么类似肯德基服务员的工作'
    }, {
      key: '第一次离开家上大学，怎么克服孤独'
    }, {
      key: '高中生如何提高语文分数'
    }]
  }, {
    title: '情感帮助',
    dataList: [{
      key: '被长辈催婚应该怎么回复'
    }, {
      key: '我有一个好朋友失恋了，我应该怎么安慰'
    }, {
      key: '学习压力很大，如何调节'
    }, {
      key: '我刚换了工作，怎么和新同事搞好关系'
    }, {
      key: '女朋友生气了怎么办'
    }]
  }, {
    title: '百科知识',
    dataList: [{
      key: '四大才女是谁'
    }, {
      key: '第一个到达月球的宇航员是谁'
    }, {
      key: '中国书法有哪些种类'
    }, {
      key: '四大名著的作者都是谁'
    }, {
      key: '为我科普风电行业的基础知识'
    }, {
      key: '你知道电车难题吗'
    }, {
      key: '为什么咖啡摄入会导致出汗'
    }]
  }, {
    title: '工作效率',
    dataList: [{
      key: '怎么组织一场高效的跨部门的项目会议'
    }, {
      key: '电商运营的OKR怎么写'
    }, {
      key: '推荐AI室内设计好用的软件'
    }]
  }, {
    title: '内容创作',
    dataList: [{
      key: '为沐浴露品牌写一份电商购物节的促销方案'
    }, {
      key: '以家长代表的身份写一篇幼儿园家长会的发言稿'
    }, {
      key: '写一个新款男士洗发水的短视频广告脚本'
    }, {
      key: '帮我写一首吐槽996的现代诗'
    }, {
      key: '写一份关于汽车企业在车展错误发放冰淇淋的道歉公关稿'
    }, {
      key: '我是入行2年的社区运营，请帮我写个简历'
    }]
  }, {
    title: '日常生活',
    dataList: [{
      key: '请给我制定一周健康饮食计划'
    }, {
      key: '长期失眠该如何解决'
    }, {
      key: '我在人多的场合不敢说话该怎么解决'
    }, {
      key: '第一次养猫需要注意什么'
    }, {
      key: '夏季驱蚊小妙招有哪些'
    }, {
      key: '打嗝停不下来应该怎么办'
    }, {
      key: '写一段在母亲节送给妈妈的节日祝福'
    }, {
      key: '写一段给闺蜜的生日祝福'
    }]
  }, {
    title: 'AI画图',
    dataList: [{
      key: '画一个驴肉火烧#王元木更#'
    }, {
      key: '帮我画鸡蛋灌饼#创意图#'
    }, {
      key: '画一幅晶莹剔透的牡丹花'
    }]
  }]
})

const addSession = (init) => {
  mainData.showHistory = false
  mainData.isPosting = false
  mainData.currentSessionList = []
  if (!mainData.isExample || init) {
    mainData.isExample = true
    mainData.currentTid = Math.floor(Math.random() * 1000000000);
  } else {
    proxy.$modal.msgError('当前已是新对话')
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}

:deep(.van-cell.van-field) {
  border-radius: 10px;
  padding: .3rem;
}

:deep(.van-cell-group.van-hairline--top-bottom) {
  border-radius: 20px;
}

:deep(.van-popup.van-popup--round.van-popup--bottom.popup) {
  padding: .2rem;
  background: #f6f7fb;
}

.history_main {
  padding: .5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: space-between;

  .history_content {
    overflow-y: scroll;
    flex: 1;
    margin-top: 0.7rem;
    margin-bottom: .3rem;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .history_title {
    display: flex;
    position: fixed;
    width: 80%;
    justify-content: space-between;
    color: #9b9b9b;
    align-items: center;
    font-size: .3rem;
    margin-bottom: .3rem;
  }

  .history_list {
    flex: 1;
    overflow-y: scroll;


    .history_item {
      padding: 0.3rem;
      color: #b1b2b3;
      background: #1b1c20;
      margin-top: .1rem;
      height: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;

    }
  }

  .history_footer {
    border-radius: .3rem;
    background: #25262a;
    width: 98%;
    color: #9b9b9b;
    padding: .2rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

}

.dot1,
.dot2,
.dot3 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  margin: 5px;
}

.dot1 {
  animation: jump 1.6s -0.32s linear infinite;
  background: #cdc3ff;
}

.dot2 {
  animation: jump 1.6s -0.16s linear infinite;
  background: #cdc3ff;
}

.dot3 {
  animation: jump 1.6s linear infinite;
  background: #cdc3ff;
}

@keyframes jump {

  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  40% {
    -webkit-transform: scale(2.0);
    transform: scale(2.0);
  }
}

.popup {
  padding: .2rem;


  h5 {
    text-align: center;
    margin: .2rem 0;
  }

  .title {
    margin-bottom: .2rem;
    color: #a2a0aa;
    font-size: .3rem;
  }

  .content {
    padding: .2rem;
    background: #fff;
    border-radius: .2rem;


    .content_list {

      display: flex;

      flex-direction: column;


      .item_content {
        padding: .2rem;
        border-bottom: 1px solid #f6f4f4e9;
        font-size: .2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}

.container {
  background-image: linear-gradient(to right bottom, #e3e1f7, #f0fcfc, #e3e1f7);
  height: 100%;
  width: 100%;
  padding: .3rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;


  .content {
    flex: 1;
    overflow-y: scroll;
    margin-bottom: .3rem;
  }



  .question {
    background: #fff;
    width: 100%;
    padding: .3rem;
    border-radius: .3rem;
    font-size: .3rem;
    color: #828183;
    display: flex;
    justify-content: space-between;

    .ask_content {
      width: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .header {
    width: 98%;
    text-align: center;
    font-family: emoji;
    font-weight: 700;
    margin-bottom: .5rem;


  }

  .desc {
    padding: .3rem;
    background: #fff;
    width: 100%;
    height: fit-content;
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
    border-bottom-left-radius: .5rem;
    margin-bottom: .3rem;

    .title {
      line-height: .5rem;
      font-size: .3rem;
    }

    .intro {
      line-height: .5rem;
      margin: .2rem 0;
      font-size: .25rem;
    }

    .tip {
      background: #f6f7fb;
      padding: .2rem;
      line-height: .5rem;
      color: #7c7d81;
      font-size: .25rem;
    }
  }

  .session_content {
    max-width: 70%;
    min-height: 1rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: .2rem !important;
    font-size: .3rem;
    background: #5737fe;
    color: #fff;
    border-top-left-radius: .3rem;
    border-top-right-radius: .3rem;
    border-bottom-left-radius: .3rem;

  }

  .answer {
    width: 100%;
    font-size: .3rem;
    min-height: .5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: .2rem;
    background: #fff;
    border-top-right-radius: .3rem;
    border-bottom-right-radius: .3rem;
    border-bottom-left-radius: .3rem;
  }

  .keyWord {
    display: flex;
    margin-bottom: .2rem;

    .key_ask {
      background: #fff;
      padding: .2rem;
      font-size: .25rem;
      border-radius: .2rem;
      margin-left: .2rem;
      height: 0.7rem;
    }

    .key_ask2 {
      width: 2.2rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    img {
      height: .7rem;
      width: .7rem;
    }
  }

  .send_border {
    width: .5rem;
    height: .5rem;
    background: #cdc3ff;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .1rem;
  }

  .session {
    background: #fff;

    .send {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding: .3rem;
    }


  }

}
</style>
