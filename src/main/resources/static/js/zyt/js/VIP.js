window.onload = function () {
    var VIP_instruction=document.querySelector('.VIP_instruction');
    var VIP_deal=document.querySelector('.VIP_deal');
    var VIP_apply=document.querySelector('.VIP_apply');
    VIP_instruction.onclick=function(){
        location.assign("http://localhost:8080/ToSkyNews_war_exploded/VIP_SAY");
    }
    VIP_deal.addEventListener('click',function(){
        setInterval(function(){
            location.assign("http://localhost:8080/ToSkyNews_war_exploded/VIP_SAY");
        },2000);
    })
    VIP_apply.addEventListener('click',function(){
        setInterval(function(){
            location.assign("http://localhost:8080/ToSkyNews_war_exploded/VIP_start");
        },2000);
    })


// 注销VIP
var userId=localStorage.getItem('user_id');
var VIP_cancle=document.querySelector('.VIP_cancle');
VIP_cancle.addEventListener('click',function(){
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/vip/deleteVip",
        data: {
            userID: userId,
        },
        success: function (data) {
            console.log(data);
            alert('注销成功')
        },
        error: function (err) {
            console.log(err);
        }
    })
})













        
}
    

