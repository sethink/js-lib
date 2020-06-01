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
        mobile:function (mobile) {
            return /^1[3456789]{1}\d{9}$/.test(mobile);
        },
        mobile2:function(mobile){
            return /^1[0-9]{10}$/.test(mobile);
        },
        //电话号
        phone:function(phone){
            return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(phone)
        },
        //邮箱
        email:function (email) {
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(email);
        },
        email2:function(email){
            return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(email);
        },
        //url
        url:function (url) {
            return /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(url);
        },
        url2:function(url){
            return /^http[s]?:\/\/.*/.test(url);
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
        },
        //严格身份证校验
        IDCard2:function(sId){
            if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(sId)) {
                console.log('你输入的身份证长度或格式错误')
                return false
            }
            //身份证城市
            var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
            if (!aCity[parseInt(sId.substr(0, 2))]) {
                console.log('你的身份证地区非法')
                return false
            }

            // 出生日期验证
            var sBirthday = (sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2))).replace(/-/g, "/"),
                d = new Date(sBirthday)
            if (sBirthday != (d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate())) {
                console.log('身份证上的出生日期非法')
                return false
            }

            // 身份证号码校验
            var sum = 0,
                weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
                codes = "10X98765432"
            for (var i = 0; i < sId.length - 1; i++) {
                sum += sId[i] * weights[i];
            }
            var last = codes[sum % 11]; //计算出来的最后一位身份证号码
            if (sId[sId.length - 1] != last) {
                console.log('你输入的身份证号非法')
                return false
            }

            return true
        },
        //从字符串中提取ip地址（带端口号）
        getIPFromString:function (string) {
            return /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}[:\d{1,5}]*/.exec(string);
        },
        //是否字符串
        isString:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'String';
        },
        //是否数字
        isNumber:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Number';
        },
        //是否boolean
        isBoolean:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Boolean';
        },
        //是否函数
        isFunction:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Function'
        },
        //是否为null
        isNull:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Null'
        },
        //是否undefined
        isUndefined:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Undefined';
        },
        //是否对象
        isObj:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
        },
        //是否数组
        isArray:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Array'
        },
        //是否时间
        isDate:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Date'
        },
        //是否正则
        isRegExp:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'RegExp'
        },
        //是否错误对象
        isError:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Error'
        },
        //是否Symbol函数
        isSymbol:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Symbol'
        },
        //是否Promise对象
        isPromise:function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Promise'
        },
        //是否Set对象
        isSet: function (obj) {
            return Object.prototype.toString.call(obj).slice(8, -1) === 'Set'
        },
        ua: navigator.userAgent.toLowerCase(),
        //是否微信浏览器
        isWeiXin: function () {
            return this.ua.match(/microMessenger/i) === 'micromessenger'
        },
        //是否移动端
        isDeviceMobile:function () {
            return /android|webos|iphone|ipod|balckberry/i.test(this.ua)
        },
        //是否QQ浏览器
        isQQBrowser:function () {
            return !!this.ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
        },
        //是否爬虫
        isSpider:function () {
            return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(this.ua)
        },
        //是否ios
        isIos:function () {
            var u = navigator.userAgent;
            if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {  //安卓手机
                return false
            } else if (u.indexOf('iPhone') > -1) {//苹果手机
                return true
            } else if (u.indexOf('iPad') > -1) {//iPad
                return false
            } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
                return false
            } else {
                return false
            }
        },
        //是否PC
        isPC:function () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        },
        //判断类型集合
        checkStringType:function (string,type) {
            switch (type) {
                case 'phone':   //手机号码
                    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(string);
                case 'tel':     //座机
                    return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(string);
                case 'card':    //身份证
                    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(string);
                case 'pwd':     //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
                    return /^[a-zA-Z]\w{5,17}$/.test(string)
                case 'postal':  //邮政编码
                    return /[1-9]\d{5}(?!\d)/.test(string);
                case 'QQ':      //QQ号
                    return /^[1-9][0-9]{4,9}$/.test(string);
                case 'email':   //邮箱
                    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(string);
                case 'money':   //金额(小数点2位)
                    return /^\d*(?:\.\d{0,2})?$/.test(string);
                case 'URL':     //网址
                    return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(string)
                case 'IP':      //IP
                    return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(string);
                case 'date':    //日期时间
                    return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(string) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(string)
                case 'number':  //数字
                    return /^[0-9]$/.test(string);
                case 'english': //英文
                    return /^[a-zA-Z]+$/.test(string);
                case 'chinese': //中文
                    return /^[\\u4E00-\\u9FA5]+$/.test(string);
                case 'lower':   //小写
                    return /^[a-z]+$/.test(string);
                case 'upper':   //大写
                    return /^[A-Z]+$/.test(string);
                case 'HTML':    //HTML标记
                    return /<("[^"]*"|'[^']*'|[^'">])*>/.test(string);
                default:
                    return true;
            }
        }





    };
    return SplValidate;
});