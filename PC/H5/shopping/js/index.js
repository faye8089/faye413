	$(function(){
		var swiper = new Swiper('.swiper-container1', {
	        pagination: '.swiper-container1 .swiper-pagination',
	        paginationClickable: true,
	        loop: true
	    });
	    
	    var swiper2 = new Swiper('.swiper-container2', {
	        slidesPerView: 4,
	        paginationClickable: true,
	        spaceBetween: 0
    	});
    	
    	var swiper3 = new Swiper('.swiper-container3', {
	        slidesPerView: 4,
	        paginationClickable: true,
	        spaceBetween: 0
    	});
    	
    	
    	$(window).scroll(function(){
			var s=$(window).scrollTop();	
			if (s >= 0){
			 	$('.header').addClass('header2');
			}else{
				$('.header').removeClass('header2');	
			}
		});
		
		
    	
    	$.fn.extend({
			"slideUp":function(value){
				
				var docthis = this;
				//默认参数
				value=$.extend({
					 "li_h":"30",
					 "time":2000,
					 "movetime":500
				},value);
				
				//向上滑动动画
				function autoani(){
					$("li:first",docthis).animate({"margin-top":-value.li_h},value.movetime,function(){
						$(this).css("margin-top",0).appendTo(".font_inner");
					})
				}
				
				//自动间隔时间向上滑动
				var anifun = setInterval(autoani,value.time);
				
				//悬停时停止滑动，离开时继续执行
				$(docthis).children("li").hover(function(){
					clearInterval(anifun);			//清除自动滑动动画
				},function(){
					anifun = setInterval(autoani,value.time);	//继续执行动画
				})
			}	
		})
    	
    	$(".font_inner").slideUp();
	})
