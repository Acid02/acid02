var dataForWeixin = {
 	appId: "",
 	MsgImg: "https://api.vvhan.com/api/acgimg", //显示图片
 	TLImg: "https://api.vvhan.com/api/acgimg", //显示图片
 	url: "https://www.acid02.com", //跳转地址
 	title: "等一句晚安！", //标题内容
 	desc: "想开给世界的花，你教我怎么表达", //描述内容
 	fakeid: "",
 	callback: function() {}
 };
 (function() {
 	var onBridgeReady = function() {
 		WeixinJSBridge.on('menu:share:appmessage', function(argv) {
 			WeixinJSBridge.invoke('sendAppMessage', {
 				"appid": dataForWeixin.appId,
 				"img_url": dataForWeixin.MsgImg,
 				"img_width": "120",
 				"img_height": "120",
 				"link": dataForWeixin.url,
 				"desc": dataForWeixin.desc,
 				"title": dataForWeixin.title
 			}, function(res) {
 				(dataForWeixin.callback)();
 			});
 		});
 		WeixinJSBridge.on('menu:share:timeline', function(argv) {
 			(dataForWeixin.callback)();
 			WeixinJSBridge.invoke('shareTimeline', {
 				"img_url": dataForWeixin.TLImg,
 				"img_width": "120",
 				"img_height": "120",
 				"link": dataForWeixin.url,
 				"desc": dataForWeixin.desc,
 				"title": dataForWeixin.title
 			}, function(res) {});
 		});
 		WeixinJSBridge.on('menu:share:weibo', function(argv) {
 			WeixinJSBridge.invoke('shareWeibo', {
 				"content": dataForWeixin.title,
 				"url": dataForWeixin.url
 			}, function(res) {
 				(dataForWeixin.callback)();
 			});
 		});
 		WeixinJSBridge.on('menu:share:facebook', function(argv) {
 			(dataForWeixin.callback)();
 			WeixinJSBridge.invoke('shareFB', {
 				"img_url": dataForWeixin.TLImg,
 				"img_width": "120",
 				"img_height": "120",
 				"link": dataForWeixin.url,
 				"desc": dataForWeixin.desc,
 				"title": dataForWeixin.title
 			}, function(res) {});
 		});
 	};

 	if (document.addEventListener) {
 		document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
 	} else if (document.attachEvent) {
 		document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
 		document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
 	}
 })();


 // window.onload = function() {
 // 	document.onkeydown = function() {
 // 		var e = window.event || arguments[0];
 // 		if (e.keyCode == 123) {
 // 			return false;
 // 		} else if ((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {
 // 			return false;
 // 		}
 // 	};
 // 	document.oncontextmenu = function() {
 // 		return false;
 // 	}
 // }
