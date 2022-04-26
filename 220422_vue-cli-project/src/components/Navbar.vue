<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{name: 'Home'}">cress00</router-link>
    <ul class="navbar-nav me-auto">
      <li class="nav-item active">
        <router-link class="nav-link"  :to="{name: 'Todos'}">Todos <span class="sr-only"></span></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {

}
</script>