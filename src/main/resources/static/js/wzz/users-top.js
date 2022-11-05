//实现功能页面的转换效果
var land=document.getElementsByClassName("top_land")[0];
var fade=document.getElementsByClassName("fade")[0];
var column=document.getElementsByClassName("column_a");
var columnm=document.getElementsByClassName("column")[0];
var functionm=document.getElementsByClassName("function")[0];
var functions=document.getElementsByClassName("functions");
var getmessage=document.getElementsByClassName("get_message")[0];
var me=document.getElementById("me");
var begin=document.getElementById("begin");
var smaller=document.getElementById("smaller");
let span=document.getElementsByClassName("column_span");
let inputs=document.getElementsByClassName("inputs");
for(let i in inputs){
    inputs[i].onfocus=function(){
        inputs[i].style.border='#0771f3 solid 1.5px ';
    }
    inputs[i].onblur=function(){
        inputs[i].style.border='gainsboro solid 1.5px ';
    }
}
var open=true;
if(sessionStorage.getItem("tousers")=='1'){
    setTimeout(function(){
        window.location.reload();
    },500);
    sessionStorage.setItem("tousers", '0');
}else if(sessionStorage.getItem("tousers")==null){
    setTimeout(function(){
        window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/users-land");
    },1000)
    swal("请先登录！");
}
smaller.onclick=()=>{
    if(open){
        columnm.style.width="4%";
        functionm.style.width="96%";
        functionm.style.paddingLeft="4%";
        for(let i of span){
            i.style.display="none";
        }
        open=false;
    }
    else{
        columnm.style.width="15%";
        functionm.style.width="85%";
        functionm.style.paddingLeft="15%";
        for(let i of span){
            i.style.display="block";
        }
        open=true;
    }
}
column[0].style.backgroundColor="#388df5";
var n=0;
for(let i in column){
    column[i].onclick=function(){
        functions[i].style.display="block";
        functions[i].classList.add("fades");
        column[i].style.backgroundColor="#388df5";
        if(n!=i){
            column[n].style.backgroundColor="#5380b8";
            functions[n].style.display="none";
            functions[n].classList.remove("fades");
            n=i;   
        }
    }
}

