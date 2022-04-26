<template>

<h1>Create Rodo</h1>
<TodoForm :editing="false"/>
</template>

<script>
import TodoForm from '@/components/TodoForm.vue'

export default {
  components: {
    TodoForm
  }
}
</script>