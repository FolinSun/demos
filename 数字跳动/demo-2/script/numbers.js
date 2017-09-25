/**
 * Created by folin on 2017/9/19.
 */

;(function ($,window,document,undefined) {

    function Numbers(element, options) {
        this.element = element;
        this.$element = $(this.element);
        this.config = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.version = 'v1.0.0'; //版本号
    }

    Numbers.prototype = {
        init: function () {
            this.scroll();
        },
        /**
         * 参数说明
         * @param number：要格式化的数字
         * @param decimals：保留几位小数
         * */
        formatMoney: function (number, decimals) {
            decimals = (decimals != "undefined" && decimals <= 20) ? decimals : 2;
            number = parseFloat(number.toString().replace(/[^\d\.-]/g, "")).toFixed(decimals).toString();
            var numArry = number.split("."), numBefore = numArry[0].split("").reverse(),count = "";
            for(var i = 0,len = numBefore.length; i < len; i++){
                count += numBefore[i] + ( ( (i+1)%3 == 0 && (i+1) != len ) ? "," : "" );
            }
            return count.split("").reverse().join("") + "." + numArry[1];
        },
        scroll: function () {
            var self = this;
            var dataType = self.element.getAttribute("data-type");
            var dataOption = self.element.getAttribute("data-option");
            var dataTxt = self.element.getAttribute("data-txt");
            //var res = new RegExp("^([+-]?)\\d*\\.?\\d+$");
            var res = /^([+-]?)\d*\.?\d+$/;
            self.config.endVal = self.element.getAttribute("data-value");
            if(dataType == self.config.dataType && res.test(self.config.endVal)){
                self.config.startVal = self.config.endVal / self.config.speed; //数字变化开始值
                self.count = 0;
                self.lastNumber;
                self.time = setInterval(function () {
                    self.count = self.count + self.config.startVal;
                    if(parseInt(self.count) >= parseInt(self.config.endVal)){
                        self.count = parseFloat(self.config.endVal);
                        clearInterval(self.time);
                    }
                    self.lastNumber = self.count.toFixed(0);
                    if(dataOption != "int") self.lastNumber = self.count.toFixed(self.config.decimal);
                    if(dataOption == "money") self.lastNumber = self.formatMoney(self.count,self.config.decimal);
                    self.resetHtml(self.lastNumber,dataTxt);
                },self.config.time);
            }
        },
        resetHtml: function (number,txt) {
            txt = txt != null ? txt : '';
            this.element.innerHTML = number + txt;
        }
    };

    var defaults = {
        dataType: "number",
        endVal: null, //最终显示数值
        time: 30,  //滚动时间
        speed: 26,  //步数
        decimal: 2  //小数点位数,默认两位
    };


    $.fn.myNumbers = function (options) {
        return this.each(function () {
            new Numbers(this, options).init();
        });
    };

})(jQuery,window,document);