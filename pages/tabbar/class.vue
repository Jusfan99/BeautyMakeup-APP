<template>
	<view>
		<view class="cu-bar search header">
			<view class="search-form round" style="box-shadow:0px 0px  10px 0px #d0d0d0;">
				<text class="cuIcon-search"></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索美妆产品" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-mine shadow-blur round">搜索</button>
			</view>
		</view>
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav shadow-blur" scroll-y scroll-with-animation>
				<view class="cu-item" :class="index==showCategoryIndex?'text-mine cur':''" v-for="(category,index) in categoryList"
				 :key="category.id" @tap="showCategory(index)" style="font-size: 28rpx;">
					{{category.title}}
				</view>
			</scroll-view>

			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="margin-top: 100rpx;" :scroll-into-view="'main-'+mainCur"
			 @scroll="VerticalMain">
				<view class="padding-top padding" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex">
					<view class="cu-bar round-top solid-bottom bg-white" style="box-shadow:0px 0px  10px 0px #d0d0d0;">
						<view class="action">
							<text class="cuIcon-title text-mine"></text>{{category.title}}</view>
					</view>
					<view class="cu-list round-bottom menu-avatar" style="box-shadow:0px 0px  10px 0px #d0d0d0;">
						<view class="cu-item" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)">
							<image class="cu-avatar headround lg" :src="'http://120.55.87.80/img/brand/'+box.img" style="box-shadow:0px 0px  10px 0px #d0d0d0;"></image>
							<view class="content">
								<view style="color: #7A7E83;">{{box.name}}</view>
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
				showCategoryIndex: 0,
				//分类列表
				categoryList: [{
						id: 1,
						title: '口红/唇釉',
						list: [{
								enname: 'Lipstick',
								name: '雅诗兰黛',
								img: '1.jpg'
							},
							{
								enname: 'Lipstick',
								name: '兰蔻（LANCOME）',
								img: '2.jpg'
							},
							{
								enname: 'Lipstick',
								name: '香奈儿（Chanel）',
								img: '3.jpg'
							},
							{
								enname: 'Lipstick',
								name: '迪奥（Dior）',
								img: '4.jpg'
							},
							{
								enname: 'Lipstick',
								name: '娇兰',
								img: '5.jpg'
							},
							{
								enname: 'Lipstick',
								name: '纪梵希',
								img: '6.jpg'
							},
							{
								enname: 'Lipstick',
								name: '圣罗兰（YSL）',
								img: '7.jpg'
							},
							{
								enname: 'Lipstick',
								name: 'Bobbi Brown',
								img: '8.jpg'
							},
							{
								enname: 'Lipstick',
								name: 'CL/胡萝卜丁',
								img: '9.jpg'
							},
							{
								enname: 'Lipstick',
								name: '魅可（M.A.C）',
								img: '10.jpg'
							},
							{
								enname: 'Lipstick',
								name: '阿玛尼（ARMANI）',
								img: '11.jpg'
							},
							{
								enname: 'Lipstick',
								name: 'TOM FORD',
								img: '12.jpg'
							},
							{
								enname: 'Lipstick',
								name: 'NARS',
								img: '13.jpg'
							},
							{
								enname: 'Lipstick',
								name: 'CPB',
								img: '14.jpg'
							},
							{
								enname: 'Lipstick',
								name: '玫珂菲',
								img: '15.jpg'
							}
						]
					},
					{
						id: 2,
						title: '粉底/气垫',
						list: [{
								enname: 'Foundation',
								name: '雅诗兰黛',
								img: '1.jpg'
							},
							{
								enname: 'Foundation',
								name: '兰蔻/LANCOME',
								img: '2.jpg'
							},
							{
								enname: 'Foundation',
								name: 'CPB',
								img: '14.jpg'
							},
							{
								enname: 'Foundation',
								name: 'YSL/圣罗兰',
								img: '7.jpg'
							},
							{
								enname: 'Foundation',
								name: '阿玛尼/ARMANI',
								img: '11.jpg'
							},
							{
								enname: 'Foundation',
								name: '迪奥/Dior',
								img: '4.jpg'
							},
							{
								enname: 'Foundation',
								name: 'BobbiBrown',
								img: '8.jpg'
							},
							{
								name: '魅可/MAC',
								img: '10.jpg'
							},
							{
								enname: 'Foundation',
								name: 'NARS',
								img: '13.jpg'
							},
							{
								enname: 'Foundation',
								name: '纪梵希/GIVECHY',
								img: '6.jpg'
							},
							{
								enname: 'Foundation',
								name: '玫珂菲',
								img: '15.jpg'
							},
							{
								enname: 'Foundation',
								name: 'Lamer',
								img: '16.jpg'
							},
							{
								enname: 'Foundation',
								name: 'Covermark',
								img: '17.jpg'
							}
						]
					},
					{
						id: 3,
						title: '腮红/高光',
						list: [{
								enname: 'Blush',
								name: 'NARS',
								img: '13.jpg'
							},
							{
								enname: 'Blush',
								name: 'MAC',
								img: '10.jpg'
							},
							{
								enname: 'Blush',
								name: '3CE',
								img: '18.jpg'
							},
							{
								enname: 'Blush',
								name: '迪奥/Dior',
								img: '4.jpg'
							},
							{
								enname: 'Blush',
								name: '香奈儿/chanel',
								img: '3.jpg'
							},
							{
								enname: 'Blush',
								name: '雅诗兰黛',
								img: '1.jpg'
							},
							{
								enname: 'Blush',
								name: 'Suqqu',
								img: '19.jpg'
							},
							{
								enname: 'Blush',
								name: '倩碧',
								img: '20.jpg'
							},
							{
								enname: 'Blush',
								name: '植村秀',
								img: '21.jpg'
							},
							{
								enname: 'Blush',
								name: 'Bobbi Brown',
								img: '8.jpg'
							},
							{
								enname: 'Blush',
								name: 'Fenty beauty',
								img: '22.jpg'
							},
							{
								enname: 'Blush',
								name: 'Becca',
								img: '23.jpg'
							},
							{
								enname: 'Blush',
								name: 'CPB',
								img: '14.jpg'
							},
							{
								enname: 'Blush',
								name: 'TooFaced',
								img: '24.jpg'
							},
							{
								enname: 'Blush',
								name: 'Stila',
								img: '25.jpg'
							},
						]
					},
					{
						id: 4,
						title: '隔离/妆前',
						list: [{
								enname: 'Primer',
								name: 'CPB',
								img: '14.jpg'
							},
							{
								enname: 'Primer',
								name: 'Stila',
								img: '25.jpg'
							},
							{
								enname: 'Primer',
								name: 'YSL/圣罗兰',
								img: '7.jpg'
							},
							{
								enname: 'Primer',
								name: '娇兰/Guerlain',
								img: '5.jpg'
							},
							{
								enname: 'Primer',
								name: '兰芝',
								img: '26.jpg'
							},
							{
								enname: 'Primer',
								name: 'Laura Mercier',
								img: '27.jpg'
							},
							{
								enname: 'Primer',
								name: '贝玲妃',
								img: '28.jpg'
							},
							{
								enname: 'Primer',
								name: '嘉娜宝',
								img: '29.jpg'
							},
							{
								enname: 'Primer',
								name: 'Embryolisse',
								img: '30.jpg'
							},
							{
								enname: 'Primer',
								name: 'BobbiBrown',
								img: '8.jpg'
							},
							{
								enname: 'Primer',
								name: 'MAC/魅可',
								img: '10.jpg'
							},
							{
								enname: 'Primer',
								name: 'Hourglass',
								img: '31.jpg'
							},
							{
								enname: 'Primer',
								name: 'NARS',
								img: '13.jpg'
							},
							{
								enname: 'Primer',
								name: '香奈儿/Chanel',
								img: '3.jpg'
							},
							{
								enname: 'Primer',
								name: '阿玛尼/ARMANI',
								img: '11.jpg'
							},
							{
								enname: 'Primer',
								name: '香缇卡',
								img: '32.jpg'
							},
							{
								enname: 'Primer',
								name: '怡丽丝尔',
								img: '33.jpg'
							},
							{
								enname: 'Primer',
								name: 'Covermark',
								img: '17.jpg'
							},
							{
								enname: 'Primer',
								name: 'Albion/澳尔滨',
								img: '34.jpg'
							},
							{
								enname: 'Primer',
								name: 'Paul&Joe',
								img: '35.jpg'
							},
							{
								enname: 'Primer',
								name: '植村秀',
								img: '21.jpg'
							}
						]
					},
					{
						id: 5,
						title: '定妆',
						list: [{
								enname: 'FixedMakeup',
								name: 'CPB',
								img: '14.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: '资生堂',
								img: '36.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: '香奈儿/Chanel',
								img: '3.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: '纪梵希/GIVECHY',
								img: '6.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'Guerlain/娇兰',
								img: '5.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'Becca',
								img: '23.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'Dior/迪奥',
								img: '4.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'THREE',
								img: '58.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'NARS',
								img: '13.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'SUQQU',
								img: '19.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'LUNASOL',
								img: '37.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: '黛珂',
								img: '38.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'Laura Mercier',
								img: '27.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'MAC',
								img: '10.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: '贝玲妃',
								img: '39.jpg'
							},
							{
								enname: 'FixedMakeup',
								name: 'Covermark',
								img: '17.jpg'
							}
						]
					},
					{
						id: 6,
						title: '防晒',
						list: [{
								enname: 'Sunscreen',
								name: '安耐晒',
								img: '40.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '兰蔻/LANCOME',
								img: '2.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '佳丽宝',
								img: '29.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '兰芝',
								img: '26.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '苏菲娜',
								img: '41.jpg'
							},
							{
								enname: 'Sunscreen',
								name: 'CPB',
								img: '14.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '资生堂',
								img: '36.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '科颜氏',
								img: '42.jpg'
							},
							{
								enname: 'Sunscreen',
								name: 'Fancl',
								img: '43.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '娇韵诗',
								img: '44.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '理肤泉',
								img: '45.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '怡思丁',
								img: '46.jpg'
							},
							{
								enname: 'Sunscreen',
								name: 'THANN',
								img: '47.jpg'
							},
							{
								enname: 'Sunscreen',
								name: 'Elta',
								img: '49.jpg'
							},
							{
								enname: 'Sunscreen',
								name: '怡丽丝尔',
								img: '33.jpg'
							},
							{
								enname: 'Sunscreen',
								name: 'Ultrasun',
								img: '50.jpg'
							},
						]
					},
					{
						id: 7,
						title: '修容',
						list: [{
								enname: 'Modify',
								name: 'MAC',
								img: '10.jpg'
							},
							{
								enname: 'Modify',
								name: 'Fenty Beauty',
								img: '51.jpg'
							},
							{
								enname: 'Modify',
								name: 'NYX',
								img: '52.jpg'
							},
							{
								enname: 'Modify',
								name: 'CT',
								img: '53.jpg'
							},
							{
								enname: 'Modify',
								name: 'ABH',
								img: '54.jpg'
							},
							{
								enname: 'Modify',
								name: 'Kat Von D',
								img: '55.jpg'
							}
						]
					},
					{
						id: 8,
						title: '眼妆',
						list: [{
								enname: 'EyeMakeup',
								name: 'TOM FORD',
								img: '12.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: '香奈儿/Chanel',
								img: '3.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'Lunasol',
								img: '37.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'CT',
								img: '53.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'SUQQU',
								img: '19.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'NARS',
								img: '13.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'Urban becay',
								img: '56.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: '黛珂',
								img: '38.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'NYX',
								img: '52.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'Dior/迪奥',
								img: '4.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'Guerlain/娇兰',
								img: '5.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'CPB',
								img: '14.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: '植村秀',
								img: '21.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: '雅诗兰黛',
								img: '1.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'Benefit',
								img: '39.jpg'
							},
							{
								enname: 'EyeMakeup',
								name: 'Anastasia',
								img: '54.jpg'
							}
						]
					}
				]
			};
		},
		onLoad() {

		},
		methods: {
			//分类切换显示
			showCategory(index) {
				this.showCategoryIndex = index;
			},
			//分类跳转
			toCategory(e) {
				//uni.showToast({title: e.name,icon:"none"});
				uni.setStorageSync('enName', e.enname);
				uni.setStorageSync('brandName', e.name);
				uni.navigateTo({
					url: "../list/smallList",
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.list.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.list[i].id);
						view.fields({
							size: true
						}, data => {
							this.list[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.list[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.list.length; i++) {
					if (scrollTop > this.list[i].top && scrollTop < this.list[i].bottom) {
						this.verticalNavTop = (this.list[i].id - 1) * 50
						this.tabCur = this.list[i].id
						console.log(scrollTop)
						return false
					}
				}
			}
		},
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

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
		height: 760upx;
		padding-top: 20upx;
		margin-top: -380upx;
		background-color: #CF6C7E;
		border-top-right-radius: 50rpx;
		border-bottom-right-radius: 50rpx;
		position: fixed;
		top: 50%;
		z-index: 10;
	}

	.VerticalNav.nav .cu-item {
		width: 95%;
		color: #FFFFFF;
		text-align: center;
		background-color: #CF6C7E;
		margin: 0;
		border: none;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #CF6C7E;
	}

	.VerticalNav.nav .cu-item.cur::after {
		color: #FFFFFF;
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 10upx 10upx 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 10upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		margin-left: 200upx;
		background-color: #F8F8F8;
		flex: 1;
	}
</style>
