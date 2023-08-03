<script setup>
const props = defineProps(['src'])
</script>
<template>
  <video class="h-64" :src='props.src' controls="controls" alt="预览"></video>
</template>