<template>
	<view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img" @tap="toSwiper(swiper)"></image>
					</swiper-item>
				</swiper>
				<view class="indicator">
					<view class="dots" v-for="(swiper, index) in swiperList" :class="[currentSwiper >= index ? 'on' : '']" :key="index"></view>
				</view>
			</view>
		</view>
		<!-- 分类列表 -->
		<view class="category-list">
			<view class="category" v-for="(row, index) in categoryList" :key="index" @tap="toCategory(row)">
				<view class="img">
					<image :src="row.img"></image>
				</view>
				<view class="text">{{ row.name }}</view>
			</view>
		</view>
		<!-- 推荐区 -->
		<view class="goods-list">
			<view class="title">今日推荐</view>
			<view class="product-list">
				<view class="product" v-for="(product,index) in productList" :key="index" @tap="toGoods(product)">
					<image mode="widthFix" :src="product.img"></image>
					<view class="name">{{ product.name }}</view>
				</view>
			</view>
			<view class="bottom-text">到底啦!</view>
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
				headerTop: null,
				statusTop: null,
				currentSwiper: 0,
				// 轮播图片
				swiperList: [{
						id: 1,
						src: 'url1',
						img: '/static/img/1.jpg'
					},
					{
						id: 2,
						src: 'url2',
						img: '/static/img/2.jpg'
					},
					{
						id: 3,
						src: 'url3',
						img: '/static/img/3.jpg'
					}
				],
				// 分类菜单
				categoryList: [{
						id: 1,
						name: '口红/唇釉',
						enname: 'Lipstick',
						img: 'http://120.55.87.80/img/category/1.jpg'
					},
					{
						id: 2,
						name: '粉底/气垫',
						enname: 'Foundation',
						img: 'http://120.55.87.80/img/category/2.jpg'
					},
					{
						id: 3,
						name: '腮红/高光',
						enname: 'Blush',
						img: 'http://120.55.87.80/img/category/3.jpg'
					},
					{
						id: 4,
						name: '隔离/妆前',
						enname: 'Primer',
						img: 'http://120.55.87.80/img/category/4.jpg'
					},
					{
						id: 5,
						name: '定妆',
						enname: 'FixedMakeup',
						img: 'http://120.55.87.80/img/category/5.jpg'
					},
					{
						id: 6,
						name: '防晒',
						enname: 'Sunscreen',
						img: 'http://120.55.87.80/img/category/6.jpg'
					},
					{
						id: 7,
						name: '修容',
						enname: 'Modify',
						img: 'http://120.55.87.80/img/category/7.jpg'
					},
					{
						id: 8,
						name: '眼妆',
						enname: 'EyeMakeup',
						img: 'http://120.55.87.80/img/category/8.jpg'
					}
				],
				//猜你喜欢列表
				productList: []
			}
		},
		//此处用created相当于对前端页面数据进行初始化
		created() {
			var address = 'http://120.55.87.80/server/Recommend.php';
			http.post(address, 'Recommend').then(res => {
				//这里是ES6的写法，get请求的地址
				this.productList = res.data; //获取数据  
				console.log('success');
				console.log(this.productList);
			})
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			//轮播图跳转
			toSwiper(e) {
				uni.showToast({
					title: e.src,
					icon: 'none'
				});
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			//分类跳转
			toCategory(e) {
				uni.setStorageSync('enName', e.enname);
				uni.setStorageSync('catName', e.name);
				uni.navigateTo({
					url: "../list/bigList",
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			//商品跳转
			toGoods(e) {
				uni.setStorageSync('PHP', 'RecGoods');
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
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.pullDown-effects {
		position: fixed;
		//top: calc(100rpx - 36vw);
		top: 0;
		z-index: 9;
		width: 100%;
		height: 36vw;
		/*  #ifdef  APP-PLUS  */
		padding-top: var(--status-bar-height);

		/*  #endif  */
		image {
			width: 100%;
			height: 36vw;
		}
	}

	.swiper {
		width: 100%;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 100%;
			height: 308rpx;
			overflow: hidden;
			border-radius: 50rpx;
			box-shadow: 0rpx 8rpx 25rpx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 42.7vw;

				swiper-item {
					image {
						width: 100%;
						height: 42.7vw;
					}
				}
			}

			.indicator {
				position: absolute;
				bottom: 40rpx;
				left: 50rpx;
				background-color: rgba(255, 255, 255, 0.4);
				width: 150rpx;
				height: 5rpx;
				border-radius: 3rpx;
				overflow: hidden;
				display: flex;

				.dots {
					width: 0rpx;
					background-color: rgba(255, 255, 255, 1);
					transition: all 0.3s ease-out;

					&.on {
						width: (100%/3);
					}
				}
			}
		}
	}

	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30rpx 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.category {
			width: 25%;
			margin-top: 50rpx;
			display: flex;
			flex-wrap: wrap;

			.img {
				width: 100%;
				display: flex;
				justify-content: center;

				image {
					border-radius: 100%;
					width: 13vw;
					height: 13vw;

				}
			}

			.text {
				margin-top: 16rpx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24rpx;
				color: #3c3c3c;
			}
		}
	}

	.goods-list {
		width: 95%;
		margin: 0 3%;
		justify-content: center;

		.title {
			width: 100%;
			height: 60rpx;
			font-size: 34rpx;
			font-weight: 600;
			text-align: center;
			margin-bottom: 3%;
			color: #CF6C7E;
		}

		.product-list {
			width: 100%;
			padding: 0 4% 0 4%;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			.product {
				width: 48%;
				border-radius: 50rpx;
				background-color: #fff;
				margin: 0 0 30rpx 0;
				box-shadow: 0px 0px 10px 0px #d0d0d0;

				image {
					width: 100%;
					padding: 6% 4%;
					border-radius: 50rpx 50rpx 0 0;
				}

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
		}
	}
</style>
