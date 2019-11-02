# js-lib

#### 介绍
js常用库。兼容NodeJS和JavaScript

# 手册跳转
## [SplArray](/SplArray.md)
## [SplString](/SplString.md)
## [tap](/tap.md)


# 使用（Spl开头库）

>## NodeJS中使用
>```javascript
>var SplString = require('./SplString');
>var ip = SplString.hex2ip("C0A80A16");
>```

>## html中使用
>```html
><script src="./SplString.js"></script>
><script>
>var ip = SplString.hex2ip('C0A80A16');
></script>
>```

>## Vue中使用
>```vue
>import SplString from "./SplString.js";
>var ip = SplString.hex2ip('C0A80A16');
>```

# 使用（函数库）
>## tap
>```text
>模拟tap事件，代替onclick
>```


