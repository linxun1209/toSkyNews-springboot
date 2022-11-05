window.onload = function () {
    var user_id=localStorage.getItem('user_id');
    var apply_input = document.querySelector('.apply_input');
    var time_opation = document.querySelector('.time_opation');
    var call = document.querySelector('.call');
    var summit = document.querySelector('.summit');

    summit.onclick = function () {
        if (time_opation.value == ' ' || time_opation.value == ' ') {
            alert('请输入完整信息');
            console.log(22222);
        } else {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/ToSkyNews_war_exploded/vip/addVIP",
                data: {
                    times: time_opation.value,
                    userID: user_id,
                },
                success: function (data) {
                    console.log(data);
                    setInterval(function(){
                        location.assign('http://localhost:8080/ToSkyNews_war_exploded/VIP');
                    },2000);
                   
                },
                error: function (err) {
                    console.log(err);
                }
            })
        }

    }











}