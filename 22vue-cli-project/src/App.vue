<template>


  <div class="container">
    <h2>To-Do List</h2>

    <form @submit.prevent="onSubmit" >
      <div class="d-flex">
        <div class="flex-grow-1 me-2">
          <input 
            class="form-control"
            type="text" 
            v-model="todo"
            placeholder = "Type new to-do"
          >
        </div>
        <div>
          <button 
            class="btn btn-primary"
            type="submit"
          >Add</button>
        </div>
      </div>
      <div style="color: red;" v-show="hasError">This field cannot be empty</div>
    </form>

    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>
    
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
            v-model="todo.completed"
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


  </div>

</template>

<script>
import {ref} from 'vue';

export default {
  setup() {
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }
    const toggle = ref(false);
    const todo = ref('');
    const todos = ref([
      {id:1, subject: '휴대폰 사기', completed: true},
      {id:2, subject: '장보기', completed: false}
    ]);

    const hasError = ref(false);
    const onSubmit = ()=>{
      if(todo.value === ""){
        hasError.value = true;
      }else{
        hasError.value = false;

        todos.value.push({
          id: Date.now(),
          subject : todo.value,
          completed: false
        })
        todo.value=""
      }

    }
    const onToggle = () => {
      toggle.value =!toggle.value;
    }
    const deleteTodo = (index)=>{
      todos.value.splice(index, 1)
    }
    return {
      todo,
      onSubmit,
      todos,
      toggle,
      onToggle,
      hasError,
      todoStyle,
      deleteTodo
    };
  },
};
</script>

<style>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>
