const app = {
	apiUrl: 'https://aaa.bbbbb.com/', //请求的地址
	openidRequest(obj) {
		try {
			const openid = uni.getStorageSync('openid');
			if (openid) {
				if (obj.data) {
					obj.data["openid"] = openid;
				} else {
					obj.data = {
						"openid": openid
					};
				}
				obj.url = this.apiUrl + obj.url;
				uni.request(obj)
			} else {
				console.log("获取不到openid")
			}
		} catch (e) {
			console.log(e)
			console.log("获取不到openid")
		}
	},
	_getuserinfo(res) {
		var that = this
		var userinfoDetails = {} // 注册时,需要把用户信息传给后台,所以定义一个对象存储获取到的用户信息
		userinfoDetails = res.detail.userInfo
		uni.getUserInfo({
			provider: 'weixin',
			success: function() {
				uni.login({
					success: function(res) {
						uni.showLoading({
							title: '登陆中...',
							mask: false
						});
						uni.request({
							url: that.apiUrl + 'sdafl/ddfax/dfadf?code=' + res.code, //把code传给后台,后台返回openid和status
							success: (res) => {
								console.log(res)
								if (res.data.openid) {
									uni.setStorageSync('openid', res.data.openid)
									userinfoDetails.openid = res.data.openid
									//处理一下属性名传递给后台
									userinfoDetails = JSON.parse(JSON.stringify(userinfoDetails).replace(/avatarUrl/g, "headimgurl"));
									userinfoDetails = JSON.parse(JSON.stringify(userinfoDetails).replace(/gender/g, "sex"));
									userinfoDetails = JSON.parse(JSON.stringify(userinfoDetails).replace(/nickName/g, "nickname"));
									delete userinfoDetails.language;
									userinfoDetails.ppid = store.state.ppid || ''
									console.log(userinfoDetails)
								}
								// 当status==0时说明用户还没有注册需要注册
								if (res.data.status == 0) {
									that.sendInfo(userinfoDetails) // 调用注册接口,并把用户信息userinfoDetails传给后台
									console.log('我还没有注册')
								} else if (res.data.status == 1) {
									uni.showToast({
										title: '登录成功',
										icon: 'success',
										duration: 2000
									})
									that.getUserData() // 调用获取用户信息的接口
								} else {
									uni.hideLoading()
									uni.showToast({
										title: '登录失败',
										duration: 2000,
										icon: 'none'
									})
								}
							}
						})
					}
				})
			}
		});
	},
	// 注册接口
	sendInfo(userinfoDetails) {
		var that = this
		uni.request({
			url: this.apiUrl + 'fdafd/ifdaffdex/fdaff',
			data: userinfoDetails,
			method: 'POST',
			success: (res) => {
				if (res.data.userinfo == 1) {
					uni.hideLoading()
					uni.showToast({
						title: '注册成功',
						icon: 'success',
						duration: 2000
					})
					that.getUserData() // 调用获取用户信息的接口
				} else {
					uni.hideLoading()
					uni.showToast({
						title: res.data.msg,
						duration: 2000
					})
				}
			}
		})
	},
	// 获取用户信息
	getUserData() {
		uni.request({
			url: this.apiUrl + 'sfad/dfadfad/idfadffde',
			data: {
				openid: uni.getStorageSync('openid')
			},
			method: 'POST',
			success: (res) => {
				if (res.data.status == 1) {
					console.log(res.data)
					store.commit('login', res.data.user) // vuex的方法
				} else {
					uni.showToast({
						title: res.data.msg,
						duration: 2000
					})
				}
			}
		})
	}
}
export default app;
