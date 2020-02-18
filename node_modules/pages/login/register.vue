<template>
	<view class="register">
	
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体 -->
			<view class="main">
				<wInput
						v-model="phoneData"
						type="text"
						maxlength="11"
						placeholder="手机号"
					></wInput>
					<wInput
						v-model="passData"
						type="password"
						maxlength="11"
						placeholder="登录密码"
						isShowPass
					></wInput>
					<wInput
						v-model="confirmPass"
						type="password"
						maxlength="11"
						placeholder="确认密码"
					></wInput>
					
				</view>
				
				<wButton 
					text="注 册"
					:rotate="isRotate" 
					@click.native="startReg()"
				></wButton>
			
			<!-- 底部信息 -->
			<view class="footer">
				<view @tap="toLogin">已有账号？立即登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: "../../static/img/logo.png",
				phoneData:'', // 用户/电话
				passData:'', //密码
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
			// toLogin(){
			// 	uni.hideKeyboard()
			// 	uni.redirectTo({url: 'login'});
			// 	uni.navigateBack();
			// },
		 //    startReg() {
			// 	//注册
			// 	if(this.isRotate){
			// 		//判断是否加载中，避免重复点击请求
			// 		return false;
			// 	}
			// 	if (this.phoneData.length !=11) {
			// 	    uni.showToast({
			// 	        icon: 'none',
			// 			position: 'bottom',
			// 	        title: '手机号不正确'
			// 	    });
			// 	    return false;
			// 	}
		 //        if (this.passData.length < 6) {
		 //            uni.showToast({
		 //                icon: 'none',
			// 			position: 'bottom',
		 //                title: '密码需大于6位'
		 //            });
		 //            return false;
		 //        }
			// 	if (this.confirmPass != this.passData) {
			// 	    uni.showToast({
			// 	        icon: 'none',
			// 			position: 'bottom',
			// 	        title: '两次密码不一致'
			// 	    });
			// 	    return false;
			// 	}
			// 	console.log("注册成功")
			// 	_this.isRotate=true
			// 	setTimeout(function(){
			// 		_this.isRotate=false
			// 	},3000)
		 //    }
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
		/* margin-top: 128upx; */
	}
	
	/* 头部 logo */
	.header {
		width:195rpx;
		height:195rpx;
		box-shadow:0upx 0upx 60upx 0upx rgba(0,0,0,0.1);
		border-radius:50%;
		background-color: #ffffff; 
		margin-top: 20%;
		margin-bottom: 10%;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:200rpx;
		height:200rpx;
		border-radius:50%;
	}
	
	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
		margin-bottom: 10%;
	}
	
	.wxbutton {
		color: #FFFFFF;
		font-size: 30rpx;
		width:400rpx;
		height:100rpx;
		background:linear-gradient(to right, rgba(240, 108, 122, 255), rgba(218, 107, 119, 255));
		box-shadow:0upx 0upx 13upx 0upx rgba(164,217,228,0.4);
		border-radius:2.5rem;
		line-height: 100rpx;
		text-align: center;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 10%;
	}
	
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 10%;
		color: rgba(0,0,0,0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}
	.footer text{
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>