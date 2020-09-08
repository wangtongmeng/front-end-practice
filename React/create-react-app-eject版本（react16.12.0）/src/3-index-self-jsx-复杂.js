import React from 'react';
import ReactDOM from 'react-dom'; // 从react-dom中导入一个ReactDOM，逗号后面的内容时把ReactDOM这个对象进行解构 <=> import {render} from 'react-dom';

import {createElement, render} from './3-self-jsx-复杂'

let root = document.getElementById('root');

let objJSX = createElement("h1", {
  id: "box",
  className: "box",
  style: {
    color: 'red'
  }
}, createElement("h2", {
  className: "title"
}, "\u7CFB\u7EDF\u63D0\u793A"), createElement("div", {
  className: "content"
}, "\u6E29\u99A8\u63D0\u793A\uFF1A\u8BED\u6CD5\u9519\u8BEF"), "\u6B64\u4E3A\u6D4B\u8BD5");

render(objJSX, root)

