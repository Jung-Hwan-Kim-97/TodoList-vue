<template>
  <div class="body-container">
    <div class="add-todo">
      <input
        type="text"
        placeholder="할 일을 추가해 주세요!"
        class="add-bar"
        :value="todoStore.todoTitle"
        @input="todoStore.todoTitle = $event.target.value"
        @keydown.enter="todoStore.addTodo"
      />
      <button class="add-btn" @click="todoStore.addTodo">todo 등록!</button>
    </div>
    <TodoItem v-for="item in todoStore.todoList" :key="item.id" :item="item" />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import { mapStores } from "pinia";
import { useTodoStore } from "~/store/todo";
export default {
  components: {
    TodoItem,
  },

  computed: {
    ...mapStores([useTodoStore]),
  },
  async created() {
    await this.todoStore.readTodos();
  },
};
</script>

<style lang="scss" scoped>
.body-container {
  width: 800px;
  height: 600px;
  // background-color: #e5ebf7;
  background-image: url("../assets/test1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: 10%;
  overflow: auto;
  .add-todo {
    display: flex;
    .add-bar {
      flex-grow: 1;
      outline: none;
      border-radius: 8px;
      border: 1px solid #000;
    }
    .add-btn {
      border-radius: 8px;
      background-color: #f05650;
      color: #fff;
      border: none;
      padding: 5px 20px;
      box-sizing: border-box;
      font-weight: 700;
    }
    .add-btn:hover {
      background-color: rgba($color: #000000, $alpha: 0.5);
    }
  }
}
</style>
