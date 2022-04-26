import {computed} from 'vue';
import {useStore} from 'vuex';

export default () => {
  const store = useStore();
  const toasts = computed(()=>store.state.toast.toasts)

  const triggerToast = (message, type) => {
    console.log(type)
    store.dispatch('toast/triggerToast', {message, type})
  }

  return {
    triggerToast,
    toasts
  }
}