/**
 * Created by Folin on 2017/9/22.
 */

;(function ($,window,document,undefined) {
    
    function Numbers(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.config = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.version = "v1.0.0";
    }

    Numbers.prototype = {
        init: function () {
            this.scroll();
        },
        scroll: function () {
            var self = this;
            self.config.endVal = self.element.getAttribute("data-value");
            self.config.startVal = self.config.endVal / self.config.speed;
            self.count = 0;
            self.time = setInterval(function () {

                self.count = self.count + parseInt(self.config.startVal);
                if(self.count >= self.config.endVal){
                    self.count = parseInt(self.config.endVal);
                    clearInterval(self.time);
                }

                self.removeHtml(self.count);
                self.addHtml(self.count)
            },self.config.time);
        },
        getChildren: function (number) {
            this.numberStr = number.toString();
            this.numberLen = this.numberStr.length;
            this.$children = this.$element.find("i");
            this.size = this.$children.length;
        },
        addHtml: function (number) {
            var self = this;
            for(var i = 0; i < self.numberLen; i++){
                self.getChildren(number);
                if(self.size < self.numberLen) self.$element.append("<i></i>").hide();
                var obj = self.$children.eq(i);
                var y = -self.config.spacing * parseInt(self.numberStr.charAt(i));

                if( i < (self.numberLen - 1) && (self.numberLen - i - 1) % 3 == 0 ) $("<b></b>").insertAfter(obj);
                obj.animate({ backgroundPositionY:y+"px" }, self.config.time, function () {
                    self.$element.show();
                });
            }
        },
        removeHtml: function (number) {
            this.getChildren(number);
            if(this.size > this.numberLen){
                this.$children.slice(this.numberLen,this.size).remove();
            }
            this.$element.find("b").remove();
        }
    };

    var defaults = {
        endVal: null, //最终显示数值
        time: 350,  //滚动时间
        speed: 7,  //步数
        spacing: 40 //间距
    };

    $.fn.myNumbers = function (options) {
        return this.each(function () {
            new Numbers(this, options).init();
        });
    };

})(jQuery,window,document);
