<script setup>
import {state} from "../helper.js";
import TableItem from "./TableItem.vue";
import {onMounted, ref} from "vue";


let index = 1
let tokens = ref({})
tokens.value = JSON.parse(localStorage.getItem("tokens"))

onMounted(() => {
  setInterval(() => {
    updateTokens()
    updateState()
  }, 3000);
})

function updateTokens() {
  tokens.value = JSON.parse(localStorage.getItem("tokens"))
}

function sortObj(obj) {
  var arr = [];
  for (var i in obj) {
    arr.push([obj[i], i]);
  }
  arr.reverse();
  var len = arr.length;
  var obj = {};
  for (var i = 0; i < len; i++) {
    obj[arr[i][1]] = arr[i][0];
  }
  return obj;
}

function updateState() {
  for (const item in tokens.value) {
    if (!(tokens.value[item] == "Success" || tokens.value[item] == "Fail")) {
      state(item).then(data => {
        const code = data.data
        switch (code) {
          case 0: {
            tokens.value[item] = "Wait"
            break
          }
          case 1: {
            tokens.value[item] = "Running"
            break
          }
          case 2: {
            tokens.value[item] = "Success"
            break
          }
          case 3: {
            tokens.value[item] = "Fail"
            break
          }
          case null : {
            let tempObj = tokens.value
            delete tempObj[item]
            console.log(tempObj)
            tokens.value = tempObj
            break
          }
        }
        localStorage.setItem("tokens", JSON.stringify(tokens.value))
        tokens.value = JSON.parse(localStorage.getItem("tokens"))
        if (index >= 1000) {
          index = 1
        } else {
          index++
        }
      })
    }
  }
}
</script>

<template>
  <div>
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th>Token</th>
        <th>Status</th>
        <th/>
        <th/>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <template v-for="(value,key) in sortObj(tokens)" :key="key + index">
        <TableItem :token='key' :status='value'
                   @updateTokens="updateTokens"></TableItem>
      </template>
      </tbody>
      <!-- foot -->
      <tfoot>
      <tr>
        <th>Token</th>
        <th>Status</th>
        <th/>
        <th/>
      </tr>
      </tfoot>
    </table>
  </div>

</template>