let mysql = require('mysql');
let Promise = require('bluebird');
let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'cms'
});
//连接数据库
connection.connect();
let query = Promise.promisify(connection.query).bind(connection);
query('SELECT * FROM account').then((results)=>{
    console.log(results);
});
/* connection.query('SELECT * FROM account',function(error,results,fields){
 console.log(error);
 console.log(results);
 console.log(fields);
}); */