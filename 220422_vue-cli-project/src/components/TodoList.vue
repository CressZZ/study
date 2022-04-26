<template>
<List :items="todos">
  <template #default="{item, index}">
        <div 
      class="card-body p-2 d-flex align-items-center"
      style="cursor: pointer"
      @click="moveToPage(item.id)" >

      <div class=" flex-grow-1">
        <input 
        class="ml-2 me-2"
          type="checkbox" 
          name="" 
          id=""
          :checked = "item.completed"
          @change="toggleTodo( index, $event,)"
          @click.stop
        >
        <span :class="{todo: item.completed}" >
          {{item.subject}}
        </span>
      </div>
      <div>
        <button 
          class="btn btn-danger btn-sm"
          @click.stop="openModal(item.id)"
        >Delete</button>
        
      </div>
    </div>
  </template>
  
</List>
  <teleport to="#modal">
    <Modal v-if="showModal" @close="closeModal" @delete="deleteTodo">
      
    </Modal>
  </teleport>
</template>

<script>
// import {computed} from 'vue'
// import axios from 'axios';
// import {watchEffect} from 'vue'
import {useRouter} from 'vue-router'
import Modal from '@/components/DeleteModal.vue'
import {ref} from 'vue';
import List from '@/components/List.vue'
export default {
  
  components:{Modal, List}, 
  props: {
    todos: {
      type: Array,
      required: true
    },
    count: Number,
  },
  emits:['toggle-todo', 'delete-todo'],
  
  setup(props, {emit}){

    const showModal = ref(false);
    const todoDeleteId  = ref(null);
    const router = useRouter()
    const toggleTodo = (index, evt, ) => {
      console.log(evt)
      emit('toggle-todo', index, evt.target.checked)
    }

    const deleteTodo = () => {
   
      let a = emit('delete-todo', todoDeleteId.value);
      console.log(a)
      showModal.value = false;
      todoDeleteId.value = false;
    }
    const openModal = (id)=>{
      showModal.value= true;
      todoDeleteId.value = id;
    }
    const closeModal = ()=>{
      showModal.value= false;
      todoDeleteId.value = null;
    }
    // const doubleCountComputed = computed(()=>{
    //   return props.count * 2;
    // })


    const moveToPage = (todoId) => {
      console.log(todoId);
      // router.push('/todos/' + todoId);
      router.push({
        name: 'Todo',
        params:{
          id: todoId
        }
      })
    }
    return {
      toggleTodo,
      deleteTodo,
      moveToPage,
      Modal,
      showModal,
      openModal,
      closeModal,
      List
      // doubleCountComputed
    }
  }
}
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>