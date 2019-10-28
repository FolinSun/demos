/**
 * Created by Folin on 2017-10-17.
 * 部分参考https://github.com/aui/artDialog
 */

;(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        // AMD或CMD
        define(function () {
            return factory;
        });
    } else {
        // Browser globals
        root.jqueryDialog = factory;
    }
})(this || (typeof window !== 'undefined' ? window : global), (function ($,win,doc) {

    /**
     * 默认的参数
     * @type {Object}
     */
    var defaults = {
        title: "",  //弹框标题
        content : "",   //弹层内容 参数支持String、HTMLElement类型
        width : "",   //宽度
        height : "",  //高度
        fixed: false,  // 是否固定定位 默认false
        isModal : false,   //是否使用遮罩，默认false
        backgroundColor: "#000",  //遮罩层颜色
        backdropOpacity: .7,   //遮罩层透明度 .7 或者70
        zIndex: 1000,  //层级
        isModalClose: false,  //点击空白处是否关闭，默认false
        autoClose: false,  //是否自动关闭，默认false
        okValue: "ok",  // 确定按钮文本
        ok: null,   // 确定按钮回调函数
        cancelValue: "cancel",  // 取消按钮文本
        cancel: null,  // 取消按钮回调函数
        cancelDisplay: true,  //为false时关闭按钮不显示
        buttons: [],  //自定义按钮
        open: false,  //判断对话框是否显示
        resetCls: null, //重置class
    };

    var innerHtml = {
        /**
         * 返回遮罩层的html结构
         * @type {String}
         * */
        modalTemplate: function () {
            return "<div class='dialog-modal'></div>";
        },
        /**
         * 返回弹出层结构
         * @type {String} title
         * */
        contentTemplate: function () {
            var HTML = "<div class='dialog-box'><div class='dialog-main' data-name='main'>" +
                "<div class='dialog-header' data-name='header'><div class='dialog-title' data-name='title'></div>" +
                "<span class='dialog-close' data-name='close'>×</span></div>" +
                "<div class='dialog-container' data-name='container'><div class='dialog-content' data-name='content'></div></div>" +
                "<div class='dialog-footer' data-name='footer'></div></div></div>";
            return HTML;
        },
        /**
         *  返回按钮html结构
         *  @
         * */
        buttosTemplate: function (id,value,disabled,current) {
            return "<button type='button' id='"+ id +"' "+ (disabled ? 'disabled' : '') + (current ? 'class="dialog-current"' : '') +">"+ value +"</button>"
        }
    };

    /**
     * PC and 移动端
     * */
    function isMobile(){
        var elem = document.documentElement;
        var isMobile = 'createTouch' in document && !('onmousemove' in elem) ||
            /(iPhone|iPad|iPod)/i.test(navigator.userAgent);
        return isMobile;
    }

    var jqueryDialog = function (options) {
        options.event = isMobile() ? "touchstart" : "click";
        options = $.extend({}, defaults, options);  //配置参数
        options._defaults = options;  //默认参数
        //返回对象方法
        return new jqueryDialog.create(options);
    };

    jqueryDialog.create = function (options) {
        var that = this;
        that.destroyed = false;
        that.timer = null;
        that.callbacks = {};  //对外接口（按钮回调方法对象）
        that.config = options;
        that._modal();
        that._template();
        that._clearTimer(that.timer);

        /**
         * 初始按钮数组
         * */
        if(!$.isArray(that.config.buttons)) that.config.buttons = [];

        //取消按钮
        if(that.config.cancel){
            that.config.buttons.push({
                id: "cancel", //id
                value: that.config.cancelValue,  //文本
                callback: that.config.cancel  //回调方法
            });
        }

        //确定按钮
        if(that.config.ok){
            that.config.buttons.push({
                id: 'ok',  //id
                value: that.config.okValue,  //文本
                callback: that.config.ok,  //回调方法
                isCur: true  //是否高亮
            });
        }

        //关闭按钮
        that._$("close").css({
            "display": that.config.cancelDisplay === false ? "none" : "block",
        }).on(that.config.event,function (event) {
            that._trigger("cancel");
            event.preventDefault();
        });


        /**
         * 参数方法
         * */
        $.each(that.config, function(name, value) {
            if (typeof that[name] === 'function') that[name](value);
        });
    };

    jqueryDialog.create.prototype = {
        destroyed: true, //判断对话框是否删除
        /**
         * 清除定时器
         */
        _clearTimer: function (timer) {
            if(timer){
                clearTimeout(timer);
                timer = null;
            }
        },
        /**
         * 构建遮罩层
         */
        _modal: function () {
            var Opacity = this.config.backdropOpacity;
            Opacity = (Opacity.toString().indexOf(".") > -1) ? Opacity : Opacity / 100;
            var modalStyleJson = {
                "background": this.config.backgroundColor,
                "opacity": Opacity,
                "z-index": this.config.zIndex
            };
            (this.config.fixed) ? modalStyleJson["position"] = "fixed" : modalStyleJson["height"] = doc.documentElement.clientHeight;
            this._backdrop = $(innerHtml.modalTemplate())
                .css(modalStyleJson).hide();
            if(this.config.isModal) this._backdrop.appendTo("body");
        },
        /**
         * 构建层弹框
         */
        _template: function () {
            var templateStyleJson = {};
            if(this.config.fixed) templateStyleJson["position"] = "fixed";
            templateStyleJson["z-index"] = this.config.zIndex + 2;

            this._dialog = $(innerHtml.contentTemplate())
                .css(templateStyleJson).appendTo("body").hide();
        },
        /**
         * 返回元素
         * @param { i } DOM元素名称
         */
        _$: function (i) {
            return this._dialog.find('[data-name=' + i + ']');
        },
        /**
         * 触发按钮回调函数
         * @param {id} id {String}  按钮id
         * */
        _trigger: function (id) {
            var fn = this.callbacks[id];
            //检测是否为方法 或者 方法是否有返回值
            return typeof fn !== 'function' || fn.call(this) !== false ? this.close().remove() : this;
        },
        /**
         * 设置弹框居中
         * */
        _center: function () {
            var popup = this._dialog, $window = $(win), $document = $(doc),
                scollTop = this.config.fixed ? 0 : $document.scrollTop(), //如果是固定居中，top值为0
                screenWidth = $window.width(), screenHeigth = $window.height(),
                popupWidth = popup.width(), popupHeight = popup.height(),
                left = (screenWidth - popupWidth) / 2,
                top = (screenHeigth - popupHeight) / 2 + scollTop;
            popup.css({
                left: Math.max(parseInt(left)) + 'px',
                top: Math.max(parseInt(top), scollTop) + 'px'
            })
        },
        /**
         * 获取事件缓存
         * */
        _getEventListener: function (type) {
            var listener = this._listener = {};
            if(!listener[type]) listener[type] = [];
            return listener[type];
        },
        /**
         * 点击空白处关闭弹框
         * */
        isModalClose: function () {
            var that = this;
            if (that.config.isModalClose) {
                if(!that.config.isModal){
                    that.config.isModal = true;
                    that._modal();
                    that._backdrop.insertBefore(that._dialog).css({
                        "opacity": 0,
                    });
                }
                //是否支持 "onmousedown" 事件
                that._backdrop.on("onmousedown" in document ? "mousedown" : "click", function() {
                    that._trigger("cancel");
                    return false; // 阻止抢夺焦点
                });
            }
            return this;
        },
        /**
         * 重置对话框位置
         * */
        resize: function () {
            this._center();
            return this;
        },
        /**
         * 添加事件
         * @param   {String}    事件类型
         * @param   {Function}  监听函数
         */
        addEventListener: function(type, callback) {
            this._getEventListener(type).push(callback);
            return this;
        },
        /**
         * 设置class
         * @param    {String}   class
         */
        resetCls: function (cls) {
            if(typeof cls === "string" && cls !== "") this._$("main").addClass(cls);
            return this;
        },
        /**
         * 设置内容
         * @param    {String, HTMLElement}   内容
         */
        content: function (html) {
            var $content = this._$("content");
            typeof html === "string" ? $content.html(html) : $content.append(html);
            return this.resize();
        },
        /**
         * 设置标题
         * @param    {String}   标题内容
         */
        title: function (txt) {
            this._$("title").text(txt)[txt ? "show" : "hide"]();
            return this;
        },
        /**
         * 设置宽度
         * @param    {String || Number}   宽度
         * */
        width: function (value) {
            this._$("container").css("width", value);
            return this.resize();
        },
        /**
         * 设置高度
         * @param    {String || Number}   高度
         * */
        height: function (value) {
            this._$("container").css("height", value);
            return this.resize();
        },
        /**
         * 设置按钮组
         * @param   id {String}  按钮id，必需
         * @param   value {String}  按钮显示文本，必需
         * @param   callback {Function}  回调函数，可选
         * @param   disabled  {Booleans}  禁止按钮点击，可选
         * @param   isCur  {Booleans}  按钮是否高亮
         */
        buttons: function (args) {
            var that = this;
            var html = '';

            that._$("footer")[(!args.length) ? "hide" : "show"]();

            //遍历按钮数组
            $.each(args,function (i, k) {
                that.callbacks[k.id] = k.callback; //回调方法
                html += innerHtml.buttosTemplate(k.id, k.value, k.disabled, k.isCur);
                //按钮点击事件
                that._$("footer").on(that.config.event, "[id="+ k.id +"]", function (event) {
                    event.preventDefault();
                    if(!this.getAttribute("disabled")){
                        that._trigger(k.id); //触发对应事件
                    }
                });
            });
            this._$('footer').html(html);
            return this;
        },
        /**
         * 显示浮层
         * */
        show: function () {
            var that = this;
            if(that.destroyed) return that;
            that.config.open = true;
            that._dialog.show();
            that._backdrop.show();
            $(win).on("resize", $.proxy(that.resize, that));
            //自动关闭弹出层
            if(that.config.autoClose && typeof that.config.autoClose === "number"){
                that.timer = setTimeout(function () {
                    that._trigger("cancel");
                },that.config.autoClose);
            }
            return that;
        },
        /**
         * 关闭浮层
         * */
        close: function () {
            if(!this.destroyed && this.config.open){
                this._dialog.hide();
                this._backdrop.hide();
                this.config.open = false;
                this._clearTimer(this.timer);
            }
            return this;
        },
        /**
         * 销毁浮层
         * */
        remove: function () {
            if(this.destroyed) return this;
            // 从 DOM 中移除节点
            this._dialog.remove();
            this._backdrop.remove();
            for (var i in this) {
                delete this[i];
            }
            return this;
        }
    };

    return jqueryDialog;
}(jQuery||Zepto,window,document)));