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
        }

    };
    return SplTool;
});
