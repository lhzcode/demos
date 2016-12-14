!function(){

  // 将HTML转换为节点
  function html2node(str){
    var container = document.createElement('div');
    container.innerHTML = str;
    return container.children[0];
  }


  // 赋值属性
  // extend({a:1}, {b:1, a:2}) -> {a:1, b:1}
  function extend(o1, o2){
    for(var i in o2) if(typeof o1[i] === 'undefined'){
      o1[i] = o2[i]
    } 
    return o1
  }

  // 弹窗窗体
  var template = 
  '<div class="m-box">\
    <div class="box_align"></div>\
    <div class="box_wrap animated">\
      <div class="box_head">\
        错误内容\
        <span class="m-close"></span>\
      </div>\
      <div class="box_body"></div>\
    </div>\
  </div>';


  function box(options){
    options = options || {};
    // 即 div.m-box 节点
    this.container = this._layout.cloneNode(true);
    // body 用于插入自定义内容
    this.body = this.container.querySelector('.box_body');
    // 窗体节点，在应用动画时有用
    this.wrap = this.container.querySelector('.box_wrap');
    // 将options 复制到 组件实例上
    extend(this, options);
    this._initEvent();
  }


  //赋值给box原型
  extend(box.prototype, {

    _layout: html2node(template),

    setContent: function(content){
      if(!content) return;
      //支持两种字符串结构和DOM节点
      if(content.nodeType === 1){ 
        this.body.innerHTML = 0;
        this.body.appendChild(content);
      }else{
        this.body.innerHTML =content;
      }
 
    },

    // 显示弹窗
    show: function(content){
      if(!content) this.setContent(this.content);
      document.body.appendChild(this.container);
      animateClass(this.wrap, this.animation.enter);
      console.log(this.content);
      console.log(this.animation);
    },

    //移除弹窗
    hide: function(){
      var container = this.container;
      animateClass(this.wrap, this.animation.leave, function(){
        document.body.removeChild(container);
      })
      
    },

    // 初始化事件
    _initEvent: function(){

      this.container.querySelector('.m-close').addEventListener(
        'click', this._onClose.bind(this)
      )
    },

    _onClose: function(){
      this.onClose();
      this.hide();
    },
  })

window.box = box;
}()


