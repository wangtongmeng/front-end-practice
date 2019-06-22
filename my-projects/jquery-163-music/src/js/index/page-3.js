{
    let view = {
        el:'.page-3',
        init(){
            this.$el = $(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hide(){
            this.$el.removeClass('active')
        },
        template:`
        <li>
            <a id="search-a" href="./song.html?id={{song.id}}">{{song.name}}</a>
        </li>
        `,
        render(data){
            let {songs} = data
            songs.map((song)=>{
                let $li = $(this.template
                    .replace('{{song.name}}',song.name)
                    .replace('{{song.id}}', song.id))
                $('#searchResult').append($li)
            })
            $('#lastestMusicLoading-2').remove()
        },
        renderSearch(value){
            $('#search-h2').html(`搜索"${value}"`)
        },
        renderResult(songs){
            songs.map((song)=>{
                let $li = $(this.template
                    .replace('{{song.name}}',song.name)
                    .replace('{{song.id}}',song.id))
                $('#search-list').append($li)
            })
        },
    }
    let model = {
        data: {
            songs: []
        },
        find(){
            let query = new AV.Query('Song');
            return query.find().then((songs)=>{
                this.data.songs = songs.map((song)=>{
                    return Object.assign({id:song.id},song.attributes)
                })
                return songs
            })
        }

    }
    let controller = {
        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.model.find().then(()=>{
                this.view.render(this.model.data)
            })
            this.bindEventHub()
            this.bindEvents()
        },
        bindEventHub(){
            window.eventHub.on('selectTab', (tabName)=>{
                if(tabName === 'page-3') {
                    this.view.show()
                } else {
                    this.view.hide()
                }
            })
        },
        bindEvents(){
            this.onSearch()
            this.clear()
        },
        onSearch(){
            this.view.$el.on('input','#search', (e)=>{
                // 拿到搜索框的value
                let value = e.currentTarget.value
                if (value) {
                    // 隐藏展示列表和清除按钮, 显示搜索结果栏
                    $('#top-search').addClass('hide')
                    $('#clear-button').removeClass('hide')
                    $('#top-search-result').removeClass('hide')
                    // 显示搜索值
                    this.view.renderSearch(value)
                    // 根据搜索结果展示内容
                    let newSongs = this.model.data.songs.filter((song)=>{return value === song.name})
                    if(newSongs.length) {
                        this.view.renderResult(newSongs)
                        $('#not-found').addClass('hide')
                    } else {
                        $('#not-found').removeClass('hide')
                        $('#search-list').html('')
                    }
                } else {
                    $('#clear-button').addClass('hide')
                    $('#top-search').removeClass('hide')
                    $('#top-search-result').addClass('hide')
                }
            })
        },
        clear(){
            this.view.$el.on('click','.clear-button',()=>{
                //清空搜索框，隐藏自己、搜索栏，显示歌曲列表
                $('#search').val('')
                $('#top-search-result').addClass('hide')
                $('.top-search').removeClass('hide')
                $('.clear-button').addClass('hide')
            })
            this.view.$el.on('click','#search-list',()=>{
                $('#search').val('');
            })
        }

    }
    controller.init(view, model)
}