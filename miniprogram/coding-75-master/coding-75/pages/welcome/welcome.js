Page({
    onTap: function (event) {
        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        
        wx.switchTab({
            url: "../posts/post"
        });
      
    },
    onReachBottom:function(event){
      console.log('asfasdfa')
    }
})