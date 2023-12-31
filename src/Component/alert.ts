import { createVNode, render } from "vue";
// @ts-ignore
import dialog  from './dialog.vue';

const alertMsg = (propData: any) => {
  let alert = createVNode(dialog , {
    msg: propData
  });
  render(null, document.querySelector('body') as HTMLElement);
  render(alert , document.querySelector('body') as HTMLElement);
  (document.querySelector("#AlertModal") as HTMLDialogElement).showModal()
}

export default alertMsg;
