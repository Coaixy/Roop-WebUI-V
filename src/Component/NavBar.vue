<script setup>
import githubSvg from "../assets/github.svg";

let list = ['Chinese', 'English']
let selected = localStorage.getItem("selected") || 'English'

function changeLanguage(e) {
  localStorage.setItem("selected", e.target.innerText)
}
</script>

<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl" href="# ">Roop-WebUI</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li>
          <details>
            <summary class="font-bold ">
              {{ selected }}
            </summary>
            <ul class="p-2 bg-base-100">
              <template v-for="item in list">
                <li v-if="item == selected"><a href=" " @click='changeLanguage' class="font-bold">{{ item }}</a></li>
                <li v-else><a href=" " @click='changeLanguage'>{{ item }}</a></li>
              </template>
            </ul>
          </details>
        </li>
      </ul>
      <a class="btn btn-square btn-ghost" href="https://github.com/Coaixy/roop-webui-v" target="_blank">
        <img :src='githubSvg' class="" alt="Github Logo"/>
      </a>
    </div>
  </div>
</template>
