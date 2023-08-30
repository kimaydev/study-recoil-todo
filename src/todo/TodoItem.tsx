import React from "react";
import { useRecoilState } from "recoil";
import { ITodo, todoListState } from "./TodoList";

// type 또는 interface는 함수 타입도 정의가 가능하다.
type Helper = (arr: ITodo[], index: number, newValue: ITodo) => ITodo[];
// type 타입이름 = (매개변수별 타입 지정) => return 값 타입 지정
// 반드시 형식을 지켜줘야 한다.
type DeleteType = (arr: ITodo[], index: number) => ITodo[];

// const TodoItem = ({ item }) => {
// const TodoItem = (props:ITodo) => {
const TodoItem = ({ item }: { item: ITodo }) => {
  // 1. atom state를 읽어온다.
  // 값을 읽을 때는 useRecoilValue
  // 값을 수정할 때는 useSetRecoilState
  // ↓ 값과 set을 한꺼번에 활용
  // const [todoList, setTodoList] = useRecoilState<ITodo[]>(todoListState);
  const [todoList, setTodoList] = useRecoilState<Array<ITodo>>(todoListState);
  // 2. 순서값을 알아내자
  // item의 id값을 읽어서 보관하자
  // 삭제 및 업데이트 용도로 활용
  const idx = todoList.findIndex(todoItem => item.id === todoItem.id);

  // 타이틀 수정하기 함수
  // function replaceItemIndex(arr, index, newValue) {}
  // const replaceItemIndex = (arr, index, newValue) = (원본배열, 순서번호, 업데이트할객체) => {}
  const replaceItemIndex: Helper = (arr, index, newValue) => {
    // 현재 todoList의 idx에 해당하는 내용을 수정한다.
    // [현재 수정되는 배열의 이전 요소들, 현재 수정된 요소, 현재 수정되는 배열의 나머지 것들]

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
  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = e => {
    // e.preventDefault();
    // title 수정하기
    const newTodoList = replaceItemIndex(todoList, idx, {
      ...item,
      title: e.target.value,
    });
    // atom을 업데이트
    setTodoList(newTodoList);
  };

  const handleChangeIsComplete: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    // e.preventDefault();
    // isComplete 토글
    // 이전에 타이틀을 수정해서 idx를 통해 새로운 배열을 만든다
    // isComplete를 수정해서 idx 이용해 새로운 배열을 만드는 것 [이전, 새로움, 다음]
    // isComplete를 수정하기
    const newTodoList = replaceItemIndex(todoList, idx, {
      ...item,
      isComplete: !item.isComplete,
    });
    // atom을 업데이트
    setTodoList(newTodoList);
  };

  // 타이틀 삭제하기 함수
  const deleteItemIndex: DeleteType = (arr, index) => {
    // [현재 idx의 이전 요소들, 현재 idx 이후의 요소들]
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  };
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = e => {
    // e.preventDefault();
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
