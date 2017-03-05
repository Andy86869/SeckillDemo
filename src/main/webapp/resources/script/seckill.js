// 存放主要交互逻辑的js 代码
//JavaScript 模块化  通过json 对象的方式来实现js模块化
//seckill.detail.init(params);
var seckill = {
	// 封装秒杀相关ajax 的url
	URL : {
		now : function() {
			return '/seckill/time/now';
		},
		exposer :function(seckillId){
			return '/seckill/'+seckillId+'/exposer';
		},
		execution :function(seckillId,md5){
			return '/seckill/'+seckillId+'/'+md5+'/execution';
		}	
	},
	handleSeckill : function(seckillId,node) {
		// 获取秒杀地址,控制实现逻辑,执行秒杀.
		node.hide()
			.html('<button class="btn btn-primary btn-lg" id="killBtn">开始秒杀</button>');
			$.post(seckill.URL.exposer(seckillId),{},function(result){
				// 在回调函数中执行交互流程
				if (result&&result['success']) {
					var exposer = result['data'];
					if (exposer['exposed']) {
						//开始秒杀
						// 获取秒杀地址
						var md5 = exposer['md5'];
						var killUrl = seckill.URL.execution(seckillId, md5);
						console.log("killUrl:"+killUrl);
						//one 是绑定一次click 事件
						$('#killBtn').one('click',function(){
							// 执行秒杀请求的操作
							//1： 先禁用按钮
							$(this).addClass('disabled');
							//2：发送秒杀请求执行秒杀
							$.post(killUrl,{},function(result){
								if (result&&result['success']) {
									var killResult = result['data'];
									var state =killResult['state'];
									var stateInfo =killResult['stateInfo'];
									console.log("killResult:"+killResult);
									console.log("state:"+state);
									console.log("stateInfo:"+stateInfo);
									//3:显示秒杀结果
									node.html('<span class="lable lable-success">'+stateInfo+'</span>');
								}
							});
						});
						node.show();
					}else{
						// 未开启秒杀 (客户端和服务端时间细微的偏差引起)
						var  now = exposer['now'];
						var start = exposer['start'];
						var end = exposer['end'];
						// 重新计算计时
						seckill.countdown(seckillId, now, start, end);
					}
				}else{
					console.log('result:'+result);
				}
			});
	},
	// 验证手机号
	validatePhone : function(phone) {
		if (phone && phone.length == 11 && !isNaN(phone)) {
			return true;
		} else {
			return false;
		}
	},
	countdown : function(seckillId, nowTime, startTime, endTime) {
		var seckillBox = $('#seckill-box');
		// 时间判断
		if (nowTime > endTime) {
			// 秒杀结束
			seckillBox.html('秒杀结束!');
		} else if (nowTime < startTime) {
			// 秒杀未开始,开始计时
			var killTime = new Date(startTime + 1000); // 防止时间偏移
			  console.log('killTime=' + killTime);//TODO
			seckillBox.countdown(killTime, function(event) {
				// 控制时间格式
				var format = event.strftime('秒杀倒计时: %D天 %H时 %M分 %S秒');
				seckillBox.html(format);
				/*时间完成后回调事件*/
			}).on('finish.countdown', function() {
				seckill.handleSeckill(seckillId,seckillBox);
			});

		} else {
			// 秒杀开始
			seckill.handleSeckill(seckillId,seckillBox);
		}
	},
	//详情页秒杀逻辑
	detail:{
		//详情页初始化
		init:function(params){
			// 用户手机验证,计时交互
			//规划交互流程
			//在cookie 中找手机号
			var killPhone = $.cookie('killPhone');
			var startTime = params['startTime'];
			var endTime = params['endTime'];
			var seckillId = params['seckillId'];
			//验证手机号
			if (!seckill.validatePhone(killPhone)) {
				//绑定phone 
				//控制输出
				var killPhoneModal =$('#killPhoneModal');
				//显示了弹出层
				killPhoneModal.modal({
					// 显示弹出层
					show:true, 
					backdrop:'static',// 禁止位置关闭
					keyboard:false // 关闭键盘事件
				});
				$('#killPhoneBtn').click(function(){
					var inputPhone = $('#killPhoneKey').val();
					if(seckill.validatePhone(inputPhone)){
						//电话写入cookie
						$.cookie('killPhone',inputPhone,{expires:7,path:'/seckill'});
						//刷新页面
						window.location.reload();
					}else{
						$('#killPhoneMessage').hide().html('<lable class="label label-danger">手机号有误</lable>').show(300);
					}
				});
			} 
			//已经登录
			//计时交互
			var startTime = params['startTime'];
			var endTime = params['endTime'];
			var seckillId = params['seckillId'];
			$.get(seckill.URL.now(), {}, function(result) {
				//
				if (result && result['success']) {
					var nowTime = result['data'];
					// 计时判断
					seckill.countdown(seckillId, nowTime,startTime,endTime);
				} else {
					console.log('result:' + result);
				}
			});
		}
	}
}