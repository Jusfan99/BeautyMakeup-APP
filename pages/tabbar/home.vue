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
				<view class="product" v-for="product in productList" :key="product.goods_id" @tap="toGoods(product)">
					<image mode="widthFix" :src="product.img"></image>
					<view class="name">{{ product.name }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				productList: [{
						goods_id: 0,
						img: 'http://120.55.87.80/img/recommand/1.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 1,
						img: 'http://120.55.87.80/img/recommand/2.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 2,
						img: 'http://120.55.87.80/img/recommand/3.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 3,
						img: 'http://120.55.87.80/img/recommand/4.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 4,
						img: 'http://120.55.87.80/img/recommand/5.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 5,
						img: 'http://120.55.87.80/img/recommand/6.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 6,
						img: 'http://120.55.87.80/img/recommand/7.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 7,
						img: 'http://120.55.87.80/img/recommand/8.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 8,
						img: 'http://120.55.87.80/img/recommand/9.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					},
					{
						goods_id: 9,
						img: 'http://120.55.87.80/img/recommand/10.jpg',
						name: '商品名称',
						price: '￥168',
						slogan: '1235人付款'
					}
				]
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载，需要自己在page.json文件中配置"onReachBottomDistance"
		onReachBottom() {
			let len = this.productList.length;
			if (len >= 30) {
				uni.showToast({
					title: '到底啦',
					icon: 'none'
				});
				return false;
			}
			// 演示,随机加入商品,生成环境请替换为ajax请求
			let end_goods_id = this.productList[len - 1].goods_id;
			for (let i = 1; i <= 10; i++) {
				let goods_id = end_goods_id + i;
				let p = {
					goods_id: goods_id,
					img: 'http://120.55.87.80/img/recommand/' + (goods_id % 10 == 0 ? 10 : goods_id % 10) + '.jpg',
					name: '商品名称',
					price: '￥168',
					slogan: '1235人付款'
				};
				this.productList.push(p);
			}
		},
		onLoad() {
			//加载活动专区
			this.loadPromotion();
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
				//uni.showToast({title: e.name,icon:"none"});
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
				uni.showToast({
					title: '商品' + e.goods_id,
					icon: 'none'
				});
				uni.navigateTo({
					url: '../../goods/goods',
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
		margin: 3% 3%;
		justify-content: center;

		.title {
			width: 100%;
			height: 60rpx;
			font-size: 34rpx;
			font-weight: 600;
			text-align: center;
			margin-bottom: 2%;
			color: #000000;
		}

		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
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
					border-radius: 50rpx 50rpx 0 0;
				}

				.name {
					width: 100%;
					padding: 4% 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: center;
					overflow: hidden;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
