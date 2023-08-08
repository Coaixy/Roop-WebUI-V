<script setup>

import {del, download} from "../helper.js";

const emit = defineEmits(['updateTokens'])
const props = defineProps(['token', 'status'])
let token = props.token
let status = props.status

let url = download(token)


function Download() {
  window.open(url)

}
function Delete() {
  let tokens = JSON.parse(localStorage.getItem("tokens"))
  let newObj = {}
  for (let key in tokens) {
    if (key !== token) {
      newObj[key] = tokens[key];
    }
  }
  localStorage.setItem("tokens", JSON.stringify(newObj))
  emit('updateTokens')
  //Send Delete Request
  del(token)
}
</script>
<template>
  <tr>
    <td> {{ token }}</td>
    <td> {{ status }}</td>
    <td>
      <p v-if="status === 'Success'" class="btn btn-ghost btn-xs " @click='Download'>Download</p>
      <p v-else class="btn btn-ghost btn-xs line-through">Download</p>
    </td>
    <td>
      <p class="btn btn-ghost btn-xs" @click='Delete'>Delete</p>
    </td>
  </tr>
</template>
