

var vm=new Vue({
	el:'#app',
	data: {
		query:'',
		index:-1,
		datas:[]
	},
		methods:{
			down:function(){
				if(this.index==this.datas.length-1){
					this.index=0;
				}else{
					this.index++;
				}
				this.query=this.datas[this.index];
			},
			up:function(){
				if(this.index==0){
					this.index=this.datas.length-1;
				}else{
					this.index--;
				}

				this.query=this.datas[this.index];
			},			
			search:function(e){
				var keyCode=e.keyCode;
				if(keyCode==38 || keyCode==40){return;}
				if(keyCode===37){
					window.open("https://www.baidu.com/s?wd="+this.query);
					this.datas=[];
					this.query='';
					this.index=-1;
				}
				this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',{
					params:{
						wd:this.query
					},
					jsonp:'cb'
				}).then(function(res){
					var datas=res.body.s;
					this.datas=datas;
				});
			},
			textinpt:function(){
				this.query=this.datas[this.index];
				this.datas=[];
				this.index=-1;
			},
			jump:function(index){
				window.open("https://www.baidu.com/s?wd="+this.query);
				this.datas=[];
				this.query='';
				this.index=-1;


			},
			hoverchange:function(index){
				console.log(index)
				this.index=index;
				this.query=this.datas[this.index];
			}
	}

});

