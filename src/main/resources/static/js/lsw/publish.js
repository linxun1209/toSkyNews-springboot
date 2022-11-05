const E = window.wangEditor
const editor = new E('#div1')
const $text1 = $('#text1')
const text=$('#text2')
editor.config.height = 520;
editor.config.onchange = function (html) {
    // 第二步，监控变化，同步更新到 textarea
    $text1.val(html)
    text.val(editor.txt.text())
}
editor.create()
// 第一步，初始化 textarea 的值
$text1.val(editor.txt.html())


//下拉框
var email = document.getElementById('email');
var user = document.getElementById('user');
var silder = document.getElementById("silder-email");
var silder2 = document.getElementById('silder-user');
email.onmouseover = silder.onmouseover = function () {
    silder.style.display = "block";
};
email.onmouseout = silder.onmouseout = function () {
    silder.style.display = "none";
};
user.onmouseover = silder2.onmouseover = function () {
    silder2.style.display = "block";
};
user.onmouseout = silder2.onmouseout = function () {
    silder2.style.display = "none";
};
//选择框
let input = document.getElementById('labelInput');
let label = document.getElementById('label-silder')
let shadow = document.getElementById('label-silder-shadow')
input.addEventListener('click', function () {
    if (label.style.display == 'block') {
        label.style.display = "none";
    } else if (label.style.display = "none") {
        label.style.display = "block";
        shadow.style.display = "block";
    }
})
var close = document.getElementById('close-label-silder');
var label_li = document.getElementById('label-silder').getElementsByTagName('li');
close.onclick = function () {
    label.style.display = "none";
    shadow.style.display = "none";
}
for (let i = 0; i < label_li.length; i++) {
    label_li[i].onclick = function () {
        input.value = label_li[i].innerText;
        label.style.display = "none";
        shadow.style.display = "none";
    }
}


//li变色
var li = document.getElementsByTagName('li');
for (let i = 0; i < li.length; i++) {
    li[i].onmouseover = function () {
        li[i].style.backgroundColor = '#e3e4e5'
    }
    li[i].onmouseout = function () {
        li[i].style.backgroundColor = ''
    }
}

var li1 = document.getElementById('silder-user').getElementsByTagName('li');
for (let i = 1; i < li1.length; i++) {
    li1[i].onmouseover = function () {
        li1[i].style.backgroundColor = '#e3e4e5'
    }
    li1[i].onmouseout = function () {
        li1[i].style.backgroundColor = ''
    }
}

var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}
$("#titleInput").on('input propertychange', function () {
    //获取输入内容
    var userDesc = $(this).val();
    //判断字数
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 100);
    } else {
        len = 0
    }
    //显示字数
    $("#wordsLength").html('还能输入'+(100-len)+'个字');
});

var user_id=localStorage.getItem('user_id');
// 发布文章
let publishBtn=document.getElementById("publishBtn");
let content=document.getElementById('text1');
let labelPut=document.getElementById('labelInput');
let postsName=document.getElementById('titleInput');
let contentA=document.getElementById('text2');
let sure = document.getElementById('sure');
let shadow2 = document.getElementById('label-silder-shadow')
let successTip = document.getElementById('successTip');
var tip=document.getElementById('tip')
sure.onclick=function(){
    shadow2.style.display = "none";
    successTip.style.display = "none";
}
var profile_silder=document.getElementById('profile-silder')
function check(radio) {
    document.getElementById("answer").value = radio
    if(radio=='是'){
        profile_silder.style.display='block'
    }else if(radio=='否'){
        profile_silder.style.display='none'
    }
    window.localStorage.yesNo=radio;
}

var profile_silder=document.getElementById('profile-silder')
var text_detail = document.querySelector('.text-detail')
profile_silder.onmouseover = function () {
    text_detail.style.display = 'block';
}
profile_silder.onmouseout = function () {
    text_detail.style.display = 'none';
}

var img=document.getElementById("img");
var timeDiv=document.getElementById('timeDiv');
var inputImg=document.getElementById('file')
inputImg.onclick=function(){
    var tailoring=document.getElementById('tailoring')
    var tailoring_silder=document.getElementById('tailoring-silder')
    tailoring_silder.style.display='block'
    tailoring.style.display='block'
}

inputImg.onchange = function () {
    var ff = $("#file").val();
    // var file = document.getElementById('#file').value;
    if (ff == null || ff == "") {
        alert("请选择要上传的文件!");
        return false;
    }
    //定义允许上传的文件类型
    var allow_ext = ".jpg|.png|.gif";
    //提取上传文件的类型
    var ext_name = ff.substring(ff.lastIndexOf("."));
    //判断上传文件类型是否允许上传
    if (allow_ext.indexOf(ext_name + "|") == -1) {
        var errMsg = "该文件不允许上传，请上传" + allow_ext + "类型的文件,当前文件类型为：" + ext_name;
        alert(errMsg);
        return false;
    }
        var file = this.files[0];
        //创建读取文件对象
        var reader = new FileReader();
        //读取文件
        reader.readAsDataURL(file);
        //在回调函数中修改Img的src属性
        reader.onload = function (evt) {
            img.src = reader.result;
            console.log(evt,cropper,'./.evt.target.result')
            var replaceSrc = evt.target.result;
            // 更换cropper的图片
            cropper.replace(replaceSrc, false);// 默认false，适应高度，不失真
        }

}
var cropper =  new Cropper($('#tailoringImg')[0],{
    aspectRatio: 0 / 0,
    preview: '.previewImg',// 预览视图
    guides: true, // 裁剪框的虚线(九宫格)
    autoCropArea: 0.5, // 0-1之间的数值，定义自动剪裁区域的大小，默认0.8
    movable: true, // 是否允许移动图片
    dragCrop: true, // 是否允许移除当前的剪裁框，并通过拖动来新建一个剪裁框区域
    movable: true, // 是否允许移动剪裁框
    resizable: true, //是否允许改变裁剪框的大小
    scalable:true, //是否可以缩放图片
    zoomable: true, // 是否允许缩放图片大小
    mouseWheelZoom: false, // 是否允许通过鼠标滚轮来缩放图片
    touchDragZoom: false, // 是否允许通过触摸移动来缩放图片
    rotatable: true, // 是否允许旋转图片
    crop: function (e) {
        let cas = cropper.getCroppedCanvas();// 获取被裁剪后的canvas
        var base64 = cas.toDataURL('image/jpeg'); //转换为base64
        $("#img").prop("src", base64);// 显示图片
        $("#fileImg").prop("src", base64);// 显示图片
    }
});

// 旋转
$(".cropper-rotate-btn").on("click", function () {
    cropper.rotate(45);
});
// 复位
$(".cropper-reset-btn").on("click", function () {
    cropper.reset();
});
// 放大
$('.cropper-enlarge-btn').on('click',function(){
    console.log(cropper,'cropper---enlarge')
    cropper.zoom(2);
})
// 缩小
$('.cropper-narrow-btn').on('click',function(){
    console.log(cropper,'cropper---narrow')
    cropper.zoom(-2);
})
var sureCut=document.getElementById('sureCut')
sureCut.onclick=function(){
    var tailoring=document.getElementById('tailoring')
    var tailoring_silder=document.getElementById('tailoring-silder')
    tailoring_silder.style.display='none'
    tailoring.style.display='none'
}
// 换向
var flagX = true;
$(".cropper-scaleX-btn").on("click", function () {
    if (flagX) {
        cropper.scaleX(-1);
        flagX = false;
    } else {
        cropper.scaleX(1);
        flagX = true;
    }
    flagX != flagX;
});

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    //[u8arr] [] 不能省略
    return new Blob([u8arr], { type: mime });
}
function fileChange() {
    let cas = cropper.getCroppedCanvas();// 获取被裁剪后的canvas
    var base64 = cas.toDataURL('image/jpeg'); //转换为base64
    var formData = new FormData();
    var file = dataURLtoBlob(base64);
    var nameImg=new Date().getTime()+'.png'
    formData.append('profile1', file,nameImg);
    formData.append('content',content.value);
    formData.append('contentA',contentA.value);
    formData.append('label',labelPut.value);
    formData.append('postsName',postsName.value);
    formData.append('reside', user_id);
    formData.append('status', 0);
    formData.append('picture', today());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/ToSkyNews_war_exploded/setPostProfile",
        data: formData,
        dataType:"json",
        contentType: false,
        processData: false,
        success: function(date) {
            tip.innerHTML = "发布成功，请耐心等待审核"
            tip.style.top=50+'px';
            shadow2.style.display = "block";
            timeDiv.style.display='block'
            sure.style.display='none'
            successTip.style.display = "block";
            var second = 3;
            showTime();
            function showTime() {
                let time = document.querySelector("#time");
                second--;
                if (second <= 0) {
                    location.href = "user_main";
                }
                time.innerHTML= second.toString();
            }
            setInterval(showTime,1000);
            console.log(date)
        },
        error: function(data) {
            console.log("出错啦");
        }
    })
}
function nofileChange(){
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/posts/addPosts",
        data: {
            content: content.value,
            contentA: contentA.value,
            label: labelPut.value,
            postsName: postsName.value,
            userID: user_id,
            picture: today(),
            reside: user_id,
            status:0
        },
        dataType: "json",
        success: function (data) {
            if (data.data == "success") {
                shadow2.style.display = "block";
                successTip.style.display = "block";
                tip.innerHTML = "发布成功，请耐心等待审核"
                tip.style.top=50+'px';
                timeDiv.style.display='block'
                sure.style.display='none'
            }
            var second = 3;
            showTime();
            function showTime() {
                let time = document.querySelector("#time");
                second--;
                if (second <= 0) {
                    location.href = "user_main";
                }
                time.innerHTML= second.toString();
            }
            setInterval(showTime,1000);
        },
        err: function (result) {
            console.log('出错啦！')
        }

    })
}
// 发布文章
function publish() {
    if (postsName.value == '') {
        tip.innerHTML = "文章题目不能为空！！"
        shadow2.style.display = "block";
        sure.style.top=130+'px';
        successTip.style.display = "block";
    } else if (content.value == '') {
        tip.innerHTML = "内容不能为空！！"
        shadow2.style.display = "block";
        sure.style.top=130+'px';
        tip.style.left=15+'px'
        successTip.style.display = "block";
    } else if (labelPut.value == '') {
        tip.innerHTML = "标签不能为空！！"
        tip.style.left=15+'px'
        shadow2.style.display = "block";
        sure.style.top=130+'px';
        successTip.style.display = "block";
    } else  {
        if(window.localStorage.yesNo=='是'){
            fileChange()
        }
        if(window.localStorage.yesNo=='否'){
            nofileChange()
        }

    }
}
// 保存草稿
function save(){
    if(window.localStorage.yesNo=='是'){
        fileSave()
    }
    if(window.localStorage.yesNo=='否'){
        nofileSave()
    }
}
function nofileSave() {
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/posts/addPosts",
        data: {
            content: content.value,
            contentA: contentA.value,
            label: labelPut.value,
            postsName: postsName.value,
            userID: user_id,
            picture: today(),
            reside: user_id,
            status: -2
        },
        dataType: "json",
        success: function (data) {
            tip.innerHTML = "草稿已保存在草稿箱"
            tip.style.top=50+'px'
            shadow2.style.display = "block";
            timeDiv.style.display='block'
            sure.style.display='none'
            successTip.style.display = "block";
            if (data.data == "success") {
                shadow2.style.display = "block";
                successTip.style.display = "block";
            }
            var second = 3;
            showTime();
            function showTime() {
                let time = document.querySelector("#time");
                second--;
                if (second <= 0) {
                    location.href = "myPage";
                }
                time.innerHTML= second.toString();
            }
            setInterval(showTime,1000);
        },
        err: function (result) {
            console.log('出错啦！')
        }

    })
}

function fileSave() {
    let cas = cropper.getCroppedCanvas();// 获取被裁剪后的canvas
    var base64 = cas.toDataURL('image/jpeg'); //转换为base64
    var formData = new FormData();
    var file = dataURLtoBlob(base64);
    var nameImg=new Date().getTime()+'.png'
    formData.append('profile1', file,nameImg);
    formData.append('content',content.value);
    formData.append('contentA',contentA.value);
    formData.append('label',labelPut.value);
    formData.append('postsName',postsName.value);
    formData.append('reside', user_id);
    formData.append('status', -2);
    formData.append('picture', today());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/ToSkyNews_war_exploded/setPostProfile",
        data: formData,
        dataType:"json",
        contentType: false,
        processData: false,
        success: function(date) {
            tip.innerHTML = "草稿已保存在草稿箱"
            shadow2.style.display = "block";
            timeDiv.style.display='block'
            tip.style.top=50+'px'
            sure.style.display='none'
            successTip.style.display = "block";
            var second = 3;
            showTime();
            function showTime() {
                let time = document.querySelector("#time");
                second--;
                if (second <= 0) {
                    location.href = "myPage";
                }
                time.innerHTML= second.toString();
            }
            setInterval(showTime,1000);
        },
        error: function(data) {
            console.log("出错啦");
        }
    })
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
            // user_img.src=date.picture;
            user_img.style.backgroundImage=`url(${date.picture})`;
        }
    })
}
function signoutland(){
    localStorage.setItem('have_land',"false");
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/user_main");
}
function today() {
    //创建时间
    var today = new Date();
    var h = today.getFullYear();
    var m = today.getMonth() + 1;
    var d = today.getDate();
    var H = today.getHours();
    var M = today.getMinutes();
    var S = today.getSeconds();
    return h + "-" + m + "-" + d + " " + H + ":" + M + ":" + S;
}
function goPic() {
    location.href = "picture";
}


