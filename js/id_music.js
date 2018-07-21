var musicModels = [];
//当前页面
var index=0;
//下一个页面
var nextIndex=0;

//var wh = window.innerWidth;
//var he = window.innerHeight;
//
//$(".musicbox div").width(wh);
//$(".musicbox div").height(he-75);

startPlay();

//封装开始滑动的函数
function startPlay(){
	//当按下导航栏，切换到对应页面
    $(".id_nav .navigation .Plist").mousedown(function(){
	nextIndex=0;
	Play();
//	getData();
	index=nextIndex;
	});
	$(".id_nav .navigation .Slist").mousedown(function(){
		nextIndex=1;
		Play();
		index=nextIndex;
	});
	$(".id_nav .navigation .Zlist").mousedown(function(){
		nextIndex=2;
		Play();
		
		index=nextIndex;
	});
	$(".id_nav .navigation .Wlist").mousedown(function(){
		nextIndex=3;
		Play();
		
		index=nextIndex;
	});
}


//封装一个滑动函数
function Play(){
	
	if(index<nextIndex){
		//当前界面滑出去
		$(".musicbox div").eq(index).stop(true,true).animate({"left":"-100%"});
		//即将显示界面从右滑入
		$(".musicbox div").eq(nextIndex).css("left","100%").stop(true,true).animate({"left":"0px"});
	}else if(index>nextIndex){
		//当前界面滑出去
		$(".musicbox div").eq(index).stop(true,true).animate({"left":"100%"});
		//即将显示界面从左滑入
		$(".musicbox div").eq(nextIndex).css("left","-100%").stop(true,true).animate({"left":"0px"});
	}
};


var btn1=document.getElementById("p11");
var btn2=document.getElementById("p21");
var btn3=document.getElementById("p31");
var btn4=document.getElementById("p41");
var btn5=document.getElementById("p51");
var btn6=document.getElementById("p61");
var btn7=document.getElementById("p71");
var btn8=document.getElementById("p81");
var btn9=document.getElementById("p91");
var btn10=document.getElementById("p101");


btn1.onclick=function(){

	if (music.paused) {
		//播放音乐，audio自带的播放音乐的方法
		music.play();
//		$(this).addClass("playbg1").siblings().removeClass("playbg1");
		
	} else{
		//暂停音乐,audio自带的暂停音乐的方法
		music.pause();
//		$(this).addClass("playbg1").siblings().removeClass("playbg1");
		
	}
//	$(this).addClass("playbg1").siblings().removeClass("playbg1");
}
btn2.onclick=function(){
//	alert("可以点击")
//$(this).addClass("playbg").siblings().removeClass("playbg");
var music=document.getElementById("music2");
//如果音乐暂停
	if (music.paused) {
		//播放音乐，audio自带的播放音乐的方法
		music.play();
//		$(this).addClass("playbg1").siblings().removeClass("playbg1");
		
	} else{
		//暂停音乐,audio自带的暂停音乐的方法
		music.pause();
//		$(this).addClass("playbg1").siblings().removeClass("playbg1");
		
	}
}
//	var music=document.getElementById("music2");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
//	var music=document.getElementById("music3");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
//	var music=document.getElementById("music4");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
//	var music=document.getElementById("music5");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
//	var music=document.getElementById("music6");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
//	var music=document.getElementById("music7");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
//	var music=document.getElementById("music8");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
//	var music=document.getElementById("music9");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
//	var music=document.getElementById("music10");
////如果音乐暂停
//	if (music.paused) {
//		//播放音乐，audio自带的播放音乐的方法
//		music.play();
//		
//	} else{
//		//暂停音乐,audio自带的暂停音乐的方法
//		music.pause();
//		
//	}
	
		

