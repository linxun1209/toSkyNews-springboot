var rbody = document.getElementById("report_main_body");
var fa = document.getElementsByName("report_a");
var report_fade = document.getElementsByClassName("report_fade")[0];
var fade = document.getElementsByClassName("fade")[3];
var report_back_max = document.getElementsByClassName('report_back_max')[0];
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
$.get('http://localhost:8080/ToSkyNews_war_exploded/ReportsCount',
    function (date) {
        let pages = date;
        let pagen = pages % 10 != 0 ? parseInt(pages / 10) + 1 : parseInt(pages / 10);
        sessionStorage.setItem('rpagen', pagen);
    })
var report_b = document.getElementsByClassName('report_b')[0];
var aaa = report_b.getElementsByTagName("a");
var rpages = document.getElementById('rpages');
var apage = report_b.getElementsByTagName("input")[0];
aaa[2].onclick = () => {
    let n = parseInt(rpages.innerText);
    let apage = report_b.getElementsByTagName("input")[0];
    if (n > 1 && n < 20) {
        rpages.innerText = n - 1;
        apage.value = rpages.innerText;
        r_allbegin();
    }
}
aaa[0].onclick = () => {
    let nn = parseInt(rpages.innerText);
    if (nn < sessionStorage.getItem('rpagen')) {
        let apage = report_b.getElementsByTagName("input")[0];
        rpages.innerText = nn + 1;
        apage.value = rpages.innerText;
        allbegin();
    }
}
var report_number = document.getElementById('reportpage_number');
function r_allbegin() {
    let apage = report_b.getElementsByTagName("input")[0];
    let p = apage.value;
    let page = (p - 1) * 10;
    if (0 < p && p <= parseInt(sessionStorage.getItem('rpagen'))) {
        rpages.innerText = p;
        $.get('http://localhost:8080/ToSkyNews_war_exploded/ReportsCount',
            function (date) {
                let pages = date;
                let pagen = pages % 10 != 0 ? parseInt(pages / 10) + 1 : parseInt(pages / 10);
                report_number.innerHTML = "总共有" + pages + "个举报,总共" + pagen + "页";
                sessionStorage.setItem('rpagen', pagen);
            })
        $.post('http://localhost:8080/ToSkyNews_war_exploded/showReports',
            { 'column': page, 'total': "10" },
            function (date) {
                var rbody = document.getElementById("report_main_body");
                rbody.innerHTML = null;
                for (let n = 0; n < date.length; n++) {
                    let status;
                    if (date[n].status == 0) {
                        status = "未处理"
                    } else if (date[n].status == -1) {
                        status = "举报成功";
                    } else {
                        status = "举报失败";
                    }
                    rbody.innerHTML += `
                    <tr>
                            <td class='rms'><input type='checkbox' name='report_a' value='all'></td>
                            <td class="rms none">${date[n].reportID}</td>
                            <td class="rms none">${date[n].userID}</td>
                            <td class="rms none">${date[n].postsID}</td>
                            <td class="rms">${date[n].times}</td>
                            <td class="rms">${date[n].kind}</td>
                            <td class="rml">${date[n].opinion}</td>
                            <td class="rml">${date[n].contact}</td>
                            <td class="rms">${status}</td>
                            <td class="rml">
                                <a class="r_look" href="javascript:;"><i class="fa fa-book" aria-hidden="true"></i>内容</a>
                                <a class="r_reply" href="javascript:;"><i class="fa fa-check-square-o" aria-hidden="true"></i>通过</a>
                                <a class="r_refuse" href="javascript:;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>拒绝</a>
                            </td>
                        </tr>  
                `;
                    let ms = document.getElementsByClassName("rms");
                    let ml = document.getElementsByClassName("rml");
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
                allchange3();
            })
    } else if (apage.value == "" || sessionStorage.getItem('rpagen') == null) { }
    else {
        swal("请输入合理的页数！");
    }
}
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "" || obj.length == 0) {
        return true;
    } else {
        return false;
    }
}
var report_text = document.getElementById('report_text');
var report_reply = document.getElementById('report_reply');
function allchange3() {
    let look = document.getElementsByClassName("r_look");
    let reply = document.getElementsByClassName("r_reply");
    let refuse = document.getElementsByClassName("r_refuse");
    for (let n of look) {
        n.onclick = function () {
            let postID = n.parentNode.parentNode.children[3].innerHTML;
            let opinion = n.parentNode.parentNode.children[6].innerHTML;
            let times = n.parentNode.parentNode.children[4].innerHTML;
            let kind = n.parentNode.parentNode.children[5].innerHTML;
            let status = n.parentNode.parentNode.children[8].innerHTML;
            sessionStorage.setItem('r_postID', postID);
            sessionStorage.setItem('r_opinion', opinion);
            sessionStorage.setItem('r_status', status);
            sessionStorage.setItem('r_times', times);
            sessionStorage.setItem('r_kind', kind);
            window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/users-report");
        }
    }
    for (let i of reply) {
        i.onclick = function () {
            let postID = i.parentNode.parentNode.children[3].innerHTML;
            console.log(postID);
            $.post('http://localhost:8080/ToSkyNews_war_exploded/savePassPosts', { 'postsID': postID },
                function (date) {
                    swal(date.data);
                    if (sessionStorage.getItem("reportfind")=="1") {
                        on_report();
                    } else{
                        r_allbegin();
                    }
                })
        }
    }
    for (let i of refuse) {
        i.onclick = function () {
            let postID = i.parentNode.parentNode.children[3].innerHTML;
            console.log(postID);
            $.post('http://localhost:8080/ToSkyNews_war_exploded/disSavePassPosts', { 'postsID': postID },
                function (date) {
                    if (date.data == '审核通过！') {
                        swal('审核未通过！');
                    }
                    if (sessionStorage.getItem("reportfind")=="1") {
                        on_report();
                    } else{
                        r_allbegin();
                    }
                })
        }
    }
}
function on_report() {
    $.get('http://localhost:8080/ToSkyNews_war_exploded/downReports',
        function (date) {
            var rbody = document.getElementById("report_main_body");
            if (date.length == 0) {
                rbody.innerHTML = `   
                    <div id="emptymeaage" style="padding-top: 200px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
                        <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
                        什么都没有呢 . . .
                    </div>`;
            } else {
                rbody.innerHTML = null;
                for (let n = 0; n < date.length; n++) {
                    let status;
                    if (date[n].status == 0) {
                        status = "未处理"
                    } else if (date[n].status == -1) {
                        status = "举报成功";
                    } else {
                        status = "举报失败";
                    }
                    rbody.innerHTML += `
                    <tr>
                            <td class='rms'><input type='checkbox' name='report_a' value='all'></td>
                            <td class="rms none">${date[n].reportID}</td>
                            <td class="rms none">${date[n].userID}</td>
                            <td class="rms none">${date[n].postsID}</td>
                            <td class="rms">${date[n].times}</td>
                            <td class="rms">${date[n].kind}</td>
                            <td class="rml">${date[n].opinion}</td>
                            <td class="rml">${date[n].contact}</td>
                            <td class="rms">${status}</td>
                            <td class="rml">
                                <a class="r_look" href="javascript:;"><i class="fa fa-book" aria-hidden="true"></i>内容</a>
                                <a class="r_reply" href="javascript:;"><i class="fa fa-check-square-o" aria-hidden="true"></i>通过</a>
                                <a class="r_refuse" href="javascript:;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i>拒绝</a>
                            </td>
                        </tr>  
                `;
                    let ms = document.getElementsByClassName("rms");
                    let ml = document.getElementsByClassName("rml");
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
                allchange3();
            }
        })
    report_b.style.display = 'none';
    report_back_max.style.display = 'block';
}
function ralltrue() {
    let feedall = document.getElementsByName("report_all")[0];
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
var reportall = document.getElementsByName("report_all")[0];
function reportdelete() {
    swal({ 
        title: "你确定删除选中的举报信息?", 
        text: "你将无法恢复该些举报信息！", 
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
            for (let i in fa) {
                if (fa[i].checked) {
                    var id = fa[i].parentNode.parentNode.children[1].innerHTML;
                    $.post('http://localhost:8080/ToSkyNews_war_exploded/deleteReports',
                        { "reportID": id },
                        function (date) {
                            if (sessionStorage.getItem("reportfind")=="1") {
                                on_report();
                            } else{
                                r_allbegin();
                            }
                        })
                }
            }
            swal("删除！", "你所勾选的举报信息被删除。","success"); 
        } else { 
            swal("取消！", "你已经取消删除:","error"); 
        } 
    });
}
var report_t_b = document.getElementsByClassName("report_t_b")[0];
report_t_b.onmousemove = function () {
    let c = false;
    for (let i of fa) {
        if (i.checked) {
            c = true;
        }
    }
    if (!c) {
        report_t_b.style.cursor = "not-allowed";
        report_t_b.onclick = () => {
            swal("请勾选你要删除的对象！");
        };
    } else {
        report_t_b.style.cursor = "pointer";
        report_t_b.onclick = reportdelete;
    }
}
//空选删除处理
sessionStorage.setItem("reportfind", '0');
function backpagen4() {
    sessionStorage.setItem("reportfind", '0');
    document.getElementsByClassName("report_find_input")[0].value='';
    r_allbegin();
    report_b.style.display = ' flex';
    report_back_max.style.display = 'none';
}
r_allbegin();
