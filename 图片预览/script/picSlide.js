/**
 * Created by Folin on 2017-10-17.
 */

// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function (factory) {
    if (typeof define === 'function' && (define.amd || define.cmd) && !jQuery) {
        // AMD/CMD
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

    };

    /**
     * 构造函数
     * @type element {HTMLElement} dom
     * @type options {Object} 参数
     */
    var picSlide = function(element, options) {
        this.element = element;
        this.$element = $(element);
        this.config = $.extend({}, defaults, options);
        this._defaults = defaults;
    };

    picSlide.prototype = {
        /**
         * 初始方法
         * */
        init: function () {
            
        },

    };

    $.fn.jqueryPicSlide = function (options) {
        return this.each(function () {
            new picSlide(this, options).init();
        });
    };
}));
