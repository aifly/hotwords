<template>
	<div :style="{background:'url('+imgs.hotwordsBg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show}" class="zmiti-choose-main-ui lt-full" ref='page'>
		<div class="zmiti-text">
			<img :src="imgs.text" alt="">
		</div>
		<ul class="zmiti-choose-list">
			<li v-for='(word,i) in chooseWords'>
				{{word.hotword}}
				<span @click="unchoose(i,word)"></span>
			</li>
		</ul>
		<div class="zmiti-line">
			
		</div>

		<ul class="zmiti-all-words">
			<li v-for='(word,i) in words' @click='choose(i,word)'>
				{{word.hotword}}
			</li>
		</ul>

		<div class="zmiti-choose-btn">
			<img :src="imgs.followBtn" alt="">
		</div>
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