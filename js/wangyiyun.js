
var timer=null;
//当前显示页面
var index=0;
//即将显示图片
var nextindex=0;
//调用滑动函数
autoplay()
//封装开始滑动的函数,需要计时器 
function autoplay(){
	timer=setInterval(function(){
		nextindex++;
		
		if(nextindex>7){
			nextindex=0;
		}
//		调用滑动动画
		scrollplay();
		index=nextindex;
	},3000);
}

$(".header .daintai").click(function () {
    $(".turn_web_tuijian").fadeOut(100,function () {
        $(".turn_web_daintai").fadeIn(100);
    });
});

$(".header .tuijian").click(function () {
    $(".turn_web_daintai").fadeOut(100,function () {
        $(".turn_web_tuijian").fadeIn(100);
    });
});





//滑动函数
function scrollplay(){
//	处理小方格
//addclsaa添加属性，sibling过滤 removeclass清除属性
    $("#list li").eq(nextindex).addClass("stylefill").siblings().removeClass("stylefill");



//	向左滑动
//  即将显示>当前显示
    if(index<nextindex){
//  	eq()选择器选取带有指定的index值的元素
//      stop()关掉所有附带的动画效果
//当前图片左滑出去
    	$(".musicbox_tuijian img").eq(index).stop(true,true).animate({"left":"-720px"});
//  	即将显示图片从右滑进来
    	$(".musicbox_tuijian img").eq(nextindex).css("left","720px").stop(true,true).animate({"left":"0"});
    }
//  向右滑动
    else if(index>nextindex){
    	$(".musicbox_tuijian img").eq(index).stop(true,true).animate({"left":"720px"});
//  	即将显示图片从右滑进来
    	$(".musicbox_tuijian img").eq(nextindex).css("left","-720px").stop(true,true).animate({"left":"0"});
    }
}

//鼠标经过小方格
//当鼠标指针位于元素上方,会发生该事件
$("#list li").mouseover(function(){
//	清除计时器
    clearInterval(timer);
    nextindex=$(this).index();
    scrollplay();
    index=nextindex;
    
 }).mouseout(function(){
// 	鼠标离开,继续轮播
     autoplay();
 });
 
 

 