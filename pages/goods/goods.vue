<template>
	<view>
		<w-loading mask="false" click="true" ref="loading"></w-loading>
		<view :key="good.price" v-for="good in goods" style="width: 100%;">
			<view class="picture">
				<image class="shadow-blur" mode="widthFix" :src="good.img"></image>
				<view class="name">{{ good.name }}</view>
			</view>

			<view class="platform-box">
				<view class="platform-list">
					<view class="platform" @tap="toShop(good)">
						<view class="name">京东</view>
						<view class="name">{{ good.price }}</view>
					</view>
					<view class="platform" @tap="toShop(good)">
						<view class="name">天猫</view>
						<view class="name">{{ good.price }}</view>
					</view>
					<view class="platform" @tap="toShop(good)">
						<view class="name">拼多多</view>
						<view class="name">{{ good.price }}</view>
					</view>
					<view class="platform" @tap="toShop(good)">
						<view class="name">小红书</view>
						<view class="name">{{ good.price }}</view>
					</view>
					<view class="platform" @tap="toShop(good)">
						<view class="name">考拉海淘</view>
						<view class="name">{{ good.price }}</view>
					</view>
					<view class="platform" @tap="toShop(good)">
						<view class="name">苏宁易购</view>
						<view class="name">{{ good.price }}</view>
					</view>
				</view>
				<!-- <view class="bottom-text">到底啦!</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import Vuex from "vuex";
	import axios from "axios";
	import http from '@/utils/http.js'

	export default {
		data() {
			return {
				goods: []
			}
		},
		created() { //此处用created相当于对前端页面数据进行初始化  
			var value = uni.getStorageSync('goodsName');
			var address = 'http://120.55.87.80/server/' + uni.getStorageSync('PHP') + '.php';
			http.post(address, value).then(res => {
				//这里是ES6的写法，get请求的地址
				this.goods = res.data; //获取数据  
				console.log('success');
				console.log(this.goods);
				this.$refs.loading.close();
			})
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods: {
			toShop(e) {
				uni.setStorageSync('webUrl', e.address);
				uni.navigateTo({
					url: '../shopweb/shopweb',
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style lang="scss">
	.header {
		background-color: #F8F8F8;
		position: fixed;
		top: auto;
		z-index: 10;
		width: 100%;
	}

	.picture {
		width: 100%;
		justify-content: center;

		image {
			width: 100%;
			box-shadow: 0px 0px 10px 0px #d0d0d0;
		}

		.name {
			width: 100%;
			padding-left: 10%;
			padding-right: 10%;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			text-align: center;
			font-weight: 600;
			font-size: 35rpx;
			color: #CF6C7E;
		}
	}

	.platform-box {
		width: 95%;
		margin: 3% 5%;
		justify-content: center;

		.platform-list {
			width: 100%;
			padding: 0 4% 0 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.platform {
				width: 48%;
				border-radius: 50rpx;
				background-color: #fff;
				margin: 0 0 30rpx 0;
				box-shadow: 0px 0px 10px 0px #d0d0d0;

				.name {
					width: 100%;
					padding: 4% 4% 4% 4%;
					text-align: center;
					justify-content: space-between;
					overflow: hidden;
					font-size: 30rpx;
				}
			}
		}

		.bottom-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
			margin-bottom: 50rpx;
		}
	}
</style>
