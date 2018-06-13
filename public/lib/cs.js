function getStyle (obj,name) {//获取样式，可获得非行间样式
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	} 
	else{
		return getComputedStyle(obj,null)[name];
	}
}
function startMove (obj,json,fnEnd) {//完美运动框架，fnEnd为回调函数
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;//假设没有不到的
		for (var attr in json) {//循环json内的每一个属性
			var cur=0;
			if (attr=='opacity') {
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			} 
			else{
				cur=parseInt(getStyle(obj,attr));
			}
			if (json.sp) {
				sp=json.sp;
			}
			else{
				sp=6;
			}
			var speed=(json[attr]-cur)/sp;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if (cur!=json[attr]) {//还有未到达的情况
				bStop=false;
				if (attr=='opacity') {
					obj.style.filter='alpha(opacity:'+cur+speed+')'
					obj.style.opacity=(cur+speed)/100;
				} 
				else{
					obj.style[attr]=cur+speed+'px';
				};
			};
		};
		if (bStop) {
			clearInterval(obj.timer);
			if (fnEnd) {fnEnd()};//完成动作后开始回调函数
		};
	},30)
}
function getByClass(oParent,sClass){
	var aEle = oParent.getElementsByTagName('*');
	var aResult = [];
	var re=new RegExp('\\b'+sClass+'\\b', 'i');
	
	for(var i=0; i<aEle.length;i++){
		if(aEle[i].className.search(re)!=-1){
			aResult.push(aEle[i]);
		}
	}
	return aResult;
}

function getPos (ev) {//getposition获取座标
	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	return {x:ev.clientX+scrollLeft,y:ev.clientY+scrollTop};
}
function myAddEvent (obj,ev,fn) {//事件绑定兼容函数
	if (obj.attachEvent) {//IE8以下
		obj.attachEvent('on'+ev,fn)
	} 
	else{//FF，chrome
		obj.addEventListener(ev,fn,false)
	};
}
function csAjax (url,fnSucc,fnFaild) {
		
	//1.创建Ajax对象
	if (window.XMLHttpRequest) {//非IE6
	//用未有定义嘅变量——报错
	//用未有定义嘅属性——undefined
		var oAjax=new XMLHttpRequest();
	} 
	else{//仅IE6
		var oAjax=new ActiveXObject("Microsofe.XMLHTTP");
	};

	//2.连接服务器
	// open(方法,文件名,异步传输)
	oAjax.open('GET',url,true );

	//3.发送请求
	oAjax.send();

	//4.接收返回
	oAjax.onreadystatechange=function() {//返回就执行，类似window.onload
		// oAjax.readyState  //浏览器和服务器，进行到那一步了
		if (oAjax.readyState==4) {//读取完成——成功或失败
			if(oAjax.status==200){//http状态码，以404最为出名
				fnSucc(oAjax.responseText);//oAjax.responseText是响应的文本
			}
			else {
				if (fnFaild) {
					fnFaild(oAjax.status);
				};
			}
		};
		// oAjax.readyState嘅取值：
		// 0      （未初始化）仲未调用open()方法
		// 1      （载入）已调用send()方法，正在发送请求
		// 2      （载入完成）send()方法完成，已收到全部响应内容
		// 3      （解析）正在解析响应内容，譬如解密等
		// 4      （完成）响应内容解析完成，可以在客户端调用了
	};
}
function GetQueryString(name){//获取地址参数

     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function isIE() { //ie?  
    if (!!window.ActiveXObject || "ActiveXObject" in window)  
        return true;  
    else  
        return false;  
}

function ToJson (jsonArray) {
	// jq serializeArray 转obj（json）
	 for (var i = 0; i < jsonArray.length; i++) {
	 	this[jsonArray[i].name]=jsonArray[i].value;
	 }
}

function tanchuang(title,content,nosave) {
//弹窗
	setTimeout(function (){
		var oBody=document.getElementsByTagName('body')[0];
		var oDiv=document.createElement('div');
		var bg=document.createElement('div');
		var bodyscrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var str=''

		oBody.appendChild(oDiv);
		oBody.appendChild(bg);
		str+='<div class="tan-head">'+title+'</div>'
		str+='<div id="tan-body" class="tan-body">'+content+'</div>'
		str+='<div class="tan-foot">'
		str+='<div class="row">'
		str+='<div class="col-xs-8"></div>'
		if (nosave) {
			str+='<div class="col-xs-2"></div>'
		} 
		else {
			str+='<div class="col-xs-2"><button type="button" class="btn btn-block btn-warning">保存</button></div>'
		}
		str+='<div class="col-xs-2"><button type="button" id="tan-close" class="btn btn-block btn-white">取消</button></div>'
		str+='</div>'
		str+='</div>'
		oDiv.innerHTML=str;
		oDiv.className='tan';

		if (oDiv.offsetHeight>=document.documentElement.clientHeight*60/100) {
			oDiv.style.top=bodyscrollTop+document.documentElement.clientHeight*10/100+'px';
		}
		else{
			oDiv.style.top=bodyscrollTop+document.documentElement.clientHeight*25/100+'px';
		}

		if (isIE()) {
			oDiv.style.marginLeft=parseInt(-oDiv.offsetWidth/2)+'px';
			startMove(oDiv,{'opacity':100})
		}
		else{
			startMove(oDiv,{'opacity':100,'marginLeft':parseInt(-oDiv.offsetWidth/2)});
		}

		bg.className='tan-bg';
		bg.style.top=bodyscrollTop+'px';

		setTimeout(function (){

		  	var oDel=document.getElementById('tan-close');
		  	var oCont=document.getElementById('tan-body');

		  	if (navigator.userAgent.indexOf("Firefox")>0) {
		  	  	document.addEventListener('DOMMouseScroll',handle1,false)
		  	}
		  	function handle1 (ev) {
		  		ev.preventDefault();
		  	}

		  	document.onmousewheel=function () {
		  		return false;
		  	}

		  	if (navigator.userAgent.indexOf("Firefox")>0) {
		  		oCont.addEventListener('DOMMouseScroll',handle2,false)
		  	}
		  	function handle2 (ev) {
		  		ev.stopPropagation();
		  		if (oCont.offsetHeight+oCont.scrollTop>=oCont.scrollHeight&&ev.detail>0) {
			  		ev.preventDefault();
			  	}
			  	if (oCont.scrollTop<=0&&ev.detail<0) {
			  		ev.preventDefault();
			  	}
		  	}

	  	  	oCont.onmousewheel=function (ev) {
			 	var oEvent=event||ev;
			 	oEvent.cancelBubble=true;

			  	if (oCont.offsetHeight+oCont.scrollTop>=oCont.scrollHeight&&oEvent.wheelDelta<0) {
			  		return false;
			  	}
			  	if (oCont.scrollTop<=0&&oEvent.wheelDelta>0) {
			  		return false;
			  	}
		  	}
		  
		  	oDel.onclick=function () {
		    	oBody.removeChild(oDiv);
		    	oBody.removeChild(bg);
		    	document.onmousewheel=null;
		    	oCont.onmousewheel=null;
		    	document.removeEventListener('DOMMouseScroll',handle1,false)
		    	oCont.removeEventListener('DOMMouseScroll',handle2,false)
		  	}
		  
		  	oCont.style.maxHeight=oDiv.offsetHeight-100+'px';
		},30)
	}, 30)
}