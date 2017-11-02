/**
 * Created by Folin on 2017-11-02.
 */

// Uses CommonJS, AMD or browser globals to create a jQuery plugin.

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    /**
     * 默认的参数
     * @type {Object}
     */
    var defaults = {
        child: "span",  //导航
        content: ".tab-item", //内容
        event: "click",  //触发事件
        current: "current",  //选中时的class
        activeIndex: 0,  //默认选中导航项的索引
    };

    /**
     * 构造函数
     * @type element {HTMLElement} dom
     * @type options {Object} 参数
     */
    var tabs = function(element, options) {
        this.element = element;
        this.$element = $(element);
        this._defaults = defaults;
        this.config = $.extend({}, defaults, options);
    };

    tabs.prototype = {
        /**
         * 初始化
         * */
        init: function () {
            var $children = $(this.config.child, this.$element);
            var $item = $(this.config.content, this.$element);
            $item.hide().eq(this.config.activeIndex).show();
            $children.eq(this.config.activeIndex).addClass(this.config.current);
            this.tab($children,$item);
        },
        tab: function (children,dom) {
            var self = this;
            children.on(self.config.event,function () {
                var $this = $(this);
                var _index = $this.index();
                $this.addClass(self.config.current).siblings().removeClass(self.config.current);
                dom.eq(_index).show().siblings().hide();
                return false;
            });
        }
    };

    /**
     * 创建jquery插件
     * */
    $.fn.tabs = function (options) {
        return this.each(function () {
            new tabs(this, options).init();
        });
    };
}));