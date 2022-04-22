<template>
  <div 
    v-for="(todo, index) in todos"
    :key="todo.id"
    class="card mt-2"
  >
    <div class="card-body p-2 d-flex align-items-center">
      <div class="form-check flex-grow-1">
        <input 
          class="form-check-input" 
          type="checkbox" 
          name="" 
          id=""
          :checked = "todo.completed"
          @change="toggleTodo(index)"
        >
        <label 
          class="form-check-label" for=""
          :class="{todo: todo.completed}"
        >
          {{todo.subject}}
        </label>
      </div>
      <div>
        <button 
          class="btn btn-danger btn-sm"
          @click="deleteTodo(index)"
        >Delete</button>
        
      </div>
    </div>
  </div>
</template>

<script>
// import {computed} from 'vue'
// import axios from 'axios';
// import {watchEffect} from 'vue'
export default {
  
  props: {
    todos: {
      type: Array,
      required: true
    },
    count: Number,
  },
  emits:['toggle-todo', 'delete-todo'],
  
  setup(props, {emit}){

 

    const toggleTodo = (index) => {
      emit('toggle-todo', index)
    }

    const deleteTodo = (index) => {
   
      emit('delete-todo', index)
    }

    // const doubleCountComputed = computed(()=>{
    //   return props.count * 2;
    // })

    return {
      toggleTodo,
      deleteTodo,
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