 window.onload=function(){
    // var show=document.querySelector('.show');
    var l=document.querySelector('.show').offsetLeft;
    var h=document.querySelector('.show').offsetTop;
    var t=document.documentElement.scrollTop || document.body.scrollTop;
    var bottom_arrow=document.getElementById('bottom_arrow');
    bottom_arrow.addEventListener('mouseover',function(){
        window.onscroll=function () {
            if(t<h){
                window.scrollTo({
                    top: 520,
                    left: 0,
                    behavior: 'smooth' //重点在此
                })
            
            }
        }
    })
}