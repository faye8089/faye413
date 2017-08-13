$(function(){
   //������������
   
   function watchScroll(){
		$(window).scroll(function(){			
				var $scrollTop=$(document).scrollTop();
				if($scrollTop>0)
				{					
					
					$('nav').addClass('navbar-fixed');
				}else
				{				
					
					$('nav').removeClass('navbar-fixed');
					$('#fayeIndex .back-top').animate({"right":"40px"});
					
				}	
				

				if($scrollTop>300){
					$('#fayeIndex .back-top').show();
					$('#fayeIndex .back-top').animate({"right":"4px"});
				}else if($scrollTop<300){
					$('#fayeIndex .back-top').hide();
				}
				
				
			}); 
			
    }

	//���½ǵ�ad
	function ad(){
		if (window.navigator.userAgent.indexOf('MSIE 6.0') != -1){

			$(window).scroll(function(){
				var $clientHeight=$(document).innerHeight();
				var $scrollTop=(window).scrollTop(); 
				var top=$clientHeight-$('.ad').outerHeight()+$scrollTop;

				$('.ad').css(top,top);
			})

		}
		$('.ad-close').click(function(){	
			$('.ad').removeClass(' visible-md, visible-lg ');
			$('.ad').hide();		 
		});
	}

	//jsonp-search����
	$(function(){
		(function(){
			var oT=$('#t1');
			var oBtn=$('#btn1');
			var oUl=$('#ul1');
			var iNow=-1;
			var oldValue='';

			oT.keyup(function(ev)
			{
				var oEvent=ev||event;
				if(oEvent.keyCode==40 || oEvent.keyCode==38) return;
				oldValue=oT.val();
				if(oEvent.keyCode==13)
				{
					window.open('https://www.baidu.com/s?wd='+oT.val(),'_blank');
					oT.val('');
				}
				$.ajax({
					url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
					dataType:"jsonp",
					jsonp:'cb',
					data:{
						wd:oT.val()
					},
					success:function(json)
					{
						oUl.css('display','block');
						var arr=json.s;
						oUl.html('');
						for(var i=0; i<arr.length; i++)
						{
							var oLi=$('<li class="list-group-item"></li>');
							oLi.html(arr[i]);
							oLi.appendTo(oUl);
							(function(index){
								oLi.mouseover(function()
								{
									oUl.children().removeClass('on');
									$(this).addClass('on');
									oT.val($(this).html());
									iNow=index;
								});
							})(i);
							oLi.click(function()
							{
								oT.val($(this).html());
								oUl.css('display','none');
							});
							oLi.on('mouseover',function(){
								$(this).css('background','#337ab7')
							});
							oLi.on('mouseout',function(){
								$(this).css('background','')
							});
							oBtn.click(function()
							{
								window.open('https://www.baidu.com/s?wd='+oT.val(),'_blank');
								oT.val('');
							});
						}
					}
				});
			});
			var aLi=oUl.children();
			oT.keydown(function(ev)
			{
				if(ev.keyCode==40)
				{
					iNow++;
					if(iNow==aLi.length)
					{
						iNow=-1;
					}
					_tab();
				}
				if(ev.keyCode==38)
				{
					iNow--;
					if(iNow==-2)
					{
						iNow=aLi.length-1;
					}
					_tab();
					return false;
				}
			});
			function _tab()
			{
				aLi.removeClass();
				if(iNow==-1)
				{
					oT.val(oldValue);
				}
				else
				{
					aLi.eq(iNow).addClass('on');
					oT.val(aLi.eq(iNow).html());
				}
			}
		})();

	});


		


	watchScroll();
	
	ad();
});