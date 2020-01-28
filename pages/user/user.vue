<template>
	<view>
		<!-- 用户信息 -->
		<view class="user">
			<block v-if="hasUserInfo === false">
				<view class="user-box">
					<!-- 头像 -->
					<view class="left">
						<image src="../../static/img/head.png"></image>
					</view>
					<!-- 授权登录框 -->
					<view class="right">
						<button class="getbutton" type="primary" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">授权登录</button>
					</view>
				</view>
			</block>
			<block v-if="hasUserInfo === true">
				<view class="user-box">
					<!-- 头像 -->
					<view class="left">
						<image :src="userInfo.avatarUrl"></image>
					</view>
					<!-- 昵称和个性签名 -->
					<view class="right">
						<view class="username">{{userInfo.nickName}}</view>
						<view class="signature">你好鸭！这里是拟胭脂！</view>
					</view>
				</view>
			</block>
		</view>
		<!-- 退出登录 -->
		<view class="setting">
			<button type="default" class="exit" @click="clear">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	export default {
		data() {
			return {
				title: 'getUserInfo',
				hasUserInfo: false,
				//个人信息
				userInfo: {}
			}
		},
		computed: {
			...mapState({
				loginProvider: state => state.loginProvider
			})
		},
		onLoad() {
	
		},
		methods: {
			// 获取用户信息 API 在小程序可直接使用
			getUserInfo() {
				uni.getUserInfo({
					provider: this.loginProvider,
					success: (result) => {
						console.log('getUserInfo success', result);
						this.hasUserInfo = true;
						this.userInfo = result.userInfo;
					},
					fail: (error) => {
						console.log('登录失败！');
						let content = error.errMsg;
						if (~content.indexOf('uni.login')) {
							content = '请在登录页面完成登录操作';
						}
			            // #ifndef APP-PLUS
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.userInfo'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败！',
										content: '拟胭脂需要获取您的用户信息，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								} else {
									uni.showModal({
										title: '获取用户信息失败',
										content: '错误原因' + content,
										showCancel: false
									});
								}
							}
						})
			            // #endif
			            // #ifdef APP-PLUS
			            uni.showModal({
			            	title: '获取用户信息失败',
			            	content: '错误原因' + content,
			            	showCancel: false
			            });
			            // #endif
					}
				});
			},
			mpGetUserInfo(result) {
				console.log('mpGetUserInfo', result);
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
				this.hasUserInfo = true;
				this.userInfo = result.detail.userInfo;
			},
			clear() {
				this.hasUserInfo = false;
				this.userInfo = {};
			}
		}
	}
</script>

<style lang="scss">
	.user{
		width: 100%;
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		.user-box {
			width: 92%;
			height: 300rpx;
			overflow: hidden;
			background-color: #F06365;
			border-radius: 20rpx;
			box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			.left{
				width: 180rpx;
				height: 180rpx;
				flex-shrink: 0;
				margin-top: 60rpx;
				margin-left: 8%;
				box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
				border-radius: 100%;
				image{
					width: 180rpx;
					height: 180rpx;
					border-radius: 100%;
				}
			}
			.right{
				width: 100%;
				margin-top: -160rpx;
				margin-left: 45%;
				.username{
					margin-bottom: 35rpx;
					font-size: 40rpx;
					color: #fff;
				}
				.signature{
					color: #eee;
					font-size: 28rpx;
				}
				.getbutton{
					color: #F06365;
					width: 300rpx;
					border-radius: 20rpx;
					background-color: #FFFFFF;
					box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
					margin-top: 25rpx;
					margin-left: 0rpx;
				}
			}
		}
	}
	.setting{
		margin-top: 80rpx;
		justify-content: center;
		.exit{
			color: #F06365;
			width: 300rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			box-shadow: 0rpx 0rpx 25rpx rgba(0, 0, 0, 0.2);
			margin-top: 25rpx;
		}
	}
</style>
