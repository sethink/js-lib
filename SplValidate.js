!function (root, factory) {
    if (typeof exports == 'object' && typeof module != 'undefined') {
        module.exports = factory()
    } else if (typeof define == 'function' && define.amd) {
        define(factory)
    } else {
        var moduleName = 'SplValidate';
        root[moduleName] = factory()
    }
}(this, function () {
    var SplValidate = {
        //ip的合法性（可以带端口）
        ip:function (ip) {
            return /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{0,2}|0)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{0,2}|0)){3}(:(6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{0,3}))?$/.test(ip);
        },
        //用户名由数字和字母组成，长度2-16
        username:function (username) {
            return /^\w{2,16}$/.test(username);
        },
        //密码由数字、字母、-、_组成，长度为4-16
        password:function (password) {
            return /^[A-Za-z0-9\+\-\_\.]{4,16}$/.test(password);
        },
        //手机号
        phone:function (phone) {
            return /^1[3456789]{1}\d{9}$/.test(phone);
        },
        //邮箱
        email:function (email) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(email);
        },
        //url
        url:function (url) {
            return /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(url);
        },
        //只允许字母
        alpha:function (string) {
            return /^[A-Za-z]+$/.test(string);
        },
        //只允许字母和数字
        alphaNum:function (string) {
            return /^[A-Za-z0-9]+$/.test(string);
        },
        //只允许字母、数字和下划线 破折号
        alphaDash:function (string) {
            return /^[A-Za-z0-9\-\_]+$/.test(string);
        },
        //只允许汉字
        chs:function (string) {
            return /^[\u4e00-\u9fa5]+$/u.test(string);
        },
        //只允许汉字、字母
        chsAlpha:function (string) {
            return /^[\u4e00-\u9fa5a-zA-Z]+$/u.test(string);
        },
        //只允许汉字、字母和数字
        chsAlphaNum:function (string) {
            return /^[\u4e00-\u9fa5a-zA-Z0-9]+$/u.test(string);
        },
        //只允许汉字、字母、数字和下划线_及破折号-
        chsDash:function (string) {
            return /^[\u4e00-\u9fa5a-zA-Z0-9\_\-]+$/u.test(string);
        },
        //身份证
        IDCard:function (string) {
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(string);
        }




    };
    return SplValidate;
});