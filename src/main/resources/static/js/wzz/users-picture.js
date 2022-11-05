let main = document.getElementsByClassName("picture_main")[0];
let ppagenumber = document.getElementById("picture_number");
let pictureb = document.getElementsByClassName("picture_b")[0];
let checka= document.getElementsByName("picture_input");
let picture_back_max=document.getElementsByClassName('picture_back_max')[0];
let backfades=document.getElementById("backfades");
let imgfade=document.getElementById("imgfade");
let picture_t_b=document.getElementsByClassName('picture_t_b');
let picture_find_input=document.getElementsByClassName('picture_find_input')[0];
let picture_find_bon=document.getElementsByClassName('picture_find_bon')[0];
var images1 = document.getElementById("images1");
var imgmax = document.getElementById("imgmax");
    // IE9, Chrome, Safari, Opera  
    images1.addEventListener("mousewheel", MouseWheelHandler, false);//兼容处理
    // Firefox  
    images1.addEventListener("DOMMouseScroll", MouseWheelHandler, false);//兼容处理
    // images1.attachEvent("onmousewheel", MouseWheelHandler);
    function MouseWheelHandler(e) {
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta)));
        images1.height = Math.max(300, Math.min(700, images1.height + (30 * delta)));
    return false;
} 
imgfade.onclick = function () {
    backfades.style.display = 'none';
    backfades.style.opacity = '0';
    backfades.classList.remove("fade");
}
function showimg(img) {
    backfades.style.display = 'block';
    backfades.style.opacity = '1';
    backfades.classList.add("fade");
    images1.src=img;
}
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "" || obj.length == 0) {
        return true;
    } else {
        return false;
    }
}
$.get('http://localhost:8080/ToSkyNews_war_exploded/img/allPicture',
    function (date) {
        let pages = date.data.length;
        let pagen = pages % 15 != 0 ? parseInt(pages / 15) + 1 : parseInt(pages / 15);
        sessionStorage.setItem('ppagen', pagen);
})
let parrow= pictureb.getElementsByTagName("a");
let ppage =pictureb.getElementsByTagName("input")[0];
let ppage_number = pictureb.getElementsByTagName("span")[1];
parrow[2].onclick = () => {
    let n = parseInt(parrow[1].innerHTML);
    if (n > 1 && n < 11) {
        parrow[1].innerHTML -= 1;
        ppage.value = parrow[1].innerHTML;
        pchangepage();
    }
}
parrow[0].onclick = () => {
    let n = parseInt(parrow[1].innerHTML);
    if (n > 0 && n < sessionStorage.getItem('ppagen')) {
        parrow[1].innerHTML = n + 1;
        ppage.value = parrow[1].innerHTML;
        pchangepage();
    }
}
function onfatherfun(e){
    e.stopPropagation();
}
function pchangepage() {
    let p = ppage.value;
    let pager = (p - 1) * 15;
    if (0 < p && p <= parseInt(sessionStorage.getItem('ppagen'))) {
        parrow[1].innerText = p;
        $.get('http://localhost:8080/ToSkyNews_war_exploded/img/allPicture',
            function (date) {
                let pages = date.data.length;
                let pagen = pages % 15 != 0 ? parseInt(pages / 15) + 1 : parseInt(pages / 15);
                ppage_number.innerHTML = "总共有" + pages + "个图片,总共" + pagen + "页";
                sessionStorage.setItem('ppagen', pagen);
            })
        //获取用户数与总页数；
        $.post('http://localhost:8080/ToSkyNews_war_exploded/img/saveImgPages',
            { 'column': pager, 'total': "15" },
            function (date) {
                main.innerHTML =null;
                for (let n = 0; n < date.data.length; n++) {
                    let status;
                    if (date.data[n].status==0) {
                        status='未审核';
                    }else if(date.data[n].status==1){
                        status='通过审核';
                    }else{
                        status='已拒绝';
                    }
                    main.innerHTML +=`
                    <a href='javascript:;' onclick="showimg('${date.data[n].userImg}')" class="picture_a">
                        <div class="pictures" style="background-image: url(${date.data[n].userImg})"></div>
                        <input type='checkbox' onclick='onfatherfun(event)'  name='picture_input' value='all'>
                        <div class="picture_bon" >
                            <div class="p_describe">${date.data[n].userDepiction}</div>
                            <div class="p_status">${status}</div>
                            <span style="display: none;">${date.data[n].pictureID}</span>
                        </div>
                    </a>
                    `
                }
            })
    } else if (ppage.value == ""||sessionStorage.getItem('ppagen')==null) { } 
    else {
        swal("请输入合理的页数！");
    }
}
function picturedelete() {
    swal({ 
        title: "你确定删除选中图片的信息?", 
        text: "你将无法恢复该图片信息！", 
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
            for (let i in checka) {
                if (checka[i].checked) {
                    var id = checka[i].parentNode.getElementsByTagName('span')[0].innerHTML;
                    console.log(id);
                    $.post(`http://localhost:8080/ToSkyNews_war_exploded/img/deletePicture`,
                        { "PictureID": id },
                        function (date) {
                            if (sessionStorage.getItem("pfind")=="1") {
                                topassp();
                            } 
                            else if(sessionStorage.getItem("pfind")=="0"){
                                pchangepage();
                            }else{
                                findimg();
                            }
                        })
                }
            }
            swal("删除！", "你所勾选的图片被删除。","success"); 
        } else { 
            swal("取消！", "你已经取消删除:","error"); 
        } 
    });
}
function passp() {
    swal({ 
        title: "你确定通过你选中图片?", 
        text: "这些图片将通过审核！", 
        type: "warning",
        showCancelButton: true, 
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定通过！", 
        cancelButtonText: "取消审核！",
        closeOnConfirm: false, 
        closeOnCancel: false	
        },
        function(isConfirm){ 
        if (isConfirm) { 
            for (let i in checka) {
                if (checka[i].checked) {
                    var id = checka[i].parentNode.getElementsByTagName('span')[0].innerHTML;
                    $.post(`http://localhost:8080/ToSkyNews_war_exploded/img/auditPicture`,
                        { "PictureID": id ,"status":"1",},
                        function (date) {
                            if (sessionStorage.getItem("pfind")=="1") {
                                topassp();
                            } 
                            else if(sessionStorage.getItem("pfind")=="0"){
                                pchangepage();
                            }else{
                                findimg();
                            }
                        })
                }
            }
            swal("通过！", "你所勾选的图片审核通过。","success"); 
        } else { 
            swal("取消！", "你已经取消审核:","error"); 
        } 
    });
}
function nopassp() {
    swal({ 
        title: "你确定拒绝你选中图片?", 
        text: "这些图片将不通过审核！", 
        type: "warning",
        showCancelButton: true, 
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定通过！", 
        cancelButtonText: "取消审核！",
        closeOnConfirm: false, 
        closeOnCancel: false	
        },
        function(isConfirm){ 
        if (isConfirm) { 
            for (let i in checka) {
                if (checka[i].checked) {
                    var id = checka[i].parentNode.getElementsByTagName('span')[0].innerHTML;
                    $.post(`http://localhost:8080/ToSkyNews_war_exploded/img/auditPicture`,
                        { "PictureID": id ,"status":"-1",},
                        function (date) {
                            if (sessionStorage.getItem("pfind")=="1") {
                                topassp();
                            } 
                            else if(sessionStorage.getItem("pfind")=="0"){
                                pchangepage();
                            }else{
                                findimg();
                            }
                        })
                }
            }
            swal("拒绝成功！", "你所勾选的图片审核未通过。","success"); 
        } else { 
            swal("取消！", "你已经取消审核:","error"); 
        } 
    });
}
function topassp() {
        //获取用户数与总页数；
        $.get('http://localhost:8080/ToSkyNews_war_exploded/img/downPicture',
            function (date) {
                main.innerHTML =null;
                for (let n = 0; n < date.data.length; n++) {
                    let status;
                    if (date.data[n].status==0) {
                        status='未审核';
                    }else if(date.data[n].status==1){
                        status='通过审核';
                    }else{
                        status='已拒绝';
                    }
                    main.innerHTML +=`
                    <a href='javascript:;' onclick="showimg('${date.data[n].userImg}')" class="picture_a">
                        <div class="pictures" style="background-image: url(${date.data[n].userImg})"></div>
                        <input type='checkbox' onclick='onfatherfun(event)' name='picture_input' value='all'>
                        <div class="picture_bon" >
                            <div class="p_describe">${date.data[n].userDepiction}</div>
                            <div class="p_status">${status}</div>
                            <span style="display: none;">${date.data[n].pictureID}</span>
                        </div>
                    </a>
                    `
                }
                //获取一页的用户信息
            })
    pictureb.style.display='none';
    picture_back_max.style.display='block';
    sessionStorage.setItem("pfind", '1');
}
function findimg(){
    if(isEmpty(picture_find_input.value)){
        swal("请输入搜索内容！");
    }else{
    $.post('http://localhost:8080/ToSkyNews_war_exploded/img/vagueQueryPicture',
        {'thing':picture_find_input.value},
            function (date) {
                if (date.data=='error') {
                    main.innerHTML =`
                    <div id="emptymeaage" style="padding-top: 200px;width: 100%;height: 200px;text-align: center;font-size: 16px;">
                        <i class="fa fa-files-o" aria-hidden="true" style="padding-bottom: 10px;color: #68b0f3;font-size: 40px;"></i></br>
                        什么都没有呢 . . .
                    </div>;
                    `;
                }else{
                    main.innerHTML =null;
                    for (let n = 0; n < date.data.length; n++) {
                        let status;
                        if (date.data[n].status==0) {
                            status='未审核';
                        }else if(date.data[n].status==1){
                            status='通过审核';
                        }else{
                            status='已拒绝';
                        }
                        main.innerHTML +=`
                        <a href='javascript:;' onclick="showimg('${date.data[n].userImg}')" class="picture_a">
                            <div class="pictures" style="background-image: url(${date.data[n].userImg})"></div>
                            <input type='checkbox' onclick='onfatherfun(event)' name='picture_input' value='all'>
                            <div class="picture_bon" >
                                <div class="p_describe">${date.data[n].userDepiction}</div>
                                <div class="p_status">${status}</div>
                                <span style="display: none;">${date.data[n].pictureID}</span>
                            </div>
                        </a>
                        `
                    }
                }
                //获取一页的用户信息
            })
        pictureb.style.display='none';
        picture_back_max.style.display='block';
        sessionStorage.setItem("pfind", '2');
    }
}
let check=0;
function pallcheck() {
    if (check==0) {
        for (let n of checka) {
            n.checked = true;
        }
        check=1;
    }
    else{
        for (let n of checka) {
            n.checked = false;
        }
        check=0;
    }
}
sessionStorage.setItem("pfind", '0');
function backpagen5(){
    sessionStorage.setItem("pfind", '0');
    document.getElementsByClassName("picture_find_input")[0].value='';
    pchangepage();
    pictureb.style.display=' flex';
    picture_back_max.style.display='none';
}
pchangepage();
function havacheck(event,thisfunction){
    event.onmousemove = function () {
        let c = false;
        for (let i of checka) {
            if (i.checked) {
                c = true;
            }
        }
        if (!c) {
            event.style.cursor = "not-allowed";
            event.onclick = () => {
                swal("请勾选你要操作的对象！");
            };
        } else {
            event.style.cursor = "pointer";
            event.onclick = thisfunction;
        }
    }
}
havacheck(picture_t_b[0],picturedelete);
havacheck(picture_t_b[1],passp);
havacheck(picture_t_b[2],nopassp);
//空选删除处理