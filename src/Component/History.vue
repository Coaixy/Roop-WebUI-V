<script setup>
// @ts-nocheck

import history from "../assets/history.svg";
import Table from "./Table.vue";

</script>

<template>
  <div class="tooltip" data-tip="Click Me">
    History
    <img :src='history' onclick="my_modal_2.showModal()" alt="history"/>
  </div>
  <dialog id="my_modal_2" class="modal">
    <form method="dialog" class="modal-box">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      <!-- Modal Title -->
      <h3 class="font-bold text-lg">History</h3>
      <!-- Modal Context -->
      <div>
        <Table/>
      </div>
    </form>
  </dialog>
</template>
