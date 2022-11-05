"use strict";

window.addEventListener('load', function () {
  // 当前时间
  function getTime() {
    var result = 0;
    var time = new Date();
    var h = time.getHours();
    h = h < 10 ? '0' + h : h;
    var m = time.getMinutes();
    m = m < 10 ? '0' + h : m;
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    var dates = time.getDate();
    var arrTime = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = time.getDay();
    var result = year + '-' + month + '-' + dates + ' ' + arrTime[day] + ' ' + h + ':' + m; // console.log(result);

    var remark_time = this.document.querySelector('.remark_time');
    remark_time.innerHTML = result;
    return result;
  }

  var date = new Date(); // 由帖子id查询相应的帖子

  var article_id = localStorage.getItem('article_id');
  var user_id = localStorage.getItem('user_id');
  var user_name = localStorage.getItem('user_name');
  var user_img = localStorage.getItem('user_img');
  var lookCount = this.document.querySelector('.lookCount');
  var alike = document.getElementsByClassName("left_nav_text")[0];
  var big_title = document.getElementsByClassName("big_title")[0];
  var small_title = document.getElementsByClassName("small_title")[0];
  var right_top_img = document.getElementsByClassName("right_top_img")[0];
  var recos1_remark_input = document.getElementsByClassName("recos1_remark_input")[0];
  var publisher = document.getElementsByClassName("publisher")[0];
  var right_top_img = document.getElementsByClassName("right_top_img")[0];
  var time = small_title.getElementsByTagName("span")[0];
  var a_sort = small_title.getElementsByTagName("span")[1];
  var c_main = document.getElementById("recos1_content");
  var publisher_id;
  var publisher_name;
  recos1_remark_input.innerText = user_name;
  var user_imgs = document.getElementsByClassName("user_img");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = user_imgs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _i3 = _step.value;
      _i3.src = user_img;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/queryPostsByID', {
    "postsID": article_id
  }, function (date) {
    alike.innerText = date.alike;
    big_title.innerText = date.postsName;
    time.innerText = date.picture;
    a_sort.innerText = date.label;
    c_main.innerHTML = date.content;
    lookCount.innerHTML = date.browse + " 浏览";
    var publisher_id = date.reside;
    sessionStorage.setItem('publisher_id', date.reside);

    document.getElementById('publicer').onclick = function () {
      localStorage.setItem('otherUser_id', publisher_id);
      window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/otherUserPage");
    };

    $.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}', {
      "userID": publisher_id
    }, function (date) {
      publisher.innerText = date.username;

      if (date.picture == null) {
        right_top_img.src = 'https://linxun-1310915694.cos.ap-shanghai.myqcloud.com/toSkyNews/20220429192703_none.jpg';
      } else {
        right_top_img.src = date.picture;
      }

      sessionStorage.setItem('publisher_name', date.username);
    });
  });
  publisher_id = sessionStorage.getItem('publisher_id');
  publisher_name = sessionStorage.getItem('publisher_name'); // 展示某个帖子下面所有评论
  // console.log(arcticle_id)

  var remark_tubiao_text = document.querySelector('.remark_tubiao_text');
  var all_commit_name = this.document.querySelector('.all_commit_name');
  var all_commit_text = this.document.querySelector('.all_commit_text');
  var same_remark = this.document.querySelector('.same_remark');
  remarkShow();

  function remarkShow() {
    $.ajax({
      dataType: 'json',
      type: "post",
      url: "http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentByPosts",
      data: {
        postsID: article_id
      },
      success: function success(data) {
        var remarkCount = data.length;
        remark_tubiao_text.innerHTML = remarkCount;
        var all_commit = document.querySelector('.all_commit');
        all_commit.innerHTML = ' ';

        var _loop = function _loop(_i) {
          var all_commit_a = document.createElement("div");
          all_commit.append(all_commit_a);
          all_commit_a.className = 'all_commit_a';
          all_commit_a.innerHTML = "\n                        <div class=\"all_commit_top\">\n                        <img src=\"img/zyt/user.jpeg\" alt=\"\" class=\"all_commit_img\">\n                            <a href=\"javascript:;\" class=\"all_commit_name\">".concat(data[_i].commentName, "</a>\n                            <div class=\"all_commit_time\">").concat(data[_i].commentTime, "</div>\n                        </div>\n                        <div class=\"all_commit_text\">").concat(data[_i].contain, "</div>\n                        ");

          var all_commit_img = document.getElementsByClassName("all_commit_img")[_i];

          var all_commit_name = document.getElementsByClassName("all_commit_name")[_i];

          if (data[_i].picture == null) {
            all_commit_img.src = "https://linxun-1310915694.cos.ap-shanghai.myqcloud.com/toSkyNews/20220429192703_none.jpg";
          } else {
            all_commit_img.src = data[_i].picture;
          }

          console.log();

          all_commit_name.onclick = function () {
            localStorage.setItem('otherUser_id', data[_i].makerID);
            window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/otherUserPage");
          };
        };

        for (var _i = 0; _i < data.length; _i++) {
          _loop(_i);
        }

        same_remark.innerHTML = all_commit.innerHTML;
      },
      error: function error(err) {
        console.log(err);
      }
    });
  } // 发布评论


  var remark_content_username = this.document.querySelector('.remark_content_username');
  var remark_hide_like_context = this.document.querySelector('.remark_hide_like_context');
  var commentID = this.document.querySelector('.commentID');
  var markerID = this.document.querySelector('.markerID');
  var postsID = this.document.querySelector('.postsID');
  var recos1_remark_input = this.document.querySelector('.recos1_remark_input');
  var remark_time = this.document.querySelector('.remark_time');
  var remark_area = this.document.querySelector('#remark_area');
  var tosay = this.document.querySelector('.tosay');
  var all_commit_1 = this.document.querySelector('.all_commit_1');

  tosay.onclick = function () {
    if (remark_area.value == ' ') {
      alert('你还没有输入内容！');
    } else {
      $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/comments/addComment",
        data: {
          contain: remark_area.value,
          commentTime: getTime(),
          postsID: article_id,
          makerID: user_id,
          picture: user_img,
          authorID: publisher_id,
          commentName: user_name
        },
        success: function success(data) {
          if (data.message == '类型不能为空') {
            alert('请输入评论内容！');
          }

          remark_area.value = '';
          remarkShow();
          window.location.reload();
        },
        error: function error(err) {
          console.log(err);
        }
      });
    }
  }; // 返回帖子评论数


  var remark_tubiao_text = this.document.querySelector('.remark_tubiao_text');
  var article_id = this.localStorage.getItem('article_id');
  $.ajax({
    type: "post",
    url: "http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount",
    data: {
      postsID: article_id
    },
    success: function success(data) {
      remark_tubiao_text.innerHTML = data;
    },
    error: function error(err) {
      console.log(err);
      console.log('哎呀，出错了');
    }
  }); //关注栏目

  $.ajax({
    type: "post",
    url: "http://localhost:8080/ToSkyNews_war_exploded/focus/queryFocusBoolean",
    data: {
      focusID: sessionStorage.getItem('publisher_id'),
      fansID: user_id
    },
    success: function success(data) {
      console.log(data);

      if (data.data == '该用户已经关注过此用户！') {
        care.style.backgroundColor = '#fff';
        care.style.color = '#888888';
        care.innerHTML = "已关注";
        sessionStorage.setItem('afollow', '1');
      } else {
        sessionStorage.setItem('afollow', '0');
      }
    },
    error: function error(err) {
      console.log(err);
    }
  });
  var care = this.document.querySelector('.follow');
  care.addEventListener('click', function () {
    if (sessionStorage.getItem('afollow') == 0) {
      care.style.backgroundColor = '#fff';
      care.style.color = '#888888';
      care.innerHTML = "已关注";
      tofollow();
      sessionStorage.setItem('afollow', '1');
    } else {
      care.style.backgroundColor = 'rgb(255, 0, 60)';
      care.style.color = 'white';
      care.innerHTML = "+关注";
      sessionStorage.setItem('afollow', '0');
      cancelfollow();
    }
  });

  function tofollow() {
    $.ajax({
      type: "post",
      url: "http://localhost:8080/ToSkyNews_war_exploded/focus/addFocus",
      data: {
        focusID: publisher_id,
        fansID: user_id
      },
      success: function success(data) {
        console.log('关注成功');
      },
      error: function error(err) {
        console.log(err);
      }
    });
  } // 用户取消点赞


  function cancelfollow() {
    $.ajax({
      type: "post",
      url: "http://localhost:8080/ToSkyNews_war_exploded/focus/deleteFocus",
      data: {
        focusID: publisher_id,
        fansID: user_id
      },
      success: function success(data) {
        console.log("取消关注成功！");
      },
      error: function error(err) {
        console.log(err);
      }
    });
  } //  判断用户是否点赞


  $.ajax({
    type: "post",
    url: "http://localhost:8080/ToSkyNews_war_exploded/alike/queryAlikeBoolean",
    data: {
      postsID: article_id,
      userID: user_id
    },
    success: function success(data) {
      console.log(data);

      if (data.data == '该帖已被此用户点赞过！') {
        reco_left1.style.color = '#af012a';
        like_praise.style.transform = "scale(1.3)";
        sessionStorage.setItem('aliken', '1');
      } else {
        sessionStorage.setItem('aliken', '0');
      }
    },
    error: function error(err) {
      console.log(err);
    }
  });
  var recomments1_left_li1 = document.getElementsByClassName('recomments1_left_li1');
  var reco_left1 = document.getElementById("reco_left1");
  var like_praise = document.getElementById("like_praise");

  reco_left1.onclick = function () {
    if (sessionStorage.getItem('aliken') == '0') {
      reco_left1.style.color = '#af012a';
      like_praise.style.transform = "scale(1.3)";
      toup();
      sessionStorage.setItem('aliken', '1');
    } else {
      reco_left1.style.color = '#615f5f';
      like_praise.style.transform = "scale(1.0)";
      cancelup();
      sessionStorage.setItem('aliken', '0');
    }
  }; // 用户点赞


  function toup() {
    $.ajax({
      type: "post",
      url: "http://localhost:8080/ToSkyNews_war_exploded/alike/setAlike",
      data: {
        postsID: article_id,
        userID: user_id
      },
      success: function success(data) {
        console.log(data);
        console.log('点赞成功');
        var n = document.getElementsByClassName('left_nav_text')[0];
        number = parseInt(n.innerText) + 1;
        n.innerText = number;
      },
      error: function error(err) {
        console.log(err);
      }
    });
  } // 用户取消点赞


  function cancelup() {
    $.ajax({
      type: "post",
      url: "http://localhost:8080/ToSkyNews_war_exploded/alike/deleteAlike",
      data: {
        postsID: article_id,
        userID: user_id
      },
      success: function success(data) {
        console.log("取消成功！");
        var n = document.getElementsByClassName('left_nav_text')[0];

        if (n.innerText > 0) {
          var _number = parseInt(n.innerText) - 1;

          n.innerText = _number;
        }
      },
      error: function error(err) {
        console.log(err);
      }
    });
  } //  判断用户是否收藏


  $.ajax({
    type: "post",
    url: "http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection",
    data: {
      postsID: article_id,
      userID: user_id
    },
    success: function success(data) {
      if (data.data == '此用户已收藏过此帖子！') {
        store_tu_bs.style.color = '#af012a';
        heart.style.transform = "scale(1.3)";
        sessionStorage.setItem('aCollection', '1');
      } else {
        sessionStorage.setItem('aCollection', '0');
      }
    },
    error: function error(err) {
      console.log(err);
    }
  });
  var heart = this.document.querySelector('#heart');
  var store_tu_bs = this.document.querySelector('#store_tu_bs');
  var store_text = this.document.getElementsByClassName("store_text")[0];
  store_tu_bs.addEventListener('click', function () {
    if (sessionStorage.getItem('aCollection') == 0) {
      store_tu_bs.style.color = '#af012a';
      heart.style.transform = "scale(1.3)";
      store_text.innerHTML = "已收藏";
      sessionStorage.setItem('aCollection', '1');
      tocollection();
    } else {
      store_tu_bs.style.color = '#615f5f';
      heart.style.transform = "scale(1.0)";
      store_text.innerHTML = "收藏";
      sessionStorage.setItem('aCollection', '0');
      cancelcollection();
    }
  });

  function tocollection() {
    $.ajax({
      type: "post",
      url: "http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection",
      data: {
        postsID: article_id,
        userID: user_id
      },
      success: function success(data) {
        console.log('收藏成功');
      },
      error: function error(err) {
        console.log(err);
      }
    });
  } // 用户取消点赞


  function cancelcollection() {
    $.ajax({
      type: "post",
      url: "http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection",
      data: {
        postsID: article_id,
        userID: user_id
      },
      success: function success(data) {
        console.log("取消收藏成功！");
      },
      error: function error(err) {
        console.log(err);
      }
    });
  } //点回复字体变色


  var remark_reponses = document.querySelectorAll('.remark_reponse');

  for (var i = 0; i < remark_reponses.length; i++) {
    remark_reponses[i].addEventListener('click', function () {
      for (var i = 0; i < remark_reponses.length; i++) {
        remark_reponses[i].className = 'remark_reponse';
      }

      this.className = 'remark_reponse present';
    });
  } // 微信功能


  var weixin = this.document.querySelector('#weixin');
  var weixin_code = this.document.querySelector('.weixin_code');
  weixin.addEventListener('mouseover', function () {
    weixin_code.style.display = 'block';
  });
  weixin.addEventListener('mouseleave', function () {
    weixin_code.style.display = 'none';
  }); //侧左边栏

  var bbb = 0;
  var remark_tubiao = this.document.querySelector('#remark_tubiao');
  var reco_left2 = this.document.querySelector('#reco_left2');
  reco_left2.addEventListener('click', function () {
    if (bbb == 0) {
      reco_left2.style.color = '#067ae6';
      remark_tubiao.style.transform = "rotate(30deg)";
      bbb = 1;
    } else {
      reco_left2.style.color = '#615f5f';
      remark_tubiao.style.transform = "scale(1.0)";
      remark_tubiao.style.transform = "rotate(0deg)";
      bbb = 0;
    }
  }); // 关于分享操作的隐藏部分

  var fa_share_alt = document.querySelector('.fa_share_alt');
  var reco_left4 = this.document.querySelector('#reco_left4');
  var shares_hide = this.document.querySelector('.shares_hide');
  reco_left4.addEventListener('mouseover', function () {
    shares_hide.style.display = 'block';
    reco_left4.style.color = 'green'; // fa_share_alt.style.transform = ("scale(1.4)");
  });
  reco_left4.addEventListener('mouseleave', function () {
    shares_hide.style.display = 'none';
    reco_left4.style.color = 'black'; // fa_share_alt.style.transform = ("scale(0.8)");
  });
  shares_hide.addEventListener('mouseover', function () {
    shares_hide.style.display = 'block';
  });
  shares_hide.addEventListener('mouseleave', function () {
    shares_hide.style.display = 'none';
  });
  var reco_left2 = this.document.querySelector('#reco_left2');
  var remark_hide = this.document.querySelector('.remark_hide');
  var cha = this.document.querySelector('.cha');
  cha.addEventListener('click', function () {
    remark_hide.style.display = 'none';
    remark_tubiao.style.transform = "rotate(0deg)";
  });
  $('#reco_left2').click(function () {
    $('.remark_hide').slideToggle();
  });
  var fff = 0;
  var like_praise_hides = this.document.querySelectorAll('#like_praise_hide');

  for (var i = 0; i < like_praise_hides.length; i++) {
    like_praise_hides[i].addEventListener('click', function () {
      if (fff == 0) {
        this.style.color = 'red';
        this.style.transform = "scale(1.5)";
        fff = 1;
      } else {
        this.style.color = 'black';
        this.style.transform = "scale(1.0)";
        fff = 0;
      }
    });
  }

  var remark_content_pics = this.document.querySelectorAll('#remark_content_pic');
  var jjj = 0;

  for (var i = 0; i < remark_content_pics.length; i++) {
    remark_content_pics[i].addEventListener('click', function () {
      if (jjj == 0) {
        this.style.color = 'red';
        jjj = 1;
      } else {
        this.style.color = 'black';
        jjj = 0;
      }
    });
  } // 隐藏评论中的隐藏


  var recos1_remark_text = this.document.querySelector('.recos1_remark_text');
  var remark_hide_login = this.document.querySelector('.remark_hide_login');
  var remark_hide_li1 = this.document.querySelector('.remark_hide_li1');

  if (localStorage.getItem("have_land") == 'false') {
    remark_hide_li1.style.display = 'block';
    recos1_remark_text.style.display = 'none';

    remark_hide_login.onclick = function () {
      location.assign("http://localhost:8080/ToSkyNews_war_exploded/login");
    };
  } else {
    remark_hide_li1.style.display = 'none';
    recos1_remark_text.style.display = 'block';
  } //wzz


  var column_sort_a = document.getElementsByClassName("column_sort_a");

  var _loop2 = function _loop2(_i2) {
    column_sort_a[_i2].onclick = function () {
      var sort = column_sort_a[_i2].innerHTML;
      sessionStorage.setItem("c-sort", sort);
      window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/user_main");
    };
  };

  for (var _i2 = 0; _i2 < column_sort_a.length; _i2++) {
    _loop2(_i2);
  }

  var food_find_input = document.getElementsByClassName("food_find_input")[0];
  var food_find_bon = document.getElementsByClassName("food_find_bon")[0];

  food_find_bon.onclick = function () {
    var text = food_find_input.value;
    localStorage.setItem('search_input', text);
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/search");
  }; //wzz


  if (localStorage.getItem("tolook") == '0') {
    setTimeout(function () {
      window.location.reload();
    }, 60);
    localStorage.setItem("tolook", '1');
  }
});