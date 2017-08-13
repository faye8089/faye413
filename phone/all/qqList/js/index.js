//创建li
var url="data/data.txt";
creatLi();
/* 获取数据，生成内容 */
function creatLi(isLoad)
{
    var oUl=document.getElementById('list');
    var first=getFirst();
    ajax("get",url,"",function(data){
        var arr=JSON.parse(data);
        for(var i=0; i<arr.length; i++)
        {
            var oLi=document.createElement('li');
            oLi.innerHTML='<div class="swiper"><div class="view"><span class="avatar" style="background-image:url('+arr[i].avatar+')"></span><div class="info"><h3>'+arr[i].username+'</h3><p>'+arr[i].new_message+'</p></div><aside class="aside"><time>'+getDate(arr[i].date_time)+'</time><mark style="display:'+(arr[i].message_number>1?'block' : 'none')+'">'+arr[i].message_number+'</mark></aside></div><nav class="btns"><a href="javascript:;">置顶</a><a href="javascript:;" >'+(arr[i].message_number>1?'标记为已读':'标记为未读')+'</a><a href="javascript:;">删除</a></nav></div>	';
            //oUl.appendChild(oLi);
            oUl.insertBefore(oLi,first);
            setEv(oLi);
        }
        if(isLoad){
            var swiper=document.getElementById("swiper");
            var load=document.getElementById("load");
            var loadImg=load.getElementsByClassName("loadImg")[0];
            var loadImg2=load.getElementsByClassName("loadImg2")[0];
            var loadText=load.getElementsByClassName("loadText")[0];
            loadImg2.style.display='none';
            loadText.innerHTML="刷新完成";
            setTimeout(function(){
                css(swiper,"translateY",0);
                swiper.addEventListener('WebkitTransitionEnd',end);
                swiper.addEventListener('transitionend',end);
                function end(){
                    swiper.removeEventListener('WebkitTransitionEnd',end);
                    swiper.removeEventListener('transitiontend',end);
                    loadImg.style.display="block";
                    loadText.innerHTML="下拉刷新";

                }
            },500)
        }
    });
}

/*
* mScroll() 处理上下，左右的滑屏
* init:{
*   el:element,(滑屏区域)
*   dir:"X" || "Y"     (方向，上下滑屏，或者左右滑屏),
*   start:fn,(手指按下的回调),
*   move:fn(手指移动的回调),
*   end:fn(手指抬起的回调)
* }
*
* */
/* 给生成的li添加事件 */
function setEv(li)
{
    var swiper=li.querySelector('.swiper');
    var max=li.clientWidth-swiper.offsetWidth;
    var list=document.querySelector("#list");
    var mark=li.querySelector('mark');
    var btns=li.querySelector('.btns');
    var btn=btns.children;
    var isReader=false;  //是否读取
    var isTop=false;
    tap(btn[0],function(){
        if(isTop){
            this.innerHTML="置顶";
            li.className='';
        }else{

            this.innerHTML="取消置顶";
            li.className='active';

        }
        isTop=!isTop;
        swiper.addEventListener('WebkitTransitionEnd',end);
        swiper.addEventListener('transitionend',end);
        swiper.style.transition=".3s";
        css(swiper,"translateX",0);
        function end(){
            swiper.removeEventListener('WebkitTransitionEnd',end);
            swiper.removeEventListener('transitionend',end);
            if(isTop){
                var first=list.children[0];

            }else{
                var first=getFirst();
            }
            list.insertBefore(li,first);

        }
    });
    if(btn[1].innerHTML=="标记未读"){
        isReader=true;
    }
    tap(btn[1],function(){
        if(isReader){
            this.innerHTML="标记已读";
            mark.innerHTML="1";
            mark.style.display='block';
        }else{
            this.innerHTML="标记未读";
            mark.style.display='none';
        }
        isReader= !isReader;
        swiper.style.transition=".3s";
        css(swiper,"translateX",0);
    });
    tap(btn[2],function(){
        list.removeChild(li);
        var main=document.querySelector('#main');
        var swiper=document.querySelector('#swiper');
        var max=main.clientHeight-swiper.offsetHeight;
        var now=css(swiper,'translateY');
        if(now<max){
            cancelAnimationFrame(swiper.timer);
            swiper.style.transition=".3s";
            css(swiper,'translateY',max);
        }

    });
    /*tap(li,function(){
        alert(0);
    });*/
    mScroll({
        el:li,
        dir:'x',
        start:function(){
            var swipers=list.querySelectorAll('.swiper');
            for(var i=0; i<swipers.length; i++){
                if(swipers[i] != swiper){
                    var now=css(swipers[i],"translateX");
                    if(now<0){
                        swipers[i].style.transition=".3s";
                        css(swipers[i],"translateX",0);
                    }
                }
            }
            swiper.style.transition="none";

        },
        move:function(){
            var now=css(swiper,"translateX");
            if(now>0){
                now=0;
            }else if(now<max){
                now=max;
            }
            css(swiper,"translateX",now);
        },
        end:function(dir){  //dir 最后一次滑动的方向
            //console.log(dir);
            cancelAnimationFrame(swiper.timer);
            swiper.style.transition=".3s";
            var now=css(swiper,"translateX");
            if(now==0){
                return;
            }
            if(dir>0){
               css(swiper,"translateX",0)
            }else if(dir<0){
                css(swiper,"translateX",max)
            }
        }
    });

}

//取消置顶
function getFirst(){
    var list=document.querySelector('#list');
    var active=list.querySelectorAll('li.active');
    if(active.length>0){
       return  active[active.length-1].nextElementSibling;
    }
    return list.children[0];
}

//处理滑屏事件，一定要先把默认事件清除
document.addEventListener('touchstart',function(e){
    e.preventDefault();
});


(function(){
    window.onload=function(){
        var oMain=document.getElementById("main");
        var swiper=document.getElementById("swiper");
        var load=document.getElementById("load");
        var loadImg=load.getElementsByClassName("loadImg")[0];
        var loadImg2=load.getElementsByClassName("loadImg2")[0];
        var loadText=load.getElementsByClassName("loadText")[0];

        var loadH=load.offsetHeight;
        loadImg.style.transition=".3s";
        mScroll({
            el:oMain,
            dir:"y",
            start:function(){
               swiper.style.transition="none";
            },
            move:function(){
              var now=css(swiper,"translateY");

                if(now>loadH){
                    css(loadImg,"rotate",-180);
                    loadText.innerHTML="释放立即刷新";
                }else{
                    css(loadImg,"rotate",0);
                    loadText.innerHTML="下拉刷新";
                }

            },
            end:function(){
                var  now=css(swiper,"translateY");
                if(now>loadH){
                    cancelAnimationFrame(swiper.timer);
                    swiper.style.transition=".3s";
                    css(swiper,"translateY",loadH);
                    loadImg.style.display="none";
                    loadImg2.style.display="block";
                    loadText.innerHTML="正在刷新";


                    swiper.addEventListener('WebkitTransitionEnd',end);
                    swiper.addEventListener('transitionend',end);


                    function end(){
                        swiper.removeEventListener('WebkitTransitionEnd',end);
                        swiper.removeEventListener('transitionend',end);
                        creatLi(true);

                    }
                }
            }

        })
    }

})();

function mScroll(init)
{
    var swiper=init.el.children[0];
    var startPiont={};
    var startEl={};
    var lastPoint={};
    var dir=init.dir;
    var lastDir=0;
    var max={
      x:parseInt(css(init.el,"width")-css(swiper,"width")),
      y:parseInt(css(init.el,"height")-css(swiper,"height"))
    };
    var translate={
        x:'translateX',
        y:'translateY'
    };
    var isMove={
        x:false,
        y:false
    };
    var isFirst=true; //记录这是第一次滑动
    /*css(swiper,"translateX",0);
    css(swiper,"translateY",0);*///用那个库，就只能用这种，得先用方法设置，才能用这个方法调用
    css(swiper,translate[dir],0);
    init.el.addEventListener("touchstart",function(e){  //手指按下
        init.start&&init.start();
        var touch=e.changedTouches[0];  //手指列表
        startPiont={
            x:Math.round(touch.pageX),
            y:Math.round(touch.pageY)
        };
        lastPoint={
            x:startPiont.x,
            y:startPiont.y
        };
        startEl={
            x:css(swiper,"translateX"),
            y:css(swiper,"translateY")
        };
        max={
            x:parseInt(css(init.el,"width")-css(swiper,"width")),
            y:parseInt(css(init.el,"height")-css(swiper,"height"))
        };
        lastDir=0;
    });
    init.el.addEventListener("touchmove",function(e){ //手指移动
            var touch=e.changedTouches[0];
            var nowPiont={
                x:Math.round(touch.pageX),
                y:Math.round(touch.pageY)
            };
            if(lastPoint.x==nowPiont.x && lastPoint.y==nowPiont.y){
                return;
            }
            var dis={
                x:nowPiont.x-startPiont.x,
                y:nowPiont.y-startPiont.y
            };
            //这个判断只在手指按下的时，第一次move时才会执行
            if(Math.abs(dis.x)-Math.abs(dis.y) >2 && isFirst)
            {
                isMove.x=true;
                isFirst=false;
            }else if(Math.abs(dis.y)-Math.abs(dis.x) > 2 && isFirst){
                isMove.y=true;
                isFirst=false;
            }

            /*var target={
                x:statrEl.x+dis.x,
                y:statrEl.y+dis.y
            };*/
       /* css(swiper,"translateX",target.x);
        css(swiper,"translateY",target.y);*/

        lastDir=nowPiont.x-lastPoint.x;
        var target={};
        target[dir]=dis[dir]+startEl[dir];
        isMove[dir]&&css(swiper,translate[dir],target[dir]);

        init.move&&init.move();
        lastPoint.x=nowPiont.x;
        lastPoint.y=nowPiont.y;
    });
    init.el.addEventListener("touchend",function(){ //手指抬起
            var now=css(swiper,translate[dir]);

            if(now<max[dir])
            {
                now=max[dir];
            }else if(now>0)
            {
                now=0;
            }
        var target={};
        target[translate[dir]]=now;
        startMove({
            el:swiper,
            target:target,
            type:"easeOut",
            time:300
        });
        isMove={
            x:false,
            y:false
             };
        isFirst=true;
        init.end&&init.end(lastDir);
    });
}

/* tap 移动端点击事件
*  el: 点击谁 元素
*  fn:事件函数
*
* */
function tap(el,fn){
    var startPoint={};
    el.addEventListener('touchstart',function(e){
        var touch= e.changedTouches[0];
        startPoint={
            x:touch.pageX,
            y:touch.pageY
        }
    });

    el.addEventListener('touchend',function(e){
        var touch= e.changedTouches[0];
        var nowPoint={
            x:touch.pageX,
            y:touch.pageY
        };
        var dis={
            x:Math.abs(nowPoint.x-startPoint.x),
            y:Math.abs(nowPoint.y-startPoint.y)
        };

        if(dis.x<5 && dis.y<5){
            fn.call(el,e)
        }


    });
}
