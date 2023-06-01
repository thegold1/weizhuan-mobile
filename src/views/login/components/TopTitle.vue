<template>
  <div class="container">
    <van-image
        width="1.5rem"
        height="1.7rem"
        fit="contain"
        :src="logo"
    />
    <h2>{{ modelValue }}</h2>
  </div>
</template>

<script setup name="TopTitle">
import logo from "@/assets/logo/logo.svg";

const props = defineProps({
  modelValue: String
});

const { modelValue } = props;

</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  gap: 0.2rem;
  h2 {
    font-size: 0.5rem;
  }
}
</style>
