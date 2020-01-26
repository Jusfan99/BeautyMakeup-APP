<template>
	<view>
		<view>
			<uni-nav-bar color="#F06365" title="首页" shadow="true" statusBar="false"></uni-nav-bar>
		</view>
		<!-- 分类列表 -->
		<view class="category-list">
			<view
				class="category"
				v-for="(row, index) in categoryList"
				:key="index"
				@tap="toCategory(row)"
			>
				<view class="img"><image :src="row.img"></image></view>
				<view class="text">{{ row.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		components: {
			uniNavBar
		},
		data() {
			return {
				// 分类菜单
				categoryList: [
					{ id: 1, name: '办公', img: '/static/img/category/1.png' },
					{ id: 2, name: '家电', img: '/static/img/category/2.png' },
					{ id: 3, name: '服饰', img: '/static/img/category/3.png' },
					{ id: 4, name: '日用', img: '/static/img/category/4.png' },
					{ id: 5, name: '蔬果', img: '/static/img/category/5.png' },
					{ id: 6, name: '运动', img: '/static/img/category/6.png' },
					{ id: 7, name: '书籍', img: '/static/img/category/7.png' },
					{ id: 8, name: '文具', img: '/static/img/category/8.png' }
				]
			}
		},
		onLoad() {

		},
		methods: {
			//分类跳转
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				uni.setStorageSync('catName',e.name);
				uni.navigateTo({
					url: '../../goods/goods-list/goods-list?cid='+e.id+'&name='+e.name
				});
			},
		}
	}
</script>

<style lang="scss">
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 25%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
				image {
					width: 9vw;
					height: 9vw;
				}
			}
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
