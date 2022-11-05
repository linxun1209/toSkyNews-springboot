var feedback = document.getElementById("feedback");
var feedback_main = document.getElementById("feedback_main");
var feedback_send = document.getElementsByClassName("feedback_send")[0];
var feedback_text = document.getElementsByClassName("feedback_text")[0];
function Feedback_show() {
    feedback.style.display = "block";
    feedback.style.opacity = "1";
    feedback.classList.add("fade");
}
function Feedback_down() {
    feedback.style.display = "none";
    feedback.style.opacity = "0";
    feedback.classList.remove("fade");
    feedback_send.value = null;
    feedback_text.value = null;
}
feedback.onclick = Feedback_down;
feedback_main.onmousemove = function () {
    feedback.onclick = null;
}
feedback_main.onmouseout = function () {
    feedback.onclick = Feedback_down;
}
feedback_send.onclick = function () {
    feedback_send.style.border = "1.5px solid #1682e6";
    feedback_text.style.border = "1.5px solid gainsboro";
}
feedback_text.onclick = function () {
    feedback_send.style.border = "1.5px solid gainsboro";
    feedback_text.style.border = "1.5px solid #1682e6";
}
var feedback_type = document.getElementsByName("feedback_type");
var tofeedback = document.getElementById("tofeedback");
var feedbackarray = ['政治相关', '内容侵权', '内容涉黄', '其他'];
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
tofeedback.onclick = function () {
    let typen;
    let type;
    let send = feedback_send.value;
    let text = feedback_text.value;
    let postid = localStorage.getItem('article_id');
    let time = getTime();
    let user_id = localStorage.getItem('user_id');
    console.log(time)
    for (let i in feedback_type) {
        if (feedback_type[i].checked) {
            typen = i;
        }
    }
    if (typen == undefined) {
        swal("请填写完整内容！");
    } else {
        type = feedbackarray[typen];
    }
    if (type != undefined && send != '' && text != '') {
        $.post('http://localhost:8080/ToSkyNews_war_exploded/addReport',
            { "userID": user_id, "postsID": postid, "kind": type, "opinion": text, "contact": send, "times": time },
            function (date) {
                if (date.message == 'success') {
                    swal('举报发出！');
                }
                console.log(date);
                Feedback_down();
            })
    }
}

//举报栏目侧边栏
var four;
function Topfun() {
    four = setInterval(FourscrollBy, 8);
}
function FourscrollBy() {
    if (document.documentElement && document.documentElement.scrollTop) {
        if (document.documentElement.scrollTop <= 0) {
            clearInterval(four);
        } else {
            window.scrollBy(0, -30);
        }
    } else {
        if (document.body.scrollTop <= 0) {
            clearInterval(four);
        } else {
            window.scrollBy(0, -30);
        }
    }
}
var toolItema = document.querySelectorAll('.tool_item_a');
toolItema[2].addEventListener('click', function () {
    FourscrollBy();
})
//