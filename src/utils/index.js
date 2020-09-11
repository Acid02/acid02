import jump from 'jump.js'

const wayscroll = (scroll) => {
	jump(scroll,{duration:500})
}
/**
 * 判断某个原生DOM元素是否不在屏幕可见区内
 * @param {*} el 原生DOM元素
 */
const isElementNotInViewport = function(el) {
  let rect = el.getBoundingClientRect();
  return (
    rect.top >= (window.innerHeight || document.documentElement.clientHeight) ||
    rect.bottom <= 0
  );
};

//用于判断是不是微信浏览器
const isWeiXin = ()=> {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true;
	} else {
		return false;
	}
}

  /*判断客户端*/
const  judgeClient = ()=>{
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
      client = 'iOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      client = 'Android';
    } else {
      client = 'PC';
    }
    return client;
  }

export {
	wayscroll,isElementNotInViewport,isWeiXin,judgeClient
}