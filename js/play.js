$(function () {
    // 歌手图片等于其宽度
    // $("#album .singer_pic").offsetHeight=$("#album .singer_pic").offsetWidth;
    // $("#album .singer_pic").height($("#album .singer_pic")[0].clientWidth);


    // 音乐信息列表
    var musicList =  [];
    // 播放方式
    var play_method = 0;
    // 点击专辑是否显示歌词 0：显示歌词 1：显示专辑 2：不显示（因为存在歌曲列表的隐藏）
    var show_lyrics = 0;
    var last_show = 0;
    // 获取数据
    getData();

    // 专辑图片旋转定时器
    var timer = null;
    // 建立player对象
    var player = new Player();
    window.player = player
    // 调用进度条
    player.rangeUp();

    var myCanvas = $('#ld_canvasMusic');
    myCanvas[0].width = 300;
    myCanvas[0].height = 420
    var ctx = myCanvas[0].getContext('2d');

    musicProgress (myCanvas,ctx,1,1000)
    // 点击暂停音乐
    $("#play_fun #play").click(function () {
        player.playPause();
    });
    // 上一曲
    $("#play_fun #prev").click(function () {
        player.prev()
    });
    // 下一曲
    $("#play_fun #next").click(function () {
        player.next()
    });
    // 快进和快退
    $("#play_bar #range").click(function () {
        $("#audio").unbind("ontimeupdate");
        player.fastSlow();
    });
    // 点击显示音乐列表
    $(".more_song").click(function () {
        $("#musicBox").fadeIn(1000);
        // 切换的同时，更改背景颜色
        $("#musicBox .music").eq(player.playIndex).addClass("choose").siblings().removeClass("choose");
        last_show = show_lyrics;
        show_lyrics = 2;
    });
    // 音乐列表隐藏
    $("#album_all").click(function () {
        hide_show()
    });
    // 音乐列表隐藏
    $("#show_lyrics").click(function () {
        hide_show()
    });
    // 播放功能选择
    $("#play_fun #repeat img").click(function () {
        // 0:循环播放 1：单曲循环 2：随机播放
        if($(this).attr("value") === '0'){
            play_method = 1;
            $(this).attr({src: "img/repeat_single.png",value:1});
        }
        else if($(this).attr("value") === '1'){
            play_method = 2;
            $(this).attr({src: "img/shuffle.png",value:2});
        }
        else if($(this).attr("value") === '2'){
            play_method = 0;
            $(this).attr({src: "img/repeat.png",value:0});
        }
    });
    // 收藏
    $("#more_fun #like img").click(function () {
        if($(this).attr("value")==="0"){
            $(this).attr({src:"img/dislike.png", value:1});
        }
        else{
            $(this).attr({src:"img/Like.png", value:0});
        }

    });

    function hide_show() {
        if(show_lyrics ===0){
            $("#album_lyrics").fadeOut(100);
            $("#fun_bar").fadeOut(100,function () {
                $("#show_lyrics").fadeIn(500);
            });

            show_lyrics = 1;
        }
        else if(show_lyrics ===1) {

            $("#show_lyrics").fadeOut(100,function () {
                $("#album_lyrics").fadeIn(1000);
                $("#fun_bar").fadeIn(1000);
            });
            show_lyrics = 0;
        }
        else if(show_lyrics ===2){
            show_lyrics = last_show;
            $("#musicBox").fadeOut(1000);
        }

    }

    // 播放音乐
    function Player() {
        this.audio = document.getElementById("audio");
        // 定义类的下标
        this.playIndex = 0;

        // 监听音乐播放完毕
        this.audio.loop = false;

        this.audio.addEventListener('ended',function () {
            if(play_method ===0)
            {
                //继续播放下一首音乐
                player.next();
            }
            else
            {
                if(play_method === 2)
                    player.playIndex = Math.floor(Math.random()*6);
                player.playMusic();
            }
        },false);


        // 自定义播放音乐的方法
        this.playMusic = function () {

            // 添加audio的链接
            $(this.audio).attr("src",musicList[this.playIndex].src);
            // audio自带的播放音乐的方法
            this.audio.play();

            $("#album_all #point").attr("src","img/pointUp.png");
            $("#song_div #song_name").text(musicList[this.playIndex].musicName);
            $("#song_div #singer_name").text(musicList[this.playIndex].name);
            $("#show_lyrics #lyric").text(musicList[this.playIndex].lyric);
            // 替换歌手的专辑图片
            $(".singer_pic").attr("src",musicList[this.playIndex].img);

        };
        // 音乐的播放和暂停
        this.playPause = function () {
            // 音乐播放
            if(this.audio.paused){
                this.audio.play();
                // 留声机抬下
                $("#album_all #point").attr("src","img/pointUp.png");
                $("#play img").attr("src","img/pause.png");
                var angle = 0;
                $("#ld_canvasMusic").parent().children('.iconfont').html('&#xe61d;');

                // 音乐播放 专辑旋转
                timer = setInterval(function() {
                    angle += 1;
                    $("#album .singer_pic").rotate(angle);
                }, 30);
            }
            // 音乐暂停
            else{
                this.audio.pause();
                // 留声机指针抬起
                $("#album_all #point").attr("src","img/pointDown.png");
                // 置换为暂停图片
                $("#play img").attr("src","img/play.png");
                $("#ld_canvasMusic").parent().children('.iconfont').html('&#xe706;');
                // 音乐播放 专辑停止旋转
                clearInterval(timer);
            }
        };
        // 启用进度条的方法
        this.rangeUp = function () {
            //监听audio元素播放，当播放事件发生才可调用该function
            this.audio.ontimeupdate = function () {
                musicProgress (myCanvas,ctx,this.currentTime,this.duration);
                $("#play_bar #range").attr("max",this.duration);
                $("#play_bar #range").val(this.currentTime);
            }
        };
        // 音乐的快进与快退
        this.fastSlow = function () {
            this.audio.currentTime = $("#play_bar #range").val();
        };
        this.prev = function () {
            this.playIndex--;
            if(this.playIndex===-1)
                this.playIndex = musicList.length-1;
            this.playMusic();
        };
        this.next =function () {
            this.playIndex++;
            if(this.playIndex===musicList.length)
                this.playIndex = 0;
            this.playMusic();
        }
    }


    //读取数据函数
    function getData() {
        //访问数据
        $.getJSON("music.json",function (data) {
            //    当数据读取成功，调用该function
            for(var i=0;i<data.length;i++){
                // 解析字段
                var music = new Music(data[i].img,data[i].musicName,data[i].name,data[i].num,data[i].src,data[i].lyrics);
                //数据存入数组
                musicList.push(music);
            }
            // 向页面插入数据
            insertData();
            // player.playMusic();
            // var angle = 0;
            // timer = setInterval(function() {
            //     angle += 1;
            //     $("#singer_pic").rotate(angle);
            // }, 30);
        });
    }

    // 向页面插入数据
    function insertData() {
        for(var i=0;i<musicList.length;i++) {
            // 创建元素，插入到.musicBox中
            var $song = $("<div class='music' data-index="+i+"><img data-index="+i+" src='img/delete.png'/></div></div>");

            // 插入到musicBox中
            $("#play_bar #musicBox").append($song);
            // 创建一个p标签
            var $songTxt = $("<p>"+musicList[i].musicName+"---"+musicList[i].name+"</p>");

            // 判断是否为第一首歌
            if(i ===player.playIndex)
                $song.addClass("choose");
            $song.append($songTxt);
            $($song).click(function () {
                $(this).addClass("choose").siblings().removeClass("choose");
                player.playIndex = $(this).data("index");
                player.playMusic();

            });
        }
    }


    // 用于描述数据，json的具体字段
    function Music(img, musicName, name,num,src,lyrics) {
        this.img = img;
        this.musicName = musicName;
        this.name = name;
        this.num = num;
        this.src = src;
        this.lyric = lyrics;
    }
});
// 音乐切换时


//绘制音乐进度条300*150
function musicProgress (myCanvas,ctx,value,total) {
    if (value<total/4) {
        var deg = 3*Math.PI/2 + value*2*Math.PI/total;
    }
    else
        var deg = (value - total/4)*2*Math.PI/total;
    ctx.beginPath();
    ctx.moveTo(myCanvas[0].width/2,myCanvas[0].height/2-140)
    ctx.arc(myCanvas[0].width/2,myCanvas[0].height/2,140,3*Math.PI/2,deg);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 15;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(myCanvas[0].width/2,myCanvas[0].height/2,140,deg,3*Math.PI/2);
    ctx.strokeStyle = "#222";
    ctx.stroke();
}

