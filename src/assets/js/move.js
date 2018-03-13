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

/**
 * 依赖utils.js中的css方法
 * @param {Object} t ： 类型
 * @param {Object} e ： 元素
 * @param {Object} n ： 时间
 * @param {Object} r ： 运动形式
 * @param {Object} a ： 回调函数
 */
export function move(t, e, n, r, a) {
	if(t) {
		clearInterval(t.iTimer);
		var u = n || 1e3,
			o = {};
		for(var i in e) o[i] = {}, "opacity" == i ? (o[i].b = Math.round(100 * css(t, i)), o[i].c = 100 * e[i] - o[i].b) : (o[i].b = parseInt(css(t, i)), o[i].c = e[i] - o[i].b);
		var r = r || "linear",
			s = (new Date).getTime();
		t.iTimer = setInterval(function() {
			var n = (new Date).getTime() - s;
			n >= u && (n = u);
			for(var i in e) {
				var c = Tween[r](n, o[i].b, o[i].c, u);
				"opacity" == i ? (t.style[i] = c / 100, t.style.filter = "alpha(opacity=" + c + ")") : t.style[i] = c + "px"
			}
			n == u && (clearInterval(t.iTimer), a && a.call(t))
		}, 16)
	}
}

/**
 * 依赖utils.js中的css方法
 * @param {Object} obj 元素对象
 * @param {Object} json 属性key:value
 * @param {Object} d 
 * @param {Object} fx 运动形式
 * @param {Object} fn 回调函数
 * model: service 
 */
export function doMove(obj, json, d, fx, fn) {
	clearInterval(obj.iTimer);
	var startTime = +new Date();

	var j = {};

	for(var attr in json) {
		j[attr] = {};
		if(attr == 'opacity') {
			j[attr].b = Math.round(getEleStyle(obj, attr) * 100);
			j[attr].c = json[attr] - j[attr].b;
		} else if(attr == "webkitTransform") {
			j[attr].scaleXb = Math.round(getMatrix(getEleStyle(obj, attr), 0) * 100);
			j[attr].scaleYb = Math.round(getMatrix(getEleStyle(obj, attr), 3) * 100);
			j[attr].translateXb = Math.round(getMatrix(getEleStyle(obj, attr), 4));
			j[attr].translateYb = Math.round(getMatrix(getEleStyle(obj, attr), 5));
			j[attr].scaleXc = getMatrix(json[attr], 0) * 100 - j[attr].scaleXb;
			j[attr].scaleYc = getMatrix(json[attr], 3) * 100 - j[attr].scaleYb;
			j[attr].translateXc = getMatrix(json[attr], 4) - j[attr].translateXb;
			j[attr].translateYc = getMatrix(json[attr], 5) - j[attr].translateYb;
		} else {
			j[attr].b = parseInt(getEleStyle(obj, attr));
			j[attr].c = json[attr] - j[attr].b;
		}

	}

	obj.iTimer = setInterval(function() {

		var t = +new Date() - startTime;
		if(t >= d) {
			t = d;
		}

		for(var attr in json) {
			if(attr == "webkitTransform") {
				var valueSX = Tween[fx](t, j[attr].scaleXb, j[attr].scaleXc, d) / 100;
				var valueSY = Tween[fx](t, j[attr].scaleYb, j[attr].scaleYc, d) / 100;
				var valueTX = Tween[fx](t, j[attr].translateXb, j[attr].translateXc, d);
				var valueTY = Tween[fx](t, j[attr].translateYb, j[attr].translateYc, d);
				obj.style[attr] = "matrix(" + valueSX + ",0,0," + valueSY + "," + valueTX + "," + valueTY + ")";

			} else {
				var value = Tween[fx](t, j[attr].b, j[attr].c, d);
				if(attr == 'opacity') {
					obj.style.opacity = value / 100;
					obj.style.filter = 'alpha(opacity=' + value + ')';
				} else {
					obj.style[attr] = value + 'px';
				}
			}
		}

		if(t == d) {
			clearInterval(obj.iTimer);
			fn && fn();
		}

	}, 30);
}

/**
 * 依赖utils.js中的css方法
 * flash版运动
 * @param {Object} e ： 元素对象
 * 使用方式：
 * 	tweenMove({
		obj: $this.get(0),
		oTarget: {
			width: "240"
		},
		iTime: 200,
		iType: "bounceOut",
		fnEnd: function() {
			tweenMove({
				obj: $this.get(0),
				oTarget: {
					height: "410"
				},
				iTime: 400,
				iType: "backOut1"
			})
		}
	})
 * model: index
 */
export function tweenMove(e) {
	var t = e.obj,
		a = e.oTarget,
		n = e.iTime,
		r = e.iType,
		s = e.fnEnd,
		c = e.fnDuring,
		o = Tween[r],
		i = 0,
		u = {},
		f = {},
		l = n / 24,
		h = {},
		m = "";
	clearInterval(t.timer);
	for(m in a) u[m] = css(t, m), f[m] = a[m] - u[m], h[m] = 0;
	if(30 > n)
		for(m in a) css(t, m, a[m]);
	else t.timer = setInterval(function() {
		if(l > i) {
			i++;
			for(m in a) h[m] = o(i, u[m], f[m], l), css(t, m, o(i, u[m], f[m], l))
		} else {
			for(m in a) css(t, m, a[m]);
			clearInterval(t.timer), s && s.call(t)
		}
		c && c.call(t, u, h, i, l)
	}, 24)
}

/**
 * 速度版运动
 * @param {Object} obj
 * @param {Object} json
 * @param {Object} fn
 * 使用方式：startMove(this, {width: 200, height: 200, marginLeft: -50, marginTop: -50}, 
 * 	function(){
 * alert(1)
 * });
 */
export function startMove(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var bStop = true; //这一次运动就结束了——所有的值都到达了
		for(var attr in json) {
			//1.取当前的值
			var iCur = 0;

			if(attr == 'opacity') {
				iCur = parseInt(parseFloat(getEleStyle(obj, attr)) * 100);
			} else {
				iCur = parseInt(getEleStyle(obj, attr));
			}

			//2.算速度
			var iSpeed = (json[attr] - iCur) / 8;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			//3.检测停止
			if(iCur != json[attr]) {
				bStop = false;
			}

			if(attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
				obj.style.opacity = (iCur + iSpeed) / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			}
		}

		if(bStop) {
			clearInterval(obj.timer);

			if(fn) {
				fn();
			}
		}
	}, 30)
}

/**
 * 弹性+摩擦力-滑动的导航栏
 * @param {Object} obj
 * @param {Object} iTarget
 * model: index
 * 使用方式： startMove(oBg, this.offsetLeft);
 */
var navLeft = 0;
var navSpeed = 0;

export function esBounce(obj, iTarget) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		navSpeed += (iTarget - obj.offsetLeft) / 5;
		navSpeed *= 0.7;
		navLeft += navSpeed;
		if(Math.abs(navSpeed) < 1 && Math.abs(navLeft - iTarget) < 1) {
			//由于速度无法取整，有小数误差，使得目标无法到达指定位置，所以，将速度限制在一定范围内，比如1，这时再将运动目标的终点设置为预期的终点即可
			clearInterval(obj.timer);
			obj.style.left = iTarget + 'px';
		} else {
			obj.style.left = navLeft + 'px';
		}
		//		document.title=navSpeed;
	}, 30);
}