$(function(){
	var searchBtn = $('.ld_searchBtn');
	var searchPage = $('.ld_searchPage')
	var goBack = $('.ld_goBack');
	var searchInput = $('.searchInput');
	var historySearchList = $('.ld_historySearchList');
	var searchMusicListDom = $('.ld_searchMusicList');
	var myCanvas = $('#ld_canvasMusic');


	var history = ['消愁','夏洛特烦恼','借','爱要怎么说出口'];
	var historyObj = new History();
	var searchList = [];

	// 点击专辑跳转到音乐播放页
	$(".ld_img").click(function () {
		$(".music_box_list").fadeOut(100);
        $("#frame_master").fadeOut(100,function () {
            $("#play_music").fadeIn(100);
            $("body").css("background","#6C716B")
            $("#musicBox").css("display","none")
        })
    });

	// 点击我的音乐进入音乐目录
    $("#musbox #box1_a").click(function () {
        $("section").fadeOut(100);
        $("header").fadeOut(100,function () {
            $(".music_box_list").fadeIn(100);

        });
    });
	// 播放音乐按钮
	$('#ld_canvasMusic').on('click',function(){
		window.player.playPause();
    });
    // 点击侧栏
    $(".music_list_in").click(function () {
			$("#left").animate({"left":0},100);
    });
    //收起侧栏
	$("section").click(function () {
        $("#left").animate({"left":-500},100);
    });
	//点击音乐目录返回键返回主页面
	$(".id_back").click(function () {
		$(".music_box_list").fadeOut(100,function () {
			$("header").fadeIn(100);
			$("section").fadeIn(100);
        })
    });

    //退出音乐播放页
    $("#play_header #back").click(function () {
        $("#play_music").fadeOut(200,function () {
            $("#frame_master").fadeIn(200);
            $("section").fadeIn(200);
            $("body").css("background","white")
        });
    });

	//点击music_web 进入推荐




	/*绑定标题栏的切换*/
	$('.ld_music1').on('click',function(){
		// 
		$(this).parent().css('opacity','1').next().css('opacity','0.5').next().css('opacity','0.5');
		$('.ld_index1').fadeIn();
		$('.ld_index2').fadeOut();
		$('.ld_index3').fadeOut();
	})
	$('.ld_music2').on('click',function(){
		$(this).parent().css('opacity','1').next().css('opacity','0.5').end().prev().css('opacity','0.5');
		$('.ld_index1').fadeOut();
		$('.ld_index2').fadeIn();
		$('.ld_index3').fadeOut();
	})
	$('.ld_music3').on('click',function(){
		// 
		$(this).parent().css('opacity','1').prev().css('opacity','0.5').prev().css('opacity','0.5');
		$('.ld_index1').fadeOut();
		$('.ld_index2').fadeOut();
		$('.ld_index3').fadeIn();
	})
	//发送ajax,获取数据
	$.ajax({
		url: './assets/searchMock.json',
		type: 'get',
		dataType: 'json',
		success: function(data) {
			searchList = data;
		}
	})
	//初始化betterScroll插件
	var scroll = new BScroll('.wrapper');
	//渲染history页面
	historyObj.addHistory(historySearchList,history);
	// 点开搜索页面
	searchBtn.on('click',function(){
		searchPage.fadeToggle()
	})
	// 回退到主页
	goBack.on('click',function(){
		searchPage.fadeToggle()
	})
	// 搜索框输入事件
	searchInput.on('input',function(){
		var value = $(this).val();
		//value不为空
		if (value) {
			//匹配模拟的音乐数据
			var searchMusicList = '';
			searchList.forEach(function(val,index){
				if (val.singName.indexOf(value) !== -1 || val.singer.indexOf(value) !== -1) {
					searchMusicList += '<li><span class="iconfont">&#xe615;</span><span class="findIndex">'+val.singer+'</span>'+ val.singName+'</li>'
				}
			})
			if (searchMusicList) {
				searchMusicListDom.addClass('ld_shadow')
			}
			else {
				searchMusicListDom.removeClass('ld_shadow')
			}
			searchMusicListDom.html(searchMusicList)
		}
		else {
			searchMusicListDom.removeClass('ld_shadow')
			searchMusicListDom.html('')
		}
		searchMusicListDom.children().each(function(index,val){
			$(val).on("click",function(){
				var temp = $(this).children('.findIndex').html();
				if (history.indexOf(temp) === -1) {
					history.push(temp)
					historyObj.addHistory(historySearchList,history);
				}
				searchMusicListDom.removeClass('ld_shadow')
				searchMusicListDom.html('')
			})
		})
	})
	// 搜索框失去焦点事件
	searchInput.on('blur',function(){
		$(this).val('')
	})
	//调用绘制音乐进度条
	// musicProgress(myCanvas,ctx,20.5,45.6);
});

function History () {}
History.prototype = {
	delHistory: function (index,history) {
		history.splice(index,1)
	},
	addHistory: function (historySearchList,history) {
		var _html = '';
		for (var i = history.length - 1; i >= 0; i--) {
			_html += '<li><span class="iconfont ld_historyIcon">&#xe627;</span><span class="ld_searchDes">'+history[i]+'</span><span class="iconfont ld_historyDel">&#xe61a;</span></li>'
		}
		historySearchList.html(_html)
		//绑定历史纪录删除事件
		$('.ld_historyDel').each(function(index,val){
			$(val).on('click',function(){
				History.prototype.delHistory((history.length - index - 1),history)
				History.prototype.addHistory(historySearchList,history)
			})
		})
	}
};