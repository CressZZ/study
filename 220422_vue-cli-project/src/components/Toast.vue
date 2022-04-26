<template>

<div class="toast-box">
  <transition-group name="fade">
  <div v-for="toast in toasts" :key="toast.id" class="alert" :class="`alert-${toast.type}`" role="alert">
    {{toast.message}}
  </div>
</transition-group>
</div>


</template>

<script>
import useToast from '@/composables/toast'
export default {
  setup(){
    const {toasts} = useToast()
    return {toasts}
  }
}
</script>

<style>
  .toast-box{
      position: fixed;
      top: 10px;
      right: 10px;
  }
  .fade-enter-active, 
  .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: translateY(-30px)
  }
  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
    transform: translateY(0px)

  }
</style>