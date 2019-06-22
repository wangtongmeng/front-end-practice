{
    let view = {
        el: 'main',
        init(){
            this.$el = $(this.el)
        },
        template:`
            <form class="form">
                <div class="row">
                    <label>
                        歌名
                    </label>
                        <input name="name" type="text" value="__name__">
    
                </div>
                <div class="row">
                    <label>
                        歌手
                    </label>
                    <input name="singer" type="text" value="__singer__">
                </div>
                <div class="row">
                    <label>
                        外链
                    </label>
                    <input name="url" type="text" value="__url__">
                </div>
                <div class="row">
                    <label>
                        序号
                    </label>
                    <input name="number" type="text" value="__number__">
                </div>
                <div class="row">
                    <label>
                        封面
                    </label>
                    <input name="cover" type="text" value="__cover__">
                </div>
                <div class="row">
                    <label>
                        歌词
                    </label>
                    <textarea name="lyrics" cols=52 rows=10>__lyrics__</textarea>
                </div>
                <div class="row actions">
                        <button type="submit">保存</button>
                        <button id="delete" type="button">删除</button>
                </div>
            </form>
        `,
        render(data = {}) {   // es6语法，如果用户没有传data或者data是undefined,默认执行data等于空对象
            let placeholders = ['name', 'singer', 'url', 'id','cover','lyrics','number']
            let html = this.template
            placeholders.map((string)=>{
                html = html.replace(`__${string}__`, data[string] || '')
            })
            $(this.el).html(html)
            if(data.id){
                $(this.el).prepend('<h1>编辑歌曲</h1>')
            } else {
                $(this.el).prepend('<h1>新建歌曲</h1>')
            }
        },
        reset(){
            this.render({})  // 怎么不是 this.view.render ?
        }
    }
    let model = {
        data:{
            name:'', singer:'', url:'', id:'',cover:'',lyrics:'',number:''
        },
        update(data){
            var song = AV.Object.createWithoutData('Song', this.data.id)
            song.set('name', data.name)
            song.set('singer', data.singer)
            song.set('url', data.url)
            song.set('cover',data.cover);
            song.set('lyrics',data.lyrics);
            song.set('number',data.number);
            return song.save().then((response)=>{
                Object.assign(this.data, data)
                return response
            })
        },
        create(data){
            // 声明类型
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name',data.name);
            song.set('singer',data.singer);
            song.set('url',data.url);
            song.set('cover',data.cover);
            song.set('lyrics',data.lyrics);
            song.set('number',data.number);
            return song.save().then( (newSong) => {
                let {id, attributes} = newSong
                // this. data = {id, ...attributes}
                Object.assign(this.data,{id, ...attributes} )  // 把id和attributes的所有属性全部覆盖到data上
            },  (error) => {
                console.error(error);
            });
        },
        delete(id){
            let song = AV.Object.createWithoutData('Song', id);
            return song.destroy().then(function (success) {
                // 删除成功
                console.log('删除成功',success)
                return success
            }, function (error) {
                // 删除失败
            });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
            this.view.render(this.model.data)
            window.eventHub.on('select',(data)=>{
                this.model.data = data
                this.view.render(this.model.data)
            })
            window.eventHub.on('new',(data)=>{
                if(this.model.data.id) {
                    this.model.data = {
                        name: '', url: '', id: '', singer: ''
                    }
                }else {
                    Object.assign(this.model.data, data)
                }
                this.view.render(this.model.data)
            })

        },
        create(){
            let needs = 'name singer url cover lyrics number'.split(' ')
            let data ={}
            needs.map((string)=>{
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.create(data)
                .then(()=>{
                    this.view.reset()
                    // this.model.data === 'ADDR 108'
                    let string = JSON.stringify(this.model.data)
                    let object = JSON.parse(string)    // 对象深拷贝
                    window.eventHub.emit('create', object)
                })
        },
        update(){
            let needs = 'name singer url cover lyrics number'.split(' ')
            let data ={}
            needs.map((string)=>{
                data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.update(data)
                .then(()=>{
                    window.eventHub.emit('update', JSON.parse(JSON.stringify(this.model.data)))
                })

        },
        bindEvents(){
            this.view.$el.on('submit','form', (e)=>{  // 事件委托
                e.preventDefault()
                if(this.model.data.id) {
                    this.update()
                } else {
                    this.create()
                }
            })
            this.view.$el.on('click','#delete',()=>{
                // console.log(this.model.data.id)
                this.model.delete(this.model.data.id)
                    .then(()=>{
                        alert('删除成功');
                        location.reload()
                    })
            })
        }
    }
    controller.init(view, model)
}
