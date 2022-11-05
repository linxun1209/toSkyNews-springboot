"use strict";

window.onload = function () {
  var items = document.querySelectorAll('.item');
  var flex_content_divs = document.querySelectorAll('.flex_content_div');
  flex_content_divs[0].style.display = 'block';

  for (var i = 0; i < items.length; i++) {
    items[i].setAttribute('index', i);

    items[i].onclick = function () {
      for (var i = 0; i < items.length; i++) {
        items[i].className = 'item';
      }

      this.className = 'item current';
      var index = this.getAttribute('index');
      console.log(index);

      for (var _i = 0; _i < flex_content_divs.length; _i++) {
        flex_content_divs[_i].style.display = 'none';
      }

      flex_content_divs[index].style.display = 'block';
    };
  }

  var feedback = document.getElementById('feedback');
  var indexPage = document.querySelector('.indexPage');
  var feedbacks = document.querySelector('.feedbacks');
  var goback = document.querySelector('.goback');
  indexPage.addEventListener('mouseover', function () {
    indexPage.style.backgroundColor = 'rgb(242,242,242)';
  });
  indexPage.addEventListener('mouseleave', function () {
    indexPage.style.backgroundColor = 'rgb(255,255,255)';
  });
  feedbacks.addEventListener('mouseover', function () {
    feedbacks.style.backgroundColor = 'rgb(242,242,242)';
  });
  feedbacks.addEventListener('mouseleave', function () {
    feedback.style.display = 'none';
    feedback.style.backgroundColor = 'rgb(255,255,255)';
  });
  goback.addEventListener('mouseover', function () {
    goback.style.backgroundColor = 'rgb(242,242,242)';
  });
  goback.addEventListener('mouseleave', function () {
    goback.style.backgroundColor = 'rgb(255,255,255)';
  });
  goback.addEventListener('click', function () {
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 2000);
    this.style.transform = '(translateY(-52px)';
  });
  var right_nav = document.querySelector('.right_nav');
  var right_nav_wrap = document.querySelector('.right_nav_wrap');
  document.addEventListener('scroll', function () {
    if (window.pageYOffset >= 100) {
      right_nav_wrap.style.position = 'fixed';
      goback.style.display = 'block';
    } else {
      right_nav_wrap.style.position = 'fixed';
      goback.style.display = 'none';
    }
  });
  var container = document.querySelector('.container');
  container.addEventListener('click', function () {
    setInterval(function () {
      location.assign('http://localhost:8080/ToSkyNews_war_exploded/lunbo');
    });
  });
  var about_headline_top_li = document.getElementById('about_headline_top_li');

  if (localStorage.getItem("have_land") == 'true') {
    about_headline_top_li.innerHTML = '已登录';
  } else {
    about_headline_top_li.innerHTML = '登录';
  }

  var join = document.getElementById('join');
  join.addEventListener('click', function () {
    setInterval(function () {
      location.assign('http://localhost:8080/ToSkyNews_war_exploded/VIP');
    }, 2000);
    join.style.backgroundColor = 'rgb(130, 167, 252)';
  });
  var feedback = document.querySelector('#feedback');
  var demend = document.querySelector('.demend');
  demend.addEventListener('click', function () {
    feedback.style.display = 'block';
  });
  feedbacks.addEventListener('click', function () {
    feedback.style.display = 'block';
  });
  var showPage = document.querySelector('.showPage');
  showPage.addEventListener('mouseover', function () {
    setInterval(function () {
      location.assign('http://localhost:8080/ToSkyNews_war_exploded/instruction');
    }, 1000);
  });
  var product = document.getElementById('product');

  product.onclick = function () {
    setInterval(function () {
      location.assign('http://localhost:8080/ToSkyNews_war_exploded/user_main');
    }, 1000);
  };
};