!function (root, factory) {
    if (typeof exports == 'object' && typeof module != 'undefined') {
        module.exports = factory()
    } else if (typeof define == 'function' && define.amd) {
        define(factory)
    } else {
        var moduleName = 'SplString';
        root[moduleName] = factory()
    }
}(this, function () {
    var SplString = {
        //16进制转ip
        hex2ip: function (hexString) {
            hexString = hexString || '';
            var ip = '';
            var s = '';
            if (hexString) {
                for (var i = 0; i < hexString.length; i = i + 2) {
                    s = hexString.substr(i, 2);
                    ip += parseInt(s, 16) + '.';
                }
                ip = (ip.substring(ip.length - 1) == '.') ? ip.substring(0, ip.length - 1) : ip;
            }
            return ip;
        },
        //hexString转字符串
        hexString2string: function (hexString) {
            var encoded = '';
            for (var i = 0; i < hexString.length; i += 2) {
                encoded += '%' + hexString[i].toString(16) + hexString[i + 1].toString(16);
            }
            return decodeURIComponent(encoded);
        },
        //字符串转hexString
        string2hexString: function (string) {
            var code = encodeURIComponent(string);
            var val = '';
            for (var i = 0; i < code.length; i++) {
                var c = code.charAt(i);
                if (c === '%') {
                    val += code.charAt(i + 1).toUpperCase() + code.charAt(i + 2).toUpperCase();
                    i += 2;
                } else {
                    val += c.charCodeAt(0).toString(16);
                }
            }
            return val;
        },
        //hexString转字节
        hexString2bytes: function (hexString) {
            var val = [];
            for (var i = 0; i < hexString.length; i++) {
                val.push(hexString.charCodeAt(i) & 0xFF)
            }
            return val;
        },
        //字节转hexString
        bytes2hexString: function (bytes) {
            var val = '';
            for (var i = 0; i < bytes.length; i++) {
                val += bytes[i].toString();
            }
            return val;
        }


    };
    return SplString;
});