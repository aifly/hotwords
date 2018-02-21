<template>
	<div :style='{background: "url("+imgs.mapBg+") no-repeat center bottom",backgroundSize:"cover"}' :class="{'show':show}" class="zmiti-index-main-ui lt-full" >
		

		<div class="zmiti-title" :class='{"show":titleShow}'>
			<img :src="imgs.title" alt="">
		</div>

		<div class="zmiti-index-map">
			<img :src="imgs.map" alt="">
			<div @click='showPos(pos.key)' class="zmiti-index-pos" v-for='(pos,i) in posData' :style='pos.pos'>
				<img :src="imgs.pos" alt="">
			</div>

			<span v-tap='entryContent' :class='{"right":pos.isRight,"left":!pos.isRight}' v-for='(pos,i) in posData' v-if='i === iNow' class="zmiti-index-title" :style="pos.titleStyle">
					{{pos.name}}
					<img :src='imgs.lantern' />
				</span>
		</div>
		<div class="zmiti-yanhua">
			<img :src="imgs.yanhua" alt="">
		</div>		
	</div>
</template>

<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import zmitiUtil from '../lib/util'
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				posData,
				showTitle:false,
				showOpen:false,
				titleShow:false,
				show:true,
				index:-1,
				iNow:-1,
				viewW:window.innerWidth,
				viewH:window.innerHeight,
			}
		},
		methods:{
			afterLeave(){
				this.showOpen = true;
			},
			showPos(key){
				this.index = key;
				this.entryContent(key);

			},
			entryContent(key){

				var {obserable} = this;
				obserable.on('getPosData',()=>{
					return this.posData[this.index]
				});

				clearInterval(this.timer);
				
				obserable.trigger({
					type:'showContentPage',
					data:{
						posData:this.posData[this.index]
					}

				})
			}
		},
		mounted(){

			var {obserable} = this;

			setTimeout(()=>{
				this.showTitle = true;
				 
			},100);


			obserable.on('posLoop',()=>{
				this.timer =  setInterval(()=>{
					this.iNow++;
					this.iNow %= 8;
				},2000)

			});

			obserable.trigger({
				type:'posLoop'
			})

			obserable.on('titleShow',()=>{
				this.titleShow = true;
			})
			//zmitiUtil.wxConfig(document.title,document.title);

		}
	}
</script>