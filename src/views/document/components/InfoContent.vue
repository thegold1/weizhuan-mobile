<template>
  <div class="content-container">
    <h1>{{ title }}</h1>
    <section v-html="content">
    </section>
  </div>
</template>

<script setup name="InfoContent">
import { computed } from "vue";

const props = defineProps({
  title: String,
  content: String,
});

const replaceRegex = /[\r\n]/g;

const title = computed(() => props.title);

const content = computed(() => formatContent(props.content));

const formatContent = (content) => {
  console.log({ content: content })
  if (!content) return
  // const
  return content.replace(replaceRegex, '<br />')
}
</script>

<style lang="scss" scoped>
.content-container {
  width: 100%;
  height: calc(100% - 1rem);
  padding: 0 0.16rem;
  overflow-y: scroll;
}
</style>
