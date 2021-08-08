const mysql = require('mysql');
const connection = mysql.createConnection({
   user:'root',
   password:'root',
   host:'localhost',
   database:'cms'
});
connection.connect();
connection.beginTransaction(function(err){
    console.log('transaction',err);
    connection.query('update account set balance=balance-10 where id = 1',function(err){
       console.log('id=1',err);
        if(err){
            connection.rollback(err=>{throw err});
            throw err;
        }else{
            connection.query('update account set balance=balance+10 where id=2',function(err){
                console.log('id=2',err);
                if(err){
                    connection.rollback(err=>{throw err});
                    throw err;
                }else{
                    connection.commit(function(err){
                        console.log(err);
                        console.log('事务提交成功')
                    });
                }
            });
        }
    });
});