<template>
	<view>
		<w-loading mask="false" click="true" ref="loading"></w-loading>
		<view class="cu-bar search header">
			<view class="search-form round my-shadow">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="true" type="text" placeholder="搜索美妆产品" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-mine shadow-blur round">搜索</button>
			</view>
		</view>
		
		<view class="goods-list">
			<!-- <view class="title">{{uni.getStorageSync('catName')}}</view> -->
			<view class="product-list">
				<view class="product align-center" :key="product.price" v-for="product in productList" @tap="toGoods(product)">
					<view class="img align-center">
						<image mode="widthFix" :src="product.img"></image>
					</view>
					<view class="name">{{ product.name }}</view>
				</view>
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
				productList: [],
			}
		},
		created() { //此处用created相当于对前端页面数据进行初始化  
			var value = uni.getStorageSync('enName');
			var address = 'http://120.55.87.80/server/bigList/bigList.php';
			http.post(address, value).then(res => {
				//这里是ES6的写法，get请求的地址
				this.productList = res.data; //获取数据  
				console.log('success');
				console.log(this.productList);
				this.$refs.loading.close();
			})
		},
		onReady() {
			this.$refs.loading.open()
		},
		methods: {
			//商品跳转
			toGoods(e) {
				uni.setStorageSync('goodsName', e.name);
				uni.navigateTo({
					url: "../goods/goods",
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		}
	}
</script>

<style lang="scss">
	.header {
		background-color: #F5F6FA;
		position: fixed;
		top: auto;
		z-index: 10;
		width: 100%;
	}

	.goods-list {
		width: 100%;
		padding-top: 130rpx;
		padding-bottom: 50rpx;
		justify-content: center;

		.product-list {
			width: 100%;
			padding: 0 4% 0 4%;
			justify-content: space-between;

			.product {
				width: 100%;
				border-radius: 50rpx;
				display: flex;
				justify-content: space-between;
				background-color: #FFFFFF;
				margin: 0 0 30rpx 0;
				// box-shadow: 0px 0px 10px 0px #d0d0d0;

				.img {
					width: 30%;
					padding: 4% 5%;
					image {
						// border-radius: 50rpx 0 0rpx 50rpx;
					}
				}

				.name {
					width: 70%;
					padding-right: 40rpx;
					text-align: center;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
