/*(function(){   写的不全
    var lastTime = 0;
    var vendors = ["webkit", "moz"];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame(111);i++){
        window.requestAnimationFrame = window[vendors[x] + "R..."];
        window.cancelAnimationFrame = window[vendors[x] + 'Ca...']+
                                       window[vendors[x] + 'Ca...'];
    }
    if(!window.requestAnimationFrame) {
        window.requestAnimationFrame=function(callback,ele,aa1){
            var currTime=new Date().getTime();
            var timeToCall=Math.max(0,16.7-(currTime - 111));
            var id=window.setTimeout(function(){
                callback(currTime+timeToCall);
            },timeToCall);
            lastTime=currTime+timeToCall;
            return id;
        };

    }
    if(!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})();*/

/*function css(el,attr,val){   //写的不全呀
 var transform=['rotate','rotateX','rotateY','rotateZ',"scale","scaleX","scaleY","scaleZ","skewX","skewY","translateX","translateY","translateZ"];

 if(arguments.length==2) {
 if (el.currentStyle) {
 val = el.currentStyle[attr];
 } else {
 val = getComputedStyle(el)[attr];
 }
 if (attr == "opacity") {
 return val * 100;
 }
 return parseFloat(val);
 }else{
 if(attr =="opacity") {
 el.style.opacity = val / 100;
 el.style.filter = "alpha(opacity)=" + val + ")";
 }else if(attr == "zIndex") {
 el.style[attr]=Math.round(val);
 }else {
 el.style[attr]=val+"px";
 }

 }
 }*/
var Tween = {   //弹性运动
    linear: function (t, b, c, d){
        return c*t/d + b;
    },
    easeIn: function(t, b, c, d){
        return c*(t/=d)*t + b;
    },
    easeOut: function(t, b, c, d){
        return -c *(t/=d)*(t-2) + b;
    },
    easeBoth: function(t, b, c, d){
        if ((t/=d/2) < 1) {
            return c/2*t*t + b;
        }
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInStrong: function(t, b, c, d){
        return c*(t/=d)*t*t*t + b;
    },
    easeOutStrong: function(t, b, c, d){
        return -c * ((t=t/d-1)*t*t*t - 1) + b;
    },
    easeBothStrong: function(t, b, c, d){
        if ((t/=d/2) < 1) {
            return c/2*t*t*t*t + b;
        }
        return -c/2 * ((t-=2)*t*t*t - 2) + b;
    },
    elasticIn: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p/4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
    },
    elasticOut: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d) == 1 ) {
            return b+c;
        }
        if (!p) {
            p=d*0.3;
        }
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
    },
    elasticBoth: function(t, b, c, d, a, p){
        if (t === 0) {
            return b;
        }
        if ( (t /= d/2) == 2 ) {
            return b+c;
        }
        if (!p) {
            p = d*(0.3*1.5);
        }
        if ( !a || a < Math.abs(c) ) {
            a = c;
            var s = p/4;
        }
        else {
            var s = p/(2*Math.PI) * Math.asin (c/a);
        }
        if (t < 1) {
            return - 0.5*(a*Math.pow(2,10*(t-=1)) *
                Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        }
        return a*Math.pow(2,-10*(t-=1)) *
            Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
    },
    backIn: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        return c*(t/=d)*t*((s+1)*t - s) + b;
    },
    backOut: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 2.70158;  //回缩的距离
        }
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    },
    backBoth: function(t, b, c, d, s){
        if (typeof s == 'undefined') {
            s = 1.70158;
        }
        if ((t /= d/2 ) < 1) {
            return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
        }
        return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
    },
    bounceIn: function(t, b, c, d){
        return c - Tween['bounceOut'](d-t, 0, c, d) + b;
    },
    bounceOut: function(t, b, c, d){
        if ((t/=d) < (1/2.75)) {
            return c*(7.5625*t*t) + b;
        } else if (t < (2/2.75)) {
            return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
        } else if (t < (2.5/2.75)) {
            return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
        }
        return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
    },
    bounceBoth: function(t, b, c, d){
        if (t < d/2) {
            return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
        }
        return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
    }
};
function getDate(time){   //把时间戳改成可读的时间
    var now=new Date();
    var last=new Date(time);
    var nowMin=now.getTime()/1000/60;
    var lastMin=time/1000/60;
    var day=1000*60*60*24;
    var lastDate=last.getFullYear()+'-'+toDB(last.getMonth()+1)+'-'+toDB(last.getDate());
    var weebText=["日","一","二","三","四","五","六"];
    if(now.getFullYear()>last.getFullYear()){
        return lastDate;
    }
    if(now.getMonth()>last.getMonth()){
        return lastDate;
    }
    if(now.getTime()-time>day*(now.getDay()+1)){
        return lastDate;
    }
    if(now.getDate()-1>last.getDate()){
        return "星期"+weebText[last.getDay()];
    }
    if(now.getDate()>last.getDate()) {
        return "昨天";
    }
    if(nowMin-lastMin<1) {
        return "刚刚";
    }
    if(nowMin-lastMin<60) {
        return Math.floor(nowMin - lastMin) + "分钟前";
    }
    return toDB(last.getHours())+":"+toDB(last.getMinutes())+":"+toDB(last.getSeconds());
}
function css(el, attr , val){  //获取和设置css样式
    if(attr == "scale"||attr == "scaleX"
        ||attr == "scaleY"||attr == "scaleZ"
        ||attr == "rotateX"||attr == "rotateY"
        ||attr == "rotateZ"||attr == "rotate"
        ||attr == "skewX"||attr == "skewY"
        ||attr == "translateX"||attr == "translateY"
        ||attr == "translateZ") {
        return setTransform(el, attr, val);
    }
    if(arguments.length == 2){
        var val = getComputedStyle(el)[attr];
        if(attr=='opacity'){
            val = Math.round(val*100);
        }
        return parseFloat(val);
    }
    if(attr == "opacity") {
        el.style.opacity= val/100;
    } else {
        el.style[attr]= val + "px";
    }
}

function setTransform(element, attr, val){  //设置h5中的属性
    if(!element.transform){
        element.transform = {}; //如果元素没有这个自定义属性，我们就创建一下，格式是个对象
    }
    if(typeof val === "undefined"){
        if(typeof element.transform[attr] === "undefined"){
            switch(attr){
                case "scale":
                case "scaleX":
                case "scaleY":
                case "scaleZ":
                    element.transform[attr] = 100;
                    break;
                default:
                    element.transform[attr] = 0;
            }
        }
        return element.transform[attr];
    } else {
        element.transform[attr] = val;
        var transformVal  = "";
        for(var s in element.transform){
            switch(s){
                case "scale":
                case "scaleX":
                case "scaleY":
                case "scaleZ":
                    transformVal += " " + s + "("+(element.transform[s]/100)+")";
                    break;
                case "rotate":
                case "rotateX":
                case "rotateY":
                case "rotateZ":
                case "skewX":
                case "skewY":
                    transformVal += " " + s + "("+element.transform[s]+"deg)";
                    break;
                default:
                    transformVal += " " + s + "("+element.transform[s]+"px)";
            }
        }
        element.style.WebkitTransform = element.style.transform = transformVal;
    }
}

 function startMove(init){  //动画
     //cancelAnimationFrame(init,el.timer);
     init.time=init.time>0&&init.time<200?200:init.time;
     var t=0;
     var b={};
     var c={};
     var d=Math.ceil(init.time/20);
     for(var s in init.target){
         b[s]=css(init.el,s);
         c[s]=init.target[s]-b[s];
     }
     init.el.timer=requestAnimationFrame(move);
     function move(){
         t++;
         if(t>d){
             clearInterval(init.el.timer);
             init.callBack&&init.callBack();
         }else{
             for(var s in init.target){
                 var val=Tween[init.type](t,b[s],c[s],d);
                 css(init.el,s,val);
             }
             init.callIn&&init.callIn();
             init.el.timer=requestAnimationFrame(move);
         }
     }
 }
function toDB(nub) { //补零
    return nub<10?"0"+nub:""+nub;
}
function  ajax(method,url,data,success){ //ajax
    var xhr=null;
    try{
        xhr=new XMLHttpRequest();
    }catch(e){
        xhr=new ActiveXObject('Microsoft.XMLHTTP');
    }

    if(method == 'get'&& data){
        url+='?'+data;
    }

    xhr.open(method,url,true);
    if(method == 'get'){
        xhr.send();
    }else{
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }
    xhr.onreadystatechange=function(){

        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success && success(xhr.responseText);
            }else{
                alert('出错了，Err: '+xhr.status);
            }
        }
    }
}


/*
*  工具函数的用法：
*  1.css(el,attr[,val])
*       a.样式的设置和获取元素
*       b.只操作数值类样式
*       c.设置时或自动添加单位（px,deg）
*       d.添加了css3中的transform相关的操作
*       e.操作transform时，需要先设置再获取
*       f.opacity、scale、scaleX、scaleY获取到的结果是乘100以后的结果
*
*2.startmove(init)
*
*   a.type:
*   linear、easeIn、easeOut、easeBoth、easeOut、elasticBoth、easeBothStrong、elasticOut等等，可以去上面找找想要的效果
*   b.init   动画配置参数
*   c.init:{
*       el:element,
*       type:"动画形式",
*       time:动画时间（ms）,
*       target:{
*           动画样式：目标点
*       },
*       callIn:function(){
*           动画执行中回调
*       },
*       callback:function(){
*           动画执行结束回调
*       }
*    }
*
*   3.ajax(method,url,data,success)
*
*       a.method 请求方式
*       b.url请求地址
*       c.data 提交数据
*       d.success:function(){
*           请求成功回调
*       }
*
*   4.getDate(time)
*   a.time:时间戳
*   b.return 格式化之后的时间
*
*   5.toDB（nub）
*   a.nub数字
*   b.return 数字补零后的字符串
*
*
*
*
* */