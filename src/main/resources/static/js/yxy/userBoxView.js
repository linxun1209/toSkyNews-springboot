//获赞盒子的显示与隐藏
var likeBox=document.querySelector('.likeBox');
var know=document.querySelector('.know');
var like=document.querySelector('.like');
like.addEventListener('click',function(){
    likeBox.style.display='block';
})
know.addEventListener('click',function(){
    likeBox.style.display='none';
})


//粉丝与关注列表
//是否关注
var attention=document.querySelectorAll('.attention');
var noAttention=document.querySelectorAll('.noAttention');
var attentionText=document.querySelectorAll('.attentionText');
var noattentionText=document.querySelectorAll('.noattentionText');
var close=document.querySelector('.close');
var personList=document.querySelector('.personList');
var have_land=localStorage.getItem('have_land');
for(let i=0;i<attention.length;i++){
    attention[i].addEventListener('click',function(){
        noAttention[i].style.display='block';
        attention[i].style.display='none';
    })
    noAttention[i].addEventListener('click',function(){
        attention[i].style.display='block';
        noAttention[i].style.display='none';
    })

}

//显现粉丝及关注盒子
var fans=document.querySelector('.fans');
var focuse=document.querySelector('.focus');
var fansNav=document.querySelector('.fansNav');
var focusNav=document.querySelector('.focusNav');
fans.addEventListener('click',function(){
    if(have_land=='false'){
        personList.style.width='0';
    }else{
        personList.style.width='460px';
    }
    fansNav.style.color='#067ae6';
    focusNav.style.color='black';
})

focuse.addEventListener('click',function(){
    if(have_land=='false'){
        personList.style.width='0';
    }else{
        personList.style.width='460px';
    }
    focusNav.style.color='#067ae6';
    fansNav.style.color='black';
})
fansNav.addEventListener('click',function(){
    fansNav.style.color='#067ae6';
    focusNav.style.color='black';
})
focusNav.addEventListener('click',function(){
    focusNav.style.color='#067ae6';
    fansNav.style.color='black';
})
//关闭粉丝及关注盒子
close.addEventListener('click',function(){
    personList.style.width='0px';
})
