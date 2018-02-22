<template>
	<div :style="{background:'url('+imgs.indexBg+') no-repeat center bottom',backgroundSize:'cover'}" class="zmiti-index-main-ui lt-full"  :class="{'show':show}">
		<div class="zmiti-national">
			<img :src="imgs.national" alt="">
		</div>

		<div class="zmiti-circle">
			<span ref='zmiti-point'></span>
			<img :src="imgs.circle" alt="">
		</div>

		<div class="zmiti-title1" :class='{"show":showTitle}'>
			<img :src="imgs.title1" alt="">
		</div>

		<div class="zmiti-title2" :class='{"show":showTitle}'>
			<img :src="imgs.title2" alt="">
		</div>

		<div class="zmiti-logo">
			<img :src="imgs.logo" alt="">
			<span>新华社新媒体中心</span>
		</div>


		<div v-for='(word,i) in words' class="zmiti-word" :style="{top:r(10,viewH-50)+'px',WebkitAnimationDuration:r(4,15)+'s',webkitFilter:'blur('+(i%3===0?'1px':0)+')',WebkitAnimationDelay:r(1,20)+'s'}" >{{word.hotword}}</div>
	</div>
</template>

<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import $ from 'jquery';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:true,
				showTitle:false,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				words:[]

			}
		},
		methods:{
			r(m, n) {
				return (m + Math.random() * (n - m));
			},
			startAnimation(){
				this.starting = true;
				this.startAngle = 0;
				var point = this.$refs['zmiti-point'];
				var life = 20;
				var iNow = 0 ;
				var render = ()=>{
					this.startAngle++;
					if(this.startAngle >=360){
						this.startAngle = 0;
					}
					if(this.startAngle<=100){
						point.style.opacity = this.startAngle / 100;
					}
					if(this.startAngle<=60){
						point.style.opacity =0;
					}
					if(this.startAngle>=300){
						point.style.opacity = (360 - this.startAngle) / 60;
					}
					point.style.WebkitTransform = 'rotate('+this.startAngle+'deg)';

					if(iNow>life){
						iNow = 0;
						life = this.r(20,30)|0;
					}
					iNow++;
					window.webkitRequestAnimationFrame(render);
				}
				window.webkitRequestAnimationFrame(render);
			},
			getHotwords(){
				$.ajax({
					url:window.protocol+'//api.zmiti.com/v2/h5/get_hotwordlist',
					type:'post'
				}).done((data)=>{
					if(data.getret === 0){
						console.log(data.list);
						this.words = data.list;

						var {obserable} = this;
						obserable.on('getWords',()=>{
							return this.words;
						})
					}
				})
			}
		},
		mounted(){

			var {obserable} = this;

			this.startAnimation();

			this.getHotwords();

			setTimeout(()=>{
				this.showTitle = true;
			},1100)
		}
	}
</script>