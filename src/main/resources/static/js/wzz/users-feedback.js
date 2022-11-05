var tbody = document.getElementsByClassName("feedback_main")[0].getElementsByTagName("tbody")[0];
var fa = document.getElementsByName("feedback_a");
var feedback_fade = document.getElementsByClassName("feedback_fade")[0];
var fade = document.getElementsByClassName("fade")[2];
var feedback_back_max = document.getElementsByClassName('feedback_back_max')[0];
//重新newalert（）方法
var alertbox = document.getElementById("alert");
var alertfade = document.getElementById("alertfade");
var feedbackfade = document.getElementById("feedbackfade");
var alerttext = document.getElementById("alerttext");
var backfade = document.getElementById("backfade");
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
//点击全选
function falltrue() {
    let feedall = document.getElementsByName("feedback_all")[0];
    let fa = document.getElementsByName("feedback_a");
    if (feedall.checked) {
        for (let n of fa) {
            n.checked = true;
        }
    }
    else if (feedall.checked == false) {
        for (let n of fa) {
            n.checked = false;
        }
    }
}
//点击全选
// 展示页数，个数
$.get('http://localhost:8080/ToSkyNews_war_exploded/collections/queryFeedbackCount',
    function (date) {
        let pages = date;
        let pagen = pages % 10 != 0 ? parseInt(pages / 10) + 1 : parseInt(pages / 10);
        sessionStorage.setItem('fpagen', pagen);
    })
// 展示页数，个数

var articlall = document.getElementsByName("feedback_all")[0];
function feedbackdelete() {
    var fa = document.getElementsByName("feedback_a");
    swal({
        title: "你确定删除选中反馈信息?",
        text: "你将无法恢复该反馈信息！",
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
                for (let i in fa) {
                    if (fa[i].checked) {
                        var id = fa[i].parentNode.parentNode.children[1].innerHTML;
                        $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/deleteFeedback',
                            { "feedbackID": id },
                            function (date) {
                                if (sessionStorage.getItem("feedbackfind") == "1") {
                                    on_feedback();
                                } else {
                                    allbegin();
                                }
                            })
                    }
                }
                swal("删除！", "你所勾选的反馈信息被删除。", "success");
            } else {
                swal("取消！", "你已经取消删除:", "error");
            }
        });
}
// 展示页数，个数
var feedback_b = document.getElementsByClassName('feedback_b')[0];
var aaa = feedback_b.getElementsByTagName("a");
var fpages = document.getElementById('fpages');
var apage = feedback_b.getElementsByTagName("input")[0];
// 改变页数
aaa[2].onclick = () => {
    let n = parseInt(fpages.innerText);
    let apage = feedback_b.getElementsByTagName("input")[0];
    if (n > 1 && n < 20) {
        fpages.innerText = n - 1;
        apage.value = fpages.innerText;
        allbegin();
    }
}
aaa[0].onclick = () => {
    let nn = parseInt(fpages.innerText);
    if (nn < sessionStorage.getItem('fpagen')) {
        let apage = feedback_b.getElementsByTagName("input")[0];
        fpages.innerText = nn + 1;
        apage.value = fpages.innerText;
        allbegin();
    }
}
// 改变页数
var feedpage_number = document.getElementById('feedpage_number');
// 遍历全部数据
function allbegin() {
    let apage = feedback_b.getElementsByTagName("input")[0];
    let p = apage.value;
    let page = (p - 1) * 10;
    if (0 < p && p <= parseInt(sessionStorage.getItem('fpagen'))) {
        fpages.innerText = p;
        $.get('http://localhost:8080/ToSkyNews_war_exploded/collections/queryFeedbackCount',
            function (date) {
                let pages = date;
                let pagen = pages % 10 != 0 ? parseInt(pages / 10) + 1 : parseInt(pages / 10);
                feedpage_number.innerHTML = "总共有" + pages + "个反馈,总共" + pagen + "页";
                sessionStorage.setItem('fpagen', pagen);
            })
        $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/queryAllFeedback',
            { 'column': page, 'total': "10" },
            function (date) {
                let tbody = document.getElementsByClassName("feedback_main")[0].getElementsByTagName("tbody")[0];
                tbody.innerHTML = null;
                if (date.length == 0) {
                    tbody.innerHTML = `   
                        <div id="emptymeaage" style="padding-top: 200px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
                            <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
                            什么都没有呢 . . .
                        </div>`;
                } else {
                    for (let n = 0; n < date.length; n++) {
                        let status;
                        if (date[n].userOr == 0) {
                            status = "未回复"
                        } else if (date[n].userOr == -1) {
                            status = "用户未接收";
                        } else {
                            status = "用户已接收";
                        }
                        tbody.innerHTML += `
                <tr>
                    <td class='fms'><input type='checkbox' name='feedback_a' value='all'></td>
                    <td class="fms none">${date[n].feedbackID}</td>
                    <td class="fms none">${date[n].userID}</td>
                    <td class="fms">${date[n].times}</td>
                    <td class="fms">${date[n].kind}</td>
                    <td class="fml">${date[n].contact}</td>
                    <td class="fml">${date[n].opinion}</td>
                    <td class="fml">${date[n].managerContent}</td>
                    <td class="fms">${status}</td>
                    <td class="fml">
                        <a class="f_look" href="users-feedback.html" target="_blank"><i class="fa fa-book" aria-hidden="true"></i>查看内容</a>
                        <a class="f_reply" href="javascript:;"><i class="fa fa-commenting-o" aria-hidden="true"></i>回复</a>
                    </td>
                </tr>
                `;
                        let ms = document.getElementsByClassName("fms");
                        let ml = document.getElementsByClassName("fml");
                        for (let i of ms) {
                            if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                                i.innerHTML = " ";
                            }
                        }
                        for (let i of ml) {
                            if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                                i.innerHTML = " ";
                            }
                        }
                    }
                    //获取一页的用户信息
                    allchange2();
                }
            })
    } else if (apage.value == "" || sessionStorage.getItem('fpagen') == null) { }
    else {
        swal("请输入合理的页数！");
    }
}
// 遍历全部数据
// 空位判断
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "" || obj.length == 0) {
        return true;
    } else {
        return false;
    }
}
function on_feedback() {
    sessionStorage.setItem("feedbackfind", '1');
    $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/queryManagerOrFeedback',
        function (date) {
            let tbody = document.getElementsByClassName("feedback_main")[0].getElementsByTagName("tbody")[0];
            if (date.length == 0) {
                tbody.innerHTML = `   
                    <div id="emptymeaage" style="padding-top: 200px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
                        <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
                        什么都没有呢 . . .
                    </div>`;
            } else {
                tbody.innerHTML = null;
                for (let n = 0; n < date.length; n++) {
                    let status;
                    if (date[n].userOr == 0) {
                        status = "未回复"
                    } else if (date[n].userOr == -1) {
                        status = "用户未接收";
                    } else {
                        status = "用户已接收";
                    }
                    tbody.innerHTML += `
                <tr>
                    <td class='fms'><input type='checkbox' name='feedback_a' value='all'></td>
                    <td class="fms none">${date[n].feedbackID}</td>
                    <td class="fms none">${date[n].userID}</td>
                    <td class="fms">${date[n].times}</td>
                    <td class="fms">${date[n].kind}</td>
                    <td class="fml">${date[n].contact}</td>
                    <td class="fml">${date[n].opinion}</td>
                    <td class="fml">${date[n].managerContent}</td>
                    <td class="fms">${status}</td>
                    <td class="fml">
                        <a class="f_look" href="users-feedback.html" target="_blank"><i class="fa fa-book" aria-hidden="true"></i>查看内容</a>
                        <a class="f_reply" href="javascript:;"><i class="fa fa-commenting-o" aria-hidden="true"></i>回复</a>
                    </td>
                </tr>
                `;
                    let ms = document.getElementsByClassName("fms");
                    let ml = document.getElementsByClassName("fml");
                    for (let i of ms) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                    for (let i of ml) {
                        if (i.innerHTML == "null" || i.innerHTML == "undefined") {
                            i.innerHTML = " ";
                        }
                    }
                }
                //获取一页的用户信息
                allchange2();
            }
        })
    feedback_b.style.display = 'none';
    feedback_back_max.style.display = 'block';
}
var feedback_text = document.getElementById('feedback_text');
var feedback_reply = document.getElementById('feedback_reply');
// 管理员回复功能
function feedback_to() {
    let id = sessionStorage.getItem('feedbackid');
    let text = feedback_reply.value;
    if (!isEmpty(text)) {
        $.post('http://localhost:8080/ToSkyNews_war_exploded/collections/updateUserToOne',
            { 'feedbackID': id, 'managerContent': text },
            function (date) {
                console.log(date);
                if (date.message == 'success') {
                    swal("管理员回复成功", "回复成功", "success");
                    feedback_fade.style.top = "-500px";
                    backfade.classList.remove('fade');
                    backfade.style.display = 'none';
                    if (sessionStorage.getItem("feedbackfind") == "1") {
                        on_feedback();
                    } else {
                        allbegin();
                    }
                } else {
                    swal("管理员回复失败！", "error");
                }
            })
    } else {
        swal("请填写回复内容！");
    }
}
// 管理员回复功能
// 遍历所有的功能
function allchange2() {
    let look = document.getElementsByClassName("f_look");
    let reply = document.getElementsByClassName("f_reply");
    for (let n of look) {
        n.onclick = function () {
            let feedbackID = n.parentNode.parentNode.children[1].innerHTML;
            // let time=n.parentNode.parentNode.children[2].innerHTML;
            let times = n.parentNode.parentNode.children[3].innerHTML;
            let type = n.parentNode.parentNode.children[3].innerHTML;
            let kind = n.parentNode.parentNode.children[4].innerHTML;
            let opinion = n.parentNode.parentNode.children[6].innerHTML;
            let managerContent = n.parentNode.parentNode.children[7].innerHTML;
            localStorage.setItem("f_feedbackID", feedbackID);
            localStorage.setItem("f_times", times);
            localStorage.setItem("f_type", type);
            localStorage.setItem("f_kind", kind);
            localStorage.setItem("f_opinion", opinion);
            localStorage.setItem("f_managerContent", managerContent);
        }
    }
    for (let i in reply) {
        reply[i].onclick = function () {
            backfade.classList.add('fade');
            backfade.style.display = 'block';
            feedback_fade.style.top = "20vh";
            feedback_text.innerHTML = this.parentNode.parentNode.children[6].innerHTML;
            feedback_reply.innerHTML = this.parentNode.parentNode.children[7].innerHTML == " " ? "" : this.parentNode.parentNode.children[7].innerHTML;
            sessionStorage.setItem('feedbackid', this.parentNode.parentNode.children[1].innerHTML);
        }
    }
}
// 遍历所有的功能
fade.onclick = function () {
    feedback_fade.style.top = "-500px";
    backfade.classList.remove('fade');
    backfade.style.display = 'none';
}
var feedback_t_b = document.getElementsByClassName("feedback_t_b")[0];
feedback_t_b.onmousemove = function () {
    var fa = document.getElementsByName("feedback_a");
    let c = false;
    for (let i of fa) {
        if (i.checked) {
            c = true;
        }
    }
    if (!c) {
        feedback_t_b.style.cursor = "not-allowed";
        feedback_t_b.onclick = () => {
            swal("请勾选你要删除的对象！");
        };
    } else {
        feedback_t_b.style.cursor = "pointer";
        feedback_t_b.onclick = feedbackdelete;
    }
}
//空选删除处理
sessionStorage.setItem("feedbackfind", '0');
function backpagen3() {
    sessionStorage.setItem("feedbackfind", '0');
    document.getElementsByClassName("feedback_find_input")[0].value = '';
    allbegin();
    feedback_b.style.display = ' flex';
    feedback_back_max.style.display = 'none';
}
allbegin();
