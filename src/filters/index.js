
//插入字符串
const replaceStr = (str, sum = 72) => {
	return str.replace(`/(.{${sum}})/g,'$1\r\n'`);
}
/*判断元素是否在可视范围*/
const isVisible = (ele) => {
	console.log(ele)
	let windowHeight = window.innerHeight
	let position = ele.getBoundingClientRect()
	// 当元素的top偏移量小于页面大小并且大于高度的负数
	if (position.top < windowHeight && position.top > -position.height) {
		return true
	}
	return false
}
/*对图片进行懒加载*/
const lazyLoad = (img, src) => {
	if (img && src && isVisible(img)) { // 元素存在，元素未被加载，元素可见
		setTimeout(function() {
			img.setAttribute('src', src)
		}, 1000) // 模拟网络请求
	}
}

//计算富文本字节需要多少时间读完/和多少个字节
const capitalize = (value, date) => {
	if (!value) return ''
	value = value.replace(/\s+/g, "").replace(/<[^<>]+>/g, '').replace(/&nbsp;/ig,'');
	if (date) {
		return Math.ceil(value.length / date)
	}
	
	return value.length
}

// 计算时间为刚刚、几分钟前、几小时前、几天前··
const timeago = (dateTimeStamp) => {
	let minute = 1000 * 60;
	let hour = minute * 60;
	let day = hour * 24;
	let halfamonth = day * 15;
	let month = day * 30;
	let now = new Date().getTime();
	let diffValue = now - Date.parse(dateTimeStamp);
	if (diffValue < 0) {
		return;
	}
	let monthC = diffValue / month;
	let weekC = diffValue / (7 * day);
	let dayC = diffValue / day;
	let hourC = diffValue / hour;
	let minC = diffValue / minute;
	let result = ''
	if (monthC >= 1) {
		result = "" + parseInt(monthC) + " 个月前";
	} else if (weekC >= 1) {
		result = "" + parseInt(weekC) + " 周前";
	} else if (dayC >= 1) {
		result = "" + parseInt(dayC) + " 天前";
	} else if (hourC >= 1) {
		result = "" + parseInt(hourC) + " 小时前";
	} else if (minC >= 1) {
		result = "" + parseInt(minC) + " 分钟前";
	} else
		result = "刚刚";
	return result;
}
//把HTML格式的字符串转义成实体格式字符串
const escapeHTMLString = (str) => {
    str = str.replace(/</g,'&lt;');
    str = str.replace(/>/g,'&gt;');
    return str;
}

//把实体格式字符串转义成HTML格式的字符串
const escapeStringHTML = (str) => {
    str = str.replace(/&lt;/g,'<');
    str = str.replace(/&gt;/g,'>');
    return str;
}

export {
	replaceStr,
	isVisible,
	lazyLoad,
	capitalize,
	timeago,
	escapeHTMLString,
	escapeStringHTML
}
