>## remove(array,value)
>### detail:
>删除一维数组指定值
>### example:
>```javascript
>var array = ['a','b','c'];
>var rs = SplArray.remove(array,'b');//打印rs。['a','c']
>```

>## sort_2(array,array_sort)
>### detail:
>二维数组排序，支持多个字段,中文排序
>### example:
>```javascript
>array = [
>    {"addr":"A栋","name":'我教室'},
>    {"addr":"A栋","name":'你教室'},
>    {"addr":"B栋","name":'我教室'},
>    {"addr":"B栋","name":'你教室'},
>    {"addr":"C栋","name":'你教室'}
>];
>var rs = SplArray.sort_2(array,['addr desc','name asc']);
>```

>## array_column(array,key)
>### detail:
>获取二维数组指定列的值
>### example:
>```javascript
>var array = [
>    {"addr":"a1","name":"a2"},
>    {"addr":"b1","name":"b2"},
>    {"addr":"c1","name":"c2"}
>];
>var rs = SplArray.array_column(array,'addr');
>//打印：[ 'a1', 'b1', 'c1' ]
>```

>## array_intersect(array1,array2)
>### detail:
>获取数组交集
>### example:
>```javascript
>var array1 = [1,2,3,4,5];
>var array2 = [3,4,5,6,7];
>var rs = SplArray.array_intersect(array1,array2);
>//打印：[ 3, 4, 5 ];
>```

>## array_diff(array1,array2)
>### detail:
>获取数组差集
>### example:
>```javascript
>var array1 = [1,2,3,4,5];
>var array2 = [3,4,5,6,7];
>var rs = SplArray.array_diff(array1,array2);
>//打印：[ 1, 2 ];
>```

>## array_diff_all(array1,array2)
>### detail:
>获取数组差集（所有）
>### example:
>```javascript
>var array1 = [1,2,3,4,5];
>var array2 = [3,4,5,6,7];
>var rs = SplArray.array_diff_all(array1,array2);
>//打印：[ 1, 2, 6, 7 ];
>```

>## array_union(array1,array2)
>### detail:
>获取数组并集
>### example:
>```javascript
>var array1 = [1,2,3,4,5];
>var array2 = [3,4,5,6,7];
>var rs = SplArray.array_union(array1,array2);
>//打印：[ 1, 2, 3, 4, 5, 6, 7 ];
>```

>## array_unique(array)
>### details:
>数组去重（高性能）。跟并集功能类似
>### example:
>```javascript
>var array1 = [1,2,3,4,5];
>var array2 = [3,4,5,6,7];
>var array = array1.concat(array2);
>var rs = SplArray.array_unique(array);
>//打印：[ 1, 2, 3, 4, 5, 6, 7 ]
>```