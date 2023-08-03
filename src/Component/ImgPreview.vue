<script setup>
const props = defineProps(['src'])

</script>
<template>
  <img
      class="h-64"
      :src='props.src'
      alt=""
  />
</template>