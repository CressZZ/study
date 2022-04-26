import {ref, onUnmounted} from 'vue';


export default () => {
  const showToast = ref(false);
  const toastMessage = ref('')
  const toastAlertyType = ref('')
  let toastTimeout = setTimeout(()=>{
  
  },0);
  const triggerToast = (message, type) => {
    toastMessage.value = message;
    toastAlertyType.value = type;

    showToast.value = true;

    toastTimeout = setTimeout(() => {
      toastMessage.value = '';
      showToast.value = false;
    }, 1000);
  }

  onUnmounted(()=>{
    console.log('onUnmounted', toastTimeout);
    clearTimeout(toastTimeout);
  })

  return {
    toastMessage,
    toastAlertyType,
    showToast,
    triggerToast
  }
}