<template>
  <div class="container">
    <TodoHeader />
    <TodoBody />
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoBody from './components/TodoBody.vue'
import { mapStores } from 'pinia'
import { useTodoStore } from '~/store/todo'

export default {
  components: {
    TodoHeader,
    TodoBody,
  },
  computed: {
    ...mapStores([useTodoStore]),
  },
}
</script>

<style lang="scss" scoped>
body {
  position: relative;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
