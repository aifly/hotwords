<template>
	<div :style="{background:'url('+imgs.hotwordsBg+') no-repeat center bottom',backgroundSize:'cover'}"  :class="{'show':show}" class="zmiti-share-main-ui lt-full" ref='page'>
		 
		 <transition name="zmiti-scale"
			@after-enter="afterEnter"
		 >
		    <div class="zmiti-createimg" v-if='createImg'>
				<img :src="createImg" alt="">
			</div>
		  </transition>
		
		<div v-if='words.length>10' class="zmiti-share-page1 lt-full" ref='zmiti-cache-page'>
			<div class="zmiti-forecast">
				<img :src="imgs.forecast" alt="">
			</div>

			<div class="zmiti-word-list">
				<div class="zmiti-word-item" v-for='(word,i) in words' :style="chooseHotword[i].style">{{word.hotword}}</div>
			</div>

			<div class="zmiti-word-bottom">
				<div class="zmiti-qrcode">
					<img :src="imgs.qrcode" alt="">
				</div>

				<div class="zmiti-evidence">
					<img :src="imgs.evidence" alt="">
				</div>
			</div>
			
		</div>

		<div v-if='words.length<=10' class="zmiti-share-page1 zmiti-share-page2 lt-full" ref='zmiti-cache-page1'>
			<div class="zmiti-forecast">
				<img :src="imgs.forecast" alt="">
			</div>

			<div class="zmiti-word-list" :style="{background:'url('+imgs.wordBg+') no-repeat center center',backgroundSize:'contain'}">
				<div class="zmiti-word-item" v-for='(word,i) in words' :style="chooseHotword1[i].style">{{word.hotword}}</div>
			</div>

			<div class="zmiti-word-bottom">
				<div class="zmiti-qrcode">
					<img :src="imgs.qrcode" alt="">
				</div>

				<div class="zmiti-evidence">
					<img :src="imgs.evidence" alt="">
				</div>
			</div>
			
		</div>

		<section v-if='!createImg' class="loading">
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <span></span>
		        <label>图片正在努力绘制中...</label>
		</section>

		<div v-if='showBtns' class="zmiti-share-btns">
			<div v-tap='restart'>重新预测</div>
			<div v-tap='showList'>看大家的热词</div>
			<div>分享</div>
		</div>
	</div>
</template>
<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import '../lib/html2canvas';
	import $ from 'jquery';
	import zmitiUtil from '../lib/util';
	export default {
		name:'zmitipage1',
		props:['obserable'],
		data(){
			return {
				imgs,
				play:false,
				show:false,
				createImg:'',
				showBtns:false,
				chooseHotword:[
					{
						text:'共享经济',
						style:{
							fontSize:'1.2rem',
							top:'3rem',
							left:'1.5rem'
						}
					},{
						text:'十九大大',
						style:{
							fontSize:'.8rem',
							top:'4.4rem',
							left:'2.5rem'
						}
					},{
						text:'雄安新区',
						style:{
							fontSize:'.7rem',
							top:'4.4rem',
							left:'5.5rem',
						}
					},{
						text:'新时代',
						style:{
							fontSize:'.8rem',
							top:'5rem',
							left:'4.8rem',
							WebkitTransformOrigin:'left bottom',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'食品安全',
						style:{
							fontSize:'.8rem',
							top:'5.1rem',
							left:'3rem',
							WebkitTransformOrigin:'left bottom',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'医疗改革',
						style:{
							fontSize:'.7rem',
							top:'4.6rem',
							left:'2rem',
							WebkitTransformOrigin:'left bottom',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'租购并举',
						style:{
							fontSize:'.6rem',
							top:'5.4rem',
							left:'2.8rem',
						}
					},{
						text:'共同富裕',
						style:{
							fontSize:'.5rem',
							top:'5.4rem',
							left:'5.8rem',
						}
					},{
						text:'人工智能',
						style:{
							fontSize:'.6rem',
							top:'2.3rem',
							left:'3.2rem',
						}
					},{
						text:'四个全面',
						style:{
							fontSize:'.5rem',
							top:'3rem',
							left:'6.0rem',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'拍虎打蝇',
						style:{
							fontSize:'.5rem',
							top:'1.7rem',
							left:'5.3rem',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'共同富裕',
						style:{
							fontSize:'.5rem',
							top:'1.4rem',
							left:'3.3rem',
						}
					},{
						text:'共同富裕',
						style:{
							fontSize:'.5rem',
							top:'1.8rem',
							left:'1.8rem',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'拍虎打蝇',
						style:{
							fontSize:'.5rem',
							top:'4.4rem',
							left:'.4rem',
						}
					},{
						text:'拍虎打蝇',
						style:{
							fontSize:'.6rem',
							top:'7.1rem',
							left:'5.4rem',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'共同富裕',
						style:{
							fontSize:'.7rem',
							top:'6.1rem',
							left:'.3rem',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'拍虎打蝇',
						style:{
							fontSize:'.4rem',
							top:'5.7rem',
							left:'.1rem',
							WebkitTransform:'rotate(90deg)'
						}
					},{
						text:'四个全面',
						style:{
							fontSize:'.4rem',
							top:'5.9rem',
							left:'7.4rem',
							WebkitTransform:'rotate(90deg) scale(1.2)'
						}
					},{
						text:'十九大',
						style:{
							fontSize:'.4rem',
							top:'4rem',
							left:'7.4rem',
							WebkitTransform:'scale(1.2)'
						}
					},{
						text:'教育质量',
						style:{
							fontSize:'.5rem',
							top:'7rem',
							left:'3.4rem',
							WebkitTransform:'rotate(90deg)'
						}
					}
				],
				chooseHotword1:[
					{
						text:'共享经济',
						style:{
							fontSize:'1.2rem',
							top:'4rem',
							left:'2.0rem'
						}
					},{
						text:'食品安全',
						style:{
							fontSize:'.7rem',
							top:'5.5rem',
							left:'1.0rem'
						}
					},{
						text:'雄安新区',
						style:{
							fontSize:'.5rem',
							top:'3rem',
							left:'4.0rem'
						}
					},{
						text:'共同富裕',
						style:{
							fontSize:'.5rem',
							top:'6.1rem',
							left:'5.0rem'
						}
					},{
						text:'租购并举',
						style:{
							fontSize:'.4rem',
							top:'5.1rem',
							left:'7.0rem'
						}
					},{
						text:'人工智能',
						style:{
							fontSize:'.5rem',
							top:'4.4rem',
							left:'-.6rem'
						}
					},{
						text:'四个全面',
						style:{
							fontSize:'.4rem',
							top:'3.4rem',
							left:'6.6rem'
						}
					},{
						text:'拍虎打蝇',
						style:{
							fontSize:'.6rem',
							top:'1.9rem',
							left:'2.1rem'
						}
					},{
						text:'教育质量',
						style:{
							fontSize:'.4rem',
							top:'7.4rem',
							left:'4.1rem'
						}
					},{
						text:'新时代',
						style:{
							fontSize:'.5rem',
							top:'2.9rem',
							left:'1.1rem'
						}
					}
				],
				words:[]
			}
		},
		methods:{
			restart(){
				window.location.href = window.location.href.split('?')[0];
			},
			showList(){
				var {obserable} = this;
				obserable.trigger({
					type:'showHotwordsList'
				})
			},
			 afterEnter() {
			 	this.showBtns = true;
			  },
			html2img(){
				var s = this;
				var {obserable} = this;
				setTimeout(()=>{

					var ref = this.words.length>10?'zmiti-cache-page':'zmiti-cache-page1'
					var dom = this.$refs[ref];
					html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var url = canvas.toDataURL();
					        $.ajax({
					          //url: window.protocol+'//api.zmiti.com/v2/share/base64_image/',
					          url:window.protocol+'//'+window.server+'.zmiti.com/v2/share/base64_image/',
					          type: 'post',
					          data: {
					            setcontents: url,
					            setwidth: dom.clientWidth*2,
					            setheight:dom.clientHeight*2
					          },
					          success: function(data) {
					          	console.log(data);
					            if (data.getret === 0) {
					            	//s.deleteImg(dt.img);
					              var src = data.getimageurl;
					             	s.createImg = src;
	
									var url = window.location.href.split('#')[0];
									url = zmitiUtil.changeURLPar(url,'src',src);
									zmitiUtil.wxConfig('我关注两会热点，立此为据',window.desc,url)
								       
					            }

					          }
					        })

					      },
					      width: dom.clientWidth*2,
					      height:dom.clientHeight*2
					})
				},1000)
			}
		},
		components:{
		},
		mounted(){

			

			var {obserable} = this;

			obserable.on('showShareApp',(data)=>{
				this.show = true;
				if(data){
					this.createImg = data.src;
				}else{

					this.html2img();
				}
			})

			obserable.on("setShareWords",(data)=>{
				this.words = data;
				console.log(this.words )
			})


			//alert(this.chooseHotword.length)

			//document.title=this.chooseHotword.length
			
		}
	}
</script>


<style scoped="">
	.loading{
            width: 5rem;
            left: 2.5rem;
            height: 15px;
            margin: 0 auto;
            margin-top:20px;
            text-align: center;
            position: absolute;
            top: 6rem;
            z-index: 0;
        }
        .loading span{
            display: inline-block;
            width: 15px;
            height: 100%;
            margin-right: 5px;
            background: #1a8cdc;
            -webkit-animation: load 1.04s ease infinite;
        }
        .loading label{
        	display: block;
        	color:#1a8cdc;
        }
        .loading span:last-child{
            margin-right: 0px; 
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0;
            }
        }
        .loading span:nth-child(1){
            -webkit-animation-delay:0.2s;
        }
        .loading span:nth-child(2){
            -webkit-animation-delay:0.4s;
        }
        .loading span:nth-child(3){
            -webkit-animation-delay:0.6s;
        }
        .loading span:nth-child(4){
            -webkit-animation-delay:0.8s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:1s;
        }
</style>