import React from "react";
import { useRecoilState } from "recoil";
import { todoListState } from "./TodoList";

const TodoItem = ({ item }) => {
  // 1. atom state를 읽어온다.
  // 값을 읽을 때는 useRecoilValue
  // 값을 수정할 때는 useSetRecoilState
  // ↓ 값과 set을 한꺼번에 활용
  const [todoList, setTodoList] = useRecoilState(todoListState);
  // 2. 순서값을 알아내자
  // item의 id값을 읽어서 보관하자
  // 삭제 및 업데이트 용도로 활용
  const idx = todoList.findIndex((todoItem) => item.id === todoItem.id);

  // 타이틀 수정하기 함수
  // function replaceItemIndex(arr, index, newValue) {}
  // const replaceItemIndex = (arr, index, newValue) = (원본배열, 순서번호, 업데이트할객체) => {}
  const replaceItemIndex = (arr, index, newValue) => {
    // index만큼 배열을 추출한다.
    // slice 구문 (배열.slice(시작인덱스, 갯수))
    /*
    예)
    [a, b, c, d] ===> [a, b, f, d] // c를 f로 수정
    [0, 1, 2, 3] ===> // c의 인덱스 번호는 2번이다
    */
    // const step1 = [...arr.slice(0, index)];
    // console.log("step1", step1);
    // {item: 2, title: f, isComplete: false}
    // const step2 = newValue;
    // 나머지
    // const step3 = [...arr.slice(index + 1)];
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };
  const handleChangeTitle = (e) => {
    e.preventDefault();
    // title 수정하기
    const newTodoList = replaceItemIndex(todoList, idx, {
      ...item,
      title: e.target.value,
    });
    // atom을 업데이트
    setTodoList(newTodoList);
  };

  const handleChangeIsComplete = (e) => {
    e.preventDefault();
    // isComplete 토글
  };

  // 타이틀 삭제하기 함수
  const deleteItemIndex = (arr, index) => {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  };
  const handleDelete = (e) => {
    e.preventDefault();
    // todo 삭제
    const newList = deleteItemIndex(todoList, idx);
    setTodoList(newList);
  };
  return (
    <div>
      <input type="text" value={item.title} onChange={handleChangeTitle} />
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={handleChangeIsComplete}
      />
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default TodoItem;
