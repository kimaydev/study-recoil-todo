import React from "react";
import { RecoilValueReadOnly, selector, useRecoilValue } from "recoil";
import { ITodo, todoListState } from "./TodoList";

type TodoListStateT = {
  totalTodo: number;
  totalTodoComplete: ITodo[];
  totalTodoUnComplete: ITodo[];
  todoRatioNum: number;
};

export const todoListNowState: RecoilValueReadOnly<TodoListStateT> = selector({
  // 구분자
  key: "todoListNow",
  get: ({ get }) => {
    const todoList: ITodo[] = get(todoListState);
    // todo 전체 갯수
    const totalTodo: number = todoList.length;
    // todo 완료 항목 수
    const totalTodoComplete: ITodo[] = todoList.filter(item => item.isComplete);
    // todo 미완료 항목 수
    const totalTodoUnComplete: ITodo[] = todoList.filter(
      item => !item.isComplete,
    );
    // 수행률
    const todoRatio: number =
      totalTodo === 0 ? 0 : (totalTodoComplete.length / totalTodo) * 100;
    const todoRatioNum: number = Math.round(todoRatio);
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
