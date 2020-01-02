!function (root, factory) {
    if (typeof exports == 'object' && typeof module != 'undefined') {
        module.exports = factory()
    } else if (typeof define == 'function' && define.amd) {
        define(factory)
    } else {
        var moduleName = 'LStorage';
        root[moduleName] = factory()
    }
}(this, function () {
    var LStorage = {
        //key前缀
        pre: 'L_',
        //是否存在定时器
        timer: false,
        //当前key
        key: '',
        //获取value的数据类型String，Null，Array，Json
        get_type: function (data) {
            return Object.prototype.toString.call(data).split(' ')[1].slice(0, -1)
        },
        //初始化（key，定时器）
        _init: function (key) {
            this.key = this.pre + key.toString();

            if (this.timer === false) {
                this.timer = setInterval(function () {
                    var len = localStorage.length;
                    var key,
                        data;
                    var timestamp = new Date().getTime();
                    for (var i = 0; i < len; i++) {
                        key = localStorage.key(i);
                        data = JSON.parse(localStorage.getItem(key));
                        if (data['ttl'] != '' && parseInt(data['ttl']) <= timestamp) {
                            localStorage.removeItem(key);
                        }
                    }
                }, 1000);
            }
        },
        //编码value，返回json
        value_encode: function (value, ttl) {
            ttl = ttl || '';
            var data = {
                ttl: ttl,
                value: value
            };
            return JSON.stringify(data);
        },
        //反编码value，返回value值
        value_decode: function (data) {
            try {
                switch (this.get_type(data)) {
                    case 'Null':
                        return false;
                        break;
                    case 'String':
                        var data = JSON.parse(data);
                        return data['value'];
                        break;
                }
            } catch (e) {
                return false;
            }
        },

        /***********************************Common start********************************/
        //修改key值
        rename: function (key1, key2) {
            this._init(key1);

            key1 = this.pre + key1.toString();
            key2 = this.pre + key2.toString();
            var data = localStorage.getItem(key1);
            if (data == null) {
                return false;
            } else {
                localStorage.removeItem(key1);
                localStorage.setItem(key2, data);
            }
        },
        //复制key-value
        renameNx: function (key1, key2) {
            this._init(key1);

            key1 = this.pre + key1.toString();
            key2 = this.pre + key2.toString();
            var data = localStorage.getItem(key1);
            if (data == null) {
                return false;
            } else {
                localStorage.setItem(key2, data);
            }
        },
        //设置过期时间，单位为ms
        expire: function (key, ttl) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if (data == null) {
                return false;
            } else {
                var value = this.value_decode(data);
                if (value) {
                    var timestamp = new Date().getTime();
                    localStorage.setItem(this.key, this.value_encode(value, timestamp + parseInt(ttl)));
                } else {
                    return false;
                }
            }
        },
        //key的模糊查找，返回key和value的二维数组
        keys: function (key_x) {
            var left = false,
                right = false;

            if (key_x.substring(0, 1) == '*') {
                left = true;
                key_x = key_x.substring(1, key_x.length);
            }

            if (key_x.substring(key_x.length - 1, key_x.length) == '*') {
                right = true;
                key_x = key_x.substring(0, key_x.length - 1);
            }

            var array = [];

            var keyx_len = key_x.length;

            var len = localStorage.length;
            var key, key_search;
            for (var i = 0; i < len; i++) {
                key = localStorage.key(i);

                key = key.substr(2);

                if (left && !right) {
                    key_search = key.substr(-keyx_len);
                    if (key_search == key_x) {
                        array.push({key: key, value: this.get(key)})
                    }
                }

                if (!left && right) {
                    key_search = key.substr(0, keyx_len)
                    if (key_search == key_x) {
                        array.push({key: key, value: this.get(key)})
                    }
                }

                if (left && right) {
                    if (key.indexOf(key_x) >= 0) {
                        array.push({key: key, value: this.get(key)})
                    }
                }

            }

            return array;
        },
        //返回当前key的过期时间ttl
        ttl: function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if (data == null) {
                return false;
            } else {
                data = JSON.parse(data);

                if (data.hasOwnProperty('ttl') && data['ttl'] != '') {
                    return data['ttl']
                } else {
                    return false;
                }
            }
        },
        //删除ttl时间
        persist: function (key) {
            var value = this.get(key);
            if (value) {
                this.set(key, value);
            }
        },


        /***********************************Common start********************************/



        /***********************************String start********************************/
        //获取value值
        get: function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            return this.value_decode(data);
        },
        //设置key-value值
        set: function (key, value) {
            this._init(key);

            localStorage.setItem(this.key, this.value_encode(value));
        },
        //设置key-value值，且设置过期时间
        setex: function (key, ttl, value) {
            this._init(key);

            var timestamp = new Date().getTime();
            localStorage.setItem(this.key, this.value_encode(value, timestamp + parseInt(ttl)));
        },
        //设置key-value，如果已存在返回false，未存在设置返回true
        setnx: function (key, value) {
            this._init(key);

            var tmp_value = localStorage.getItem(this.key);
            if (tmp_value == null) {
                localStorage.setItem(this.key, this.value_encode(value));
                return true;
            } else {
                return false;
            }
        },
        //删除keys，如果为字符串则删除单个key，如果为数组，则删除多个key
        delete: function (keys) {
            this._init(keys);

            var key;
            switch (this.get_type(keys)) {
                case 'String':
                    key = this.pre + keys.toString();
                    localStorage.removeItem(key);
                    break;
                case 'Array':
                    for (var i in keys) {
                        key = this.pre + keys[i].toString();
                        localStorage.removeItem(key);
                    }
                    break;
            }
        },
        //设置key-value值且返回value
        getSet: function (key, value) {
            this._init(key);
            localStorage.setItem(this.key, this.value_encode(value));
            return this.get(key);
        },
        //判断key是否存在
        exists: function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if (data == null) {
                return false;
            } else {
                return true;
            }
        },
        //自增+1
        incr: function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if (data == null) {
                localStorage.setItem(this.key, this.value_encode(1));
            } else {
                try {
                    data = JSON.parse(data);
                    var ttl = '',
                        value = 1;

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        value = parseInt(data['value']) + 1;
                    }

                    localStorage.setItem(this.key, this.value_encode(value, ttl));
                } catch (e) {
                }
            }
        },
        //自增+value
        incrBy: function (key, value) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if (data == null) {
                value = 0 - value;
                localStorage.setItem(this.key, this.value_encode(value));
            } else {
                try {
                    data = JSON.parse(data);
                    var ttl = '',
                        tmp_value = 1;

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = parseInt(data['value']) + value;
                    }

                    localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
                } catch (e) {
                }
            }
        },
        //自减-1
        decr: function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if (data == null) {
                localStorage.setItem(this.key, this.value_encode(-1));
            } else {
                try {
                    data = JSON.parse(data);

                    var ttl = '',
                        value = -1;

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        value = parseInt(data['value']) - 1;
                    }

                    localStorage.setItem(this.key, this.value_encode(value, ttl));
                } catch (e) {
                }
            }
        },
        //自减-value
        decrBy: function (key, value) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if (data == null) {
                value = 0 - value;
                localStorage.setItem(this.key, this.value_encode(value));
            } else {
                try {
                    data = JSON.parse(data);

                    var ttl = '',
                        tmp_value = -1;

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = parseInt(data['value']) - parseInt(value);
                    }

                    localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
                } catch (e) {
                }
            }
        },
        //value值拼接
        append: function (key, value) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if (data == null) {
                localStorage.setItem(this.key, this.value_encode(value));
            } else {
                try {
                    data = JSON.parse(data);

                    var ttl = '',
                        tmp_value = -1;

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = data['value'] + value.toString();
                    }

                    localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
                } catch (e) {
                }
            }
        },
        //返回value的指定部分
        getRange: function (key, start, end) {
            this._init(key);

            start = parseInt(start) || 0;
            end = parseInt(end) || 0;

            var data = localStorage.getItem(this.key);
            if (data == null) {
                return false;
            } else {
                try {
                    data = JSON.parse(data);
                    var value = this.value_decode(data);
                    return value.substring(start, end);
                } catch (e) {
                }
            }
        },
        //设置value的指定部分
        setRange: function (key, offset, value) {
            this._init(key);

            offset = parseInt(offset) || 0;

            var data = localStorage.getItem(this.key);
            if (data == null) {
                return false;
            } else {
                try {
                    data = JSON.parse(data);

                    var ttl = '',
                        tmp_value = '';

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = data['value'].substring(0, offset) + value;
                    }

                    localStorage.setItem(this.key, this.encode(tmp_value, ttl));
                } catch (e) {
                }
            }
        },
        //返回value长度
        strlen: function (key) {
            var value = this.get(key);
            return value.length;
        },

        /***********************************String end********************************/


        /***********************************List start********************************/
        lPush: function (key, value) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            var tmp_value = [],
                ttl = '';
            if (data != null) {
                try {
                    data = JSON.parse(data);

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = data['value'];
                    }
                }catch (e){}
            }

            tmp_value.unshift(value);
            localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));

        },
        rPush: function (key, value) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            var tmp_value = [],
                ttl = '';

            if (data != null) {
                try {
                    data = JSON.parse(data);

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = data['value'];
                    }
                }catch (e){}

            }
            tmp_value.push(value);
            localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
        },
        lPushx: function (key, value) {
            this._init(key);

            var data = localStorage.getItem(this.key);

            if(data == null){
                return false;
            }else {
                var tmp_value = [],
                    ttl = '';
                try {
                    data = JSON.parse(data);

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = data['value'];
                    }
                }catch (e){}

                tmp_value.unshift(value);
                localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
            }

        },
        rPushx: function (key, value) {
            this._init(key);

            var data = localStorage.getItem(this.key);

            if (data == null) {
                return false;
            }else{

                var tmp_value = [],
                    ttl = '';

                try {
                    data = JSON.parse(data);

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = data['value'];
                    }
                }catch (e){}

                tmp_value.push(value);
                localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
            }
        },
        lPop:function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            var value = false;

            if(data != null){
                var tmp_value = [],
                    ttl = '';

                try {
                    data = JSON.parse(data);

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = data['value'];
                    }
                }catch (e){}

                value = tmp_value.shift();
                localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
            }
            return value;
        },
        rPop:function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            var value = false;

            if(data != null){
                var tmp_value = [],
                    ttl = '';

                try {
                    data = JSON.parse(data);

                    if (data.hasOwnProperty('ttl')) {
                        ttl = data['ttl'];
                    }

                    if (data.hasOwnProperty('value')) {
                        tmp_value = data['value'];
                    }
                }catch (e){}

                value = tmp_value.pop();
                localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
            }
            return value;
        },
        lSize:function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            var value = 0;

            if(data != null){
                try {
                    data = JSON.parse(data);

                    if (data.hasOwnProperty('value')) {
                        value = value.length;
                    }
                }catch (e){}

            }
            return value;
        },
        lGet:function (key,index) {
            index = index || 0;
            this._init(key);

            var value = [];

            var data = localStorage.getItem(this.key);
            if(data == null){
                return false;
            }else{
                var tmp_value = [],
                    ttl = '';

                try {
                    data = JSON.parse(data);

                    if(data.hasOwnProperty('ttl')){
                        ttl = data['ttl'];
                    }

                    if(data.hasOwnProperty('value')){
                        tmp_value = data['value'];
                    }
                }catch (e){}

                if(index >= 0){
                    value = tmp_value[index];
                }else{
                    index = tmp_value.length+parseInt(index);
                    if(index < 0){
                        return false;
                    }
                    value = tmp_value[index];
                }
                tmp_value.splice(index,1);
                localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
            }
            return value;
        },
        lSet:function (key,index,value) {
            index = index || 0;
            this._init(key);

            var data = localStorage.getItem(this.key);

            if(data == null){
                return false;
            }else{
                try {
                    var tmp_value = [],
                        ttl = '';

                    data = JSON.parse(data);

                    if(data.hasOwnProperty('ttl')){
                        ttl = data['ttl'];
                    }

                    if(data.hasOwnProperty('value')){
                        tmp_value = data['value'];
                    }

                    if(tmp_value[index]){
                        tmp_value[index] = value;
                        localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
                    }else{
                        return false;
                    }
                }catch (e){
                    return false;
                }
            }
        }
        /***********************************List end********************************/


        /***********************************Set start********************************/

        sAdd:function (key,value) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if(data == null){
                localStorage.setItem(this.key,this.value_encode(value));
                return true;
            }else{
                try {
                    var tmp_value = [],
                        ttl = '';

                    data = JSON.parse(data);

                    if(data.hasOwnProperty('ttl')){
                        ttl = data['ttl'];
                    }

                    if(data.hasOwnProperty('value')){
                        tmp_value = data['value'];
                    }

                    var has_in = false;
                    for(var i in tmp_value){
                        if(tmp_value[i] == value){
                            has_in = true;
                            break;
                        }
                    }

                    if(has_in){
                        return false;
                    }else{
                        tmp_value.push(value);
                        localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
                        return true;
                    }
                }catch (e){}
            }
        },
        sRem:function (key,value) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if(data == null){
                return false;
            }else{
                try {
                    var tmp_value = [],
                        ttl = '';

                    data = JSON.parse(data);

                    if(data.hasOwnProperty('ttl')){
                        ttl = data['ttl'];
                    }

                    if(data.hasOwnProperty('value')){
                        tmp_value = data['value'];
                    }

                    var has_in = false;
                    for(var i in tmp_value){
                        if(tmp_value[i] == value){
                            tmp_value.splice(i,1);
                            localStorage.setItem(this.key, this.value_encode(tmp_value, ttl));
                            has_in = true;
                            break;
                        }
                    }

                    return has_in;
                }catch (e){}
            }
        },
        sIsMenber:function (key,value) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if(data == null){
                return false;
            }else{
                try {
                    var tmp_value = [];

                    data = JSON.parse(data);

                    if(data.hasOwnProperty('value')){
                        tmp_value = data['value'];
                    }

                    var has_in = false;
                    for(var i in tmp_value){
                        if(tmp_value[i] == value){
                            has_in = true;
                            break;
                        }
                    }

                   return has_in;
                }catch (e){}
            }
        },
        sSize:function (key) {
            this._init(key);

            var data = localStorage.getItem(this.key);
            if(data == null){
                return 0;
            }else{
                try {
                    var tmp_value = [];

                    data = JSON.parse(data);

                    if(data.hasOwnProperty('value')){
                        tmp_value = data['value'];
                    }

                    return tmp_value.length;
                }catch (e){}
            }
        }


        /***********************************Set end********************************/


    };
    return LStorage;
});