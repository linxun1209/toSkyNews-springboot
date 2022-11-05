var food_find_input = document.getElementsByClassName("food_find_input")[0];
var food_find_bon = document.getElementsByClassName("food_find_bon")[0];
var user_id = localStorage.getItem('user_id');
var main = document.getElementById("main-right");
var red = document.getElementsByClassName("red");
var feedback_sort = document.getElementsByClassName("feedback-sort");
//重新newalert（）方法
var alertbox = document.getElementById("alert");
var alertfade = document.getElementById("alertfade");
var feedbackfade = document.getElementById("feedbackfade");
var alerttext = document.getElementById("alerttext");
var sortred = document.getElementsByClassName("sortred");
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

// 获取个人信息
document.getElementById('top_name').onclick = function () {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/myPage");
}
$.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}', { "userID": user_id },
    function (date) {
        document.getElementById('top_name').innerHTML = date.username;
        let img = date.picture;
        document.getElementById('top_img_header').src = img;
    })
// 获取个人信息
// 搜索遍历
food_find_bon.onclick = function () {
    let text = food_find_input.value;
    if(text==''){
        swal("请输入搜索内容！")
    }else{
        localStorage.setItem('search_input', text);
        window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/search");
    }
}
function findred1() {
    sortred[0].style.display = 'none';
    $.post('http://localhost:8080/ToSkyNews_war_exploded/alike/queryAllMessages',
        { "authorID": user_id },
        function (date) {
            sessionStorage.setItem('message_number', date.length);
            for (let i of date) {
                if (i.status == 0) {
                    sortred[0].style.display = 'block';
                    break;
                }
            }
        })
}
//判断点赞和收藏是否有未读消息
function findred2() {
    sortred[1].style.display = 'none';
    $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/queryUserFeedback',
        { "userID": user_id },
        function (date) {
            for (let i of date) {
                if (i.userOr == -1) {
                    sortred[1].style.display = 'block';
                    break;
                }
            }
        })
}
findred1();
findred2();
//判断反馈类是否有未读消息
// 搜索遍历
// 遍历反馈数据
// 遍历举报数据
function deleteallmessage() {
    swal({ 
        title: "确定清空该全部信息？?", 
        text: "你将无法恢复该些信息！", 
        type: "warning",
        showCancelButton: true, 
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定删除！", 
        cancelButtonText: "取消删除！",
        closeOnConfirm: false, 
        closeOnCancel: false	
        },
        function(isConfirm){ 
        if (isConfirm) { 
            swal("删除！", "你所选的信息已经被删除。","success"); 
            $.post('http://localhost:8080/ToSkyNews_war_exploded/alike/deleteAllMessagesByUserID',
            { "userID": user_id },
            function (date) {
                swal("清空成功！", "信息已被全部清空完毕","success"); 
                sessionStorage.setItem('message_page', 1);
                changepage1();
            })
        } else { 
            swal("取消！", "你已经取消删除:","error"); 
        } 
    });
}
sessionStorage.setItem('message_page', 1);
function changepage1() {
    $.post('http://localhost:8080/ToSkyNews_war_exploded/alike/queryMessagesPages',
        { "authorID": user_id, "page": sessionStorage.getItem('message_page') },
        function (date) {
            main.innerHTML = "<div class='main-right-top'>点赞与收藏<a href='javascript:;' onclick='deleteallmessage()'>清空该信息空间</a></div>";
            if (date.data.list.length == 0) {
                main.innerHTML += `
                    <div id="emptymeaage" style="padding-top: 200px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
                        <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
                        什么都没有呢 . . .
                    </div>
                `;
            } else {
                for (let n = 0; n < date.data.list.length; n++) {
                    let type = date.data.list[n].reside == "alike" ? '点赞了你的文章：' : "收藏了你的文章：";
                    main.innerHTML += `
                <div class="alike-a">
                <div class="red"></div>
                <img src="img/wzz/header.jpg" class="message-img" alt="">
                <div class="message-card">
                <div class="message-card-top">
                <a href="javascript:;" class="message-username">这是用户名</a>
                <span class="message-tpye">${type}</span>
                <span class="message-userid" style="display: none;">${date.data.list[n].userID}</span>
                <span class="message-postid" style="display: none;">${date.data.list[n].postsID}</span>
                <span class="messageid" style="display: none;">${date.data.list[n].messagesID}</span>
                </div>
                <div class="message-card-bon">
                <a class="message-postname" href="javascript:;">${date.data.list[n].postsName}</a>
                </div>
                </div>
                <div class="message-con">
                <button class="message-delete" ><i class="fa fa-trash-o" aria-hidden="true"></i></button></br>
                <span class="message-time">${date.data.list[n].times}</span>
                </div>
                </div>
                `;
                    let red = document.getElementsByClassName("red")[n];
                    let messageid = document.getElementsByClassName("messageid")[n].innerHTML;
                    if (date.data.list[n].status == 0) {
                        red.style.display = 'block';
                        $.post('http://localhost:8080/ToSkyNews_war_exploded/alike/updateMessagesStatus',
                            { "messagesID": messageid },
                            function (date) {
                                console.log(date);
                            });
                    } else {
                        red.style.display = 'none';
                    }
                }
                sessionStorage.setItem('message_number', date.data.totalPages[0]);
                sessionStorage.setItem('message_allpage', date.data.totalPages[1]);
                main.innerHTML += `
            <div class="main-right-bon">
                <button>最后一页</button>
                <a href="javascript:;"><i class="fa fa-arrow-right" aria-hidden="true"></i></a>
                <a id="rpages" href="javascript:;" style="background-color:#1890FF;color: white;">${sessionStorage.getItem('message_page')}</a>
                <a href="javascript:;"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                <span id="reportpage_number">共 ${date.data.totalPages[0]} 条消息， 共 ${date.data.totalPages[1]} 页</span>
            </div>
            `
                let main_right_bon = document.getElementsByClassName("main-right-bon")[0];
                let arrow = main_right_bon.getElementsByTagName("a");
                let button = main_right_bon.getElementsByTagName("button")[0];
                arrow[2].onclick = () => {
                    let n = parseInt(arrow[1].innerHTML);
                    if (n > 1) {
                        arrow[1].innerHTML = n - 1;
                        sessionStorage.setItem('message_page', arrow[1].innerHTML);
                        changepage1();
                    }
                }
                arrow[0].onclick = () => {
                    let n = parseInt(arrow[1].innerHTML);
                    if (n < parseInt(sessionStorage.getItem('message_allpage'))) {
                        arrow[1].innerHTML = n + 1;
                        sessionStorage.setItem('message_page', arrow[1].innerHTML);
                        changepage1();
                    }
                }
                button.onclick = () => {
                    sessionStorage.setItem('message_page', parseInt(sessionStorage.getItem('message_allpage')));
                    changepage1();
                }
                let userid = document.getElementsByClassName("message-userid");
                let postid = document.getElementsByClassName("message-postid");
                let messageid = document.getElementsByClassName("messageid");
                let img = document.getElementsByClassName("message-img");
                let username = document.getElementsByClassName("message-username");
                let messagedelete = document.getElementsByClassName("message-delete");
                let postname = document.getElementsByClassName("message-postname");
                for (let i=0; i<userid.length;i++) {
                    $.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
                        { "userID": userid[i].innerHTML},
                        function (date) {
                            img[i].src = date.picture;
                            username[i].innerHTML = date.username;
                        })
                    username[i].onclick = function () {
                        localStorage.setItem('otherUser_id', userid[i].innerHTML);
                        window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/otherUserPage");
                    }
                    postname[i].onclick = function () {
                        localStorage.setItem("article_id", postid[i].innerHTML);
                        window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${postid[i].innerHTML}`);
                    }
                    messagedelete[i].onclick = function () {
                        swal({ 
                            title: "你是否确定删除这条信息?", 
                            text: "你将无法恢复该条信息！", 
                            type: "warning",
                            showCancelButton: true, 
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "确定删除！", 
                            cancelButtonText: "取消删除！",
                            closeOnConfirm: false, 
                            closeOnCancel: false	
                            },
                            function(isConfirm){ 
                            if (isConfirm) { 
                                swal("删除！", "你所选的信息已经被删除。","success"); 
                                $.post('http://localhost:8080/ToSkyNews_war_exploded/alike/deleteMessages',
                                { "messagesID": messageid[i].innerHTML },
                                function (date) {
                                    swal(date.data, "你所选的用户信息已被删除。","success"); 
                                    changepage1();
                                })
                            } else { 
                                swal("取消！", "你已经取消删除:","error"); 
                            } 
                        });
                    }
                }
            }
        })
}
function changepage2() {
    $.post('http://localhost:8080/ToSkyNews_war_exploded/showPortsById',
        { "userID": user_id },
        function (date) {
            main.innerHTML = "<div class='main-right-top'>举报栏目<a href='javascript:;'>清空该信息空间</a></div>";
            if (date.length == 0) {
                main.innerHTML += `
                    <div id="emptymeaage" style="padding-top: 200px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
                        <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
                        什么都没有呢 . . .
                    </div>
                `;
            } else {
                for (let n = 0; n < date.length; n++) {
                    main.innerHTML += `
                <a class="feedback-a" href="javascript:;">
                    <button class="feedback-delete"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除</button>
                    <div class="feedback-a-text">${date[n].opinion}</div>
                    <div class="feedback-a-message">
                    <span class="mfeedbackid" style="display: none;">${date[n].reportID}</span>
                    <span >${date[n].times}</span>
                    类型：<span >${date[n].kind}</span>
                    状态：<span class="status">${date[n].status}</span>
                    </div>
                    </a>
                    `;
                }
                let status = document.getElementsByClassName("status");
                let feedback = document.getElementsByClassName("feedback-a");
                let feedbackdelete = document.getElementsByClassName("feedback-delete");
                let fid = document.getElementsByClassName("mfeedbackid");
                let fat = document.getElementsByClassName("feedback-a-text");
                for (let i = 0; i < status.length; i++) {
                    let n = status[i].innerHTML;
                    if (n == 0) {
                        status[i].innerHTML = "待回复"
                    } else if (n == -1) {
                        status[i].innerHTML = "举报成功";
                        status[i].style.color = '#0771f3';
                    } else {
                        status[i].innerHTML = "举报失败";
                        status[i].style.color = '#0771f3';
                    }
                    feedback[i].onclick = function () {
                        let id = fid[i].innerHTML;
                        let fa = fat[i].innerHTML;
                        if (status[i].innerHTML == "待回复") {
                            swal("您暂未收到回复！");
                        }
                        else if (status[i].innerHTML == "举报成功") {
                            Feedback_show();
                            document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                            document.getElementsByClassName("min_feedback_text")[1].innerHTML = '您的举报我们已接收，管理员已经对该文章进行处理！';
                        } else {
                            Feedback_show();
                            document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                            document.getElementsByClassName("min_feedback_text")[1].innerHTML = '您的举报我们已接收，管理员正对该文章进行观察！';
                        }
                    }
                    feedbackdelete[i].onmousemove = function () {
                        feedback[i].onclick = null;
                        this.onclick = function () {
                            let id = fid[i].innerHTML;
                            swal({ 
                                title: "你是否确定删除这条信息?", 
                                text: "你将无法恢复该条信息！", 
                                type: "warning",
                                showCancelButton: true, 
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确定删除！", 
                                cancelButtonText: "取消删除！",
                                closeOnConfirm: false, 
                                closeOnCancel: false	
                                },
                                function(isConfirm){ 
                                if (isConfirm) { 
                                    swal("删除！", "你所选的信息已经被删除。","success"); 
                                    $.post('http://localhost:8080/ToSkyNews_war_exploded/deleteReports',
                                    { "reportID": id },
                                    function (date) {
                                        swal(date.data, "你所选的用户信息已被删除。","success");
                                        changepage2();
                                    })
                                } else { 
                                    swal("取消！", "你已经取消删除:","error"); 
                                } 
                            });
                        }
                    }
                    feedbackdelete[i].onmouseout = function () {
                        feedback[i].onclick = function () {
                            let id = fid[i].innerHTML;
                            let fa = fat[i].innerHTML;
                            if (status[i].innerHTML == "待回复") {
                                swal("您暂未收到回复！");
                            }
                            else if (status[i].innerHTML == "举报成功") {
                                Feedback_show();
                                document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                                document.getElementsByClassName("min_feedback_text")[1].innerHTML = '您的举报我们已接收，管理员已经对该文章进行处理！';
                            } else {
                                Feedback_show();
                                document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                                document.getElementsByClassName("min_feedback_text")[1].innerHTML = '您的举报我们已接收，管理员正对该文章进行观察！';
                            }
                        }
                    }
                }
            }
        })
}
// 遍历反馈数据
function changepage3() {
    $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/queryUserFeedback',
        { "userID": user_id },
        function (date) {
            main.innerHTML = "<div class='main-right-top'>反馈栏目<a href='javascript:;'>清空该信息空间</a></div>";
            if (date.length == 0) {
                main.innerHTML += `
                    <div id="emptymeaage" style="padding-top: 200px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
                        <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
                        什么都没有呢 . . .
                    </div>
                `;
            } else {
                for (let n = 0; n < date.length; n++) {
                    main.innerHTML += `
                <a class="feedback-a" href="javascript:;">
                <div class="red"></div>
                <button class="feedback-delete"><i class="fa fa-trash-o" aria-hidden="true"></i>删除</button>
                <div class="feedback-a-text">${date[n].opinion}</div>
                    <div class="feedback-a-message">
                    <span class="mfeedbackid" style="display: none;">${date[n].feedbackID}</span>
                    <span class="mfeedbackt" style="display: none;">${date[n].managerContent}</span>
                        <span >${date[n].times}</span>
                        类型：<span >${date[n].kind}</span>
                        状态：<span class="status">${date[n].userOr}</span>
                    </div>
                </a>
                `;
                }
                let status = document.getElementsByClassName("status");
                let feedback = document.getElementsByClassName("feedback-a");
                let feedbackdelete = document.getElementsByClassName("feedback-delete");
                let fid = document.getElementsByClassName("mfeedbackid");
                let mft = document.getElementsByClassName("mfeedbackt");
                let fat = document.getElementsByClassName("feedback-a-text");
                for (let i = 0; i < status.length; i++) {
                    let n = status[i].innerHTML;
                    if (n == 0) {
                        status[i].innerHTML = "待反馈"
                    } else if (n == -1) {
                        status[i].innerHTML = "已反馈";
                        red[i].style.display = 'block';
                    } else {
                        status[i].innerHTML = "已反馈";
                        status[i].style.color = '#0771f3';
                    }
                    feedback[i].onclick = function () {
                        let id = fid[i].innerHTML;
                        let ft = mft[i].innerHTML;
                        let fa = fat[i].innerHTML;
                        if (ft == 'null') {
                            swal("您暂未收到回复！");
                        }
                        else {
                            $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/updateUserOr',
                                { "feedbackID": id },
                                function (date) {
                                    changepage3();
                                    findred2();
                                })
                            Feedback_show();
                            document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                            document.getElementsByClassName("min_feedback_text")[1].innerHTML = ft;
                        }
                    }
                    feedbackdelete[i].onmousemove = function () {
                        feedback[i].onclick = null;
                        this.onclick = function () {
                            let id = fid[i].innerHTML;
                            swal({ 
                                title: "你是否确定删除这条信息?", 
                                text: "你将无法恢复该条信息！", 
                                type: "warning",
                                showCancelButton: true, 
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "确定删除！", 
                                cancelButtonText: "取消删除！",
                                closeOnConfirm: false, 
                                closeOnCancel: false	
                                },
                                function(isConfirm){ 
                                if (isConfirm) { 
                                    swal("删除！", "你所选的信息已经被删除。","success"); 
                                    $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/deleteFeedback',
                                            { "feedbackID": id },
                                            function (date) {
                                                swal(date.data, "你所选的用户信息已被删除。","success");
                                                findred2();
                                                changepage3();
                                            })
                                } else { 
                                    swal("取消！", "你已经取消删除:","error"); 
                                } 
                            });
                        }
                    }
                    feedbackdelete[i].onmouseout = function () {
                        feedback[i].onclick = function () {
                            let id = fid[i].innerHTML;
                            let ft = mft[i].innerHTML;
                            let fa = fat[i].innerHTML;
                            if (ft == 'null') {
                                swal("您暂未收到回复！");
                            }
                            else {
                                $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/updateUserOr',
                                    { "feedbackID": id },
                                    function (date) {
                                        findred2();
                                        changepage3();
                                    })
                                Feedback_show();
                                document.getElementsByClassName("min_feedback_text")[0].innerHTML = fa;
                                document.getElementsByClassName("min_feedback_text")[1].innerHTML = ft;
                            }
                        };
                    }
                }
            }
        })
}
// 遍历举报数据
changepage1();
// 反馈展示
var feedback = document.getElementById("feedback");
var feedback_main = document.getElementById("feedback_main");
function Feedback_show() {
    feedback.style.display = "block";
    feedback.style.opacity = "1";
    feedback.classList.add("fade");
}
function Feedback_down() {
    feedback.style.display = "none";
    feedback.style.opacity = "0";
    feedback.classList.remove("fade");
}
feedback.onclick = Feedback_down;
feedback_main.onmousemove = function () {
    feedback.onclick = null;
}
feedback_main.onmouseout = function () {
    feedback.onclick = Feedback_down;
}
function back() {
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/user_main");
}
feedback_sort[0].style.color = "white";
feedback_sort[0].style.backgroundColor = "#7fb0eb";
function changeall(n) {
    if (n == 0) { changepage1(); findred1(); }
    if (n == 1) { changepage2(); }
    if (n == 2) { changepage3(); findred2(); }
}
var feedback_sortn = 0;
for (let i in feedback_sort) {
    feedback_sort[i].onclick = function () {
        feedback_sort[i].style.color = "white";
        feedback_sort[i].style.backgroundColor = "#7fb0eb";
        changeall(i);
        if (feedback_sortn != i) {
            feedback_sort[feedback_sortn].style.color = "#888888";
            feedback_sort[feedback_sortn].style.backgroundColor = "white";
            feedback_sortn = i;
        }
    }
}
