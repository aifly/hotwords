var imgs = {
	play: './assets/images/play.png',
	title1: './assets/images/title1.png',
	title2: './assets/images/title2.png',
	info: './assets/images/info.png',
	hotwords: './assets/images/hotwords.png',
	vote: './assets/images/vote.png',
	text: './assets/images/text.png',
	circle: './assets/images/circle.png',
	logo: './assets/images/logo.png',
	hotwordsBg: './assets/images/hotwords-bg.jpg',
	followBtn: './assets/images/follow-btn.png',
	indexBg: './assets/images/index-bg.jpg',
	national: './assets/images/national.png',
	qrcode: './assets/images/qrcode1.png',
	evidence: './assets/images/evidence.png',
	forecast: './assets/images/forecast.png',
	arrow: './assets/images/arrow.png',
	loading: './assets/images/loading.gif',
	loading1: './assets/images/loading.png',
	wordBg: './assets/images/word-bg.png',


}



var arr = [];
for (var attr in imgs) {
	arr.push(imgs[attr]);
}
var loading = function(arr, fn, fnEnd) {
	var len = arr.length;
	var count = 0;
	var i = 0;

	function loadimg() {
		if (i === len) {
			return;
		}
		var img = new Image();
		img.onload = img.onerror = function() {
			count++;
			if (i < len - 1) {
				i++;
				loadimg();
				fn && fn(i / (len - 1), img.src);
			} else {
				fnEnd && fnEnd(img.src);
			}
		};
		img.src = arr[i];
	}
	loadimg();
}