import { createVNode, render } from "vue";
import dialog  from './dialog .vue';

const alertMsg = (propData: any) => {
  let alert = createVNode(dialog , {
    msg: propData
  });
  render(null, document.querySelector('body') as HTMLElement);
  render(alert , document.querySelector('body') as HTMLElement);
  document.querySelector("#my_modal_1").showModal()
}

export default alertMsg;