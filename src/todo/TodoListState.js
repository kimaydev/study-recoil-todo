import React from "react";
import { selector, useRecoilValue } from "recoil";
import { todoListState } from "./TodoList";

export const todoListNowState = selector({
  // 구분자
  key: "todoListNow",
  get: ({ get }) => {
    const todoList = get(todoListState);
    // todo 전체 갯수
    const totalTodo = todoList.length;
    // todo 완료 항목 수
    const totalTodoComplete = todoList.filter((item) => item.isComplete);
    // todo 미완료 항목 수
    const totalTodoUnComplete = todoList.filter((item) => !item.isComplete);
    // 수행률
    const todoRatio =
      totalTodo === 0 ? 0 : (totalTodoComplete.length / totalTodo) * 100;
    const todoRatioNum = Math.round(todoRatio);
    return {
      totalTodo,
      totalTodoComplete,
      totalTodoUnComplete,
      todoRatioNum,
    };
  },
});

const TodoListState = () => {
  // 값을 읽기
  const { totalTodo, totalTodoComplete, totalTodoUnComplete, todoRatioNum } =
    useRecoilValue(todoListNowState);
  return (
    <>
      <ul>
        <li>전체할일: {totalTodo}</li>
        <li>완료: {totalTodoComplete.length}</li>
        <li>미완료: {totalTodoUnComplete.length}</li>
        <li>수행률: {todoRatioNum}%</li>
      </ul>
    </>
  );
};

export default TodoListState;
