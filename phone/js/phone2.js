/**
 * Created by faye on 2017/7/8.
 *
 * font-size:32rem;
 */


(function(){
    var html=document.documentElement;
    html.style.fontSize=html.clientWidth/15+'px';
    document.addEventListener('touchstart',function(ev){
        ev.preventDefault();
    });
    
    //创建li
    createList();
    function createList(){
        var list=document.querySelector('#list');
        var inner='';
       for(var i=0; i<100; i++){
          inner+='<li>这是第'+i+'个</li>'
       }
        list.innerHTML=inner;

    }
    //拖拽
    var wrap=document.querySelector('#wrap');
    Drag({
        el:wrap
    });
    function Drag(init){
        if(!init.el){
            return;
        }
        var wrap=init.el;
        var inner=init.el.children[0];
        var scollBar=document.createElement('div');
        var startPoint=0;
        var startEl=0;
        var lastY=0;
        var lastDis=0;
        var lastTime=0;
        var lastTimeDis=0;
        var maxTranslate=wrap.clientHeight-inner.offsetHeight;
        var scale=wrap.clientHeight/inner.offsetHeight;
        inner.style.minHeight="100%";
        scollBar.style.cssText="width:6px; background:rgba(0,0,0,.5);position:absolute;right:0; top:0; border-radius:3px;opacity:0; transition(.3s) opacity";
        wrap.appendChild(scollBar);
        css(inner,'translateZ',0.01);
        inner.addEventListener('touchstart',function(e){
            maxTranslate=wrap.clientHeight-inner.offsetHeight;
            if(maxTranslate>=0){
                scollBar.style.display='none';
            }else{
                scollBar.style.display='block';
            }
            scale=wrap.clientHeight/inner.offsetHeight;
            scollBar.style.height=wrap.clientHeight*scale+'px';
            console.log(scale);
            clearInterval(inner.timer);
            startPoint=e.changedTouches[0].pageY;
            startEl=css(inner,'translateY');
            lastY=startEl;
            lastDis=0;
            lastTime=new Date().getTime();
            lastTimeDis=0;
            scollBar.style.opacity=1;        });
        inner.addEventListener('touchmove',function(e){
            var nowTime=new Date().getTime();
            var nowPoint=e.changedTouches[0].pageY;
            var dis=nowPoint-startPoint;
            var translateY=startEl+dis;
            css(inner,'translateY',translateY);
            css(scollBar,'translateY',-translateY*scale);
            lastDis=translateY-lastY;
            lastY=translateY;
            lastTimeDis=nowTime-lastTime;
            lastTime=nowTime;


        });
        inner.addEventListener('touchend',function(e){
            // console.log(lastDis,lastTimeDis)
            var type="easeOut";
            var speed=Math.round(lastDis/lastTimeDis*10);
            speed=lastTimeDis <=0 ? 0 : speed;
            var target=Math.round(speed*30+css(inner,"translateY"));

            if(target>0){
                target=0;
                type="backOut";
            }else if(target<maxTranslate){
                target=maxTranslate;
                type="backOut";
            }
            // console.log(target);
           MTween({
              el:inner,
               target:{
                   translateY:target
               },
               time:Math.round(Math.abs(target-css(inner,"translateY"))*1.8),
               type:type,
               callBack:function () {
                   scollBar.style.opacity=0;
               },
               callIn:function(){
                   var translateY=css(inner,"translateY");
                       css(scollBar,'translateY',-translateY*scale);
               }

           });
        });
    }

})();
