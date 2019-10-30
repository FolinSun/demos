## 使用方法

#### 引入js
```javascript
<script src="script/tab.js"></script>
```

#### 
```javascript
$(".tab").tabs({
  child: ".tab-menu span",
  content: ".tab-item"
})
```

## 参数列表
参数 | 参数类型 | 默认参数 | 参数说明
----|----------|----------|-----------------|   
`child` | `HTMLElement` | | 要点击的demo节点 |
`content` | `HTMLElement` | 要显示的demo节点 |
`event` | | `String` | 触发的事件，默认是`click` |
`current` | `String` | 高亮的类名，默认是`current` |
`activeIndex` | `Number` | 默认选中导航项的索引 |