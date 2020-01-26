<?php

$appid = 'wxcf961ce0d267c33a';//微信小程序appid
$secret = 'cc32d19ea0df1c0da206dcbeaddadb72';//微信小程序secret
$code = input('code');//接收code参数，换取用户唯一标识
$username = input('username');//接收用户名
$sex = input('sex');//接收用户性别
//下面url是请求微信端地址获取用户唯一标识的，对应的appid和secret改成自己的
$url="https://api.weixin.qq.com/sns/jscode2session?appid=".$appid."&secret=".$secret."&js_code=".$code."&grant_type=authorization_code";
$res = $this->https_request($url);//https_request是封装的发送请求的方法
$res = json_decode($res,true);//将返回结果JSON化
if(isset($res['errcode'])){
	//如果请求微信那边报错，就返回前端报错信息
}else{
	//请求微信那边成功，获取unionid,先判断数据库有没有
	$user = db('user')->where(array('unionid'=>$res['unionid']))->find();
	if(empty($user)){
		//如果没有就将用户信息插入到数据库，这里就不做演示了。
	}else{
		//存在用户就返回登陆成功
	}
}

?>