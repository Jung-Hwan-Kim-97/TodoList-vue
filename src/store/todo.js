import axios from "axios";
import { defineStore } from "pinia";

const END_POINT =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos";
const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202204",
  username: "KDT2_KimJungHwan",
};
export const useTodoStore = defineStore("todo", {
  state() {
    return {
      todoList: [],
      todoTitle: "",
      editTitle: "",
    };
  },
  actions: {
    //todo 목록 조회
    async readTodos() {
      try {
        const { data } = await axios({
          url: `${END_POINT}`,
          method: "GET",
          headers: {
            ...headers,
          },
        });
        this.todoList = data;
        console.log(this.todoList);
      } catch (err) {
        console.log(err);
      }
    },
    //todo 추가
    async addTodo() {
      const order = parseInt(Date.now());

      try {
        if (!this.todoTitle) {
          alert("내용을 입력해 주세요!");
          return;
        }
        const { data } = await axios({
          url: `${END_POINT}`,
          method: "POST",
          headers: {
            ...headers,
          },
          data: {
            title: this.todoTitle,
            order: order,
          },
        });
        console.log(data);
        await this.readTodos();
        this.todoTitle = "";
      } catch (err) {
        console.log(err);
      }
    },
    //todo 삭제
    async deleteTodo(id) {
      try {
        const { data } = await axios({
          url: `${END_POINT}/${id}`,
          method: "DELETE",
          headers: {
            ...headers,
          },
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    //todo 수정
    async editTodo(payload) {
      const { done, id, order } = payload;
      try {
        const { data } = await axios({
          url: `${END_POINT}/${id}`,
          method: "PUT",
          headers: {
            ...headers,
          },
          data: {
            title: this.editTitle,
            done,
            id,
            order,
          },
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
