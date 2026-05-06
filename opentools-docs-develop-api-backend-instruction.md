# 使用说明 :id=020401  <!-- {docsify-ignore} -->

## 请求方式 :id=02040101
服务端 API 请求格式：HTTP POST 请求；请求报文格式： json 报文（contentType=application/json）。

## 数据安全 :id=02040102
服务端 API 针对不同接口采用安全策略如下：  
接口敏感信息采用 **3DES对称秘钥** 加密 **base64** 格式输出，**对称秘钥** 通过 [小程序开放运营平台](https://miniapp.unionpay.com/login) 获取，详见 [快速开始 - 获取小程序信息](/docs/develop/getstart/getstart?id=_020102) 。  
校验请求合法性采用 **SHA256签名** 或 **RSA公私钥** 签名；  
- **SHA256** 签名
**步骤一：拼接待签名字符串，得到string1**  
对所有待签名参数按照字段名的ASCII码进行从小到大排序（字典序），然后使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。  
如：`appId=*****&nonceStr=ty5lI76BJxVjAlSk&secret=******&timestamp=1608606287`  
**步骤二：对待签名字符串进行SHA256签名，得到signature**  
将步骤一得到的待签名字符串string1转换成byte数组，传入方法sha256(byte[] data)中，执行后将返回签名结果signature。  
如：`e7d4c7cd50f32e163d770268df508efb8b696441e1a72fb37479e65ddef19a3e`  
详见 [示例代码 - SHA256签名方法](/docs/develop/demo/demo/?id=_020801)  
- **RSA公私钥签名**
**步骤一：生成 RSA 公私钥对**  
使用 [示例代码 - RSA公私钥生成方法](/docs/develop/demo/demo?id=_020803) 生成 RSA 公私钥对。  
**步骤二：在小程序开放运营配置配置公钥**  
参见 [快速开始 - 第四步：填写小程序服务器配置](/docs/develop/getstart/getstart?id=_020105) 在 “验证公钥” 中配置 RSA 公钥。  
**步骤三：使用 RSA 私钥对接口签名**  
1. 拼接待签名字符串，得到string1
对所有待签名参数按照字段名的ASCII码进行从小到大排序（字典序），然后使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。  
如：  `appId=*****&nonceStr=ty5lI76BJxVjAlSk&timestamp=1608606287`  
2. 参见 [示例代码 - RSA签名方法](/docs/develop/demo/demo?id=_020804) 对接口进行 RSA 签名。  

!> 需加密的字段，先签名后加密

- **国密算法**  
云闪付小程序支持SM加密算法，接入方可在 **测试管理** 、 **上下线管理** 中进行切换，切换方式如下图：
<img src="https://opentools.95516.com/applet/media/02/0203-14.png" style="zoom:80%;"/>  

> 1. 国密算法切换，测试环境配置会在1-2小时内生效，生产配置会在审核通过后的1-2小时内生效；
> 2. 国密与国际加密算法对应关系，3DES对应SM4，RSA对应SM2，SHA256对应SM3，切换国密算法后，相应的加密算法都需进行变更；
> 3. 具体加解密方法参见  [示例代码- SM签名方法](/docs/develop/demo/demo?id=_020808) 

## 通知类接口验签银联公钥 :id=02040103
---
#### 国际公钥  :id=0204010301
``` text
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0QRJ81dxUdJNXoJwx81d
vExIWP9zGhVVdYWKgOajcQI/5F1Qt67ipEL+pSh30P9roPBv6LWHb42z/htmPUrK
XJ4f/WspXkbfBZsERe8XT8NZRnSdR3iZ9RqJKMzgjOetuoeFzTQ5QBalQKfQN9g5
8FEY0wrGH8DbrRzRImsnOVl0vvdIrqvTji+vD6GzZ8egSz9HZ0e9fQKG4dI1nuH1
45OfHY/fNe23oWINbXfFpVWiw+WgTTf8XzjVERD3qAT4i3cwB8RdhNlk3ysW0EJr
t2/WOJiI2NNK3xzXohqPYdUDRA4aWbRPtIma5EtBcnLFm76mXwkTlk9PJm7CJA3c
2QIDAQAB
-----END PUBLIC KEY-----
```  

#### 国密公钥  :id=0204010302
``` text  
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoEcz1UBgi0DQgAExUZBPijzqq2lPCC5b+Lqod3N2FWo
dXTYTA3Z578iFNKlpmgq0X2MJjtjGmT8O++wpL39g7bm67MDi18n6dsM4A==
-----END PUBLIC KEY-----  
```  

> 通知类接口需使用银联公钥对报文进行验签