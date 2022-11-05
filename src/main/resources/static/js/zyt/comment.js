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
var comend = document.getElementById("comend");
for (let i of user_imgs) {
    i.src = user_img;
}
window.addEventListener('scroll', function () {
    let showcommit = document.getElementsByClassName("showcommit")[0]
    let top = document.getElementsByClassName("recos1_remark_text")[0].getBoundingClientRect().top;
    if (top < 0) {
        showcommit.classList.add("down");
        showcommit.style.bottom = '0';
    } else {
        showcommit.classList.remove("down");
        showcommit.style.bottom = '-100px';
    }
})
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
        let publisher_id = parseInt(date.reside);
        sessionStorage.setItem('publisher_id', parseInt(date.reside));
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

            })
    })
publisher_id = sessionStorage.getItem('publisher_id');
publisher_name = sessionStorage.getItem('publisher_name');
function touserpage(number) {
    if (number != user_id) {
        localStorage.setItem('otherUser_id', number);
        window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/otherUserPage");
    } else {
        window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/myPage");
    }
}
// 返回帖子评论数
var recos1_title = document.getElementsByClassName('recos1_title')[0];
function comnumber() {
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount",
        data: {
            postsID: article_id,
        },
        success: function (data) {
            recos1_title.innerHTML = `共有 <span>${data}</span> 条评论`
            sessionStorage.setItem("comall", data);
        },
        error: function (err) {
            console.log(err);
            console.log('哎呀，出错了');
        }
    })
}
comnumber();
sessionStorage.setItem("comnumber", 5);
window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    let that = this;
    if (scrollHeight - 1 <= scrollTop + windowHeight) {
        let all = sessionStorage.getItem("comall");
        let now = sessionStorage.getItem("comnumber");
        console.log(all);
        console.log(now);
        if (parseInt(now) < parseInt(all)) {
            setTimeout(function () {
                sessionStorage.setItem("comnumber", parseInt(now) + 3);
                remarkShow();
            }, 1000);
        }
        else {
            comend.style.display = "block";
        }
    }
};
// 发布评论
var remark_content_username = this.document.querySelector('.remark_content_username');
var remark_hide_like_context = this.document.querySelector('.remark_hide_like_context');
var commentID = this.document.querySelector('.commentID');
var markerID = this.document.querySelector('.markerID');
var postsID = this.document.querySelector('.postsID');
var remark_time = this.document.querySelector('.remark_time');
var remark_area = this.document.querySelector('#remark_area');
var tosay = this.document.querySelector('.tosay');
var all_commit_1 = this.document.querySelector('.all_commit_1');
var showcommit_area = document.getElementById('showcommit_area');
var showcommit_tosay = document.getElementsByClassName('showcommit_tosay')[0];
function tosayall(event1, event2) {
    event1.onclick = function () {
        event1.style.height = '61px';
        event1.style.backgroundColor = 'white';
        event2.style.height = '73px';
        event1.style.border = '#888888 2px solid';
    }
    event1.onmouseout = function () {
        event1.style.backgroundColor = 'rgb(242, 242, 242)';
        document.onclick = function () {
            event1.style.height = '41px';
            event1.style.backgroundColor = 'rgb(242, 242, 242)';
            event2.style.height = '53px';
            event1.style.border = 'rgb(242, 242, 242) 2px solid ';
        }
    }
    event1.onmousemove = function () {
        document.onclick = null;
        event1.style.border = '#888888 2px solid';
        event1.style.backgroundColor = 'white';
    }
}
tosayall(remark_area, tosay);
tosayall(showcommit_area, showcommit_tosay);
tosay.onclick = function () {
    if (remark_area.value == '') {
        swal('你还没有输入内容！')
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
                commentName: user_name,
            },
            success: function (data) {
                if (data.message == '类型不能为空') {
                    swal('请输入评论内容！');
                }
                remark_area.value = '';
                remarkShow();
                comnumber();
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
}
showcommit_tosay.onclick = function () {
    if (showcommit_area.value == '') {
        swal('你还没有输入内容！')
    } else {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/comments/addComment",
            data: {
                contain: showcommit_area.value,
                commentTime: getTime(),
                postsID: article_id,
                makerID: user_id,
                picture: user_img,
                authorID: publisher_id,
                commentName: user_name,
            },
            success: function (data) {
                if (data.message == '类型不能为空') {
                    swal('请输入评论内容！');
                }
                showcommit_area.value = '';
                remarkShow();
                comnumber();
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
}
function sondelete(event) {
    let reviewsID = event.parentNode.parentNode.parentNode.getElementsByClassName('comson-a-reviewid')[0].innerHTML;
    let makerID = event.parentNode.parentNode.parentNode.getElementsByClassName('comson-a-userid')[0].innerHTML;
    let soncom = event.parentNode.parentNode.parentNode.parentNode;
    if (makerID == user_id || user_id == publisher_id) {
        swal({
            title: "您确定删除该条评论？",
            text: "你将无法恢复该评论！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除！",
            cancelButtonText: "取消删除！",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    swal("删除！", "你所选的评论已经被删除", "success");
                    $.post('http://localhost:8080/ToSkyNews_war_exploded/comments/deleteReviewsByID', { "reviewsID": reviewsID },
                        function (date) {
                            console.log(date);
                            showcomson(soncom);
                        })
                } else {
                    swal("取消！", "你已经取消删除:", "error");
                }
            });
    } else {
        swal("你没有权限删除改评论！");
    }
}
function sonreply(event) {
    let reviewsID = event.parentNode.parentNode.parentNode.getElementsByClassName('comson-a-reviewid')[0].innerHTML;
    let makerID = event.parentNode.parentNode.parentNode.getElementsByClassName('comson-a-userid')[0].innerHTML;
    let soncom = event.parentNode.parentNode.parentNode.parentNode;
    let sayshow = event.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('sayshow')[0];
    let name = event.parentNode.parentNode.getElementsByClassName("comson-name")[0].innerHTML;
    if (sayshow.innerHTML == '') {
        sayshow.innerHTML = `
            <div class="all_commit_say">
                <img src="${user_img}" alt="" class="user_img">
                <button class="comson-tosay">回复</button>
                <textarea name="" class="comson-tosay-area" placeholder="对 ${name} 的评论进行友善的回复..."></textarea>
            </div>
        `;
        let comson_tosay = sayshow.getElementsByClassName('comson-tosay')[0];
        let comsonarea = sayshow.getElementsByClassName("comson-tosay-area")[0];
        tosayall(comsonarea, comson_tosay);
        comson_tosay.onclick = function () {
            let commentID = this.parentNode.parentNode.parentNode.getElementsByTagName('span')[0].innerHTML;
            let childid = event.parentNode.parentNode.parentNode.getElementsByTagName('span')[1].innerHTML;
            let itsson = this.parentNode.parentNode.parentNode.getElementsByClassName('comson')[0];
            if ( comsonarea.value=='') {
                swal('请输入评论内容！');
            }else{
                $.post('http://localhost:8080/ToSkyNews_war_exploded/comments/addReviews',
                { "parentID": commentID, "contain": comsonarea.value, "makerID": user_id, "childID": childid },
                function (date) {
                    comsonarea.value='';
                    showcomson(itsson);
                })
            }
        }
    } else {
        sayshow.innerHTML = '';
    }
}
function showcomson(event) {
    let commentID_a = event.parentNode.getElementsByClassName("commentID")[0].innerHTML;
    let comsonnumber = event.parentNode.getElementsByClassName("comsonnumber")[0];
    $.post('http://localhost:8080/ToSkyNews_war_exploded/comments/queryReviewsByParentID', { "parentID": commentID_a },
        function (date) {
            let promise = new Promise((resolve, reject) => {
                event.innerHTML = '';
                resolve();
            })
            promise.then(() => {
                comsonnumber.innerHTML = date.data.这个父评论下子评论总数[0];
                for (let n in date.data.子评论们) {
                    let back = date.data.子评论们[n].childName == date.data.被回复的子评论的用户名[n] ? '' : ` 回复 ${date.data.被回复的子评论的用户名[n]}`;
                    event.innerHTML += `
                        <div class="comson-a">
                            <img src="${date.data.子评论们[n].childPicture}" alt="">
                            <span style="display: none;" class="comson-a-userid">${date.data.子评论们[n].makerID}</span>
                            <span style="display: none;" class="comson-a-reviewid">${date.data.子评论们[n].reviewsID}</span>
                            <div class="comson-main">
                                <a href="javascript:;" onclick='touserpage(${date.data.子评论们[n].makerID})' class="comson-name">${date.data.子评论们[n].childName}</a> :<span style='font-size: 13px;'>${back}</span>
                                <div class="comson-text">
                                    ${date.data.子评论们[n].contain}
                                </div>
                                <div class="comson-ton">
                                    <span class="comson-time">${date.data.子评论们[n].times}</span>
                                    <a href="javascript:;" onclick='sonreply(this)' class="comson_reply">回复</a>
                                    <a class="comson_delete" onclick='sondelete(this)' href="javascript:;"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    `
                }
                if (date.data.这个父评论下子评论总数[0] > 2) {
                    event.innerHTML += `<a href="javascript:;" onclick='fadecomson(this.parentNode)' class="soncommore">收起回复...</a>`
                }
            })
        })
}
function fadecomson(event) {
    let commentID_a = event.parentNode.getElementsByClassName("commentID")[0].innerHTML;
    let comsonnumber = event.parentNode.getElementsByClassName("comsonnumber")[0];
    console.log(commentID_a);
    $.post('http://localhost:8080/ToSkyNews_war_exploded/comments/queryReviewsByParentID', { "parentID": commentID_a },
        function (date) {
            let promise = new Promise((resolve, reject) => {
                event.innerHTML = '';
                resolve();
            })
            promise.then(() => {
                comsonnumber.innerHTML = date.data.这个父评论下子评论总数[0];
                let sonnum = 2;
                if (date.data.这个父评论下子评论总数[0] < 2) {
                    sonnum = date.data.这个父评论下子评论总数[0];
                }
                for (let n = 0; n < sonnum; n++) {
                    let back = date.data.子评论们[n].childName == date.data.被回复的子评论的用户名[n] ? '' : ` 回复 ${date.data.被回复的子评论的用户名[n]}`;
                    event.innerHTML += `
                        <div class="comson-a">
                            <img src="${date.data.子评论们[n].childPicture}" alt="">
                            <span style="display: none;" class="comson-a-userid">${date.data.子评论们[n].makerID}</span>
                            <span style="display: none;" class="comson-a-reviewid">${date.data.子评论们[n].reviewsID}</span>
                            <div class="comson-main">
                                <a href="javascript:;" onclick='touserpage(${date.data.子评论们[n].makerID})'  class="comson-name">${date.data.子评论们[n].childName}</a> :<span style='font-size: 13px;'>${back}</span>
                                <div class="comson-text">
                                    ${date.data.子评论们[n].contain}
                                </div>
                                <div class="comson-ton">
                                    <span class="comson-time">${date.data.子评论们[n].times}</span>
                                    <a href="javascript:;" onclick='sonreply(this)' class="comson_reply">回复</a>
                                    <a class="comson_delete" onclick='sondelete(this)' href="javascript:;"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    `
                }
                if (date.data.这个父评论下子评论总数[0] > 2) {
                    event.innerHTML += `<a href="javascript:;" onclick='showcomson(this.parentNode)' class="soncommore">观看更多回复...</a>`
                }
            })
        })
}
// 展示某个帖子下面所有评论
var all_commit = document.getElementsByClassName("all_commit")[0];
var all_commit_name = this.document.querySelector('.all_commit_name');
var all_commit_text = this.document.querySelector('.all_commit_text');
var same_remark = this.document.querySelector('.same_remark');
function allwork() {
    let all_commit_name = document.getElementsByClassName("all_commit_name");
    for (let i = 0; i < all_commit_name.length; i++) {
        let all_commit_a = document.getElementsByClassName("all_commit_a");
        let sayshow = document.getElementsByClassName("sayshow");
        let com_reply = document.getElementsByClassName("com_reply");
        let bigdelete = document.getElementsByClassName("com_delete");
        let comson = document.getElementsByClassName("comson");
        let comsonnumber = document.getElementsByClassName("comsonnumber");
        let makerID_a = document.getElementsByClassName("makerID");
        let commentID_a = document.getElementsByClassName("commentID");
        all_commit_name[i].onclick = function () {
            touserpage(makerID_a[i].innerHTML);
        }
        bigdelete[i].onclick = function () {
            if (makerID_a[i].innerHTML == user_id || user_id == publisher_id) {
                swal({
                    title: "您确定删除该条评论？",
                    text: "你将无法恢复该评论！",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "确定删除！",
                    cancelButtonText: "取消删除！",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            swal("删除！", "你所选的评论已经被删除", "success");
                            $.post('http://localhost:8080/ToSkyNews_war_exploded/comments/deleteComment', { "commentID": commentID_a[i].innerHTML },
                                function (date) {
                                    swal("删除成功！", "你所选的评论被删除。", "success");
                                    remarkShow();
                                    comnumber();
                                })
                        } else {
                            swal("取消！", "你已经取消删除:", "error");
                        }
                    });
            } else {
                swal("该条评论您没有权限删除！");
            }
        }
        fadecomson(comson[i]);
        com_reply[i].onclick = function () {
            let name = document.getElementsByClassName('all_commit_name')[i].innerText;
            if (sayshow[i].innerHTML == '') {
                sayshow[i].innerHTML = `
                    <div class="all_commit_say">
                        <img src="${user_img}" alt="" class="user_img">
                        <button onclick="tosaysoncom(this)" class="comson-tosay">回复</button>
                        <textarea name="" class="comson-tosay-area" placeholder="对 ${name} 的评论进行友善的回复..."></textarea>
                    </div>
                `;
                let comson_tosay = sayshow[i].getElementsByClassName("comson-tosay")[0];
                let comsonarea = sayshow[i].getElementsByClassName("comson-tosay-area")[0];
                tosayall(comsonarea, comson_tosay);
                comson_tosay.onclick = function () {
                    let commentID = this.parentNode.parentNode.parentNode.getElementsByTagName('span')[0].innerHTML;
                    let itsson = this.parentNode.parentNode.parentNode.getElementsByClassName('comson')[0];
                    if ( comsonarea.value=='') {
                        swal('请输入评论内容！');
                    }else{
                        $.post('http://localhost:8080/ToSkyNews_war_exploded/comments/addReviews',
                            { "parentID": commentID, "contain": comsonarea.value, "makerID": user_id },
                            function (date) {
                                comsonarea.value='';
                                showcomson(itsson);
                            })
                    }
                }
            } else {
                sayshow[i].innerHTML = '';
            }
        }
    }
}
function remarkShow() {
    let promise = new Promise((resolve, reject) => {
        $.ajax({
            dataType: 'json',
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentByPosts",
            data: {
                postsID: article_id,
            },
            success: function (data) {
                var remarkCount = data.length;
                // remark_tubiao_text.innerHTML = remarkCount;
                console.log(data);
                all_commit.innerHTML = ' ';
                let numbernow;
                if (data.length > sessionStorage.getItem("comnumber")) {
                    numbernow = sessionStorage.getItem("comnumber");
                } else {
                    numbernow = data.length;
                    comend.style.display = "block";
                }
                for (let i = 0; i < numbernow; i++) {
                    all_commit.innerHTML += `
                <div class="all_commit_a">
                    <div class="all_commit_top">
                        <img src="${data[i].picture}" alt="" class="all_commit_img">
                        <a href="javascript:;" class="all_commit_name">${data[i].commentName}</a>
                    </div>
                    <div class="all_commit_text">${data[i].contain}</div>
                    <span style="display: none;" class="commentID">${data[i].commentID}</span>
                    <span style="display: none;" class="authorID">${data[i].authorID}</span>
                    <span style="display: none;" class="makerID">${data[i].makerID}</span>
                    <div class="all_commit_bon">
                        <div class="all_commit_time">${data[i].commentTime}</div>
                        <div class="all_commit_number"><span class="comsonnumber">0</span>条回复</div>
                        <a class="com_reply" href="javascript:;">回复</a>
                        <a class="com_delete" href="javascript:;"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                    </div>
                    <div class="comson"></div>
                    <div class="sayshow"></div>
                </div>
                    `;
                }
                same_remark.innerHTML = all_commit.innerHTML;
                resolve();
            },
            error: function (err) {
                console.log(err);
            }
        })
    })
    promise.then(() => {
        allwork();
    })
}
remarkShow();