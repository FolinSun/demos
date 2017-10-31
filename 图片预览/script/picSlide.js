/**
 * Created by Folin on 2017-10-17.
 */


;(function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(["jquery"], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {
    function slideShow(element, options) {
        this.element = $(element);
        this.$element = $(this.element);
        this.config = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.version = 'v1.0.0'; //版本号
    }

    slideShow.prototype = {
        init: function () {

        }
    };

    var defaults = {

    };

    $.fn.picSlide = function (options) {
        return this.each(function () {
            new slideShow(this, options).init();
        });
    }
}));
