//1.获取id
function id(obj){
    return document.getElementById(obj);
}

//2.绑定事件
function bind(obj, ev, fn){
    if(obj.addEventListener){
        obj.addEventListener(ev,fn,false);
    }else{
        obj.attachEvent('on' +ev,function(){
            fn.call(obj);
        });
    }
}

//3.获取可视区的宽度、高度
function view(){
    return {
        w:document.documentElement.clientWidth,
        h:document.documentElement.clientHeight
    }
}

//4.添加class
function addClass(obj,sClass){
    var aClass=obj.className.split(' ');
    if(!obj.className){
        obj.className=sClass;
        return;
    }

    for(var i=0; i<aClass.length; i++){
        if(aClass[i]===sClass){
            return;
        }
    }
     obj.className += ' ' + sClass;
}

//5.删除class
function removeClass(obj,sClass){
    var aClass=obj.className.split(' ');
    if(!obj.className)return;
    for(var i=0;i<aClass.length; i++){
        if(aClass[i]===sClass){
            aClass.splice(i,1);
            obj.className =aClass.join(' ');
            break;
        }
    }
}

//1.欢迎页面
function  fnLoad()
{
    var iTime=new Date().getTime();
    var oW=id("welcome");
    var arr=[""];
    var bImgLoad=true;
    var bTime=false;
    var oTimer=null;
    bind(oW,'webkitTransitionEnd',end);
    bind(oW,'transitionend',end);
    oTimer=setInterval(function(){
        if(new Date().getTime()-iTime>=5000){
            bTime=true;
        }
        if(bImgLoad&&bTime){
            clearInterval(oTimer);
            oW.style.opacity=0;
            
        }
    },1000);
    function end(){
         removeClass(oW,"pageShow");
        fnTab();
    }
    /*此方法不好
    if(bImgLoad&&bTime){

    }
    for(var i=0; i<arr.length; i++){
        var oImg=new Image();
        oImg.src=arr[i];
        oImg.onload=function(){

        }
    }*/
}

//去掉默认事件

/*bind(document,'touchmove',function(ev){
    ev.preventDefault();
});*/

// 2.首页
function fnTab(){
    var oTab=id('tabPic');
    var oList=id('picList');
    var aNav=oTab.getElementsByTagName('nav')[0].children;
    var oTxtBox=id('txtBox');
    var aTxt=oTxtBox.children;

    var iNow=0;
    var iX=0;
    var iW=view().w;
    var oTimer=null;

    var iStartTouchX=0;
    var iStartX=0;
    auto();
    if(!window.BfnScore)
    {
        fnScore();
        window.BfnScore=true;
    }

    function auto()
    {
        oTimer=setInterval(function(){
        iNow++;
        /*if(iNow==aNav.length)
        {
            iNow=0;
        }*/
        iNow=iNow%aNav.length;
        tab();

    },2000);
    }

    bind(oTab,'touchstart',fnStart);
    bind(oTab,'touchmove',fnMove);
    bind(oTab,'touchend',fnEnd);
    function fnStart(ev)
    {
        oList.style.transition="none";
        ev=ev.changedTouches[0];
        iStartTouchX=ev.pageX;
        iStartX=iX;
        clearInterval(oTimer);
    }
    function fnMove(ev)
    {
        ev=ev.changedTouches[0];
        var iDisX=ev.pageX-iStartTouchX;
        iX=iStartX+iDisX;
        oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";

    }
    function fnEnd()
    {
        iNow=iX/iW;
        iNow=-Math.round(iNow);
        if(iNow<0){
            iNow=0;
        }
        if(iNow>aNav.length-1){
            iNow=aNav.length-1
        }
        tab();
        auto();

    }
    function tab()
    {
        iX=-iNow*iW;
        oList.style.transition="0.5s";
        oList.style.WebkitTransform=oList.style.transform="translateX("+iX+"px)";

        for(var i=0; i<aNav.length; i++ ){
            removeClass(aNav[i],'active');
            removeClass(aTxt[i],'active');
        }
        addClass(aNav[iNow],'active');
        addClass(aTxt[iNow],'active');
    }
}
//评分
function fnScore()
{
    var oScore=id('score');
    var aLi=oScore.getElementsByTagName('li');
    var arr=["好失望","没有想象的那么差","很一般","良好","棒极了"];
    for(var i=0; i<aLi.length; i++)
    {

        fn(aLi[i]);

    }
    function fn(oLi)
    {
        var aNav=oLi.getElementsByTagName('a');
        var oInp=oLi.getElementsByTagName('input')[0];
        for(var i=0; i<aNav.length;i++)
        {
            aNav[i].index=i;
            bind(aNav[i],'touchstart',function(){
                for(var i=0; i<aNav.length;i++)
                {
                    if(i<=this.index)
                    {
                        addClass(aNav[i],'active');
                    }else{
                        removeClass(aNav[i],'active');
                    }

                }
                oInp.value=arr[this.index];
            });
        }
    }
    if(!window.BfnIndex)
    {
        fnIndex();
        window.BfnIndex=true;
    }

}
function fnInfo(oInfo,sInfo)
{
    oInfo.innerHTML=sInfo;
    oInfo.style.WebkitTransform=oInfo.style.transform="scale(1)";
    oInfo.style.opacity=1;
    setTimeout(function(){
        oInfo.style.WebkitTransform=oInfo.style.transform="scale(0)";
        oInfo.style.opacity=0;
    },1000);
}

//提交
function fnIndex()
{
    var oIndex=id('index');
    var oBtn=oIndex.getElementsByClassName('btn')[0];
    var oInfo=oIndex.getElementsByClassName('info')[0];
    var bScore=false;
    bind(oBtn,'touchend',fnEnd);
    function fnEnd()
    {
        bScore=fnScoreChecked();
        if(bScore)
        {
            if(bTag())
            {
               fnIndexOut();
            }else
            {
                fnInfo(oInfo,"请景区添加标签")
            }
        }else{

            fnInfo(oInfo,"请提示信息")

        }
    }
    function fnScoreChecked()
    {
        var oScore=id('score');
        var aInp=oScore.getElementsByTagName('input');
        for(var i=0; i<aInp.length; i++)
        {
            if(aInp[i].value==0)
            {
                return false;
            }
        }
        return true;
    }

    //单选有没有选中
    function bTag()
    {
        var oIndexTag=id('indexTag');
        var aInput=oIndexTag.getElementsByTagName('input');
        for(var i=0; i<aInput.length; i++)
        {
            if(aInput[i].checked)
            {
                return true;
            }
        }
        return false;
    }
}

//首页的跳出
function fnIndexOut()
{
   var oMask=id("mask");
   var oIndex=id("index");
   var oNews=id("news");
    addClass(oMask,"pageShow");
    addClass(oNews,"pageShow");
    if(!window.BfnNews)
    {
        fnNews();
        window.BfnNews=true;
    }
    setTimeout(function(){
        oMask.style.opacity=1;
        oIndex.style.WebkitFilter=oIndex.style.filter="blur(5px)";
    },14);
    setTimeout(function(){
        oNews.transition="0.5s";
        oMask.style.opacity=0;
        oIndex.style.WebkitFilter=oIndex.style.filter="blur(0)";
        oNews.style.opacity=1;
        removeClass(oMask,"pageShow");
    },3000);

}

//新闻页

function fnNews()
{
    var oNews=id("news");
    var aInput=oNews.getElementsByTagName("input");
    var oInfo=oNews.getElementsByTagName("p")[0];
    aInput[0].onchange=function(){
        if(this.files[0].type.split('/')[0]=="video")
        {
            fnNewsOut();
            this.value="";
        }
        else
        {
            fnInfo(oInfo,"请上传视频")
        }

    };
    aInput[1].onchange=function(){
        if(this.files[0].type.split('/')[0]=="image")
        {
            fnNewsOut();
        }
        else
        {
            fnInfo(oInfo,"请上传照片")
        }

    };
}

function fnNewsOut()
{
    var oNews=id("news");
    var oForm=id("form");
    addClass(oForm,"pageShow");
    oNews.style.cssText=" ";
    removeClass(oNews,"pageShow");
    if(!window.BformIn)
    {
        formIn();
        window.BformIn=true;
    }

}

function formIn()
{
    var oForm=id("form");
    var oOver=id("over");
    var aFormTag=id("formTag").getElementsByTagName("label");
    var oBtn=oForm.getElementsByClassName("btn")[0];
    var bOff=false;
    for(var i=0; i<aFormTag.length; i++)
    {
        bind(aFormTag[i],"touchend",function () {
            bOff=true;
            addClass(oBtn,'submit');
        })
    }
    bind(oBtn,"touchend",function(){
        if(bOff)
        {
            for(var i=0; i<aFormTag.length; i++)
            {
              var oInput=aFormTag[i].getElementsByTagName("input")[0];
                oInput.checked=false;
            }
            addClass(oOver,"pageShow");
            removeClass(oForm,"pageShow");
            removeClass(oBtn,"submit");
            if(!window.BfnOver)
            {
                fnOver();
                window.BfnOver=true;
            }

        }
    });    
}

function fnOver()
{
    var oOver=id("over");
    var oBtn=oOver.getElementsByClassName("btn")[0];
    
    bind(oBtn,"touchend",function(){
        removeClass(oOver,"pageShow")
    })
}