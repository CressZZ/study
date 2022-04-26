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
  <Toast :message="toastMessage" :type="toastAlertyType"  v-if="showToast"  />
</template>

<script>
import {ref, computed, watch} from 'vue';
import TodoList from '@/components/TodoList.vue'
import axios from 'axios';
import Toast from '@/components/Toast.vue'
import useToast from '@/composables/toast'
import {useRouter} from 'vue-router'
export default {
  components: {
    TodoList,
    Toast
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
    const {  toastMessage, toastAlertyType, showToast, triggerToast} = useToast(); // const showToast = ref(false);
    // const toastMessage = ref('')
    // const toastAlertyType = ref('')
    // let toastTimeout = setTimeout(()=>{

    // },0);
    // const triggerToast = (message, type) => {
    //   toastMessage.value = message;
    //   toastAlertyType.value = type;

    //   showToast.value = true;

    //   toastTimeout.value = setTimeout(() => {
    //     toastMessage.value = '';
    //     showToast.value = false;
    //   }, 1000);
    // }


    // watch([currentPage, numberOfTodos], (currentPage, prev)=>{
    //     console.log('hello', currentPage, prev)
    // })



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
        const res = await axios.get(`http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`)

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
        await axios.post('http://localhost:3000/todos', {
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
        await axios.delete('http://localhost:3000/todos/' + id);
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
        await axios.patch('http://localhost:3000/todos/' + id , {
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
      showToast,
      toastMessage,
      toastAlertyType,
      moveToCreatPage
    };
  },
};
</script>

<style>

</style>
