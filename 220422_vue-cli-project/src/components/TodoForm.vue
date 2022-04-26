<template>
  <div v-if="loading">
    loading...
  </div>
  <form 
  v-else 
  @submit.prevent = 'onSave'
  action="" >
      <div class="row mb-2">
        <div class="col-6">
          <!-- <div class="form-group">
            <label for=""> Subject</label>
            <input 
            v-model="todo.subject" 
            type="text" 
            name="" 
            id="" 
            class="form-control">
            <div class="text-red" v-if="subjectError">{{subjectError}}</div>
          </div> -->
          <Input 
            label="Subject" 
            v-model:subject="todo.subject"
            :error="subjectError"
          />
        </div>
        <div class="col-6">
          <div v-if="editing" class="form-group">
            <label for=""> Status</label>
            <div>
              <button 
              class="btn" 
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click ="toggleTodoStatus"
              >{{todo.completed ? 'Complete' : 'Incomplete'}}</button>
            </div>
          </div>
        </div>


        <div class="col-12">
          <div class="form-group">
            <label for=""> Body</label>
            <textarea 
            class="form-control" 
            v-model="todo.body" 
            name="" id="" cols="30" rows="10"></textarea>
          </div>
        </div>

      </div>
      
      <button :disabled="!todoUpdated" type="submit" class="btn btn-primary">{{editing ? '수정' : '생성'}}</button>
      <button class="btn btn-outline-dark ms-2"
        @click = "moveToTodoListPage"
      >취소</button>
  </form>
  <div id="cress"></div>
</template>

<script>
  import {useRoute, useRouter} from 'vue-router';
  import {ref, computed, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from 'vue';
  import axios from '@/axios';
  import _ from 'lodash';
  import useToast from '@/composables/toast'
  import Input from '@/components/Input.vue'

  export default {
    components: {
      Input
    },
    props: {
      editing:{
        type: Boolean,
        default: false,
      }
    },
    setup(props){


      onBeforeMount(()=>{
        // console.log('onBeforeMount', document.querySelector('#cress'));
      })

      onMounted(()=>{
        // console.log('onMounted', document.querySelector('#cress'));
      })

      onBeforeUpdate(()=>{
        // console.log('onBeforeUpdate')
      })

      onUpdated(()=>{
        console.log(todo.value.subject)
      })

      onBeforeUnmount(()=>{
        // console.log('onBeforeUnmount')
      })
      onUnmounted(()=>{
        // console.log('onBeforeUnmount')
      })

 


      const route = useRoute();
      const router = useRouter();
      const todo = ref({
        subject:'',
        completed: false,
        body:'',
      });
      const originaTodo = ref('');
      const loading = ref(false);
      const todoId = route.params.id;
      const {  triggerToast} = useToast(); // const showToast = ref(false);
      const subjectError = ref('');
      const getTodo = async() => {
        try{
          let res = await axios.get(`todos/${todoId}`);
          
          todo.value = {...res.data};
          originaTodo.value = {...res.data}

          loading.value = false;
        }catch(err){
          triggerToast(' 실패', 'danger')
          loading.value = false;

        }

      };

      const todoUpdated = computed(()=>{
        return !_.isEqual(todo.value, originaTodo.value)
      })

      const toggleTodoStatus = () => {
        todo.value.completed = !todo.value.completed;
        console.log('aa')
      }

      if(props.editing){
        getTodo();
        loading.value = true
      }

      const moveToTodoListPage = ()=>{
        router.push({
          name: 'Todos'
        })
      }



      const onSave = async() => {
        subjectError.value = ''
        if(!todo.value.subject){
          subjectError.value = '제목을 넣어주세요'
          return;
        }
        try{
           let res;
           const data = {
              subject: todo.value.subject,
              completed: todo.value.completed,
              body: todo.value.body
           };
          if(props.editing){
            res =  await axios.put(`/todos/${todoId}`, data)
            originaTodo.value = {...res.data}
          }else{
            res =  await axios.post(`/todos`, data);
            todo.value.subject = '',
            todo.value.body = ''
          }  
          const message = `${props.editing ? '수정 성공'  : '생성 성공'}`
          triggerToast(message, 'success');

          if(!props.editing){
            router.push({
              name:'Todos'
            })
          }
          
        }catch(err){
          const message = `${props.editing ? '수정 실패'  : '생성 실패'}`
          triggerToast(message, 'danger')
        }
      }
       
      return {
        todo,
        loading,
        toggleTodoStatus,
        moveToTodoListPage,
        onSave,
        todoUpdated,

        subjectError,
  
      }
    }
    
  }
</script>

<style scoped>
  .text-red{
    color:red;
  }

</style>