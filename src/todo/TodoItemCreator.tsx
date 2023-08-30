import React, { useState } from "react";
import { ITodo, todoListState } from "./TodoList";
import { useSetRecoilState } from "recoil";

// id 증가
let id = 0;
// id 값을 증가시킨다
const getId = () => id++;

const TodoItemCreator = () => {
  // 새로운 todo 아이템 생성
  // Recoil의 atom을 업데이트
  const setTodoList = useSetRecoilState(todoListState);

  // 할일 입력하기
  const [inputValue, setInputValue] = useState<string>("");
  // ChangeEvent 처리법 1번
  // const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };
  // ChangeEvent 처리법 2번
  // const handleOnchange: React.ChangeEventHandler<HTMLInputElement> = e => {
  //   setInputValue(e.target.value);
  // };
  // ChangeEvent 처리법 3번 - 객체 구조 분해 할당
  const handleOnchange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { value },
  }) => {
    setInputValue(value);
  };

  const addTodo = () => {
    // console.log("할일 추가");
    // 4. atom 내용 추가하기
    setTodoList((prev: Array<ITodo>) => {
      return [
        ...prev, // 이전값(prev)를 복사하고(...),
        { id: getId(), title: inputValue, isComplete: false },
      ]; // 새로운 객체로 반환함
    });
    // 입력 초기화
    setInputValue("");
  };
  return (
    <div>
      <h2>할일 생성하기</h2>
      <div>
        <input type="text" value={inputValue} onChange={handleOnchange} />
        <button onClick={addTodo}>할일 추가</button>
      </div>
    </div>
  );
};

export default TodoItemCreator;
