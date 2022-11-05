"use strict";

window.onload = function () {
  var user_id = localStorage.getItem('user_id');
  var apply_input = document.querySelector('.apply_input');
  var time_opation = document.querySelector('.time_opation');
  var call = document.querySelector('.call');
  var summit = document.querySelector('.summit');
  var contain = document.querySelector('.contain');

  summit.onclick = function () {
    if (localStorage.getItem('VIP') == 0) {
      $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/vip/addVIP",
        data: {
          times: time_opation.value,
          userID: user_id
        },
        success: function success(data) {
          contain.innerHTML = data.data;
          localStorage.setItem('VIP', 1);
          setInterval(function () {
            location.assign('http://localhost:8080/ToSkyNews_war_exploded/VIP');
          }, 2000);
        },
        error: function error(err) {
          console.log(err);
        }
      });
    } else {
      alert('你已经是会员了!');
      contain.innerHTML = ' ';
    }
  };
};