# 基础访问令牌 :id=020402

用于服务端 API 调用的凭证。

## 获取应用访问令牌backendToken  :id=02040201
`backendToken` 是应用的服务端 API 的访问令牌，控制对服务端 API 的访问。`backendToken` 的有效期通过接口返回，目前设置为 7200 秒，接入方获取相应基础访问令牌后，需放入缓存，定期更新。  
- 请求地址：https://open.95516.com/open/access/1.0/backendToken  
- 请求参数：
| 属性 | 类型 | 长度 | 必填 | 说明 |
| ---- | :----: | :----: | :----: | ---- |
| appId | String | 32 | 是 | 接入方的唯一标识 |
| nonceStr | String | 20 | 是 | 生成签名的随机串 |
| timestamp | String | 10 | 是 | 生成签名的时间戳 |
| signature | String | 64 | 是 | 签名值，签名因子包括( appId , nonceStr , secret , timestamp )，签名方法：SHA-256 参见示例代码 |
- 返回参数：
| 属性 | 类型 | 长度 | 说明 |
| ---- | :----: | :----: | ---- |
| backendToken | String | 24 | 调用后台接口的基础访问令牌 |
| expiresIn    | int |  | backendToken接口调用凭证超时时间，单位秒 |
- 报文示例：
```json
//请求报文：
{
	"appId":"******",
	"nonceStr":"sdfsdfsaewr23",
	"timestamp":"12312121231",
	"signature":"***"
}
//响应报文：
{
	"resp":"00",
	"msg":"成功",
	"params":{
		"backendToken":"******",
		"expiresIn":7200
	}
}
```
> 1. 基础访问令牌为系统全局变量，与用户行为无关。请保证在有效期内，不会多次请求获取相关基础访问令牌，重复申请会导致上一个基础访问令牌失效；
> 2. 频繁请求的服务器将可能会被云闪付列入黑名单。

## 获取授权访问令牌accessToken :id=02040202
获取用户授权访问令牌 `accessToken` , 经过用户授权完成后，可通过授权访问令牌调用对应权限可访问的服务端 API 。  
- 请求地址：https://open.95516.com/open/access/1.0/token
- 请求参数：
| 属性 | 类型 | 长度 | 必填 | 说明 |
| ---- | :----: | :----: | :----: | ---- |
| appId |String | 32 | 是 | 接入方的唯一标识 |
| backendToken |String | 24 | 是 | 通过“获取应用访问令牌”获取   |
| code | String | 24 |是 | 用户授权或静默授权获取的code |
| grantType |String | 18 | 是 | 常量字符串authorization_code |
- 返回参数：
| 属性 | 类型 | 长度 | 说明 |
| ---- | :----: | :----: | ---- |
| accessToken | String | 256 | 授权访问接口 API 调用凭证 |
| expiresIn | int |  | accessToken 接口调用凭证超时时间，单位(秒) |
| refreshToken | String | 256 | 用户刷新 accessToken (已废弃) |
| openId | String | 64 | 用户唯一标识 |
| scope | String | 20 | 用户授权的作用域 |
| unionId | String | 64 | 统一用户标识(所有接入方下统一用户标识) |
- 报文示例：
```json
//请求报文：
{
	"appId":"******",
	"backendToken":"******",
	"code":"******",
	"grantType":"authorization_code",
}
//响应报文：
{
	"resp":"00",
	"msg":"成功",
	"params":{
		"accessToken":"******",
		"expiresIn":3600,
		"refreshToken":"******",
		"openId":"******",
		"scope":"upapi_mobile",
		"unionId":"******"
	}
} 
```