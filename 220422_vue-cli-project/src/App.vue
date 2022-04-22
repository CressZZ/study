<template>


  <div class="container">
    <h4>cout: {{count}}</h4>
    <button @click="count++">Add one</button>

    <h2>To-Do List</h2>
    <input 
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder = "Search"
    >
    <hr/>
    <TodoSimpleForm @add-todo="addTodo"/>
    <div style="color:red;">{{error}}</div>
    
    <div v-if="!filterdTodos.length">
      보여줄게 없다
    </div>

    <TodoList 
      :todos="filterdTodos" 
      :count="count"
      @toggle-todo ="toggleTodo" 
      @delete-todo = "deleteTodo"
    />

    <hr/>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item"><a style="cursor:pointer" @click="getTodos(currentPage - 1)" class="page-link" href="#">Previous</a></li>
        <li 
          v-for = "page in numberOfPages"
          :key="page"
          class="page-item"
          :class ="currentPage === page ? 'active':''"
        ><a style="cursor:pointer" @click="getTodos(page)" class="page-link" href="#">{{page}}</a></li>

        <li v-if="currentPage !== numberOfPages" class="page-item"><a style="cursor:pointer" @click="getTodos(currentPage + 1)" class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div>

</template>

<script>
import {ref, computed} from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue'
import TodoList from './components/TodoList.vue'
import axios from 'axios';
export default {
  components: {
    TodoSimpleForm,
    TodoList
  },
  setup() {
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }
    const toggle = ref(false);
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    const limit = 5;
    const currentPage = ref(1);

    const numberOfPages = computed(()=> {
      return Math.ceil(numberOfTodos.value/ limit);
    })


    // watchEffect(()=>{
    //   console.log(currentPage.value)
    //   console.log(numberOfTodos.value)
    // })

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;

      try{
        const res = await axios.get(`http://localhost:3000/todos?_page=${page}&_limit=${limit}`)

        numberOfTodos.value = res.headers['x-total-count']
        todos.value = res.data;


      }catch(err){
        console.log(err);
        error.value = '뭔가 잘못됬습니다.'
      }
    }

    getTodos();

    const addTodo = async (todo)=>{
      // 데이터 베이스에 투두를 저장
      try{
        const res = await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed
        });
        todos.value.push(res.data);
      }catch(err){
        console.log(err);
        error.value = '뭔가 잘못됬습니다.'
      }
    }

    const onToggle = () => {
      toggle.value =!toggle.value;
    }

    const deleteTodo = async(index)=>{
      error.value = '';
      const id = todos.value[index].id;
      try{
        axios.delete('http://localhost:3000/todos/' + id);
        todos.value.splice(index, 1)
      }catch(err){

        console.error(err)
        error.value = '뭔가 잘못 됬습니다.'
      }
    }

    const toggleTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      console.log(id, !todos.value[index].completed)
      try{
        axios.patch('http://localhost:3000/todos/' + id , {
          completed: !todos.value[index].completed
        });

        todos.value[index].completed = !todos.value[index].completed;

      }catch(err){
        console.error(err)
        error.value = '뭔가 잘못 됬습니다.'
      }
    }
    
    const count = ref(1);

    const searchText = ref('');

    const filterdTodos = computed(()=>{
      if(searchText.value){
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value)
        });
      }
      return todos.value;
    })

    return {
      addTodo,
      todos,
      toggle,
      onToggle,
      todoStyle,
      deleteTodo,
      toggleTodo,
      count,
      searchText,
      filterdTodos,
      error,
      numberOfPages,
      currentPage,
      getTodos
    };
  },
};
</script>

<style>

</style>
