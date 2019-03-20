 import {HTTP} from '../utils/http.js'

 class LikeModel extends HTTP {
   // 传参使用 category 表示类型，是因为 type 是 js 的保留关键字
   like(behavior, artID, category) {
     let url = behavior=='like'?'like': 'like/cancel'
     this.request({
       url: url,
       method: 'POST',
       data: {
         art_id: artID,
         type: category
       }
        // 这里不需要 success 的结果
     })
   }
 }

 export {LikeModel}