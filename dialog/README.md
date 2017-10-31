jQueryDialog 弹层组件。支持PC跟移动端  
===  
此插件源部分自于[artDialog](http://aui.github.io/artDialog/) 

## 使用方法

## 参数列表
参数 | 参数类型 | 默认参数 | 参数说明
----|---------|------------
`title` | `String` / `Function` | | 弹框标题，初始化时可传参，也可使用方法带参数执行 |
`content` | `String` / `HTMLElement` / `Function` | | 弹层内容 参数支持String、HTMLElement类型，初始化时可传参，也可使用方法带参数执行 |
`width` | `Number` / `Function` | | 弹框宽度，初始化时可传参，也可使用方法带参数执行 |
`height` | `Number` / `Function` | | 弹框高度，初始化时可传参，也可使用方法带参数执行 |
`fixed` | `Boolean` | false | 默认false时为绝对定位，弹出窗口不跟随页面的滚动。为true时设定为固定定位，弹出窗口跟随页面滚动 |
`isModal` | `Boolean` | false | 默认false时不使用遮罩层，可以对页面其他元素进行操作。为true时显示遮罩层，不可对页面其他元素进行操作。 |
`backgroundColor` | `String` | #000 | 遮罩层颜色 |
`backdropOpacity` | `Number` | .7 | 遮罩层透明度，可传值 `.7` 或者 `70` |
`zIndex` | `Number` | 1000 | 弹框层级 |
`isModalClose` | `Boolean` | false | 点击空白处是否关闭 |
`autoClose` | `Boolean` / `Number` | false | 是否自动关闭弹框 |
`okValue` | `String` | ok | 确定按钮文本 |
`ok` | `Function` | null | 确定按钮回调函数，按钮回调函数都默认移除弹框，如果只想关闭弹框，请在函数最后使用`return false` |
`cancelValue` | `String` | cancel | 取消按钮文本 |
`cancel` | `Function` | null | 取消按钮回调函数，按钮回调函数都默认移除弹框，如果只想关闭弹框，请在函数最后使用`return false` |
`cancelDisplay` | `Boolean` | true | 默认为true显示关闭按钮。为false时关闭按钮不显示 |
`buttons` | `Array` | | 自定义按钮数组 [详情见buttons参数说明](#buttons参数说明) |
`resetCls` | `String` / `Function` | null | 添加新的class，初始化时可传参，也可使用方法带参数执行 |
`resize` | `Function` | | 重置弹框位置 |
`show` | `Function` | | 显示弹框 |
`close` | `Function` | | 关闭弹框 |
`remove` | `Function` | | 移除弹框 |
`addEventListener` | `Function` | | 添加事件（监听事件）。支持的事件有：show、close、remove、resize |


<a name="buttons参数说明"></a>
##buttons参数说明

````javascript
buttons: [
    {
        id: "reset-ok",
        value: "同意",
        isCur: true,
        callback: function () {
            this.close();
            return false;
        }
    },
    {
        id: "no-cancel",
        value: "不同意",
        callback: function () {
            alert('你不同意')
        }
    },
    {
        id: "button-disabled",
        value: "无效按钮",
        disabled: true,
        callback: function () {
            alert("1011");
        }
    }
]
````

参数 | 参数类型 | 默认参数 | 参数说明
----|---------|------------
`id` | `String` | | 当前按钮Id，必传参数 |
`value` | `String` | | 当前按钮文本，必传参数 |
`disabled` | `Boolean` | | 禁用当前按钮，可选参数 |
`isCur` | `Boolean` | | 当前按钮是否高亮，可选参数 |
`callback` | `Function` | | 当前按钮回调函数，必传参数，所有按钮回调函数都默认移除弹框，如果只想关闭弹框，请在函数最后使用`return false` | 