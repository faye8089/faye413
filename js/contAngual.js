	
	var app=angular.module('app',[]);


	
	app.controller('contAngual',function($scope){
		
		<!-- 留言板 -->
		$scope.data=[];

		$scope.add=function(){	
			
			if(!$scope.theme || !$scope.username || !$scope.cont)
			{
				alert('必填项不能为空');
				return false;
			}
			  
		  $scope.data.unshift({
				theme:$scope.theme,
				username:$scope.username,
				cont:$scope.cont,
				del:"删除"
		  
		  
		  });
			
			$scope.theme='';
			$scope.username='';
			$scope.cont='';
		};


		$scope.remove=function(index){
			console.log(index);
			$scope.data.splice(index,1)
		};	
	

	
		
		<!-- 购物车 -->
	  
		$scope.shoppingCar=[
			{"name":"魅蓝E2","count":1,"price":1296},
			{"name":"三星S8","count":2,"price":5217},
			{"name":"小米6" ,"count":3,"price":2570},
			{"name":"锤子Pro","count":4,"price":1638},
			{"name":"OPPO9S","count":5,"price":2556},
			{"name":"苹果7Plus","count":6,"price":5351},
		
		
		];



		$scope.increase=function(ipone){
			if(ipone.count>=100)return false;
			ipone.count+=1;
			return ipone.count;
		};

		$scope.reduce=function(ipone){
			if(ipone.count<=0)return false;
			ipone.count-=1;
			return ipone.count;
		};

		$scope.sum=function(){
			var res=0;
			angular.forEach($scope.shoppingCar,function(value,key){
				res+=value.price*value.count;
			
			});
			return res;
		};	
		
		
		
	});