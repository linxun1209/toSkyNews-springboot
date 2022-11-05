var userName=document.querySelector('.userName');
var userAge=document.querySelector('.userAge');
var userSex=document.querySelector('.userSex');
var briefText=document.querySelector('.briefText');
var inputName=document.querySelector('.inputName');
var inputAge=document.querySelector('.inputAge');
var inputSex=document.querySelector('.inputSex');
var inputBriefText=document.querySelector('.inputBriefText');
var passBox=document.querySelector('.passBox');
var user_id=localStorage.getItem('user_id');
var successText=document.querySelector('.successText');
var inputMail=document.querySelector('.inputMail');
var userMail=document.querySelector('.userMail');
var judge=document.querySelector('.judge');
var passBefore=document.querySelector('.passBefore');
var passQuit=document.querySelector('.passQuit');
var passNext=document.querySelector('.passNext');
var changeHead=document.querySelector('.changeHead');
var userHead=document.querySelectorAll('.userHead');
var input=document.querySelectorAll('input');
var inputBriefText=document.querySelector('.inputBriefText');
//两个盒子放缩效果
var changed=document.querySelector('.changed');
var changing=document.querySelector('.changing');
changed.addEventListener('click',function(){
    changed.style.transform= ('scale(1)');
    changing.style.transform= ('scale(.7)');
    passBox.style.transform= ('scale(.7)');
})
changing.addEventListener('click',function(){
    changing.style.transform= ('scale(1)');
    changed.style.transform= ('scale(.7)');
    passBox.style.transform= ('scale(.7)');
})
passBox.addEventListener('click',function(){
    changing.style.transform= ('scale(.7)');
    changed.style.transform= ('scale(.7)');
    passBox.style.transform= ('scale(1)');
})
$.post('http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}', {
        "userID": localStorage.getItem('user_id')
    },
    function(date) {
        sessionStorage.setItem("account", date.account);
    })


//修改成功弹窗
var keepSuccess=document.querySelector('.keepSuccess');
var keepBefore=document.querySelector('.keepBefore');
var keepBtn=document.querySelector('.keepBtn');
var okBtn=document.querySelector('.okBtn');
var quit=document.querySelector('.quit');
var next=document.querySelector('.next');
var nameFill=document.querySelector('.nameFill');
// var install=document.querySelectorAll('.install');
// for(let i=0;i<install.length;i++){
//     if(install[i].innerHTML==''){
//         install[i].innerHTML='未设置';
//     }
// }

var ageFill=document.querySelector('.ageFill');
var mailFill=document.querySelector('.mailFill');
sameInfo();
// keepBtn.addEventListener('click',function(){
    var inputAge=document.querySelector('.inputAge');
    // console.log(ageJudge);
    var mailLimit=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var mailJudge=mailLimit.test(inputMail.value);
    inputName.addEventListener('blur',function(){
        var nameLimit=/(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
        var nameJudge=nameLimit.test(inputName.value);
        if(inputName.value==''){
            nameFill.innerHTML='昵称不能为空';
            nameFill.style.display='inline';
        }
        else if(nameJudge==false){
            nameFill.innerHTML='昵称不合格，请重新设置';
            nameFill.style.display='inline';
        }else{
            nameFill.style.display='none';
        }
    })
    inputName.addEventListener('focus',function(){
        nameFill.style.display='none';
    })
    inputAge.addEventListener('blur',function(){
        var ageLimit=/^((1[0-1])|[1-9])?\d$/;
        var ageJudge=ageLimit.test(inputAge.value);
        if(inputAge.value==''){
            ageFill.innerHTML='年龄不能为空';
            ageFill.style.display='inline';
        }else if(ageJudge==false){
            ageFill.innerHTML='年龄设置不规范';
            ageFill.style.display='inline';
        }else{
            ageFill.style.display='none';
        }
    })
    inputAge.addEventListener('focus',function(){
        ageFill.style.display='none';
    })
    inputMail.addEventListener('blur',function(){
        var mailLimit=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        var mailJudge=mailLimit.test(inputMail.value);
        if(inputMail.value==''){
            mailFill.innerHTML='邮箱能为空'
            mailFill.style.display='inline';
        }else if(mailJudge==false){
            mailFill.innerHTML='邮箱不规范，请重新填写'
            mailFill.style.display='inline';
        }else{
            mailFill.style.display='none';   
        }
    })
keepBtn.addEventListener('click',function(){
    var mailLimit=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    var mailJudge=mailLimit.test(inputMail.value);
    var ageLimit=/^((1[0-1])|[1-9])?\d$/;
    var ageJudge=ageLimit.test(inputAge.value);
    var nameLimit=/(^[\u4e00-\u9fa5]{1}[\u4e00-\u9fa5\.·。]{0,8}[\u4e00-\u9fa5]{1}$)|(^[a-zA-Z]{1}[a-zA-Z\s]{0,8}[a-zA-Z]{1}$)/;
    var nameJudge=nameLimit.test(inputName.value);
    if(nameJudge==true&&ageJudge==true&&mailJudge==true){
        keepBefore.style.height='200px';
        inputReadOnly();
        next.addEventListener('click',function(){
            keepSuccess.style.height='200px';
            keepBefore.style.height='0';
            inputReadOnly();
            $.ajax({
                type:'post',
                url:'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
                data:{
                    userID:user_id
                },
                success:function(res){
                    // console.log(res);
                    $.ajax({
                        type:'post',
                        url:'http://localhost:8080/ToSkyNews_war_exploded/user/updateUser',
                        data:{
                            username:inputName.value,
                            age:inputAge.value,
                            sex:inputSex.value,
                            signature:inputBriefText.value,
                            password:res.password,
                            userID:res.userID,
                            account:res.account,
                            telephone:res.telephone
                        },
                        success:function(res){
                            if(res.data=='修改成功'){
                                successText.innerHTML='信息修改成功！';
                                okBtn.addEventListener('click',function(){
                                    keepSuccess.style.height='0';
                                    inputChange();
                                })
                                sameInfo();
                            }else{
                                successText.innerHTML='信息修改失败！';
                                okBtn.addEventListener('click',function(){
                                    keepSuccess.style.height='0';
                                })
                            }
                            
                        },
                        error:function(err){
                            // console.log(err);
                        }
                    })
                },
                error:function(err){
                    // console.log(err);
                }
            })
            
        })
    }
   
})
okBtn.addEventListener('click',function(){
    keepSuccess.style.height='0';
    inputChange();
})
quit.addEventListener('click',function(){
    keepBefore.style.height='0';
    inputChange();
})



//使两个盒子中的信息一致
function sameInfo(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
        data:{
            userID:user_id
        },
        success:function(res){
            // console.log(res);
            inputName.value=res.username;
            inputAge.value=res.age;
            inputSex.value=res.sex;
            inputBriefText.value=res.signature;
            changeHead.style.backgroundImage=`url(${res.picture})`;
            userName.innerHTML=inputName.value;
            userAge.innerHTML=inputAge.value;
            if(inputSex.value==''){
                userSex.innerHTML='未设置';
            }else{
                userSex.innerHTML=inputSex.value;
            }
            briefText.innerHTML=inputBriefText.value;
            inputMail.value=res.telephone;
            userMail.innerHTML=inputMail.value;
            userHead[1].style.backgroundImage=`url(${res.picture})`;
            userHead[0].style.backgroundImage=`url(${res.picture})`;

        },
        error:function(err){
            console.log(err);
        }
    })
    
}
//空值判断
var fill=document.querySelectorAll('.fill');
var fillText=document.querySelectorAll('.fillText');
var changePassBtn=document.querySelector('.changePassBtn');
var newPass=document.querySelector('#newPass');
var passFill=document.querySelector('#passFill');
var surePass=document.querySelector('#surePass');
var oldPass=document.querySelector('#oldPass');
var inputAccount=document.querySelector('#inputAccount');
var surePassText=document.querySelector('#surePassText');
var accountText=document.querySelector('#accountText');
var oldText=document.querySelector('#oldText');
inputAccount.addEventListener('blur',function(){
    if(inputAccount.value==''){
        accountText.style.display='inline';
    }else{
        accountText.style.display='none';
    }
})
inputAccount.addEventListener('focus',function(){
    accountText.style.display='none';
})
oldPass.addEventListener('blur',function(){
    if(oldPass.value==''){
        oldText.style.display='inline';
    }else{
        oldText.style.display='none';
    }
})
oldPass.addEventListener('focus',function(){
    oldText.style.display='none';
})
newPass.addEventListener('blur',function(){
    var passLimit=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    var passJudge=passLimit.test(newPass.value);
    if(newPass.value==''){
        passFill.innerHTML='新密码不能为空';
        passFill.style.display='inline';
    }else if(passJudge==false){
        passFill.innerHTML='新密码不符合规范';
        passFill.style.display='inline';
    }else{
        passFill.style.display='none';
    }
})
newPass.addEventListener('focus',function(){
    passFill.style.display='none';
})
surePass.addEventListener('blur',function(){
    if(newPass.value==''){
        surePassText.innerHTML='请先输入新密码';
        surePassText.style.display='inline';
    }else if(surePass.value==''){
        surePassText.innerHTML='请确认新密码';
        surePassText.style.display='inline';
    }else if(surePass.value!=newPass.value){
        surePassText.innerHTML='两次输入密码不一致';
        surePassText.style.display='inline';
    }else{
        surePassText.style.display='none';
    }
})
surePass.addEventListener('focus',function(){
    surePassText.style.display='none';
})
changePassBtn.addEventListener('click',function(){
    var passLimit=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    var passJudge=passLimit.test(newPass.value);
    if(inputAccount.value==''){
        accountText.style.display='inline';
    }
    if(oldPass.value==''){
        oldText.style.display='inline';
    }
    if(newPass.value==''){
        passFill.style.display='inline';
    }
    if(surePass.value==''){
        surePassText.style.display='inline';
    }
    if(inputAccount.value!=''&&oldPass.value!=''&&passJudge==true&&newPass.value==surePass.value){
            passBefore.style.height='200px';
            passNext.addEventListener('click',function(){
                passBefore.style.height=0;
                $.ajax({
                    type:'post',
                    url:'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
                    data:{
                        userID:user_id
                    },
                    success:function(da){
                        console.log(da);
                        if(da.account!=inputAccount.value){
                            successText.innerHTML='账号输入错误!';
                            keepSuccess.style.height='200px';
                            inputReadOnly();
                        }else if(oldPass.value!=da.password){
                            successText.innerHTML='原密码不正确!';
                            keepSuccess.style.height='200px';
                            inputReadOnly();
                            
                        }else{
                            $.ajax({
                                type:'post',
                                url:'http://localhost:8080/ToSkyNews_war_exploded/user/updateUser',
                                data:{
                                    username:da.username,
                                    age:da.age,
                                    sex:da.sex,
                                    signature:da.signature,
                                    password:surePass.value,
                                    userID:user_id,
                                    account:inputAccount.value,
                                    telephone:da.telephone
                                },
                                success:function(suc){
                                    console.log(suc);
                                    successText.innerHTML='修改成功!';
                                    keepSuccess.style.height='200px';
                                    inputReadOnly();
                                    okBtn.addEventListener('click',function(){
                                        keepSuccess.style.height=0;
                                        inputChange();
                                    })
                                    
                                },
                                error:function(er){
                                    console.log(er);
                                }
                
                            })  
                         }
                        
                        
                    },
                    error:function(err){
                        console.log(err);
                    }
                })
            })
            passQuit.addEventListener('click',function(){
                passBefore.style.height=0;
            })
    }
})

//密码的显示与隐藏
var eyeOpen1=document.querySelector('#eyeOpen_1');
var eyeClose1=document.querySelector('#eyeClose_1');
var eyeOpen2=document.querySelector('#eyeOpen_2');
var eyeClose2=document.querySelector('#eyeClose_2');
var eyeOpen3=document.querySelector('#eyeOpen_3');
var eyeClose3=document.querySelector('#eyeClose_3');
eyeClose1.addEventListener('click',function(){
    eyeClose1.style.display='none';
    eyeOpen1.style.display='block';
    oldPass.type='text';
})
eyeOpen1.addEventListener('click',function(){
    eyeOpen1.style.display='none';
    eyeClose1.style.display='block';
    oldPass.type='password';
})
eyeClose2.addEventListener('click',function(){
    eyeClose2.style.display='none';
    eyeOpen2.style.display='block';
    newPass.type='text';
})
eyeOpen2.addEventListener('click',function(){
    eyeOpen2.style.display='none';
    eyeClose2.style.display='block';
    newPass.type='password';
})
eyeClose3.addEventListener('click',function(){
    eyeClose3.style.display='none';
    eyeOpen3.style.display='block';
    surePass.type='text';
})
eyeOpen3.addEventListener('click',function(){
    eyeOpen3.style.display='none';
    eyeClose3.style.display='block';
    surePass.type='password';
})

//跳转到找回密码
var forgetPass=document.querySelector('.forgetPass');
forgetPass.addEventListener('click',function(){
    localStorage.setItem("tolook", '0');
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/forgetPass");
})
//wzz添加的上传头像
function checkFile(img) {
    let file = img;
    console.log(img);
    if (file == null || file == "") {
        successText.innerHTML = "请选择要上传的文件!";
            keepSuccess.style.height = '200px';
            inputReadOnly();
            okBtn.addEventListener('click', function() {
                keepSuccess.style.height = 0;
                inputChange();
            })
        return false;
    }
    //定义允许上传的文件类型
    var allow_ext = ".jpg|.png|.gif";
    //提取上传文件的类型
    var ext_name = file.substring(file.lastIndexOf("."));
    //判断上传文件类型是否允许上传
    if (allow_ext.indexOf(ext_name + "|") == -1) {
        successText.innerHTML =  "该文件不允许上传，请上传" + allow_ext + "类型的文件,当前文件类型为：" + ext_name;
            keepSuccess.style.height = '200px';
            inputReadOnly();
            okBtn.addEventListener('click', function() {
                keepSuccess.style.height = 0;
                inputChange();
            })
        return false;
    }
}
function fileChange() {
    var formData = new FormData();
    let headname=$('#file')[0].value;
    let ishead=checkFile(headname);
   if(ishead!=false){
       let changemyhead=new Promise((resolve,reject)=>{
           formData.append('profile1', $('#file')[0].files[0]);
           formData.append('account', sessionStorage.getItem("account"));
           resolve();
       });
       changemyhead.then(()=>{
           $.ajax({
               // 类型
               type: "POST",
               url: "http://localhost:8080/ToSkyNews_war_exploded/saveUserProfile",
               data: formData,
               dataType: "json",
               contentType: false,
               processData: false,
               success: function(date) {
                   console.log(date);
                   if (date.message == "成功并返回数据") {
                       successText.innerHTML = '上传头像成功！!';
                       keepSuccess.style.height = '200px';
                       inputReadOnly();
                       okBtn.addEventListener('click', function() {
                           keepSuccess.style.height = 0;
                           inputChange();
                       })
                   } else {
                       successText.innerHTML = '上传头像失败，请重试！';
                       keepSuccess.style.height = '200px';
                       inputReadOnly();
                       okBtn.addEventListener('click', function() {
                           keepSuccess.style.height = 0;
                           inputChange();
                       })
                   }
                   console.log(date.data.file.data);
                   changeHead.style.backgroundImage = `url(${date.data.file.data})`;
                   for (let i = 0; i < userHead.length; i++) {
                       userHead[i].style.backgroundImage = `url(${date.data.file.data})`;
                   }
               },
               error: function(returndata) {
                   console.log(returndata);
               }
           })
       })
   }
}
//所有input框不可修改
function inputReadOnly(){
    for(let i=0;i<input.length;i++){
        input[i].setAttribute('readonly','readonly');
        inputBriefText.setAttribute('readonly','readonly');
    }
}
//所有input框可修改
function inputChange(){
    for(let i=0;i<input.length;i++){
        input[i].removeAttribute('readonly');
        inputBriefText.removeAttribute('readonly');
    }
}
if (localStorage.getItem("tolookmy") == '0') {
    setTimeout(function () {
        window.location.reload();
    }, 60);
    localStorage.setItem("tolookmy", '1');
}

