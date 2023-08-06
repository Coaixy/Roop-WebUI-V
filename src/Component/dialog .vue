<script setup>
import { ref } from "vue"
const props = defineProps({
    msg: {}
})
const propData = props.msg;
const title= ref(propData.title);
const message = ref(propData.message);
</script>

<template>
  <dialog id="my_modal_1" class="modal">
    <form method="dialog" class="modal-box">
      <h3 class="font-bold text-lg">{{title}}</h3>
      <p class="py-4">{{message}}</p>
      <div class="modal-action">
        <button class="btn">OK</button>
      </div>
    </form>
  </dialog>
</template>