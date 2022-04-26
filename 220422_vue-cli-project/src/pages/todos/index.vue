<template>

  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button class="btn btn-primary" @click="moveToCreatPage">Create todo </button>
    </div>

    <input 
      class="form-control"
      type="text" 
      v-model="searchText"
      placeholder = "Search"
      @keyup.enter = "searchTodo"
    >
    <hr/>
    <div style="color:red;">{{error}}</div>
    
    <div v-if="!todos.length">
      보여줄게 없다
    </div>

    <TodoList 
      :todos="todos" 
      :count="count"
      @toggle-todo ="toggleTodo" 
      @delete-todo = "deleteTodo"
    />

    <hr/>
  <Pagination v-if="todos.length" :currentPage="currentPage" :numberOfPages = "numberOfPages" @click="getTodos" />

  </div>
</template>

<script>
import {ref, computed, watch} from 'vue';
import TodoList from '@/components/TodoList.vue'
import axios from '@/axios';
import useToast from '@/composables/toast'
import {useRouter} from 'vue-router'
import Pagination from '@/components/Pagination.vue'
export default {
  components: {
    TodoList,
    Pagination
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
    const router = useRouter()
    const {  triggerToast} = useToast(); // const showToast = ref(false);
   

    const numberOfPages = computed(()=> {
      return Math.ceil(numberOfTodos.value/ limit);
    })


    // watchEffect(()=>{
    //   console.log(currentPage.value)
    //   console.log(numberOfTodos.value)
    // })

    const searchText = ref('');
    const moveToCreatPage = () => {
      router.push({
        name: 'TodoCreate'
      })
    }
    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;

      try{
        const res = await axios.get(`todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`)

        numberOfTodos.value = res.headers['x-total-count']
        todos.value = res.data;


      }catch(err){
        console.log(err);
        error.value = '뭔가 잘못됬습니다.';
        triggerToast('뭔가 잘못됬습니다.', 'danger')
      }
    }

    getTodos();

    const addTodo = async (todo)=>{
      // 데이터 베이스에 투두를 저장
      try{
        await axios.post('todos', {
          subject: todo.subject,
          completed: todo.completed
        });
        getTodos()
    }catch(err){
        console.log(err);
        error.value = '뭔가 잘못됬습니다.'
        triggerToast('뭔가 잘못됬습니다.', 'danger')

      }
    }

    const onToggle = () => {
      toggle.value =!toggle.value;
    }

    const deleteTodo = async(id)=>{
      error.value = '';
      // const id = todos.value[index].id;
      try{
        await axios.delete('todos/' + id);
        getTodos();
        return true
      }catch(err){

        console.error(err)
        error.value = '뭔가 잘못 됬습니다.'
        triggerToast('뭔가 잘못됬습니다.', 'danger')

      }
    }

    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;
      console.log(id, !todos.value[index].completed)
      try{
        await axios.patch('todos/' + id , {
          completed: checked
        });

        todos.value[index].completed = checked;

      }catch(err){
        console.error(err)
        error.value = '뭔가 잘못 됬습니다.',
        triggerToast('뭔가 잘못됬습니다.', 'danger')
      }
    }
    
    const count = ref(1);


    let timeout = setTimeout(() => {
        null
    }, 0);

    const searchTodo = () => {
        clearTimeout(timeout);
        getTodos(1);
    }

    watch([searchText], () => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            getTodos(1);
        }, 500);
        // console.log(current)
    });



    // const filterdTodos = computed(()=>{
    //   if(searchText.value){
    //     return todos.value.filter(todo => {
    //       return todo.subject.includes(searchText.value)
    //     });
    //   }
    //   return todos.value;
    // })


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
    //   filterdTodos,
      error,
      numberOfPages,
      currentPage,
      getTodos,
      searchTodo,

      moveToCreatPage
    };
  },
};
</script>

<style>

</style>
