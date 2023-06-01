<template>
  <div class="wrapper">
    <h1 class="title">关于我们</h1>
    <h5>公司简介</h5>
    <p>
      武汉微撰科技有限公司，是人工智能领域下新锐科技公司，致力于将重复脑力劳动AI化，以AI为杠杆撬动专业场景的百倍生产力提升。
      目前，微撰科技在AIGC、AI绘画、图片生成文章、文档辅助创作、智能合同等方向上开展研发与产品落地。
    </p>
    <h5>隐私安全</h5>
    <p>
      用户数据的安全性与隐私保护是我们的首要考虑。在数据传输层面，微撰使用行业标准的TLS加密协议，即基于
      HTTPS的安全通信协议来保护传输中的用户数据。 其他具体的政策和协议请见
      《<span
        style="color: rgb(1, 86, 255)"
        @click="router.push('/user-agreement')"
        >用户协议</span
      >》《<span
        style="color: rgb(1, 86, 255)"
        @click="router.push('/PrivacyPolicy')"
        >隐私协议</span
      >》 《<span
        style="color: rgb(1, 86, 255)"
        @click="router.push('/disclaimer-statement')"
        >免责声明</span
      >》
    </p>
    <h5>联系我们</h5>
    <p>公司地址：武汉市青山区建设一路31号宝业中心A座9-14层众创空间C1961号</p>
  </div>
</template>

<script setup name="about">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 0.3623rem;
}
.wrapper {
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  background-color: #fff;
  overflow: scroll;
}

p {
  color: #818181;
  font-size: 0.2536rem;
  line-height: 0.4529rem;
}
</style>
