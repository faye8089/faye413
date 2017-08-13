$(function(){
	//����
	function myNav(){
		$('.myLi').each(function(){
			var time=null;
			$(this).mouseover(function(){
				var $_this=$(this);;
				clearInterval(time);
				time=setInterval(liShow,150);
				function liShow(){
					$_this.find('.nav-small').fadeIn(300);
				}
			});

			$(this).mouseout(function(){			
				var $_this=$(this);
				clearInterval(time);
				time=setInterval(liHide,150);;
				function liHide(){
					$_this.find('.nav-small').fadeOut(300);
				}
			});
		});	
    }
;
	//cont-js-list0	;
	
	function contJsList0(){
		var $aLi=$('.cont-js-list0 li');
		var w=$aLi.outerWidth() ;
		var h=$aLi.outerHeight() ;
		$aLi.each(function(index){		

			enter($aLi.eq(index));
			leave($aLi.eq(index));
		});


		function enter(obj){
			obj.mouseenter(function(e){				
				var n=getN(obj,e);
				var $oSpan=obj.find('span');


				switch(n){
					case 0:
					$oSpan.css({
						"left":w,
						"top":0
					});	
					break;

					case 1:
					$oSpan.css({
						"left":0,
						"top":h
					});	
					break;

					case 2:
					$oSpan.css({
						"left":-w,
						"top":0
					});	
					break;
					case 3:
					$oSpan.css({
						"left":0,
						"top":-h
					});	
					break;				
					
				}
				$oSpan.animate({
					"left":"0",
					"top":"0"
				});
			});
		}

		function leave(obj)
		{
			obj.mouseleave(function(e){
				var n=getN(obj,e);
				var $oSpan=$(this).find('span');

				switch(n){
					case 0:
                    $oSpan.animate({
						"left":w,
						"top":0
					
					});
					break;

					case 1:
                    $oSpan.animate({
						"top":h,
						"left":0
					
					});
					break;
					case 2:
                    $oSpan.animate({
						"left":-w,
						"top":0
					
					});
					break;
					case 3:
                    $oSpan.animate({
						"top":-h,
						"left":0
					
					});
					break;
				
				}
				
			});
		
		}

		function getN(obj,e){
			var x=obj.offset().left+obj.width()/2-e.pageX;
			var y=obj.offset().top+obj.height()/2-e.pageY;

			var n1=Math.round((d2a(Math.atan2(y,x))+180)/90)%4;
		
			return n1;		
		
		}

		function d2a(d){
			return d*180/Math.PI;
		}
	
	}

	//cont-js-list1	

	function contJsList1(){
		var $oLi=$('.cont-js-list1 li');
		/*var $H=$oLi.height();
		var $w=$oLi.find('img').width();
		var $h=$oLi.find('img').height();*/
		var $H=263;
		 var $w=263;
		 var $h=263;

		$oLi.hover(function(){		
			$(this).find('img').css({			
				"width":2*$w,
				"height":2*$h,
				"left":-$w/2,
				"top":-$h/2,
				"z-index":2
			});
			
			$(this).css("height", $H);
			
		},function(){
			$(this).find('img').css({			
				"width":$w,
				"height":$h,
				"left":0,
				"top":0,
				"z-index":1
			});
			$(this).css("height",$h);
		});
	
	}


	//cont-js-list2
    function contJsList2(){
		var $oImg2=$('.cont-js-list2 li a img');
	
		var $scrollTop=$(document).scrollTop();
		var $clientBottom=$(document).innerHeight()+$scrollTop;

		$oImg2.each(function(index){		
			if($(this).offset().top<$clientBottom)
			{
				
				var $src=$(this).attr('_src');				
				$(this).attr("src",$src);
			}
		});
	
	}



	//cont-js-list3

	function contJsList3(){

		    var $oUl=$('.cont-js-list3');	
			var $aLi=$oUl.children();
			var $oW=$aLi.eq(0).innerWidth();

			
		
			$oUl.html($oUl.html()+$oUl.html());
			$oUl.css("width",$oW*$oUl.children().length);	
			
			var timer=null;
			toLeft();
			$('.iconfont-box i:first').click(function(){
				toLeft();
			});

			$('.iconfont-box i:last').click(function(){
				toRight();
			});

		    $oUl.mouseover(function(){
				clearInterval(timer);
			});
			$oUl.mouseout(function(){
				toLeft();
			});

			function toLeft(){
			
				clearInterval(timer);
				timer=setInterval(function(){
				
					var len=$oUl.position().left-5;
					
					if(len<=-$oUl.innerWidth()/2){
					
						len=0;
					}
					$oUl.css("left",len);		
				},20);
			
			}

			function toRight(){			
				
				clearInterval(timer);
				timer=setInterval(function(){
					var len=$oUl.position().left+5;
					
					if(len >= 0)
					{
						len=-$oUl.innerWidth()/2;					
					}
					
					$oUl.css("left",len);				
					
				},20);
				 
			}
		
	}
	
	//�ص�����
	function   backTop(){		
		
		var timer=null;
		var userScroll=false;

		$('.back-top').click(function(){					
			moveScroll(0,3000);
			
		});
		
		$(window).scroll(function(){			
			
			if(userScroll){				
				clearInterval(timer);
			}
			userScroll=true;
			
		});
		
		


		function moveScroll(target,time){					
			var start=$(window).scrollTop(); 
			var dis=target-start;
			var count=Math.floor(time/30);
			var n=0;
				
			clearInterval(timer);
			timer=setInterval(function(){
				userScroll=false;
				n++;
				var cur=start+dis*n/count;						
				document.body.scrollTop=cur;
				document.documentElement.scrollTop=cur;

				
				if(n==count){
					clearInterval(timer);
					console.log("��ͷ��")
				}	
				
			},30);
		
		}
	
	}


	(function(){
		//ʱ��
		tick();
		setInterval(tick,1000);

		function tick(){
			var oDate=new Date();
			var y=oDate.getFullYear();
			var m=oDate.getMonth();
			var d=oDate.getDate();
			var h=oDate.getHours();
			var min=oDate.getMinutes();
			var s=oDate.getSeconds();
			
			var t=oDate.getDay();
			
			var str=y+toDub(m+1)+toDub(d)+toDub(h)+toDub(min)+toDub(s);
			
			var arr=['seven','one','two','three','four','five','six']

			$(".clock img:lt(14)").each(function(index){
				$(this).attr("src","images/clock/"+str.charAt(index)+".png");

			});

			$(".clock img:last").attr('src',"images/clock/"+arr[t]+".png");

			function toDub(n)
			{
				return n<10 ? '0'+n : ''+n;
				
			}
		
		}
	
	})();

	//cookies���ı�������

	(function(){
		var oTextCookie=document.getElementById('textCookie');

		var inner=getCookie('write');
		if(inner){
			oTextCookie.value=inner;
			oTextCookie.focus();
		}

		oTextCookie.oninput=oTextCookie.onpropertychange=function(){
			addCookie('write',oTextCookie.value,1000);
		};
	})();


    myNav();
	contJsList0();
	contJsList1();
	contJsList2();
	contJsList3();
	backTop();
	
});