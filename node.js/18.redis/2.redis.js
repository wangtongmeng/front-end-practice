const redis = require('redis');
const client = redis.createClient(6379, '127.0.0.1', {
    password: 'wtm'
});


client.hset('obj','name','zs');
client.hset('obj','age',18);

client.hkeys('obj',function (err,keys) {
    keys.forEach(key=>{
        console.log(key); // name age
        client.hget('obj',key,redis.print) // Reply: zs Reply: 18
    })
})