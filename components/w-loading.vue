<template>
	<view class="mask" :class="mask == 'true' || mask == true ? 'mask-show' : ''" @click="Mclose" v-if="show"
	 @touchmove.stop.prevent="preventTouchMove">
		<!-- 加载动画开始 -->
		<!-- loading1~loading30挑选任意一个替换下方html 且替换对应css -->
		<view class="wrapper">
			<view class="rainbow">
				<view class="arc red"></view>
				<view class="arc orange"></view>
				<view class="arc yellow"></view>
				<view class="arc green"></view>
				<view class="arc blue"></view>
				<view class="arc violet"></view>
				<view class="arc purple"></view>
			</view>
		</view>
		<!-- 加载动画结束 -->
		<view class="title">{{text}}</view>
	</view>
	<!-- 遮罩层-->
</template>

<script scoped="true">
	export default {
		name: "w-loading",
		props: {
			text: String,
			mask: Boolean | String,
			click: Boolean | String,
		},
		data() {
			return {
				show: false
			};
		},
		methods: {
			preventTouchMove() {
				console.log('stop user scroll it!');
				return;
			},
			Mclose() {
				if (this.click == 'false' || this.click == false) {
					this.show = false
				}
			},
			open() {
				this.show = true
			},
			close() {
				this.show = false
			}
		}
	};
</script>

<style>
	.mask {
		/* pointer-events: none; */
		position: fixed;
		z-index: 99999;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}

	.mask.mask-show {
		background: rgba(7, 17, 27, .3);
	}

	.title {
		color: #fff;
		font-size: 28upx;
	}





	/* loading加载动画的css */
	.wrapper {
		border-bottom: solid 1upx #F8F8F8;
		height: 100upx;
		left: 50%;
		overflow: hidden;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 300upx;
	}

	.wrapper .rainbow {
		animation: spin 2s ease-in-out infinite;
		height: 200upx;
		margin: 0 auto;
		position: relative;
		width: 200upx;
	}

	.wrapper .rainbow:after {
		background-color: #F8F8F8;
		bottom: 100upx;
		content: "";
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	.wrapper .rainbow .arc {
		border: solid 8upx;
		border-radius: 50%;
		bottom: 0;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
	}

	.wrapper .rainbow .arc.red {
		border-color: red;
	}

	.wrapper .rainbow .arc.orange {
		border-color: orange;
		margin: 8upx;
	}

	.wrapper .rainbow .arc.yellow {
		border-color: yellow;
		margin: 16upx;
	}

	.wrapper .rainbow .arc.green {
		border-color: yellowgreen;
		margin: 24upx;
	}

	.wrapper .rainbow .arc.blue {
		border-color: skyblue;
		margin: 32upx;
	}

	.wrapper .rainbow .arc.violet {
		border-color: violet;
		margin: 40upx;
	}

	.wrapper .rainbow .arc.purple {
		border-color: mediumpurple;
		margin: 48upx;
	}

	@keyframes spin {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
