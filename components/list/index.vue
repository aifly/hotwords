<template>
	<div :style="{background:'url('+imgs.hotwordsBg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show}" class="zmiti-choose-main-ui lt-full" ref='page'>
		<div class="zmiti-vote">
			<img :src="imgs.vote" />
		</div>

		<div class="zmiti-words-list">
			

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
				words:[],
				chooseWords:[]
			}
		},
		methods:{
			choose(index,word){
				this.chooseWords.push({
					index,
					hotword:word.hotword,
					hotwordid:word.hotwordid

				});
				//console.log(JSON.stringify(this.chooseWords))

				this.words.splice(index,1);
			},
			unchoose(index,word){
				this.chooseWords.splice(index,1);
				this.words.splice(word.index,0,word);
			}
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

				this.words = obserable.trigger({type:'getWords'})

			},400)
		}
	}
</script>