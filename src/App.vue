<script setup>
import {submit} from "./helper.js";
import Box from "./Component/Box.vue";
import History from "./Component/History.vue";
import ImgPreview from "./Component/ImgPreview.vue";
import VideoPreview from "./Component/VideoPreview.vue";
import Settings from "./Settings.vue";
import NavBar from "./Component/NavBar.vue";
import alertMsg from "./Component/alert.ts";
import {ref} from "vue";

let sourcePreviewType = ref(1)
let sourcePreviewSrc = ref('')
let targetPreviewType = ref(1)
let targetPreviewSrc = ref('')

/**
 * Prevent write errors on initial access
 */
if(localStorage.getItem("tokens") == undefined){
  localStorage.setItem("tokens","{}")
}

/**
 * Preview
 * @param event
 */
function imgPreview(event) {
  let uploadInput = document.querySelector("#" + event.target.id);
  let file = uploadInput.files[0];
  if (event.target.id === "uploadSourceEle") {
    if (file.type.indexOf("video") >= 0) {
      sourcePreviewType.value = 2;
    } else {
      sourcePreviewType.value = 1;
    }
    sourcePreviewSrc.value = URL.createObjectURL(file);
  } else {
    if (file.type.indexOf("video") >= 0) {
      targetPreviewType.value = 2;
    } else {
      targetPreviewType.value = 1;
    }
    targetPreviewSrc.value = URL.createObjectURL(file);
  }
}

function openUploadSource() {
  document.querySelector("#uploadSourceEle").click();
}

function openUploadTarget() {
  document.querySelector("#uploadTargetEle").click();
}

function send() {
  const formData = new FormData();
  const sourceFile = document.querySelector("#uploadSourceEle").files[0]
  const targetFile = document.querySelector("#uploadTargetEle").files[0]
  formData.append("source", sourceFile)
  formData.append("target", targetFile)
  if (localStorage.getItem("swapper") == "true") {
    formData.append("modes", "replace")
  }
  if (localStorage.getItem("enhancer") == "true") {
    formData.append("modes", "enhance")
  }
  submit(formData).then(data => {
    if (data.message == "success") {
      const tokens = JSON.parse(localStorage.getItem("tokens"))
      tokens[data.data] = "Wait"
      localStorage.setItem("tokens", JSON.stringify(tokens))
        alertMsg({
          title: "Success",
          message: "Create task success",
        })
    } else {
        alertMsg({
          title: "Error",
          message: data.message
        })
    }
  })
}


</script>

<template>
  <nav-bar></nav-bar>
  <div class="grid grid-cols-3 grid-rows-[16rem_8rem_8rem] text-center m-4 gap-4">
    <Box>
      <ImgPreview v-if="sourcePreviewType === 1" :src="sourcePreviewSrc"></ImgPreview>
      <VideoPreview v-if="sourcePreviewType === 2" :src='sourcePreviewSrc'></VideoPreview>
    </Box>
    <Box>
      <History/>
    </Box>
    <Box>
      <ImgPreview v-if="targetPreviewType === 1" :src="targetPreviewSrc"></ImgPreview>
      <VideoPreview v-if="targetPreviewType === 2" :src='targetPreviewSrc'></VideoPreview>
    </Box>
    <Box>
      <button @click='openUploadSource' class="btn">Upload Source</button>
    </Box>
    <div class="col-start-3 col-end-3 place-self-center">
      <button @click="openUploadTarget" class="btn">Upload Target</button>
    </div>
    <div class="row-start-3 col-start-2">
      <Settings></Settings>
      <button @click="send" class="btn">Submit</button>
    </div>

    <!-- Upload Tools -->
    <input
        id="uploadSourceEle"
        accept=""
        @change='imgPreview'
        type="file"
        class="file-input max-w-xs mt-4 hidden w-0 h-0"
    />
    <input
        id="uploadTargetEle"
        accept=""
        @change='imgPreview'
        type="file"
        class="file-input max-w-xs mt-4 hidden w-0 h-0"
    />
  </div>
</template>

<style scoped>
</style>
