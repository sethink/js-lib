>## hex2ip(hexString)
>### detail:
>16进制转ip
>### example:
>```javascript
>var hexString = 'C0A80A16';
>var ip = SplString.hex2ip(hexString);//打印：192.168.10.22
>```

>## hexString2string(hexString)
>### detail:
>hexString转字符串
>### example:
>```javascript
>var rs = SplString.hexString2string('e6b58be8af95616263313233');
>//打印：测试abc123
>```

>## string2hexString(string)
>### detail:
>字符串转hexString
>### example:
>```javascript
>var rs = SplString.string2hexString('测试abc123');
>//打印：e6b58be8af95616263313233
>```

>## hexString2bytes(hexString)
>### detail:
>hexString转字节
>### example:
>```javascript
>var rs = SplString.hexString2bytes('AA55');
>//打印：[ 65, 65, 53, 53 ]
>```

>## bytes2hexString(bytes)
>### detail:
>字节转hexString
>### example:
>```javascript
>var bytes = [ 65, 65, 53, 53 ];
>var rs = SplString.bytes2hexString(bytes);
>//打印：AA55
>```