<template>
	<div :style="{background:'url('+imgs.hotwordsBg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show}" class="zmiti-choose-main-ui lt-full" ref='page'>
		<div class="zmiti-vote">
			<img :src="imgs.vote" />
		</div>

		<div class="zmiti-words-list">
			
			<div class="zmiti-word-item" v-for='word in words' :style='word.style'></div>

		</div>

		<div class="zmiti-back">返回</div>
	</div>
</template>
<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	export default {
		name:'zmitipage1',
		props:['obserable'],
		data(){
			return {
				imgs,
				play:false,
				index:-1,
				show:true,
				words:[
					{
						style:{
							width:'3rem',
							height:'3rem',
							left:'4.5rem',
							top:'4rem',
							background:'#63b7f5'
						}
						
					},{
						style:{
							width:'2.6rem',
							height:'2.6rem',
							left:'1.5rem',
							top:'1rem',
							background:'#f05553'
						}
					},{
						style:{
							width:'2.4rem',
							height:'2.4rem',
							left:'1.5rem',
							top:'4rem',
							background:'#ffa509'
						}
					},{
						style:{
							width:'2rem',
							height:'2rem',
							left:'4rem',
							top:'1rem',
							background:'#36c15a'
						}
					}
				],
			}
		},
		methods:{
			
		},
		components:{
		},
		mounted(){
			
			var {obserable} = this;

			obserable.trigger({
				type:'setPlay',
				data:{
					top:'.5rem !important'
				}
			});
			setTimeout(()=>{

				//this.words = obserable.trigger({type:'getWords'})

			},400)
		}
	}
</script>