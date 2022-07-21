<template>
  <div v-show="!editMode" class="off-edit-mode">
    <p class="title">
      {{ item.title }}
    </p>
    <button class="btn btn--primary" @click="modeHandler">수정</button>
    <button class="btn btn--danger" @click="deleteTodo(item.id)">삭제</button>
  </div>

  <div v-show="editMode" class="on-edit-mode">
    <input
      type="text"
      class="edit-bar"
      placeholder="수정할 내용을 입력하세요!"
      @input="todoStore.editTitle = $event.target.value"
      @keydown.enter="
        editTodo({
          done: item.done,
          id: item.id,
          order: item.order,
        })
      "
    />
    <button
      class="btn"
      @click="
        editTodo({
          done: item.done,
          id: item.id,
          order: item.order,
        })
      "
    >
      저장
    </button>
    <button class="btn" @click="modeHandler">취소</button>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useTodoStore } from "~/store/todo";

export default {
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      editMode: false,
    };
  },
  computed: {
    ...mapStores(useTodoStore),
  },
  methods: {
    modeHandler() {
      this.editMode = !this.editMode;
    },
    async deleteTodo(id) {
      await this.todoStore.deleteTodo(id);
      await this.todoStore.readTodos();
    },
    async editTodo(payload) {
      await this.todoStore.editTodo(payload);
      await this.todoStore.readTodos();
      this.editMode = !this.editMode;
    },
  },
};
</script>

<style lang="scss" scoped>
.off-edit-mode {
  display: flex;
  .title {
    margin: 0;
    background-color: #454589;
    color: #fff;
    font-weight: 700;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  .btn {
    border: none;
    padding: 5px 20px;
    box-sizing: border-box;
  }
  .btn:hover {
    background-color: rgba($color: #000000, $alpha: 0.5);
  }
  .btn--primary {
    background-color: royalblue;
    color: #fff;
  }
  .btn--danger {
    background-color: green;
    color: #fff;
  }
}
.on-edit-mode {
  display: flex;
  .btn {
    border: none;
    padding: 5px 15px;
  }
  .edit-bar {
    flex-grow: 1;
  }
}
</style>
