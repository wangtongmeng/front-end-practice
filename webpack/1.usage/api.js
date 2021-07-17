let express = require('express');
let app = express();
app.get('/users',(req,res)=>{
    res.json({code:0,data:[{id:1}]});
});
app.listen(3000, () => {
    console.log('启动3000端口');
});