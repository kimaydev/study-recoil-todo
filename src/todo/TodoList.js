import React from "react";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import { atom, useRecoilValue } from "recoil";

/*
  1. todo 목록을 생성한다.
    - 컴포넌트 위치 및 배치와 상관없이 앱 전체에 활용 된다.  
    - Recoil의 atom(state/store)을 활용한다.    
*/
export const todoListState = atom({
  // atom 구분자
  key: "todoListState",
  // 초깃값
  default: [],
});

const TodoList = ({ item }) => {
  // 2. atom을 읽거나 쓰거나 활용
  const todoList = useRecoilValue(todoListState);
  console.log(todoList);

  return (
    <>
      <h1>TodoList</h1>
      <TodoItemCreator />
      <div>
        {todoList.map((item) => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default TodoList;
