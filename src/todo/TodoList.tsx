import React from "react";
import TodoItemCreator from "./TodoItemCreator";
import TodoItem from "./TodoItem";
import { atom, selector, useRecoilValue } from "recoil";
import TodoListFilters, { todoListFilterState } from "./TodoListFilters";
import TodoListState from "./TodoListState";

// interface를 이용해서 todo목록의 데이터형을 지정한다.
export interface ITodo {
  id: number;
  title: string;
  isComplete: boolean;
}

/*
  1. todo 목록을 생성한다.
    - 컴포넌트 위치 및 배치와 상관없이 앱 전체에 활용 된다.  
    - Recoil의 atom(state/store)을 활용한다.    
*/
export const todoListState = atom<Array<ITodo>>({
  // atom 구분자
  key: "todoListState",
  // 초깃값
  default: [], // 반드시 ITodo의 형식을 따라야 한다
});

// selector :
// todoListFilterState와 todoListState를 활용
// 현재 2개의 atom을 이용해서 새로운 state를 만들겠다.
// 현재 2개의 atom을 이용해서 필터된 state를 만들겠다.
// 현재 2개 중에 하나만 변경이 되어도 실행이 될 selector를 만듦
const filteredTodoListState = selector({
  // selector 구분자
  key: "filteredTodoListState",
  // 값을 읽음
  get: ({ get }) => {
    // TodoList를 관리하는 atom 객체를 읽겠다.
    const list = get(todoListState);
    // TodoListFilter를 관리하는 atom 객체를 읽겠다.
    const filter = get(todoListFilterState);
    // atom의 값 체크
    switch (filter) {
      case "Show Complete":
        // 완료목록 정리 (filter : 참이면 return )
        return list.filter(item => item.isComplete);
      case "Show Uncomplete":
        // 미완료목록 정리
        return list.filter(item => !item.isComplete);
      default:
        return list;
    }
  },
});

const TodoList = () => {
  // 2. atom을 읽거나 쓰거나 활용
  const todoList = useRecoilValue(todoListState);
  console.log(todoList);

  return (
    <>
      <h1>TodoList</h1>
      <TodoListFilters />
      <TodoListState />
      <TodoItemCreator />
      <div>
        {todoList.map(item => (
          <TodoItem key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};

export default TodoList;
