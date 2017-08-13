/**
 * Created by Administrator on 2017/7/9.
 */
//1.获取非行间样式

function getStyle(obj,name){
    return (obj.currentStyle || obj.getComputedStyle(obj,false))[name];
}

//2.浏览器 UA:    navigator.userAgent
//3.页面重新加载  window.location.reload();


/*
 4.jq中调用jsonp格式
$(function(){
    $('#btn1').click(function(){
        $.ajax({
            url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
            dataType:'jsonp',
            data:{
                wd:'a'
            },
            jsonp:'cb',
            success:function(json){
                alert(json.s);
            }
        });
    });
});
*/


/*
 5.jq中调用ajax的post方法
$(function(){
    $('#btn1').click(function(){
        $.ajax({
            url:'post.php',
            type:'post',
            data:{
                a:1,
                b:2
            },
            success:function(str){
                alert(str);
            }
        });
    });
});*/
