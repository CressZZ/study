<template>
<div class="modal-wrapper">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">
          <slot name="title"></slot>
        </h5>
        <button  @click="onClose" type="button" class="btn-close"></button>
      </div>
      <div class="modal-body">
          <slot name="body"></slot>

      </div>
      <div class="modal-footer">
          <slot name="footer"></slot>

      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  setup(props, {emit}){
    const onClose = () => {
      emit('close');
    }

    return {
      onClose,

    }
  }
}
</script>

<style scoped>
  .modal-wrapper {
    position: fixed;
    z-index: 100;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5)
  }

</style>