/**
 * Created by faye on 2017/7/10.
 */

;(function(win){
    var re={
        name:/^[\u4e00-\u9fa5]{2,4}$/,
        age:/^(1[6-9]|[2-9]\d|100)$/,
        email:/^\w+@[a-z0-9]+(\.[a-z]{2,8}){1,2}$/,
        tel:/^(0[1-9]\d{1,2}-)?[2-8]\d{6,7}$/,
        qq:/^[1-9]\d{4,11}$/
    };

    win.validate=function(id){
        var oFrom=document.getElementById(id);
        var aInp=oFrom.getElementsByTagName('input');


        function check(obj,reg){
            if(obj.value){
                if(reg.test(obj.value)){
                    obj.className='form-control ok';
                    obj.parentNode.nextElementSibling.children[0].innerHTML='';
                    return false;
                }else{
                    obj.className='form-control error';
                   obj.parentNode.nextElementSibling.children[0].innerHTML=obj.getAttribute('err_tip');
                    return false;
                }

            }else{
                obj.parentNode.nextElementSibling.children[0].innerHTML='*内容不能为空';
                obj.className='form-control error';
                return false;
            }
        }

        //失去焦点，做判断
        for(var i=0; i<aInp.length-1; i++){
            var r=re[aInp[i].name];
            if(r){
                (function(r){
                    aInp[i].onblur=function(){
                        check(this,r)
                    };
                })(r)
            }
        }


        oFrom.onsubmit=function(){
            var bFlag=true;
            for(var i=0,len=aInp.length; i<len; i++){
                if(re[aInp[i].name]){
                    if(!check(aInp[i],re[aInp[i].name])){
                        bFlag=false;
                    }
                }
            }
            return bFlag;
        };



        oFrom.onreset=function(){
            var t=confirm('您确定要重置数据吗？');
            if(!t){
                return false;
            }else{
                for(var i=0; i<aInp.length-1; i++){
                    aInp[i].className='form-control';
                    aInp[i].parentNode.nextElementSibling.children[0].innerHTML='';
                }
            }
        }


    };

   

    
    
})(window);

