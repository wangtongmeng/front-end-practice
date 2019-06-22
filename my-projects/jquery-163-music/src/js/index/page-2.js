{
    let view = {
        el:'.page-2',
        init(){
            this.$el = $(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hide(){
            this.$el.removeClass('active')
        }
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEventHub()
            this.loadModule1()
        },
        bindEventHub(){
            window.eventHub.on('selectTab', (tabName)=>{
                if(tabName === 'page-2') {
                    this.view.show()
                } else {
                    this.view.hide()
                }
            })
        },
        loadModule1(){
            let script = document.createElement('script');
            script.src = './js/index/page-2-1.js';
            document.body.appendChild(script)
        },
    }
    controller.init(view, model)
}