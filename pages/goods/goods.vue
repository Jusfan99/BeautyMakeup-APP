<template>
	<view>
		<view class="VerticalBox">
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="margin-top: 100rpx;"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding">
					<view class="cu-list round-bottom menu-avatar" style="box-shadow:0px 0px  10px 0px #d0d0d0;">
						<view class="cu-item" v-for="good in goods" :key="good.name">
							<!-- <image class="cu-avatar headround lg" :src="'http://120.55.87.80/img/brand/'+box.img" style="box-shadow:0px 0px  10px 0px #d0d0d0;"></image> -->
							<view class="content">
								<view class="text-grey">{{good.name}}</view>
							</view>
							<view class="content">
								<view class="text-grey">{{good.price}}</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods: []
			}
		},
		created() { //此处用created相当于对前端页面数据进行初始化  
		      axios.get("http://120.55.87.80/server/Lipstick.php").then(res=>{  
				//这里是ES6的写法，get请求的地址 
		        this.users=res.data;//获取数据  
		        console.log('success');  
		        console.log(this.users);  
		      })  
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.VerticalBox {
		display: flex;
	}
	
	.VerticalMain {
		margin-left: 200upx;
		background-color: #F8F8F8;
		flex: 1;
	}
</style>
