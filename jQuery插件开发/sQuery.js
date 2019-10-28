/**
 * Created by folin on 2016/2/16
 */

/*

//jQuery插件开发
//方法一
;(function ($) {
    $.fn.myPlugin = function(o){
        var defaults = {
            'color': 'red',
            'fontSize': '12px'
        };
        /** 
         * 将一个空对象做为第一个参数，defaults和用户传递的参数对象紧随其后，这样做的好处是所有值被合并到这个空对象上，保护了插件里面的默认值。
         * {}        空对象，用来接口参数值
         * defaults  默认参数
         * o         外部传递参数
        /
        o = $.extend({},defaults,o);
        return this.each(function () {
            var self = $(this);
            self.css({
                'color': o.color,
                'fontSize': o.fontSize
            });
        });
    };
})(jQuery);


//方法二
;(function ($) {
    $.fn.myPlugin = function (o) {
        o = $.extend({
            'color': 'red',
            'fontSize': '12px'
        }, o || {}); //如果o为 null 或 undefined，就把 {} 赋给o，如果 o 不为 null，则 o为 o
        return this.each(function () {
            var self = $(this);
            self.css({
                'color': o.color,
                'fontSize': o.fontSize
            });
        });
    };
})(jQuery);
*/


// 面向对象的插件开发
/**
 *   将系统变量以参数形式传递到插件内部也是个不错的实践。
 *   当我们这样做之后，window等系统变量在插件内部就有了一个局部的引用，可以提高访问速度，会有些许性能的提升。
 */
; (function ($, window, document, undefined) {
    var defaults = {  //插件默认设置
        'color': 'red',
        'fontSize': '12px',
        'textDecoration': 'none',
        isMouseenter: true,  // 是否有鼠标获取焦点事件
        isMouseout: true, // 是否有鼠标离开焦点事件
        mouseenterFun: function () { },
        mouseoutFun: function () { }
    },
    Beautifier = function (element, options) {  //插件的构造函数
        this.element = element;
        this.$element = $(element);
        this.config = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.version = 'v1.0.0'; //版本号
    };

    //原型方法
    Beautifier.prototype = {
        //初始化
        init: function () {
            this.beautify();
            this.mouseenter();
            this.mouseout();
        },
        beautify: function () {
            this.$element.css({
                'color': this.config.color,
                'fontSize': this.config.fontSize,
                'textDecoration': this.config.textDecoration,
            });
        },
        mouseenter: function () {
            var self = this;
            self.$element.on("mouseenter", function () {
                self.config.mouseenterFun();
            });
        },
        mouseout: function () {
            var self = this;
            self.$element.on("mouseout", function () {
                self.config.mouseoutFun();
            });
        }
    };

    //创建jquery插件
    $.fn.myPlugin = function (options) {
        return this.each(function () {
            new Beautifier(this, options).init();  //实例化对象并且初始化
        });
    };
})(jQuery, window, document);
