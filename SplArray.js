!function (root, factory) {
    if (typeof exports == 'object' && typeof module != 'undefined') {
        module.exports = factory()
    } else if (typeof define == 'function' && define.amd) {
        define(factory)
    } else {
        var moduleName = 'SplArray';
        root[moduleName] = factory()
    }
}(this, function () {
    var SplArray = {
        //删除一维数组指定值
        remove: function (array, value) {
            return array.filter(function (value2) {
                return value != value2;
            })
        },
        //二维数组排序，支持多个字段,中文排序
        sort_2: function (array, array_sort) {
            function sort2_sort(a, b, array_sort, n) {
                var array = array_sort[n].split(' ');
                var key = array[0];
                var sort = array[1];

                if (a[key] === b[key]) {
                    n++;
                    if (n < array_sort.length) {
                        return sort2_sort(a, b, array_sort, n);
                    }
                }
                if (sort == 'asc') {
                    return a[key].localeCompare(b[key]);
                } else {
                    return b[key].localeCompare(a[key]);
                }
            }

            for (var i = 0; i < array_sort.length; i++) {
                array.sort(function (a, b) {
                    return sort2_sort(a, b, array_sort, 0)
                });
            }
            return array;
        },
        //获取二维数组指定列的值
        array_column: function (array, key) {
            var column = [];
            for (var i in array) {
                if (array[i].hasOwnProperty(key)) {
                    column.push(array[i][key]);
                }
            }
            return column;
        },
        //获取数组交集
        array_intersect: function (array1, array2) {
            return array1.filter(function (value) {
                return array2.indexOf(value) !== -1;
            })
        },
        //获取数组差集
        array_diff: function (array1, array2) {
            return array1.concat(array2).filter(function (value) {
                return array2.indexOf(value) === -1;
            })
        },
        //获取数组差集（所有）
        array_diff_all: function (array1, array2) {
            return array1.concat(array2).filter(function (value) {
                return array1.indexOf(value) === -1 || array2.indexOf(value) === -1;
            });
        },
        //获取数组并集
        array_union: function (array1, array2) {
            return array1.concat(array2.filter(function (value) {
                return array1.indexOf(value) === -1;
            }));
        },
        //数组去重（高性能）。跟并集功能类似
        array_unique:function (array) {
            //利用对象属性不会重复特性
            var result = [];
            var obj = {};
            for (var i in array){
                if(!obj[array[i]]){
                    result.push(array[i]);
                    obj[array[i]]=1;
                }
            }
            return result;
        }


    };
    return SplArray;
});
