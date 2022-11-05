"use strict";

window.onload = function () {
  var VIP_instruction = document.querySelector('.VIP_instruction');
  var VIP_deal = document.querySelector('.VIP_deal');
  var VIP_apply = document.querySelector('.VIP_apply');

  VIP_instruction.onclick = function () {
    location.assign("http://localhost:8080/ToSkyNews_war_exploded/VIP_SAY");
  };

  VIP_deal.addEventListener('click', function () {
    setInterval(function () {
      location.assign("http://localhost:8080/ToSkyNews_war_exploded/VIP_SAY");
    }, 2000);
  });
  VIP_apply.addEventListener('click', function () {
    setInterval(function () {
      location.assign("http://localhost:8080/ToSkyNews_war_exploded/VIP_start");
    }, 2000);
  }); // 注销VIP

  var userId = localStorage.getItem('user_id');
  var VIP_cancle = document.querySelector('.VIP_cancle');
  var cancle_ti = document.querySelector('.cancle_ti');
  VIP_cancle.addEventListener('click', function () {
    if (localStorage.getItem('VIP') == 1) {
      $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/vip/deleteVip",
        data: {
          userID: userId
        },
        success: function success(data) {
          cancle_ti.innerHTML = data.data;
          localStorage.setItem('VIP', 0);
        },
        error: function error(err) {
          console.log(err);
        }
      });
    } else {
      alert('你已经不是会员了！');
      cancle_ti.innerHTML = '';
    }
  }); // 判断一下是否为会员

  $.ajax({
    type: "post",
    url: "http://localhost:8080/ToSkyNews_war_exploded/vip/judgeVipIs",
    data: {
      userID: userId
    },
    success: function success(data) {
      if (data.data == '恭喜你成为VIP！') {
        localStorage.setItem('VIP', '1');
      } else {
        localStorage.setItem('VIP', '0');
      }
    },
    error: function error(err) {
      console.log(err);
    }
  });
};