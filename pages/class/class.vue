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
				<view class="cu-item" :class="index==showCategoryIndex?'text-mine cur':''" v-for="(category,index) in categoryList" :key="category.id" @tap="showCategory(index)" style="font-size: 28rpx;">
					{{category.title}}
				</view>
			</scroll-view>
			
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="margin-top: 100rpx;"
			 :scroll-into-view="'main-'+mainCur" @scroll="VerticalMain">
				<view class="padding-top padding" v-for="(category,index) in categoryList" :key="category.id" v-show="index==showCategoryIndex">
					<view class="cu-bar round-top solid-bottom bg-white" style="box-shadow:0px 0px  10px 0px #d0d0d0;">
						<view class="action">
							<text class="cuIcon-title text-mine"></text>{{category.title}}</view>
					</view>
					<view class="cu-list round-bottom menu-avatar" style="box-shadow:0px 0px  10px 0px #d0d0d0;">
						<view class="cu-item" v-for="(box,i) in category.list" :key="i" @tap="toCategory(box)">
							<image class="cu-avatar headround lg" :src="'http://120.55.87.80/img/brand/'+box.img" style="box-shadow:0px 0px  10px 0px #d0d0d0;"></image>
							<view class="content">
								<view class="text-grey">{{box.name}}</view>
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
				showCategoryIndex:0,
				load: true,
				//分类列表
				categoryList:[
					{ id:1,title:'口红/唇釉',list:[
						{name:'雅诗兰黛',	img:'1.jpg'},
						{name:'兰蔻/LANCOME',	img:'2.jpg'},
						{name:'香奈儿/Chanel',	img:'3.jpg'},
						{name:'迪奥/Dior',	img:'4.jpg'},
						{name:'Guerlain/娇兰',	img:'5.jpg'},
						{name:'纪梵希/GIVECHY',	img:'6.jpg'},
						{name:'圣罗兰/YSL',	img:'7.jpg'},
						{name:'BobbiBrown',	img:'8.jpg'},
						{name:'CL/胡萝卜丁',	img:'9.jpg'},
						{name:'魅可/MAC',	img:'10.jpg'},
						{name:'阿玛尼/ARMANI',	img:'11.jpg'},
						{name:'TOM FORD',	img:'12.jpg'},
						{name:'NARS',	img:'13.jpg'},
						{name:'CPB',	img:'14.jpg'},
						{name:'玫珂菲',	img:'15.jpg'}
					]},
					{ id:2,title:'粉底/气垫',list:[
						{name:'雅诗兰黛',	img:'1.jpg'},
						{name:'兰蔻/LANCOME',	img:'2.jpg'},
						{name:'CPB',	img:'14.jpg'},
						{name:'YSL/圣罗兰',	img:'7.jpg'},
						{name:'阿玛尼/ARMANI',	img:'11.jpg'},
						{name:'迪奥/Dior',	img:'4.jpg'},
						{name:'BobbiBrown',	img:'8.jpg'},
						{name:'魅可/MAC',	img:'10.jpg'},
						{name:'NARS',	img:'13.jpg'},
						{name:'纪梵希/GIVECHY',	img:'6.jpg'},
						{name:'玫珂菲',	img:'15.jpg'},
						{name:'Lamer',	img:'16.jpg'},
						{name:'Covermark',	img:'17.jpg'}
					]},
					{ id:3,title:'腮红/高光',list:[
						{name:'NARS',	img:'13.jpg'},
						{name:'MAC',	img:'10.jpg'},
						{name:'3CE',	img:'18.jpg'},
						{name:'迪奥/Dior',	img:'4.jpg'},
						{name:'香奈儿/chanel',	img:'3.jpg'},
						{name:'雅诗兰黛',	img:'1.jpg'},
						{name:'Suqqu',	img:'19.jpg'},
						{name:'倩碧',	img:'20.jpg'},
						{name:'植村秀',	img:'21.jpg'},
						{name:'BobbiBrown',	img:'8.jpg'},
						{name:'Fenty beauty',	img:'22.jpg'},
						{name:'Becca',	img:'23.jpg'},
						{name:'CPB',	img:'14.jpg'},
						{name:'TooFaced',	img:'24.jpg'},
						{name:'Stila',	img:'25.jpg'},
					]},
					{ id:4,title:'隔离/妆前',list:[
						{name:'CPB',	img:'14.jpg'},
						{name:'Stila',	img:'25.jpg'},
						{name:'YSL/圣罗兰',	img:'7.jpg'},
						{name:'娇兰/Guerlain',	img:'5.jpg'},
						{name:'兰芝',	img:'26.jpg'},
						{name:'Laura Mercier',	img:'27.jpg'},
						{name:'贝玲妃',	img:'28.jpg'},
						{name:'嘉娜宝',	img:'29.jpg'},
						{name:'Embryolisse',	img:'30.jpg'},
						{name:'BobbiBrown',	img:'8.jpg'},
						{name:'MAC/魅可',	img:'10.jpg'},
						{name:'Hourglass',	img:'31.jpg'},
						{name:'NARS',	img:'13.jpg'},
						{name:'香奈儿/Chanel',	img:'3.jpg'},
						{name:'阿玛尼/ARMANI',	img:'11.jpg'},
						{name:'香缇卡',	img:'32.jpg'},
						{name:'怡丽丝尔',	img:'33.jpg'},
						{name:'Covermark',	img:'17.jpg'},
						{name:'Albion/澳尔滨',	img:'34.jpg'},
						{name:'Paul&Joe',	img:'35.jpg'},
						{name:'植村秀',	img:'21.jpg'}
						
					]},
					{ id:5,title:'定妆',list:[
						{name:'CPB',	img:'14.jpg'},
						{name:'资生堂',	img:'36.jpg'},
						{name:'香奈儿/Chanel',	img:'3.jpg'},
						{name:'纪梵希/GIVECHY',	img:'6.jpg'},
						{name:'Guerlain/娇兰',	img:'5.jpg'},
						{name:'Becca',	img:'23.jpg'},
						{name:'Dior/迪奥',	img:'4.jpg'},
						{name:'THREE',	img:'58.jpg'},
						{name:'NARS',	img:'13.jpg'},
						{name:'SUQQU',	img:'19.jpg'},
						{name:'LUNASOL',	img:'37.jpg'},
						{name:'黛珂',	img:'38.jpg'},
						{name:'Laura Mercier',	img:'27.jpg'},
						{name:'MAC',	img:'10.jpg'},
						{name:'贝玲妃',	img:'39.jpg'},
						{name:'Covermark',	img:'17.jpg'}
					]},
					{ id:6,title:'防晒',list:[
						{name:'安耐晒',	img:'40.jpg'},
						{name:'兰蔻/LANCOME',	img:'2.jpg'},
						{name:'佳丽宝',	img:'29.jpg'},
						{name:'兰芝',	img:'26.jpg'},
						{name:'苏菲娜',	img:'41.jpg'},
						{name:'CPB',	img:'14.jpg'},
						{name:'资生堂',	img:'36.jpg'},
						{name:'科颜氏',	img:'42.jpg'},
						{name:'Fancl',	img:'43.jpg'},
						{name:'娇韵诗',	img:'44.jpg'},
						{name:'理肤泉',	img:'45.jpg'},
						{name:'怡思丁',	img:'46.jpg'},
						{name:'THANN',	img:'47.jpg'},
						{name:'Elta',	img:'49.jpg'},
						{name:'怡丽丝尔',	img:'33.jpg'},
						{name:'Ultrasun',	img:'50.jpg'},
					]},
					{ id:7,title:'修容',list:[
						{name:'MAC',	img:'10.jpg'},
						{name:'Fenty Beauty',	img:'51.jpg'},
						{name:'NYX',	img:'52.jpg'},
						{name:'CT',	img:'53.jpg'},
						{name:'ABH',	img:'54.jpg'},
						{name:'Kat Von D',	img:'55.jpg'}
					]},
					{ id:8,title:'眼妆',list:[
						{name:'TOM FORD',	img:'12.jpg'},
						{name:'香奈儿/Chanel',	img:'3.jpg'},
						{name:'Lunasol',	img:'37.jpg'},
						{name:'CT',	img:'53.jpg'},
						{name:'SUQQU',	img:'19.jpg'},
						{name:'NARS',	img:'13.jpg'},
						{name:'Urban becay',	img:'56.jpg'},
						{name:'黛珂',	img:'38.jpg'},
						{name:'NYX',	img:'52.jpg'},
						{name:'Dior/迪奥',	img:'4.jpg'},
						{name:'Guerlain/娇兰',	img:'5.jpg'},
						{name:'CPB',	img:'14.jpg'},
						{name:'植村秀',	img:'21.jpg'},
						{name:'雅诗兰黛',	img:'1.jpg'},
						{name:'Benefit',	img:'39.jpg'},
						{name:'Anastasia',	img:'54.jpg'}
					]}
				]
			};
		},
		onLoad() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onReady() {
			uni.hideLoading()
		},
		methods: {
			//分类切换显示
			showCategory(index){
				this.showCategoryIndex = index;
			},
			toCategory(e){
				uni.setStorageSync('catName',e.name);
				uni.navigateTo({
					url: '../../goods/goods-list/goods-list?cid='+e.id+'&name='+e.name
				});
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				   return false  //支付宝小程序暂时不支持双向联动 
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

<style>
	.header{
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
		background-color: #F06365;
		border-top-right-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
		position: fixed;
		top: 50%; 
		z-index: 10; 
	}
	
	.VerticalNav.nav .cu-item {
		width: 100%;
		color: #FFFFFF;
		text-align: center;
		background-color: #F06365;
		margin: 0;
		border: none;
		position: relative;
	}
	
	.VerticalNav.nav .cu-item.cur {
		background-color: #F06365;
	}
	
	.VerticalNav.nav .cu-item.cur::after {
		color: #FFFFFF;
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
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
