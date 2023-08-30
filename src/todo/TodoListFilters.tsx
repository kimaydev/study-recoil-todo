import React from "react";
import { RecoilState, atom, useRecoilState } from "recoil";
// atom의 selector 활용해보기
// 1. atom 생성
export const todoListFilterState: RecoilState<string> = atom<string>({
  // 키 이름 작성(atom 구분자 역할)
  key: "todoListFilterState",
  // 초깃값
  default: "Show All",
});
const TodoListFilters = () => {
  // 생성한 atom을 이용함
  const [filter, setFilter] = useRecoilState<string>(todoListFilterState);
  // 1.
  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = e => {
    setFilter(e.target.value);
  };
  // 2.
  // const handleOnChange = ({ target }) => {
  //   setFilter(target.value);
  // };
  // 3.
  // const handleOnChange = ({target:{value}}) => {
  //   setFilter(value);
  // };
  return (
    <>
      Filter:
      <select value={filter} onChange={handleOnChange}>
        <option value="Show All">전체보기</option>
        <option value="Show Complete">완료목록</option>
        <option value="Show Uncomplete">미완료목록</option>
      </select>
    </>
  );
};

export default TodoListFilters;
