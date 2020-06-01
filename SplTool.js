!function (root, factory) {
    if (typeof exports == 'object' && typeof module != 'undefined') {
        module.exports = factory()
    } else if (typeof define == 'function' && define.amd) {
        define(factory)
    } else {
        var moduleName = 'SplTool';
        root[moduleName] = factory()
    }
}(this, function () {
    var SplTool = {
        //全屏
        toFullScreen: function () {
            var elem = document.body;
            elem.webkitRequestFullScreen ? elem.webkitRequestFullScreen()
                : elem.mozRequestFullScreen ? elem.mozRequestFullScreen()
                : elem.msRequestFullscreen ? elem.msRequestFullscreen()
                    : elem.requestFullScreen ? elem.requestFullScreen()
                        : alert("浏览器不支持全屏");
        },
        //退出全屏
        exitFullscreen: function () {
            var elem = parent.document;
            elem.webkitCancelFullScreen ? elem.webkitCancelFullScreen()
                : elem.mozCancelFullScreen ? elem.mozCancelFullScreen()
                : elem.cancelFullScreen ? elem.cancelFullScreen()
                    : elem.msExitFullscreen ? elem.msExitFullscreen()
                        : elem.exitFullscreen ? elem.exitFullscreen()
                            : alert("切换失败,可尝试Esc退出");
        },
        //返回min，max之间的随机数
        random: function (min, max) {
            min = +min || 0;
            max = +max || 0;
            return parseInt(Math.random() * (max - min) + min);
        },
        //禁止右键、选择、复制
        ban_right_click_and_select_and_copy: function () {
            ['contextmenu', 'selectstart', 'copy'].forEach(function (ev) {
                document.addEventListener(ev, function (event) {
                    return event.returnValue = false
                })
            });
        },
        //获取url参数
        getQueryString:function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var search = window.location.search.split('?')[1] || '';
            var r = search.match(reg) || [];
            return r[2];
        },
        //追加url参数
        appendQuery:function(url,key,value){
            var options = key;
            if (typeof options == 'string') {
                options = {};
                options[key] = value;
            }
            options = $.param(options);
            if (url.includes('?')) {
                url += '&' + options
            } else {
                url += '?' + options
            }
            return url;
        },
        //动态引入js
        injectScript:function (src) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = src;
            var t = document.getElementsByTagName('script')[0];
            t.parentNode.insertBefore(s, t);
        },
        //根据url地址下载
        download:function (url) {
            var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
            var isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
            if (isChrome || isSafari) {
                var link = document.createElement('a');
                link.href = url;
                if (link.download !== undefined) {
                    link.download = url.substring(url.lastIndexOf('/') + 1, url.length);
                }
                if (document.createEvent) {
                    var e = document.createEvent('MouseEvents');
                    e.initEvent('click', true, true);
                    link.dispatchEvent(e);
                    return true;
                }
            }
            if (url.indexOf('?') === -1) {
                url += '?download';
            }
            window.open(url, '_self');
            return true;
        },
        //el是否包含某个class
        hasClass:function (el,className) {
            var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
            return reg.test(el.className)
        },
        //el添加某个class
        addClass:function (el,className) {
            if (this.hasClass(el, className)) {
                return
            }
            let newClass = el.className.split(' ')
            newClass.push(className)
            el.className = newClass.join(' ')
        },
        //el去除某个class
        removeClass:function (el,className) {
            if (!this.hasClass(el, className)) {
                return
            }
            let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
            el.className = el.className.replace(reg, ' ')
        },
        //获取滚动的坐标
        getScrollPosition:function (el) {
            el = el || window
            var x = el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft;
            var y = el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop;
            var rs = {};
            rs.x = x;
            rs.y = y;
            return rs;
        },
        //滚动到顶部
        scrollToTop:function () {
            var c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(this.scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        },
        //el是否在视口范围内
        elementIsVisibleInViewport:function (el,partiallyVisible) {
            partiallyVisible = partiallyVisible || false;
            var { top, left, bottom, right } = el.getBoundingClientRect();
            var { innerHeight, innerWidth } = window;
            return partiallyVisible
                ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
                ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
                : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
        },
        //拦截粘贴板
        copyTextToClipboard:function (value) {
            var textArea = document.createElement("textarea");
            textArea.style.background = 'transparent';
            textArea.value = value;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                var successful = document.execCommand('copy');
            } catch (err) {
                console.log('Oops, unable to copy');
            }
            document.body.removeChild(textArea);
        },
        //随机数范围
        random:function (min,max) {
            if (arguments.length === 2) {
                return Math.floor(min + Math.random() * ((max + 1) - min))
            } else {
                return null;
            }
        },
        //函数节流器
        debouncer:function (fn,time,interval) {
            interval = interval || 200;
            if(time - (window.debounceTimestamp || 0) > interval){
                fn && fn();
                window.debounceTimestamp = time;
            }
        },
        //16进制颜色转RGB/RGBA字符串
        colorToRGB:function (val,opa) {
            var pattern = /^(#?)[a-fA-F0-9]{6}$/; //16进制颜色值校验规则
            var isOpa = typeof opa == 'number'; //判断是否有设置不透明度

            if (!pattern.test(val)) { //如果值不符合规则返回空字符
                return '';
            }

            var v = val.replace(/#/, ''); //如果有#号先去除#号
            var rgbArr = [];
            var rgbStr = '';

            for (var i = 0; i < 3; i++) {
                var item = v.substring(i * 2, i * 2 + 2);
                var num = parseInt(item, 16);
                rgbArr.push(num);
            }

            rgbStr = rgbArr.join();
            rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
            return rgbStr;
        },

    };
    return SplTool;
});
