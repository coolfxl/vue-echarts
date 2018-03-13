export var Tween = {
	linear: function(t, b, c, d) { //匀速
		return c * t / d + b;
	},
	easeIn: function(t, b, c, d) { //加速曲线
		return c * (t /= d) * t + b;
	},
	easeOut: function(t, b, c, d) { //减速曲线
		return -c * (t /= d) * (t - 2) + b;
	},
	easeBoth: function(t, b, c, d) { //加速减速曲线
		if((t /= d / 2) < 1) {
			return c / 2 * t * t + b;
		}
		return -c / 2 * ((--t) * (t - 2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d) { //加加速曲线
		return c * (t /= d) * t * t * t + b;
	},
	easeOutStrong: function(t, b, c, d) { //减减速曲线
		return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d) { //加加速减减速曲线
		if((t /= d / 2) < 1) {
			return c / 2 * t * t * t * t + b;
		}
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p) { //正弦衰减曲线（弹动渐入）
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},
	elasticOut: function(t, b, c, d, a, p) { //正弦增强曲线（弹动渐出）
		if(t === 0) {
			return b;
		}
		if((t /= d) == 1) {
			return b + c;
		}
		if(!p) {
			p = d * 0.3;
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},
	elasticBoth: function(t, b, c, d, a, p) {
		if(t === 0) {
			return b;
		}
		if((t /= d / 2) == 2) {
			return b + c;
		}
		if(!p) {
			p = d * (0.3 * 1.5);
		}
		if(!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if(t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	},
	backIn: function(t, b, c, d, s) { //回退加速（回退渐入）
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},
	backOut: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 3.70158; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backOut1: function(t, b, c, d, r) {
		return "undefined" == typeof r && (r = 1.5), c * ((t = t / d - 1) * t * ((r + 1) * t + r) + 1) + b
	},
	backOut2: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.2; //回缩的距离
		}
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},
	backBoth: function(t, b, c, d, s) {
		if(typeof s == 'undefined') {
			s = 1.70158;
		}
		if((t /= d / 2) < 1) {
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		}
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d) { //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	},
	bounceOut: function(t, b, c, d) {
		if((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b;
		} else if(t < (2 / 2.75)) {
			return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
		} else if(t < (2.5 / 2.75)) {
			return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
		}
		return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},
	bounceBoth: function(t, b, c, d) {
		if(t < d / 2) {
			return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}

}

/**
 * 获取元素属性对应的值
 * @param {Object} obj
 * @param {Object} attr
 * model: service  原名css
 */
export function getEleStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

/**
 * 通过ClassName获取元素，返回一个集合数组
 * @param {Object} oParent
 * @param {Object} sClass
 * model: index
 * 使用方式：getByClass(document, "add")
 */
export function getEleByClass(oParent, sClass) {
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	var re = new RegExp('\\b' + sClass + '\\b', 'i');
	var i = 0;

	for(i = 0; i < aEle.length; i++) {
		//if(aEle[i].className==sClass)
		//if(aEle[i].className.search(sClass)!=-1)
		if(re.test(aEle[i].className)) {
			aResult.push(aEle[i]);
		}
	}

	return aResult;
}

/**
 * 根据元素的属性和属性值设置元素的CSS样式
 * @param {Object} e
 * @param {Object} t
 * @param {Object} a
 * model: index
 */
export function css(e, t, a) {
	if(2 == arguments.length) {
		if("scale" == t || "rotate" == t || "rotateX" == t || "rotateY" == t || "rotateZ" == t || "scaleX" == t || "scaleY" == t || "translateY" == t || "translateX" == t || "translateZ" == t) switch(e.$Transform || (e.$Transform = {}), t) {
			case "scale":
			case "scaleX":
			case "scaleY":
				return "number" == typeof e.$Transform[t] ? e.$Transform[t] : 100;
			case "translateY":
			case "translateX":
			case "translateZ":
				return e.$Transform[t] ? e.$Transform[t] : 0;
			default:
				return e.$Transform[t] ? e.$Transform[t] : 0
		}
		var n = e.currentStyle ? e.currentStyle[t] : document.defaultView.getComputedStyle(e, !1)[t];
		return "opacity" == t ? Math.round(100 * parseFloat(n)) : parseInt(n)
	}
	if(3 == arguments.length) switch(t) {
		case "scale":
		case "scaleX":
		case "scaleY":
		case "rotate":
		case "rotateX":
		case "rotateY":
		case "rotateZ":
		case "translateY":
		case "translateX":
		case "translateZ":
			setCss3(e, t, a);
			break;
		case "width":
		case "height":
		case "paddingLeft":
		case "paddingTop":
		case "paddingRight":
		case "paddingBottom":
			a = Math.max(a, 0);
		case "left":
		case "top":
		case "right":
		case "bottom":
		case "marginLeft":
		case "marginTop":
		case "marginRight":
		case "marginBottom":
			e.style[t] = "string" == typeof a ? a : a + "px";
			break;
		case "opacity":
			e.style.filter = "alpha(opacity:" + a + ")", e.style.opacity = a / 100;
			break;
		default:
			e.style[t] = a
	}
	return function(t, a) {
		css(e, t, a)
	}
}

/**
 * 根据元素的属性和属性值设置元素的CSS3样式
 * @param {Object} e
 * @param {Object} t
 * @param {Object} a
 * model: index
 */
export function setCss3(e, t, a) {
	var n = "",
		r = "",
		s = ["Webkit", "Moz", "O", "ms", ""];
	e.$Transform || (e.$Transform = {}), e.$Transform[t] = parseInt(a);
	for(n in e.$Transform) switch(n) {
		case "scale":
		case "scaleX":
		case "scaleY":
			r += n + "(" + e.$Transform[n] / 100 + ") ";
			break;
		case "rotate":
		case "rotateX":
		case "rotateY":
		case "rotateZ":
			r += n + "(" + e.$Transform[n] + "deg) ";
			break;
		case "translateY":
		case "translateX":
		case "translateZ":
			r += n + "(" + e.$Transform[n] + "px) "
	}
	for(var c = 0; c < s.length; c++) e.style[s[c] + "Transform"] = r
}

/**
 * 图片预加载
 * @param {Object} src
 */
export function imgPreLoad(src) {
	/*
	属性：
	src : 当我们给Image对象的src属性赋值一个url的时候，这个Image对象就去会加载url资源，加载完成以后的资源被保存到了浏览器的缓存文件夹里面，下次如果我们要去调用这个url地址的时候，直接是从缓存文件夹读取到的，所以速度很快。
	onload : 当资源加载完成的时候触发
	onerror : 当资源加载失败的时候触发
	*/
	var oImage = new Image();
	oImage.src = 'http://b.hiphotos.baidu.com/image/w%3D2048/sign=526ef7bda41ea8d38a227304a332314e/1ad5ad6eddc451dae05f4cedb4fd5266d016320e.jpg';
	oImage.onload = function() {
		alert('加载完成');
		document.onclick = function() {
			oImg.src = 'http://b.hiphotos.baidu.com/image/w%3D2048/sign=526ef7bda41ea8d38a227304a332314e/1ad5ad6eddc451dae05f4cedb4fd5266d016320e.jpg';
		}
	}
	oImage.onerror = function() {
		alert('加载出错');
	}
}