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

export {
	wayscroll,isElementNotInViewport
}