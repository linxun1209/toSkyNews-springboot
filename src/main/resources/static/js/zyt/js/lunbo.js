
window.onload=function(){

        var items=document.getElementsByClassName('item');
		var goPreBtn=document.getElementById('goPre');
		var goNextBtn=document.getElementById('goNext');
		var points=document.getElementsByClassName('point');
		var index=0;	//表示是第几张图片在展示 有active这个类名第几张图片在展示的
		// 第几个点在展示
		var clearActive= function(){
			for(var i=0;i<items.length;i++) {
				items[i].className='item';
			}
			for(var i=0;i<points.length;i++) {
				points[i].className='point';
			}
		}
		var goIndex= function(){
			clearActive();
			points[index].className='point active';
			items[index].className='item active';
		}
		var goNext= function(){
			if(index<items.length-1) {
				index++;
			}else{
				index=0;
			}
			goIndex();
		}
		
		var goPre= function(){
			if(index==0){
				index=items.length;
			}else{
				index--;
			}
			goIndex();
		}
		
		goNextBtn.addEventListener('click',function(){
			goNext();
		})
		
		goPreBtn.addEventListener('click',function(){
			goPre();
		})
		
		for(var i=0;i<points.length;i++){
			points[i].addEventListener('click',function(){
				var pointIndex=this.getAttribute('data-index');
				index=pointIndex;
				goIndex();
			})
		}
		setInterval(function(){
				goNext();
		},2000);
		// 结束













}