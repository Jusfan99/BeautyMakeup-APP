<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		created() { //此处用created相当于对前端页面数据进行初始化
			this.url = uni.getStorageSync('webUrl');
		},
		methods: {

		}
	}
</script>

<style>

</style>
