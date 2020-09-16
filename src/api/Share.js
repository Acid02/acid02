import wx from 'weixin-js-sdk'//引入微信sdk组件
import qs from 'qs'
import axios from 'axios'
/**
 *分享
 * @param _this 当前域
 * @param shareTitle 标题
 * @param shareUrl 链接
 * @param shareImg 图片
 * @param shareDesc 描述
 */
export const commonShare = (_this, shareTitle, shareUrl, shareImg, shareDesc) => {
    let url = location.href.split('#')[0];
    // let params = qs.stringify({
    //     shareUrl: url     //shareUrl是根据你的后台需要的参数名
    // });
    axios.post("/wxapi/getWxopenid/getwxjssign_coupon.html?url=https://m.couponblu.com/couponwq/common/gourmets/Legends/index.html").then(data=>{
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.data.appId, // 必填，公众号的唯一标识
                timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.data.nonceStr, //注意：服务端签名和前端参数名大小写不一致
                signature: data.data.signature, // 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
				
				let tempParam = {
				    'title': shareTitle, // 分享标题
				    'desc': shareDesc, // 分享描述
				    'link': shareUrl, // 分享链接
				    'imgUrl': shareImg, // 分享图标
				 //    success: successMethod, // 设置成功信息
					// cancel: cancelMethod
				};
				
				//分享给朋友圈
                wx.onMenuShareTimeline({
                title: shareTitle, // 分享标题
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImg, // 分享图标
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log('分享成功！！！');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    console.log('取消分享！！！');
                }
                });
				
				//分享给朋友
                wx.onMenuShareAppMessage({
                title: shareTitle, // 分享标题
                desc: shareDesc, // 分享描述
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImg, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log('分享成功！！！');
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                    console.log('取消分享！！！');
                }
                });
            });
        }).catch(err=>{
            console.log("自定义分享失败"+err);
        })
    
};