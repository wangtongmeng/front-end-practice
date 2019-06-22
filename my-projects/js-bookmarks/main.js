// 1. 初始化数据
var hashA = init()
var keys = hashA['keys']
var hash = hashA['hash']

// 2. 生成搜索栏和键盘
createSearchBar()
// 遍历 keys，生成 kbd 标签
generateKeyboard(keys, hash)

// 3. 监听用户动作
listenToUser(hash)

// 下面是工具函数
function getFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name) || 'null')
}
function tag(tagName){
    return document.createElement(tagName)
}

function createSpan(textContent){
    var span = tag('span')
    span.textContent = textContent
    span.className = "text"
    return span
}
function createButton(id){
    var button = tag('button')
    button.textContent = 'Edit'
    button.id = id
    button.onclick = function(e){
        // e['target'] 就是用户点击的元素
        var button2 = e['target']
        var img2 = button2.previousSibling
        var key = button2['id'] // q w e r t
        var x = prompt('给我一个网址') // qq.com
        if(x) {
            hash[key] = x  // hash 变更
            img2.src = x + '/favicon.ico'
            img2.onerror = function(xxx){
                xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
            }
            localStorage.setItem('zzz', JSON.stringify(hash))
        }

    }
    return button
}
function createImage(domain){
    var img = tag('img')
    if(domain){
        img.src = domain + '/favicon.ico'
    }else{
        img.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    img.onerror = function(xxx){
        xxx.target.src = '//i.loli.net/2017/11/10/5a05afbc5e183.png'
    }
    return img
}
function init(){
    var keys = {
        '0': {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',length:10},
        '1': {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',length:9},
        '2': {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',length:7},
        'length': 3
    }
    var hash = {"q":"https://www.baidu.com","w":"http://www.163.com","e":"https://www.tmall.com","r":"http://www.ifeng.com","t":"https://www.taobao.com","u":"http://www.iconfont.cn","i":"https://www.jd.com","o":"https://www.suning.com","a":"http://bj.58.com","s":"https://chaoshi.tmall.com","m":"http://www.gmw.cn","z":"http://www.people.com.cn","y":"http://www.163.com","p":"https://www.xin.com","d":"https://www.autohome.com.cn","f":"http://xian.fang.com","g":"https://www.douyu.com","h":"https://www.guazi.com","j":"https://www.booking.com","k":"https://www.qunar.com","l":"https://tuijian.hao123.com","x":"http://www.xinhuanet.com","c":"http://www.cctv.com","v":"http://cn.chinadaily.com.cn","b":"http://www.ce.cn","n":"http://www.china.com.cn"}
    // 取出 localStorage 中的 zzz 对应的 hash
    var hashInLocalStorage = getFromLocalStorage('zzz')
    if(hashInLocalStorage){
        hash = hashInLocalStorage
    }
    return {
        "keys": keys,
        "hash": hash
    }

}
function generateKeyboard(keys, hash){
        for(var index=0; index< keys['length']; index = index+1 ){
            var div = tag('div')
            div.className = 'row'
            main.appendChild(div)
            var row = keys[index]  // 第一个数组  第二个数组  第三个数组
            for(var index2 =0;index2< row['length']; index2 = index2 + 1){
                var span = createSpan(row[index2])
                var button = createButton(row[index2])
                var img = createImage(hash[row[index2]])
                var kbd = tag('kbd')
                kbd.className = 'key'
                kbd.appendChild(span)
                kbd.appendChild(img)
                kbd.appendChild(button)
                div.appendChild(kbd)
            }
        }


}
function listenToUser(hash){

    document.onkeypress = function(letter){
        var input = document.querySelector("input");
        // 根据input聚焦不跳转，不聚焦跳转
        if (!input.getAttribute("autofocus")){
            var key = letter['key'] // q w e
            var website = hash[key]
            //location.href = 'http://'+website
            window.open(website, '_blank')
        } else {

        }
    }
    createInputEvent()
    createSearchEvent()
}
function createSearchBar(){
    var searchWrapper = document.querySelector("#search-wrapper")
    var form = document.createElement("form")
    var input = document.createElement("input")
    var baidu = document.createElement("a")
    var google = document.createElement("a")
    form.className = 'search'
    input.setAttribute("type","text")
    input.setAttribute("spellcheck","false")
    input.setAttribute("placeholder","Search")
    baidu.setAttribute("class","baidu")
    google.setAttribute("class","google")
    baidu.textContent = "百度"
    google.textContent = "谷歌"
    searchWrapper.appendChild(form)
    form.appendChild(input)
    form.appendChild(baidu)
    form.appendChild(google)
}
function createInputEvent(){
    var body = document.querySelector("body");
    var input = document.querySelector("input");
    body.onclick = function (e){
        e.target.localName == "input" ? input.setAttribute("autofocus","autofocus"): input.removeAttribute("autofocus");
    }
}
function createSearchEvent(){
    var searchWrapper = document.querySelector("#search-wrapper")
    var search_buttons = searchWrapper.querySelectorAll("a");
    var form = document.querySelector('form');
    form.addEventListener('submit',()=>{
        var question = document.querySelector("input").value;
        if (question) {
            window.open("https://www.baidu.com/s?wd=" + question);
        } else {
            alert("你好像需要输入点什么～");
        }
    }); //默认百度搜索
    for (var i = 0; i < search_buttons.length; i++) {
        search_buttons[i].onclick = function (e){
            var question = document.querySelector("input").value;
            if (question) {
                switch(e.target.className) {
                    case "baidu": window.open("https://www.baidu.com/s?wd=" + question); break;
                    case "google": window.open("https://www.google.com/search?q=" + question); break;
                }
            } else {
                alert("你好像需要输入点什么～");
            }
        }
    }
}
