>## 背景：
>```text
>在用dcloud做app时，用onclick事件，偶然事件onclick会抽风式的点击失效，并且onclick还有300ms的延迟响应。
>客户多次反映响应过慢...
>
>刚开始考虑直接用touchstart事件代替，项目中途发现当页面有滚动上下拉动时，也会触发touchstart事件。
>后来想用zopte.js的tap来代替，因为在项目途中，发现改动过大，只能舍弃了。
>（zopte.js的tap是通过dom来绑定的，而项目大部分都有动态添加的dom，新添加dom要重新绑定tap事件，并且项目中也大部分是使用在html中ontouchstart绑定）
>
>也曾想过用fastclick.js来替换，舍弃原因同上。
>（可能修为不够，对zopte.js和fastclick.js的理解和表达可能有误。此处手动忽略...）
>最终决定自封装个函数，依然是使用ontouchstart绑定，但是同时用touch的move和end来配合，尽量减少对项目原先代码的改动。
>
>注：目前只运用于公司的两个app项目中，暂未遇到有意外的问题。若要使用，请自行取舍。。。
>```

>## 例子
>```html
><!DOCTYPE html>
><html lang="en">
><head>
><meta charset="UTF-8">
>    <title>Title</title>
></head>
><body>
><button ontouchstart="tap(this,tap_func)" style="width: 150px;height: 150px;">测试tap</button>
></body>
><script type="text/javascript" src="tap.js"></script>
><script>
>    function tap_func(obj) {
>        console.log('tap')
>    }
></script>
></html>
>```