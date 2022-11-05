var top = document.getElementById('main_top');
var top_header = document.getElementById('top_header');
var head_show = document.getElementById('head_show');
var id_card_top = document.getElementsByClassName("id_card_top")[0];
var arrow = document.getElementsByClassName("fa-arrow-circle-right")[0];
var location_chance = document.getElementsByClassName("location_chance")[0];
// var loc = location_chance.getElementsByClassName("loc");
// var weather = document.getElementById("weather");
// var weathers = document.getElementById("weather_show");
var column = document.getElementsByClassName("column")[0];
var haveland = document.getElementsByClassName('havaland');
var lookmore= document.getElementById("lookmore");
var lookend= document.getElementById("lookend");
var top_work = document.getElementById("top_work");
var top_works = document.getElementById("top_works");
var top_p= document.getElementById("top_p");
var publish = document.getElementById("publish");
$.get('http://localhost:8080/ToSkyNews_war_exploded/posts/queryPassPosts',
    function (date) { sessionStorage.setItem('postall', date.length); })
//重新newalert（）方法
var alertbox = document.getElementById("alert");
var alertfade = document.getElementById("alertfade");
var feedbackfade = document.getElementById("feedbackfade");
var alerttext = document.getElementById("alerttext");
alertfade.onclick = function () {
    feedbackfade.style.display = 'none';
    feedbackfade.style.opacity = '0';
    feedbackfade.classList.remove("fade");
    alertbox.style.top = '-250px';
}
function newalert(text) {
    feedbackfade.style.display = 'block';
    feedbackfade.style.opacity = '1';
    feedbackfade.classList.add("fade");
    alerttext.innerHTML = text;
    alertbox.style.top = '50px';
}
//重新newalert（）方法
document.getElementById("top_about").onclick = function () {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/about_title");
}/*  */
// function getweather() {
//     let weather = document.getElementById("weather").getElementsByTagName("span")[0];
//     let tem1 = document.getElementsByClassName("tem_max")[0];
//     let tem2 = document.getElementsByClassName("tem_min")[0];
//     let wea = document.getElementsByClassName("wea")[0];
//     let img = document.getElementsByClassName("weather_img")[0];
//     let img2 = document.getElementsByClassName("weather_img")[1];
//     let wind = document.getElementsByClassName("wind")[0].getElementsByTagName("span")[0];
//     let air = document.getElementsByClassName("air")[0].getElementsByTagName("span")[0];
//     let location = document.getElementsByClassName("location_chance")[0].value;
//     let date_time = document.getElementsByClassName("date_time")[0].getElementsByTagName("span")[0];
//     $.get('https://www.yiketianqi.com/free/day',
//         { "appid": 55458376, "appsecret": '4sanQ7HR', "city": '东川区'},
//         function (date) {
//             console.log(date);
//             tem1.innerHTML = date.tem_day;
//             tem2.innerHTML = date.tem_night;
//             wea.innerHTML = date.wea;
//             wind.innerHTML = date.win_speed;
//             air.innerHTML = date.air;
//             date_time.innerHTML = date.update_time;
//             let imgm = date.wea_img;
//             weather.innerHTML = date.city;
//             img.src = `img/wzz/${imgm}.png`;
//             img2.src = `img/wzz/${imgm}.png`;
//         })
// }
//搜索跳转：
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
function developing() {
    swal('快发中...',"正在努力开发中，尽情期待！");
}
var main_find_input = document.getElementsByClassName("main_find_input")[0];
var main_find_bon = document.getElementsByClassName("main_find_bon")[0];
main_find_bon.onclick = function () {
    let text = main_find_input.value;
    if (text == '') {
        swal("请输入搜索内容！");
    } else {
        localStorage.setItem('search_input', text);
        window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/search");
    }
}
//搜索跳转：
// getweather();
function showfade(event1,event2){
    event1.onmousemove =function(){
        event2.style.display = "block";
        event2.classList.add('fade');
    }
    event1.onmouseout = function(){
        event2.style.display = "none";
        event2.classList.remove('fade');
    }
}
showfade(top_header,head_show);
showfade(head_show,head_show);
showfade(top_work,publish);
showfade(publish,publish);
id_card_top.onmousemove = () => {
    arrow.style.transform = ("rotate(-180deg)");
}
id_card_top.onmouseout = () => {
    arrow.style.transform = ("rotate(0deg)");
}
// weather.onmouseover = () => {
//     weathers.style.display = "block";
//     weathers.classList.add('fade');
// }
// weather.onmouseout = () => {
//     weathers.style.display = "none";
//     weathers.classList.remove('fade');
// }
// weathers.onmouseover = () => {
//     weathers.style.display = "block";
//     weathers.classList.add('fade');
// }
// weathers.onmouseout = () => {
//     weathers.style.display = "none";
//     weathers.classList.remove('fade');
// }
// weathers.onmouseout = function (e) {
//     if (!e) e = window.event;
//     var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
//     while (reltg && reltg != this) reltg = reltg.parentNode;
//     if (reltg != this) {
//         weathers.style.display = "none";
//         weathers.classList.remove('fade');
//     }
// }
//天气遍历
//顶部下滑处理
window.addEventListener('scroll', function () {
    let all_top = document.getElementById('all_top');
    let main = document.getElementsByClassName("main")[0].getBoundingClientRect().top;
    let hot = document.getElementById("hot");
    let id_card= document.getElementsByClassName("id_card")[0];
    if (main < 0) {
        all_top.classList.add("down");
        all_top.style.display = "block";
        hot.style.position = 'fixed';
        hot.style.top = '280px';
        id_card.style.position = 'fixed';
        id_card.style.top = '60px';
    } else {
        all_top.classList.remove("down");
        all_top.style.display = "none";
        hot.style.position = 'relative';
        hot.style.top = '30px';
        id_card.style.position = 'relative';
        id_card.style.top = '0px';
    }
})
//顶部下滑处理
//三个热榜的处理
var maxfire = document.getElementsByClassName("top_fire_a");
var fireid = document.getElementsByClassName("fireid");
$.post('http://localhost:8080/ToSkyNews_war_exploded/posts/queryAlikeDesc',
    { 'column': "0", 'total': "3" },
    function (date) {
        for (let i = 0; i < 3; i++) {
            maxfire[i].innerHTML = date[i].postsName;
            fireid[i].innerHTML = date[i].postsID;
            maxfire[i].onclick = function () {
                let id = fireid[i].innerHTML;
                localStorage.setItem("article_id", id);
                window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${id}`);
            }
        }
    })
//三个热榜的处理
// 遍历每个文章的点击跳转
function allchange() {
    let column_news = document.getElementsByClassName("column_news");
    for (let i in column_news) {
        column_news[i].onclick = function () {
            let id = column_news[i].getElementsByTagName("span")[3].innerHTML;
            $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                { "postsID": id },
                function (date) {
                    console.log(date);
                })
            localStorage.setItem("article_id", id);
            window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${id}`);
        }
    }
}
// 遍历每个文章的点击跳转
sessionStorage.setItem('postsnumber', 10);
// 实现文章的懒加载
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let that = this;
    if (scrollHeight - 1<= scrollTop + windowHeight) {
        if (sessionStorage.getItem('postall') >= parseInt(sessionStorage.getItem('postsnumber'))  && sessionStorage.getItem('all') == 1) {
            let newpost = parseInt(sessionStorage.getItem('postsnumber')) + 3;
            sessionStorage.setItem('postsnumber', newpost);
            console.log(newpost);
            setTimeout(function () {
                all_a();
            }, 1500);
            lookmore.style.display='block';
            lookend.style.display='none';
        }else if(sessionStorage.getItem('postall') <parseInt(sessionStorage.getItem('postsnumber'))   && sessionStorage.getItem('all') == 1){
            lookmore.style.display='none';
            lookend.style.display='block';
        }
        if (sessionStorage.getItem('sortall') >= parseInt(sessionStorage.getItem('postsnumber'))   && sessionStorage.getItem('sortshow') == 1) {
            let newpost = parseInt(sessionStorage.getItem('postsnumber')) + 3;
            sessionStorage.setItem('postsnumber', newpost);
            setTimeout(function () {
                chance_sort();
            }, 1500);
            lookmore.style.display='block';
            lookend.style.display='none';
        }else if(sessionStorage.getItem('sortall') <parseInt(sessionStorage.getItem('postsnumber'))  && sessionStorage.getItem('sortshow') == 1){
            lookmore.style.display='none';
            lookend.style.display='block';
        }
    }
};
// 实现文章的懒加载
//展示综合栏目
function all_a() {
    $.post('http://localhost:8080/ToSkyNews_war_exploded/vip/queryStatusOneN',
        {'count': sessionStorage.getItem('postsnumber') },
        function (date) {
            column.innerHTML = null;
            for (let n = 0; n < date.length; n++) {
                if (date[n].cover == null) {
                    column.innerHTML += `
                        <a class="column_news" href="javascript:;">
                            <div class="column_news_title">${date[n].postsName}</div>
                            <div class="column_news_Acommit">${date[n].contentA}</div>
                            <div class="column_news_information">
                                <span>${date[n].browse}浏览</span>
                                <span>${date[n].alike}点赞</span>
                                <span>${date[n].picture}</span>
                                <span style="display: none">${date[n].postsID}</span>
                            </div>
                        </a>
                    `;
                } else {
                    column.innerHTML += `
                        <a class="column_news" href="javascript:;">
                                    <div class="column_news_titles">${date[n].postsName}</div>
                                    <div class="column_news_Acommits">${date[n].contentA}</div>
                                    <div class="column_news_information">
                                        <span>${date[n].browse}浏览</span>
                                        <span>${date[n].alike}点赞</span>
                                        <span>${date[n].picture}</span>
                                        <span style="display: none">${date[n].postsID}</span>
                                    </div>
                                <div class='column_img_div'>
                                    <img class="column_img" src="img/wzz/header.jpg" alt="">
                                </div>
                        </a>
                    `;
                    let columnnew = document.getElementsByClassName('column_news')[n];
                    let img = columnnew.getElementsByClassName('column_img')[0];
                    img.src = date[n].cover;
                }

            }
            allchange();
        })
    sessionStorage.setItem('all', 1);
    sessionStorage.setItem('sortshow', 0);
}
//展示综合栏目
var main_left = document.getElementsByClassName("main_left")[0];
var column_sort = main_left.getElementsByClassName("column_sort")[0];
var column_sort_a = column_sort.getElementsByTagName("a");
var all_top = document.getElementById("all_top");
var call_top_sort = all_top.getElementsByClassName("column_sort")[0];
var all_top_a = call_top_sort.getElementsByTagName("a");
var sort_n = 0;
var all_sort = ["综合", "科学", "体育", "军事", "游戏", "娱乐", "其他"];
for (let i in column_sort_a) {
    column_sort_a[i].onclick = function () {
        let sort = column_sort_a[i].innerHTML;
        sessionStorage.setItem("c-sort", sort);
        chance_sort();
    }
}
for (let i in column_sort_a) {
    all_top_a[i].onclick = function () {
        let sort = column_sort_a[i].innerHTML;
        sessionStorage.setItem("c-sort", sort);
        chance_sort();
    }
}
//遍历选种类的方法
function chance_sort() {
    let sort = sessionStorage.getItem('c-sort');
    $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/querySameLabelCount',
    { "label": sort},
    function (date) {
        sessionStorage.setItem("sortall", date);
    })
    if (sort == all_sort[0] || sort == null) {
        column_sort_a[0].style.backgroundColor = "gainsboro";
        column_sort_a[0].style.color = "#067ae6";
        all_top_a[0].style.backgroundColor = "gainsboro";
        all_top_a[0].style.color = "#067ae6";
        all_a();
        if (sessionStorage.getItem('all') <sessionStorage.getItem('postsnumber')) {
            lookmore.style.display='block';
            lookend.style.display='none';
        }else{
            lookmore.style.display='none';
            lookend.style.display='block';
        }
        for (let i = 1; i < all_sort.length; i++) {
            column_sort_a[i].style.backgroundColor = "white";
            column_sort_a[i].style.color = "black";
            all_top_a[i].style.backgroundColor = "white";
            all_top_a[i].style.color = "black";
        }
    }
    for (let i = 1; i < all_sort.length; i++) {
        if (all_sort[i] == sort) {
            column_sort_a[0].style.backgroundColor = "white";
            column_sort_a[0].style.color = "black";
            all_top_a[0].style.backgroundColor = "white";
            all_top_a[0].style.color = "black";
            column_sort_a[i].style.backgroundColor = "gainsboro";
            column_sort_a[i].style.color = "#067ae6";
            all_top_a[i].style.backgroundColor = "gainsboro";
            all_top_a[i].style.color = "#067ae6";
            $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/querySameLabelBy',
                { "column": "0", "label": sort, "total": sessionStorage.getItem('postsnumber')},
                function (date) {
                    column.innerHTML = null;
                    for (let n = 0; n < date.length; n++) {
                        if (date[n].cover == null) {
                            column.innerHTML += `
                                <a class="column_news" href="javascript:;">
                                            <div class="column_news_title">${date[n].postsName}</div>
                                            <div class="column_news_Acommit">${date[n].contentA}</div>
                                            <div class="column_news_information">
                                                <span>${date[n].browse}浏览</span>
                                                <span>${date[n].alike}点赞</span>
                                                <span>${date[n].picture}</span>
                                                <span style="display: none">${date[n].postsID}</span>
                                            </div>
                                </a>
                            `;
                        } else {
                            column.innerHTML += `
                                <a class="column_news" href="javascript:;">
                                            <div class="column_news_titles">${date[n].postsName}</div>
                                            <div class="column_news_Acommits">${date[n].contentA}</div>
                                            <div class="column_news_information">
                                                <span>${date[n].browse}浏览</span>
                                                <span>${date[n].alike}点赞</span>
                                                <span>${date[n].picture}</span>
                                                <span style="display: none">${date[n].postsID}</span>
                                            </div>
                                            <div class='column_img_div'>
                                            <img class="column_img" src="img/wzz/header.jpg" alt="">
                                        </div>
                                </a>
                            `;
                            let columnnew = document.getElementsByClassName('column_news')[n];
                            let img = columnnew.getElementsByClassName('column_img')[0];
                            img.src = date[n].cover;
                        }
                    }
                    allchange();
                    if (sessionStorage.getItem('sortall') <sessionStorage.getItem('postsnumber')) {
                        lookmore.style.display='block';
                        lookend.style.display='none';
                    }else{
                        lookmore.style.display='none';
                        lookend.style.display='block';
                    }
                    sessionStorage.setItem('all', 0);
                    sessionStorage.setItem('sortshow', 1);

                })
        } else {
            column_sort_a[i].style.backgroundColor = "white";
            column_sort_a[i].style.color = "black";
            all_top_a[i].style.backgroundColor = "white";
            all_top_a[i].style.color = "black";
        }
    }
    allchange();
}
//遍历选种类的方法
chance_sort();
var top_land = document.getElementsByClassName("top_land")[0];
var top_header = document.getElementById("top_header");
var user_name = document.getElementById("user_name");
var small_cade1 = document.getElementsByClassName("small_cade")[0];
var small_cade2 = document.getElementsByClassName("small_cade")[1];
var top_header_name = top_header.getElementsByTagName("span")[0];
var id_card_top = document.getElementsByClassName("id_card_top")[0];
var deedbackp = id_card_top.getElementsByTagName("button")[0];
id_card_top.onclick = function (event) {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/myPage");
}
deedbackp.onclick = function (event) {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/mymessage");
    event = event || window.event;
    event.cancelBubble = true;
}
function toland() {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/login");
}
top_land.onclick = toland;
function signoutland() {
    localStorage.setItem('have_land', "false");
    localStorage.removeItem("user_id");
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/user_main");
}
function tocreate() {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/publish");
}
function tomymain() {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/myPage");
}
function topicture(){
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/picture");
}
function noland(){
    swal('请先登录！');
    setTimeout(function(){
        window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/login");
    },1000);
}
//判断是否有反馈
var top_message = document.getElementById("top_message");
var redspot = document.getElementById("redspot");
top_message.onclick= function () {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/mymessage");
}
$.post('http://localhost:8080/ToSkyNews_war_exploded/collections/queryUserFeedback',
    { "userID": localStorage.getItem('user_id') },
    function (date) {
        for (let i of date) {
            if (i.userOr == -1) {
                top_message.style.display='block';
                showmessage();
                break;
            }
        }
})
$.post('http://localhost:8080/ToSkyNews_war_exploded/alike/queryAllMessages',
{ "authorID": localStorage.getItem('user_id') },
    function (date) {
    for (let i of date) {
        if (i.status== 0) {
            top_message.style.display='block';
            showmessage();
            break;
        }
    }
})
function showmessage() {
    var mn = 0;
    var messagetime = setInterval(function () {
        if (mn % 4 == 0) {
            top_message.style.color = "white";
            redspot.style.display = "block";
        }
        mn++;
    }, 300)
    var messagetime = setInterval(function () {
        top_message.style.color = "#1682e6";
        redspot.style.display = "none";
    }, 1200)
}
//判断是否有反馈
// 是否登录的限制判断
var user_img = document.getElementsByClassName("user_img");
if (localStorage.getItem('have_land') == "true") {
    top_work.onclick = tocreate;
    top_works.onclick = tocreate;
    top_p.onclick =topicture;
    var user_id = localStorage.getItem('user_id');
    top_header.style.display = "block";
    top_land.style.display = "none";
    small_cade2.style.display = "block";
    small_cade1.style.display = "none";
    {
        let id_card_message = document.getElementsByClassName('id_card_message')[0];
        let id_card_get = document.getElementsByClassName('id_card_get');
        $.post('http://localhost:8080/ToSkyNews_war_exploded/posts/queryAllSumAlike', { "userID": user_id },
            function (date) { id_card_get[0].innerHTML = date })
        $.post('http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFans', { "focusID": user_id },
            function (date) { id_card_get[1].innerHTML = date.length; })
        $.post('http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFocus', { "fansID": user_id },
            function (date) { id_card_get[2].innerHTML = date.length; })
    }
    $.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}', { "userID": user_id },
        function (date) {
            top_header_name.innerHTML = date.username;
            localStorage.setItem('user_name', date.username);
            if (date.picture != null) {
                localStorage.setItem('user_img', date.picture);
            } else {
                localStorage.setItem('user_img', "https://linxun-1310915694.cos.ap-shanghai.myqcloud.com/toSkyNews/20220429192703_none.jpg");
            }
            user_name.innerHTML = date.username;
            let img = date.picture;
            if (img != null) {
                for (let n of user_img) {
                    n.src = img;
                }
            }
        })
} else {
    for (let n of haveland) {
        n.onclick = noland;
    }
    top_work.onclick =noland;
    top_works.onclick = noland;
    top_p.onclick =noland;
    top_header.style.display = "none";
    top_land.style.display = "block";
    small_cade2.style.display = "none";
    small_cade1.style.display = "block";
}
// 是否登录的限制判断
