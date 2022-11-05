var list = document.querySelectorAll('li');
for (let i = 0; i < list.length; i++) {
    list[i].onmouseover = function () {
        list[i].style.backgroundColor = 'black'
    }
    list[i].onmouseout = function () {
        list[i].style.backgroundColor = ''
    }
}

var content2Nav=document.getElementById('content2Nav')
var tu=document.querySelector('#leftNav')
var pageBig1=document.getElementById('pageBig1');
content2Nav.onclick=function(){
    pageBig1.style.display='none'
}
tu.onclick=function () {
    pageBig1.style.display='none'
}


var list1 = document.querySelector('#leftNav_li').querySelectorAll('li')
var items = document.querySelectorAll('.item')
for (var i = 0; i < list1.length; i++){
    list1[i].onclick = function(){
        for (var i = 0; i < list1.length; i++) {
            list1[i].className = ''
        }
        this.className = 'current';

        var index = this.getAttribute('index');
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = 'none'
        }
        items[index].style.display = 'block';
    }
}
var reStatus=document.getElementById('re_status')
reStatus.onclick=function(){
    pictureAllNum()
    allPictureNum()
    pageBig1.style.display='none'
    reStatus.style.display='none'
}
// 获取头像
if(localStorage.getItem('have_land')=="true") {
    var user_img=document.querySelector('.user_img');
    var user_name = document.getElementById('user_name');
    var user_id = localStorage.getItem('user_id');
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
        data: {
            userID: user_id
        },
        success: function (date) {
            var user_img=document.querySelector('.user_img');
            localStorage.setItem('user_name', date.username);
            user_name.innerHTML = date.username;
            user_img.style.backgroundImage=`url(${date.picture})`;
        }
    })
}
function goUser(){
    location.href = "myPage";
}
function goUser1(){
    location.href = "myPage";
}
var user_id=localStorage.getItem('user_id');
var userAgent = navigator.userAgent; //用于判断浏览器类型
$(".file").change(function() {
    var docObj = $(this)[0];
    var  docObj1=$('#file').val();
    // var file = document.getElementById('#file').value;
    if ( docObj1 == null ||  docObj1 == "") {
        alert("请选择要上传的文件!");
        return false;
    }
    var allow_ext = ".jpg|.png|.gif";
    var ext_name =  docObj1.substring( docObj1.lastIndexOf("."));
    if (allow_ext.indexOf(ext_name + "|") == -1) {
        var errMsg = "该文件不允许上传，请上传" + allow_ext + "类型的文件,当前文件类型为：" + ext_name;
        alert(errMsg);
        return false;
    }

    var picDiv = $(this).parents(".picDiv");
    // 得到所有的图片文件
    var fileList = docObj.files;
    for (var i = 0; i < fileList.length; i++) {
        var picHtml = "<div class='imageDiv' nm='"+fileList[i].name+"'> <img class='images' id='img" + fileList[i].name + "' /><div class='cover'><i class='delbtn'>删除</i></div></div>";
        picDiv.prepend(picHtml);
        //获取图片imgi的对象
        var imgObjPreview = document.getElementById("img" + fileList[i].name);
        if (fileList && fileList[i]) {
            if (userAgent.indexOf('MSIE') == -1) {
                imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]); //获取上传图片文件的物理路径;
            } else {
                if (docObj.value.indexOf(",") != -1) {
                    var srcArr = docObj.value.split(",");
                    imgObjPreview.src = srcArr[i];
                } else {
                    imgObjPreview.src = docObj.value;
                }
            }
        }
    }
})
// 上传图片
var sure = document.getElementById('sure');
let shadow2 = document.getElementById('label-silder-shadow')
let successTip = document.getElementById('successTip');
var tip=document.getElementById('tip')
sure.onclick=function(){
    shadow2.style.display = "none";
    successTip.style.display = "none";
}
var aa=document.getElementById('aa');
var fileBtn=document.querySelector('#fileBtn');
fileBtn.onclick=function(){
    var formData = new FormData();
    formData.append("profile",$('#file')[0].files[0]);
    formData.append('userID',user_id)
    formData.append('userDepiction','哈')
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/img/getImgProfile',
        dataType:'json',
        data:formData,
        cache: false,
        processData: false,
        contentType: false,
        success:function(data){
            if(data.code==10000){
                shadow2.style.display='block';
                successTip.style.display='block';
                tip.innerHTML = "图片上传成功，请耐心等待审核"
                tip.style.left=-50+'px'
            }
            console.log(data)
        }
    })
}
var status_li=document.querySelector('#status').querySelectorAll('li');
var pictureNum=document.getElementById('pictureNum');
var all_sort1 = ["全部","已审核","未审核"];
status_li[0].className = 'statusColor';
for (let i in status_li) {
    status_li[i].onclick = function () {
        let sort1 = status_li[i].innerHTML;
        for (let i = 0; i < status_li.length; i++) {
            status_li[i].className = ''
        }
        this.className = 'statusColor';
        window.localStorage.sort1=sort1;
        page.value=1
        aa.innerText=page.value;
        num();
    }
}
// 获取三种状态的数量
function num(){
    if(all_sort1[1]==window.localStorage.sort1){
        passPictureNum();
    }
    if(all_sort1[2]==window.localStorage.sort1){
        auditingPictureNum();
    }
    if(all_sort1[0]==window.localStorage.sort1){
        allPictureNum();
    }
}
// 未审核的分页
auditingPicture()
function auditingPicture(){
    if(all_sort1[0]==window.localStorage.sort1){
        pictureAllNum()
    }
    var rightCenter2=document.getElementById('rightCenter2');
    var page=document.querySelector('#page');
    var p=page.value;
    let pager=(p-1)*15;
    if(all_sort1[2]==window.localStorage.sort1) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/ToSkyNews_war_exploded/img/statusPicture',
            data: {
                start: pager,
                userID: user_id,
                status: 0
            },
            dataType: 'json',
            success: function (data) {
                    rightCenter2.innerHTML = null
                    for (let i = 0; i < data.data.length; i++) {
                        rightCenter2.innerHTML += `
                <div class="imgsDiv">
                    <div class="imgCover" onclick="qq('${data.data[i].pictureID}')">删除</div>
                    <img class="imgs" src='${data.data[i].userImg}'>
                </div>
            `
                    }
            },
            err: function (err) {
                console.log(err);
            }
        })
    }
}

// 审核通过的分页
passPicture();
function passPicture(){
    if(all_sort1[0]==window.localStorage.sort1){
        pictureAllNum();
    }
    var rightCenter2=document.getElementById('rightCenter2');
    var page=document.querySelector('#page');
    var p=page.value;
    let pager=(p-1)*15;
    if(all_sort1[1]==window.localStorage.sort1) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/ToSkyNews_war_exploded/img/statusPicture',
            data: {
                start: pager,
                userID: user_id,
                status: 1
            },
            dataType: 'json',
            success: function (data) {
                    rightCenter2.innerHTML = null
                    for (let i = 0; i < data.data.length; i++) {
                        rightCenter2.innerHTML += `
                <div class="imgsDiv">
                    <div class="imgCover" onclick="q2('${data.data[i].pictureID}')">删除</div>
                    <img class="imgs" src='${data.data[i].userImg}' width="140px;height:120px">
                </div>
            `
                    }
            },
            err: function (err) {
                console.log(err);
            }
        })
}
}
// 全部的分页
var toast=document.querySelector('.toast-error')
pictureAllNum();
function pictureAllNum(){
    var rightCenter2=document.getElementById('rightCenter2');
    var page=document.querySelector('#page');
    var p=page.value;
    if (0 < p && p <=Math.ceil(window.localStorage.totalNums / 15) ) {
        let pager = (p - 1) * 15;
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/ToSkyNews_war_exploded/img/allUserPicture',
            data: {
                start: pager,
                userID: user_id
            },
            dataType: 'json',
            success: function (data) {
                    rightCenter2.innerHTML = null
                    for (let i = 0; i < data.data.length; i++) {
                        rightCenter2.innerHTML += `
                <div class="imgsDiv">
                    <div class="imgCover"  onclick="q('${data.data[i].pictureID}')">删除</div>
                    <img class="imgs" src='${data.data[i].userImg}' width="140px;height:120px">
                </div>
            `
                    }
            },
            err: function (err) {
                console.log(err);
            }
        })
    } else if (page.value == "") { }
    else {
        toast.style.display='block'
        var second = 5;
        showTime();
        function showTime() {
            second--;
            if (second <= 0) {
                toast.style.display='none'
            }
        }
        setInterval(showTime,1000);
    }
}


// 全部的数量
allPictureNum()
function allPictureNum(){
    $.ajax({
        type:'post',
        url: 'http://localhost:8080/ToSkyNews_war_exploded/img/allCountPicture',
        data:{
            userID: user_id,
        },
        dataType: 'json',
        success:function(data){
            if(data.code==1){
                window.localStorage.totalNums=data.data;
            }
            // console.log(Math.ceil(window.localStorage.totalNums / 15))
            paging()
            pictureAllNum();
            pictureNum.innerHTML="总共有" + window.localStorage.totalNums + "张图片,总共" + Math.ceil(window.localStorage.totalNums / 15)+ "页";
        },
        err:function(err){
            console.log(err);
        }
    })
}
// // 审核通过的数量
// passPictureNum();
function passPictureNum(){
    $.ajax({
        type:'post',
        url: 'http://localhost:8080/ToSkyNews_war_exploded/img/allPassPicture',
        data:{
            userID: user_id,
        },
        dataType: 'json',
        success:function(data){
            if(data.code==1){
                window.localStorage.totalNums=data.data.length;
            }
            // console.log(Math.ceil(window.localStorage.totalNums / 15))
            paging()
            passPicture();
            pictureNum.innerHTML="总共有" + window.localStorage.totalNums + "张图片,总共" + Math.ceil(window.localStorage.totalNums / 15)+ "页";
            // console.log(data.data.length)
        },
        err:function(err){
            console.log(err);
        }
    })
}
// 未审核的数量
// auditingPictureNum();
function auditingPictureNum(){
    $.ajax({
        type:'post',
        url: 'http://localhost:8080/ToSkyNews_war_exploded/img/allAuditingPicture',
        data:{
            userID: user_id,
        },
        dataType: 'json',
        success:function(data){
            if(data.code==1){
                window.localStorage.totalNums=data.data.length;
            }
            console.log(Math.ceil(window.localStorage.totalNums / 15))
            paging();
            auditingPicture();
            pictureNum.innerHTML="总共有" + window.localStorage.totalNums + "张图片,总共" + Math.ceil(window.localStorage.totalNums / 15)+ "页";
        },
        err:function(err){
            console.log(err)
        }
    })
}
    function statusPicture() {
        if (all_sort1[1] == window.localStorage.sort1) {
            passPicture();
        }
        if (all_sort1[2] == window.localStorage.sort1) {
            auditingPicture()
        }
        if (all_sort1[0] == window.localStorage.sort1) {
            pictureAllNum()
        }
    }

// 为三种状态绑定下一页，上一页
    function paging() {
        var totalPage = Math.ceil(window.localStorage.totalNums / 15)
        ago.onclick = function () {
            var n = parseInt(page.value);
            if (n > 1 && n <= totalPage) {
                page.value -= 1;
                aa.innerText = page.value;
            }
            statusPicture();
        }
        next.onclick = function () {
            var n = parseInt(page.value);
            if (n > 0 && n <= totalPage) {
                page.value++;
                if (page.value > totalPage) {
                    shadow2.style.display = "block";
                    successTip.style.display = "block";
                    tip.innerHTML = "这已经是最后一页了"
                    tip.style.left = 17 + 'px';
                    page.value = 1
                }
                aa.innerText = page.value;
            }
            statusPicture();
        }
    }

    function q(pictureID) {
        var flag = confirm("你确定要删除吗？");
        if (flag) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/ToSkyNews_war_exploded/img/deletePicture",
                data: {
                    PictureID: pictureID
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        shadow2.style.display = "block";
                        successTip.style.display = "block";
                        tip.innerHTML = "删除成功"
                        tip.style.left = 45 + 'px';
                        page.value = 1
                    }
                    allPictureNum()
                },
                error: function (result) {
                    console.log(result);
                }
            });
        }
    }

    function qq(pictureID) {
        var flag1 = confirm("你确定要删除吗？");
        if (flag1) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/ToSkyNews_war_exploded/img/deletePicture",
                data: {
                    PictureID: pictureID
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        shadow2.style.display = "block";
                        successTip.style.display = "block";
                        tip.innerHTML = "删除成功"
                        tip.style.left = 45 + 'px';
                        page.value = 1
                    }
                    auditingPictureNum()
                },
                error: function (result) {
                    console.log(result);
                }
            });
        }
    }

    function q2(pictureID2) {
        var flag2 = confirm("你确定要删除吗？");
        if (flag2) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/ToSkyNews_war_exploded/img/deletePicture",
                data: {
                    PictureID: pictureID2
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        shadow2.style.display = "block";
                        successTip.style.display = "block";
                        tip.innerHTML = "删除成功"
                        tip.style.left = 45 + 'px';
                        page.value = 1
                    }
                    passPictureNum()
                },
                error: function (result) {
                    console.log(result);
                }
            });
        }
}

// 模糊查询加分页
var aa1=document.getElementById('aa1');
var ago1=document.getElementById('ago1');
var next1=document.getElementById('next1');
var input_text=document.getElementById('input_text');
var pageBig1=document.getElementById('pageBig1');
var rightCenter2=document.getElementById('rightCenter2');
var total1
function search(){
    pageBig1.style.display='block'
    if(input_text.value==''){
        alert('请输入描述')
    }else{
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/img/vagueQueryPicture",
            data: {
                thing: input_text.value
            },
            dataType: "json",
            success: function (result) {
                reStatus.style.display='block'
                // console.log(result)
                total1=Math.ceil( result.data.length / 15);
                pictureNum.innerHTML="总共有" + result.data.length + "张图片,总共" + Math.ceil( result.data.length / 15)+ "页";
                sort();
            },
            err: function (result) {
                console.log("报错了！")
            }
        })
    }
}
function sort(){
    let page1=document.querySelector('#page1');
    let pagerOne=(page1.value-1)*15;
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/img/vagueSaveImgPages",
        data: {
            column: pagerOne,
            thing:input_text.value,
            total:15
        },
        dataType: "json",
        success: function (result) {
            // console.log(result)
            rightCenter2.innerHTML=null
            for(let i=0;i<result.data.length;i++){
                rightCenter2.innerHTML +=`
                <div class="imgsDiv">
                    <div class="imgCover"  onclick="q('${result.data[i].pictureID}')">删除</div>
                    <img class="imgs" src='${result.data[i].userImg}' width="140px;height:120px">
                </div>
            `
            }
        },
        err: function (result) {
            console.log("报错了！")
        }
    })
    paging1()
}
function paging1() {
    ago1.onclick = function () {
        var n = parseInt(page1.value);
        if (n > 1) {
            page1.value--;
            aa1.innerText = page1.value;
        }
        search()
    }
    next1.onclick = function () {
        var n = parseInt(page1.value);
        if (n > 0 && n <= total1) {
            page1.value++;
            if (page1.value > total1) {
                shadow2.style.display = "block";
                successTip.style.display = "block";
                tip.innerHTML = "这已经是最后一页了"
                tip.style.left = 17 + 'px';
                page1.value = 1
            }
            aa.innerText = page.value;
            aa1.innerText = page1.value;
        }
        search()
    }
}
