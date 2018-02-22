import Vue from "vue";
import Index from './components/index/index';
import Choose from './components/choose/index';
import Form from './components/form/index';
import List from './components/list/index';
import Obserable from './components/lib/obserable';
import imgs from './components/lib/assets'
import zmitiUtil from './components/lib/util.js'
import $ from 'jquery';
import './components/lib/touch.js';
var obserable = new Obserable();


//Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
	data: {
		obserable,
		rotate: false,
		imgs,
		showMask: false,
		viewH: document.documentElement.clientHeight,
		isShare: false,
		show: false,
		username: '',
		wish: '',
		width: 0,
		loaded: false,
		playStyle: {

		}
	},
	el: '#app',
	template: `<div>
		<Index v-if='!isShare && show'  :obserable='obserable'></Index>
		<Choose v-if='!isShare && show'  :obserable='obserable'></Choose>
		<List v-if='!isShare && show'  :obserable='obserable'></List>
		<Form v-if='!isShare && show'  :obserable='obserable'></Form>
		<audio ref='audio' src='./assets/music/bg.mp3'  loop></audio>
		<div  @click='toggleMusic' class='zmiti-play' :class='{"rotate":rotate}' :style="playStyle">
			<img  :src='imgs.play'/>
		</div>
		<!--
			<div v-if='!loaded' :style='{background:"#fff url("+imgs.shareBg+") no-repeat center ",backgroundSize:"cover"}' class='zmiti-loading lt-full'>
				<div class='zmiti-loading-ui'>
					<div class='zmiti-loading-bar' >
						<div :style="{width:width+'%'}">
							<img :src='imgs.pos' />
						</div>
					</div>
					<div class='zmiti-progress'>{{width}}%</div>
				</div>
			</div>
		-->
	</div>`,
	methods: {

		loading: function(arr, fn, fnEnd) {
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
		},
		toggleMusic() {
			var music = this.$refs['audio'];
			music[music.paused ? 'play' : 'pause']()
		},
		updatePv() {
			$.ajax({
				url: window.protocol + '//api.zmiti.com/v2/custom/update_pvnum/',
				type: 'post',
				data: {
					//isrand: 0,
					customid: 39
				}
			});
		}
	},
	components: {
		Index,
		Choose,
		Form,
		List
	},
	mounted() {


		var username = (zmitiUtil.getQueryString('nickname')),
			src = (zmitiUtil.getQueryString('src')),
			address = (zmitiUtil.getQueryString('address'));

		this.isShare = (username && src && address);

		this.show = true;

		this.username = decodeURI(username);
		this.address = decodeURI(address);
		this.src = src;



		/*this.loading(arr, (s) => {
			this.width = s * 100 | 0;

		}, () => {
			this.loaded = true;

			obserable.trigger({
				type: 'titleShow'
			})
		})*/

		obserable.on('showShare', () => {
			this.showMask = true;
		})


		obserable.on('setPlay', (data) => {

			this.playStyle = data;

		});

		$(this.$refs['audio']).on('play', () => {
			this.rotate = true;
		}).on('pause', () => {
			this.rotate = false;
		});


		return;


		this.$refs['audio'].volume = .3;
		this.$refs['audio'].play();
		var s = this;
		document.addEventListener("WeixinJSBridgeReady", function() {
			WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
				s.$refs['audio'].play();
			});
		}, false)

		obserable.on('toggleBgMusic', (data) => {
			this.$refs['audio'][data ? 'play' : 'pause']();
		});

		this.updatePv();


		if (this.isShare) {

			obserable.trigger({
				type: 'showSharePage',
				data: {
					src,
					username,
					address,
				}
			})


		} else {

			zmitiUtil.getOauthurl();
			zmitiUtil.wxConfig(document.title, window.desc);
		}
	}
})