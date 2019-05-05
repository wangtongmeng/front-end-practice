var progressBtn = document.getElementById('progress_btn')
var totalProgress = document.getElementById('total_progress')

var myTween=new TweenMax('.box', 3, {
  x: 500,
  repeat: 3,
  repeatDelay:2, 
  onUpdate: function () {
    totalProgress.innerText = this.progress().toFixed(2)
  }
});


progressBtn.addEventListener('click', function () {
  myTween.progress( 0.25 )
})