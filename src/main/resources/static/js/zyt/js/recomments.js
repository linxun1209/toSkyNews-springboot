//wzz
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
    var result = year + '-' + month + '-' + dates + ' ' + arrTime[day] + ' ' + h + ':' + m;
    return result;
}
var date = new Date();
// 由帖子id查询相应的帖子
let url=window.location.href;
let urlmessage=url.split('?')[1];
var article_id=urlmessage.split('=')[1];
var user_id = localStorage.getItem('user_id');
var user_name = localStorage.getItem('user_name');
var user_img = localStorage.getItem('user_img');
var lookCount = this.document.querySelector('.lookCount');
var alike = document.getElementsByClassName("left_nav_text")[0];
var big_title = document.getElementsByClassName("big_title")[0];
var small_title = document.getElementsByClassName("small_title")[0];
var right_top_img = document.getElementsByClassName("right_top_img")[0];
var publisher = document.getElementsByClassName("publisher")[0];
var right_top_img = document.getElementsByClassName("right_top_img")[0];
var time = small_title.getElementsByTagName("span")[0];
var a_sort = small_title.getElementsByTagName("span")[1];
var c_main = document.getElementById("recos1_content");
var publisher_id;
var publisher_name;
var user_imgs = document.getElementsByClassName("user_img");
for (let i of user_imgs) {
    i.src = user_img;
}
let getmessage=new Promise((resolve,reject)=>{
    $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/queryPostsByID', {
        "postsID": article_id,
    },
        function (date) {
            alike.innerText = date.alike;
            big_title.innerText = date.postsName;
            time.innerText = date.picture;
            a_sort.innerText = date.label;
            c_main.innerHTML = date.content;
            lookCount.innerHTML = date.browse + " 浏览";
            publisher_id =parseInt(date.reside);
            sessionStorage.setItem('publisher_id', parseInt(date.reside));
            publisher_id = sessionStorage.getItem('publisher_id');
            document.getElementById('publicer').onclick = function () {
                if (publisher_id != user_id) {
                    localStorage.setItem('otherUser_id', publisher_id);
                    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/otherUserPage");
                } else {
                    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/myPage");
                }
            }
            $.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}', {
                "userID": publisher_id,
            },
                function (date) {
                    publisher.innerText = date.username;
                    if (date.picture == null) {
                        right_top_img.src = 'https://linxun-1310915694.cos.ap-shanghai.myqcloud.com/toSkyNews/20220429192703_none.jpg';
                    } else {
    
                        right_top_img.src = date.picture;
                    }
                    sessionStorage.setItem('publisher_name', date.username);
                        resolve();
                })
        })
})
function sharea(){
    window.location.assign(`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}`);
}
getmessage.then(()=>{
    publisher_name = sessionStorage.getItem('publisher_name');
    function toland() {
        swal('请先登录!');
        setTimeout(function(){
            window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/login");
        },1000)
    }
    // 隐藏评论中的隐藏
    var recos1_remark_text = this.document.querySelector('.recos1_remark_text');
    var remark_hide_login = this.document.querySelector('.remark_hide_login');
    var remark_hide_li1 = this.document.querySelector('.remark_hide_li1');
    if (localStorage.getItem("have_land") == 'false') {
        remark_hide_li1.style.display = 'block';
        recos1_remark_text.style.display = 'none';
        remark_hide_login.onclick = function () {
            location.assign("http://localhost:8080/ToSkyNews_war_exploded/login");
        }
    } else {
        remark_hide_li1.style.display = 'none';
        recos1_remark_text.style.display = 'block';
    }
    //关注栏目
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/focus/queryFocusBoolean",
        data: {
            focusID:publisher_id,
            fansID: user_id
        },
        success: function (date) {
            console.log(date.data);
            if (date.code==-1) {
                sessionStorage.setItem('afollow', '1');
                care.style.backgroundColor = '#fff';
                care.style.color = '#888888';
                care.innerHTML = "已关注";
            } 
            else if(date.code==1) {
                sessionStorage.setItem('afollow', '0');
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
    
    var care = this.document.querySelector('.follow');
    if( user_id==publisher_id){
        care.style.display='none';
    }
    care.addEventListener('click', function () {
        if (sessionStorage.getItem('afollow') == 0) {
            tofollow();
        } else {
            cancelfollow();
        }
    })
    
    function tofollow() {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/focus/queryFocusBoolean",
            data: {
                focusID: sessionStorage.getItem('publisher_id'),
                fansID: user_id,
            },
            success: function (data) {
                console.log(data);
                if(data.data=='未关注！'){
                    $.ajax({
                        type: "post",
                        url: "http://localhost:8080/ToSkyNews_war_exploded/focus/addFocus",
                        data: {
                            focusID: publisher_id,
                            fansID: user_id,
                        },
                        success: function (data) {
                            console.log(data);
                            if (data.data=='用户自己不能关注自己！') {
                                sessionStorage.setItem('afollow', '0');
                                swal("用户自己不能关注自己！");
                            }else{
                                sessionStorage.setItem('afollow', '1');
                                care.style.backgroundColor = '#fff';
                                care.style.color = '#888888';
                                care.innerHTML = "已关注"
                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
    // 用户取消点赞
    function cancelfollow() {
        swal({ 
            title: "你是否确定取消关注?", 
            type: "warning",
            showCancelButton: true, 
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定取消！", 
            cancelButtonText: "取消操作！",
            closeOnConfirm: false, 
            closeOnCancel: false	
            },
            function(isConfirm){ 
            if (isConfirm) { 
                swal("取消成功！", "你所选的用户已经被您取消关注。","success"); 
                $.ajax({
                    type: "post",
                    url: "http://localhost:8080/ToSkyNews_war_exploded/focus/deleteFocus",
                    data: {
                        focusID: publisher_id,
                        fansID: user_id,
                    },
                    success: function (data) {
                        care.style.backgroundColor = 'rgb(255, 0, 60)';
                        care.style.color = 'white';
                        care.innerHTML = "+关注"
                        sessionStorage.setItem('afollow', '0');
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
                sessionStorage.setItem('afollow', '0');
            } else {
                swal("取消操作！", "你已经取消操作:","error"); 
            } 
        });
    }
    //  判断用户是否点赞
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/alike/queryAlikeBoolean",
        data: {
            postsID: article_id,
            userID: user_id,
        },
        success: function (data) {
            if (data.data == '该帖已被此用户点赞过！') {
                reco_left1.style.color = '#af012a';
                like_praise.style.transform = ("scale(1.3)");
                sessionStorage.setItem('aliken', '1');
            } else {
                sessionStorage.setItem('aliken', '0');
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
    var reco_left1 = document.getElementById("reco_left1");
    var like_praise = document.getElementById("like_praise");
    reco_left1.onclick = function () {
        if (sessionStorage.getItem('aliken') == '0') {
            toup();
        } else {
            cancelup();
        }
    }
    
    // 用户点赞
    function toup() {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/alike/queryAlikeBoolean",
            data: {
                postsID: article_id,
                userID: user_id,
            },
            success: function (data) {
                if (data.data == '该帖未被此用户点赞过！') {
                    $.ajax({
                        type: "post",
                        url: "http://localhost:8080/ToSkyNews_war_exploded/alike/setOrDeleteAlike",
                        data: {
                            postsID: article_id,
                            userID: user_id,
                            thing:'1'
                        },
                        success: function (data) {
                            if(data.data=='点赞成功！'){
                                reco_left1.style.color = '#af012a';
                                like_praise.style.transform = ("scale(1.3)");
                                let n = document.getElementsByClassName('left_nav_text')[0];
                                let number = parseInt(n.innerText) + 1;
                                n.innerText = number;
                                sessionStorage.setItem('aliken', '1');
                            }
                        },
                        error: function (err) {
                            swal("点赞失败！", '不能频繁的点赞同一个作品!', "error");
                        }
                    })
                } else {
                    sessionStorage.setItem('aliken', '1');
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
        sessionStorage.setItem('aliken', '1');
    }
    // 用户取消点赞
    function cancelup() {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/alike/setOrDeleteAlike",
            data: {
                postsID: article_id,
                userID: user_id,
                thing:'-1'
            },
            success: function (data) {
                console.log(data);
                if (data.data == '取消点赞成功！') {
                    let n = document.getElementsByClassName('left_nav_text')[0];
                    let number = parseInt(n.innerText) - 1;
                    n.innerText = number;
                    reco_left1.style.color = '#615f5f';
                    like_praise.style.transform = ("scale(1.0)");
                    sessionStorage.setItem('aliken', '0');
                }
            },
            error: function (err) {
                swal("点赞失败！", '不能频繁的点赞同一个作品!', "error");
            }
        })
    }
    //  判断用户是否收藏
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean",
        data: {
            postsID: article_id,
            userID: user_id,
        },
        success: function (data) {
            if (data.data == '该帖已被此用户收藏过！') {
                store_tu_bs.style.color = '#af012a';
                heart.style.transform = ("scale(1.3)");
                sessionStorage.setItem('aCollection', '1');
            } else {
                sessionStorage.setItem('aCollection', '0');
            }
        },
        error: function (err) {
            console.log(err);
        }
    })
    var heart = this.document.querySelector('#heart');
    var store_tu_bs = this.document.querySelector('#store_tu_bs');
    var store_text = this.document.getElementsByClassName("store_text")[0];
    store_tu_bs.addEventListener('click', function () {
        if (sessionStorage.getItem('aCollection') == 0) {
            tocollection();
        } else {
            cancelcollection();
        }
    })
    function tocollection() {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean",
            data: {
                postsID: article_id,
                userID: user_id,
            },
            success: function (data) {
                if (data.data == '该帖已被此用户收藏过！') {
                    store_tu_bs.style.color = '#af012a';
                    heart.style.transform = ("scale(1.3)");
                } else {
                    $.ajax({
                        type: "post",
                        url: "http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollectionBoolean",
                        data: {
                            postsID: article_id,
                            userID: user_id,
                            thing:'1'
                        },
                        success: function (data) {
                            store_tu_bs.style.color = '#af012a';
                            heart.style.transform = ("scale(1.3)");
                            store_text.innerHTML = "已收藏";
                            sessionStorage.setItem('aCollection', '1');
                        },
                        error: function (err) {
                            swal("收藏失败！", '不能频繁的收藏同一个作品!', "error");
                        }
                    })
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
        sessionStorage.setItem('aCollection', '1');
    }
    // 用户取消收藏
    function cancelcollection() {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollectionBoolean",
            data: {
                postsID: article_id,
                userID: user_id,
                thing:'-1'
            },
            success: function (data) {
                store_tu_bs.style.color = '#615f5f';
                heart.style.transform = ("scale(1.0)");
                store_text.innerHTML = "收藏"
                sessionStorage.setItem('aCollection', '0');
            },
            error: function (err) {
                swal("收藏失败！", '不能频繁的收藏同一个作品!', "error");
            }
        })
        sessionStorage.setItem('aCollection', '0');
    }
    //点回复字体变色
    var remark_reponses = document.querySelectorAll('.remark_reponse');
    for (var i = 0; i < remark_reponses.length; i++) {
        remark_reponses[i].addEventListener('click', function () {
            for (var i = 0; i < remark_reponses.length; i++) {
                remark_reponses[i].className = 'remark_reponse';
            }
            this.className = 'remark_reponse present';
        })
    }
    var fff = 0;
    var like_praise_hides = this.document.querySelectorAll('#like_praise_hide');
    for (var i = 0; i < like_praise_hides.length; i++) {
        like_praise_hides[i].addEventListener('click', function () {
            if (fff == 0) {
                this.style.color = 'red';
                this.style.transform = ("scale(1.5)");
                fff = 1;
            } else {
                this.style.color = 'black';
                this.style.transform = ("scale(1.0)");
                fff = 0;
            }
        })
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
        })
    }
    //wzz
    let column_sort_a = document.getElementsByClassName("column_sort_a");
    for (let i = 0; i < column_sort_a.length; i++) {
        column_sort_a[i].onclick = function () {
            let sort = column_sort_a[i].innerHTML;
            sessionStorage.setItem("c-sort", sort);
            window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/user_main");
        }
    }
    var food_find_input = document.getElementsByClassName("food_find_input")[0];
    var food_find_bon = document.getElementsByClassName("food_find_bon")[0];
    food_find_bon.onclick = function () {
        let text = food_find_input.value;
        if (text == '') {
            swal("请输入搜索内容！");
        } else {
            localStorage.setItem('search_input', text);
            window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/search");
        }
    }
    if (localStorage.getItem("have_land") == 'false') {
        store_tu_bs.onclick = toland;
        care.onclick = toland;
        reco_left1.onclick = toland;
    }
})