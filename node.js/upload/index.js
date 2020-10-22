// https://www.cnblogs.com/Cc-qm/p/12489356.html
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();


let objMulter = multer({
  dest: "./public/upload"
});
//实例化multer，传递的参数对象，dest表示上传文件的存储路径
app.use(objMulter.any()) //any表示任意类型的文件
// app.use(objMulter.image())//仅允许上传图片类型


app.use(express.static("./public")); //将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面


app.post("/api/reg", (req, res) => {
  let oldName = req.files[0].path; //获取名字
  //给新名字加上原来的后缀
  let newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
  fs.renameSync(oldName, newName); //改图片的名字
  res.send({
    err: 0,
    url: "http://localhost:8083/upload/" +
      req.files[0].filename +
      path.parse(req.files[0].originalname).ext //该图片的预览路径
  });
});





app.listen(8083, "localhost", () => {
  console.log("监听8083端口成功"); //监听成功执行的回调函数
})