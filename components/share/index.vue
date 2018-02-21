<template>
	<div v-show='show' class="zmiti-share-main-ui lt-full " :class='{"active":show}' :style='{background:"url("+imgs.shareBg+") no-repeat center top",backgroundSize:"cover"}'>
		

		<div class="zmiti-share-img-ui lt-full" :class='{"scale":createImg}'>
			

			<section v-if='createImg' class="zmiti-create-img">
					<img :src='createImg'/>
					<div v-if='createImg' class="zmiti-share-corner">
						<img :src="imgs.corner1" alt="">
					</div>
					<div v-if='createImg' class="zmiti-share-corner zmiti-share-corner1">
						<img :src="imgs.corner1" alt="">
					</div>
			</section>

			<div hidden  class="" :style='{width:"100%",height:"100%",overflow:createImg?"visible":"visible"}' :class="{'border':!createImg,'-webkit-filter':'blur(10px)'}">
				
				

				<span  class="zmiti-pos-title"><img :src='posData.img' /></span>

				<div v-if='posData.merge.length && posData.merge[0].direction<=-1' class="zmiti-merge-img">
					<img :src="src" alt="">
				</div>
				<div v-if='posData.merge.length && posData.merge[0].direction>-1' class="zmiti-merge-img zmiti-merge-img1">
					<div v-if='posData.merge[0].direction'>
						<img :src="posData.merge[0].img" alt="">
						<img :src="src" alt="">
					</div>
					<div v-if='!posData.merge[0].direction'>
						<img :src="src" alt="">
						<img :src="posData.merge[0].img" alt="">
					</div>
				</div>
				<div v-if='!createImg' class="zmiti-pic-title">
					<img  :src="imgs.picTitle" alt="" />
				</div>

					
				<div v-if='!createImg' class="zmiti-share-corner">
					<img :src="imgs.corner1" alt="">
				</div>
				<div v-if='!createImg' class="zmiti-share-corner zmiti-share-corner1">
					<img :src="imgs.corner1" alt="">
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

		</div>

		<div class="zmiti-cache-page" ref='zmiti-cache-page'>
				
			<div v-if='createImg' class="zmiti-create-img">
				<img :src='createImg'/>
				<div v-if='createImg' class="zmiti-share-corner">
					<img :src="imgs.corner1" alt="">
				</div>
				<div v-if='createImg' class="zmiti-share-corner zmiti-share-corner1">
					<img :src="imgs.corner1" alt="">
				</div>
			</div>

			<span  class="zmiti-pos-title"><img :src='posData.img' /></span>

			<div v-if='posData.merge.length && posData.merge[0].direction<=-1' class="zmiti-merge-img">
				<img :src="src" alt="">
			</div>
			<div v-if='posData.merge.length && posData.merge[0].direction>-1' class="zmiti-merge-img zmiti-merge-img1">
				<div v-if='posData.merge[0].direction'>
					<img :src="posData.merge[0].img" alt="">
					<img :src="src" alt="">
				</div>
				<div v-if='!posData.merge[0].direction'>
					<img :src="src" alt="">
					<img :src="posData.merge[0].img" alt="">
				</div>
			</div>
			<div class="zmiti-pic-title">
				<img  :src="imgs.picTitle" alt="" />
			</div>

				
			<div v-if='!createImg' class="zmiti-share-corner">
				<img :src="imgs.corner1" alt="">
			</div>
			<div v-if='!createImg' class="zmiti-share-corner zmiti-share-corner1">
				<img :src="imgs.corner1" alt="">
			</div>
		</div>

		<div class="zmiti-share-btns" v-if='!isShare && createImg'>
			<div v-tap='rephoto'>
				<span>重新拍照</span>
				<img :src="imgs.shareBtnBg" alt="">
			</div>
			<div @click='showMasks'>
				<span>转发朋友</span>
				<img :src="imgs.shareBtnBg" alt="">
			</div>
		</div>
		<div  class="zmiti-share-btns" v-if='isShare'>
			<div @touchend='restart' class="zmiti-restart-btn">
				<span>我也要为祖国守边防</span>
				<img :src="imgs.shareBtnBg" alt="">
			</div>
		</div>
		<div v-if='showMask' @touchstart='showMask = false' class="zmiti-mask">
			<img :src="imgs.arrow" />
		</div>

		<div class="zmiti-copyright" v-if='createImg'>
			<span>新华社解放军分社、新华社新媒体中心联合出品</span>
			<span>技术支持：天天P图</span>
		</div>
	</div>
</template>


<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import $ from 'jquery';
	import '../lib/html2canvas';
	export default {
		name:'upload1',
		props:['obserable'],
		data(){
			return {
				show:false,
				imgs,
				isShare:false,
				posData:{
					merge:[]
				},
				createImg:'',
				viewW:document.documentElement.clientWidth,
				viewH:document.documentElement.clientHeight,
				showMask:false,
				src:'http://'+window.server+'.zmiti.com/zmiti_ele/public/f2d2fbbb2096c31a9bed133074d5a341.png',
				isMan:true
			}
		},
		methods:{

			restart(){
				
				window.location.href = window.location.href.split('?')[0];
			},

			showMasks(){
				this.showMask = true;
			},

			hideMasks(){
				this.showMask = false;
			},

			rephoto(){
				var {obserable} = this;


				this.createImg = '';

				obserable.trigger({
					type:'reupload'
				})
				obserable.trigger({
					type:'toggleSharePage',
					data:{
						show:false
					}
				})
			},
			deleteImg(url){//删除原图

				setTimeout(()=>{
					$.ajax({
						url: window.protocol+'//'+window.server+'.zmiti.com/v2/share/delete_file/',

						type:'post',
						data:{
							filepath:url
						},
						success(data){
							console.log(data);
						}
					})

				},2000)
			}
			
			
		},
		mounted(){
			var {obserable} = this;
			var s = this;

			obserable.on('showSharePage',(data)=>{
				this.show = true;
				this.isShare = true;
				this.createImg = data.src;
				window.nickname = data.username;
				var address = data.address;

				setTimeout(()=>{
					zmitiUtil.wxConfig(decodeURI(window.nickname)+'在'+decodeURI(address)+'为祖国站岗守岁，祝您新春快乐，阖家幸福！',window.desc)
				},100)

			})

			obserable.on('toggleSharePage',(dt)=>{
				this.show = dt.show;
				if(dt.img){
					this.src = dt.img;

					var img = new Image();
					img.onload = ()=>{
						
						var dpi = 2;

						var address = obserable.trigger({
										type:'getPosData'
									});

						s.posData = address;
						setTimeout(()=>{
							var dom = this.$refs['zmiti-cache-page'];
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
							            	s.deleteImg(dt.img);
							              var src = data.getimageurl;
							             	s.createImg = src;

											var url = window.location.href.split('#')[0];
											url = zmitiUtil.changeURLPar(url,'src',src);
											url = zmitiUtil.changeURLPar(url,'nickname',encodeURI(window.nickname));
											url = zmitiUtil.changeURLPar(url,'address',encodeURI(address.name))

											zmitiUtil.wxConfig(window.nickname+'在'+address.name+'为祖国站岗守岁，祝您新春快乐，阖家幸福！',window.desc,url)
										       
							            }

							          }
							        })


							      },
							      width: dom.clientWidth*2,
							      height:dom.clientHeight*2
							})
						},1000)
						
					}
					img.src = this.src;

					
				}
			})



			
		}
	}
</script>



<style scoped="">
	.loading{
            width: 5rem;
            left: 2.5rem;
            height: 15px;
            margin: 0 auto;
            margin-top:100px;
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
            background: #fe6257;
            -webkit-animation: load 1.04s ease infinite;
        }
        .loading label{
        	display: block;
        	color:#fe6257;
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
            -webkit-animation-delay:0.13s;
        }
        .loading span:nth-child(2){
            -webkit-animation-delay:0.26s;
        }
        .loading span:nth-child(3){
            -webkit-animation-delay:0.39s;
        }
        .loading span:nth-child(4){
            -webkit-animation-delay:0.52s;
        }
        .loading span:nth-child(5){
            -webkit-animation-delay:0.65s;
        }
</style>