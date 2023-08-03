<script setup>
import {ref} from "vue";

if (localStorage.getItem("swapper") == undefined) {
  localStorage.setItem("swapper", "true")
}
if (localStorage.getItem("enhancer") == undefined) {
  localStorage.setItem("enhancer", "true")
}
let swapper = ref(localStorage.getItem("swapper") === 'true')
let enhancer = ref(localStorage.getItem("enhancer") === 'true')

function saveSetting() {
  localStorage.setItem("swapper", document.querySelector("#swapper").checked)
  localStorage.setItem("enhancer", document.querySelector("#enhancer").checked)
}
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Face Swapper</span>
      <input type="checkbox" class="toggle" id="swapper" :checked='swapper' @change="saveSetting"/>
    </label>
    <label class="label cursor-pointer">
      <span class="label-text">Face Enhancer</span>
      <input type="checkbox" class="toggle" id="enhancer" :checked='enhancer' @change="saveSetting"/>
    </label>
  </div>
</template>
