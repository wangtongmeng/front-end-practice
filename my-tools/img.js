// img2Base64，在线图片转base64

//传入图片路径，返回base64
export const img2Base64 = (imgSrc, width, height) => { // width,height选填
    var image = new Image()
    image.crossOrigin = ''
    image.onload =function (){
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : img.width; //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        canvas.height = height ? height : img.height
        var ctx = canvas.getContext("2d")
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        var dataURL = canvas.toDataURL()
        return dataURL
    }
    image.src = imgSrc
}