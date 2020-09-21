// import './index.css'
const json = require('./index.json')
import { add } from './other.js'
console.log(json, add(1, 2));

import pic from './pic1.jpg'
var img = new Image()
img.src = pic
img.classList.add('liukanshan')
var root = document.getElementById('root')
root.append(img)