<template>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item"><a style="cursor:pointer" @click="onClick(currentPage - 1)" class="page-link" href="#">Previous</a></li>
        <li 
          v-for = "page in numberOfPages"
          :key="page"
          class="page-item"
          :class ="currentPage === page ? 'active':''"
        ><a style="cursor:pointer" @click="onClick(page)" class="page-link" href="#">{{page}}</a></li>

        <li v-if="currentPage !== numberOfPages" class="page-item"><a style="cursor:pointer" @click="onClick(currentPage + 1)" class="page-link" href="#">Next</a></li>
      </ul>
    </nav>


    </template>

<script>

  export default {
    props:{
      numberOfPages:{
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      }
    },
    emits: ['click'],
    setup(props, {emit}){
      const onClick = (page)=>{
        emit('click', page)
      }
      return {
        onClick
      }
    }
  }


</script>