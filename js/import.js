//定义一个读取数据的函数
function getData(){
	//访问数据
	$.getJSON("music.json",function(data){
		//当数据请求成功会自动调用function
		//data就是解析成功拿到的数据
		
		for(var i=0;i<data.length;i++){
			//解析的字段
			var music=new Music(data[i].img,data[i].musicName,data[i].name,data[i].num,data[i].src);
			//得到的数据存入数组
			musicModels.push(music);
			
		}
		//向页面插入数据
		inserData();
		//播放音乐
//		player.playMusic();
	});
};

//封装向页面插入数据
function inserData(){
	//循环插入数据
	for(var i=0;i<musicModels.length;i++){
		//创建元素，插入页面
		var $div=$("<div class='music' data-index="+i+"></div>");
		//将$div插入在musicbox里面
		$(".musicbox .Plistbox").append($div);
		//创建一个p标签
		$p=$("<p>"+musicModels[i].musicName+"--"+musicModels[i].name+"</p>");
		$div.append($p);
	
	}
}

//封装用于描述数据里面具体的字段
function Music(img,musicName,name,num,src){
	this.img=img;
	this.musicName=musicName;
	this.name=name;
	this.num=num;
	this.src=src;
};