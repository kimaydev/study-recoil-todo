import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// atom을 활용하기 위한 라이브러리 적용
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // atom(recoil에서의 state 개념) 을 활용할 수 있다.
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
