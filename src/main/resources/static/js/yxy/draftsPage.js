var user_id=localStorage.getItem('user_id');
var list=document.querySelector('.list');
var tipText=document.querySelector('.tipText');
var tip=document.querySelector('.tip');
var tipOk=document.querySelector('.tipOk');
var tipNo=document.querySelector('.tipNo');
var successOk=document.querySelector('.successOk');
var allChoose=document.querySelector('.allChoose');
var cancelAll=document.querySelector('.cancelAll');
var massDelete=document.querySelector('.massDelete');
var deleteChoose=document.querySelector('.deleteChoose');
var reset=document.querySelector('.reset');
var find=document.querySelector('.find');
//弹窗
var chooseCover=document.querySelector('.chooseCover');
function chooseAppear(text){
    tipText.innerHTML=text;
    chooseCover.style.display='flex';
    chooseCover.style.opacity=1;
    tip.style.height='200px';
}
function chooseFade(){
    chooseCover.style.display='none';
    chooseCover.style.opacity=0;
    tip.style.height='0px';
}
var sureCover=document.querySelector('.sureCover');
var successText=document.querySelector('.successText');
var successTip=document.querySelector('.successTip');
function sureAppear(text){
    successText.innerHTML=text;
    sureCover.style.display='flex';
    sureCover.style.opacity=1;
    successTip.style.height='200px';
}
function sureFade(){
    sureCover.style.display='none';
    sureCover.style.opacity=0;
    successTip.style.height='0px';
}

//页数
//总页数
var empty=document.querySelector('.empty');
num();
function num(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/user/drafts',
        data:{
            reside:user_id
        },
        success:function(res){
            console.log(res.data.length);
            if(res.data.length%6==0){
                allPage.innerHTML=res.data.length/6; 
            }else if(res.data.length==0){
                list.style.display='none';
                empty.style.display='flex';
            }else if(res.data.length%6!=0){
                allPage.innerHTML=Math.ceil(res.data.length/6);
            }
        },
        error:function(err){
            console.log(err);
        }
    })
}

var pageNum=document.querySelector('.pageNum');
var lastPage=document.querySelector('.lastPage');
var nextPage=document.querySelector('.nextPage');
var allPage=document.querySelector('.allPage');
var deleteChoose=document.querySelector('.deleteChoose');
lastPage.addEventListener('click',function(){
    lastPage.setAttribute('disabled','disabled');
    setTimeout(function(){
        lastPage.removeAttribute('disabled');
    },100);
    if(pageNum.innerHTML==1){
        sureAppear("已经是第一页了");
        successOk.addEventListener('click',function(){
            sureFade();
        })
    }else{
        cancelAll.style.display='none';
        deleteChoose.style.display='none';
        reset.style.display='none';
        allChoose.style.display='none';
        massDelete.style.display='inline-block';
        pageNum.innerHTML=pageNum.innerHTML*1-1;
        draftsContent((pageNum.innerHTML*1-1)*6);
    }
})
nextPage.addEventListener('click',function(){
    nextPage.setAttribute('disabled','disabled');
    setTimeout(function(){
        nextPage.removeAttribute('disabled');
    },100);
    if(pageNum.innerHTML==allPage.innerHTML){
        sureAppear("已经是最后一页了");
        successOk.addEventListener('click',function(){
            sureFade();
        })
    }else{
        cancelAll.style.display='none';
        deleteChoose.style.display='none';
        reset.style.display='none';
        allChoose.style.display='none';
        massDelete.style.display='inline-block';
        pageNum.innerHTML=pageNum.innerHTML*1+1;
        draftsContent((pageNum.innerHTML*1-1)*6);
    }
})

//渲染草稿箱内容
draftsContent(0);
var empty=document.querySelector('.empty');
var nav=document.querySelector('.nav');
var findBox=document.querySelector('.findBox');
function draftsContent(num){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/user/disDrafts',
        data:{
            count:6,
            reside:user_id,
            start:num,
            status:-2
        },
        success:function(res){
            console.log(res.data);
            list.innerHTML='';
            if(res.data=='输入错误'){
                empty.style.display='flex';
                list.style.display='none';
                find.style.display='none';
                allChoose.style.display='none';
                cancelAll.style.display='none';
                deleteChoose.style.display='none';
                massDelete.style.display='none';
                reset.style.display='none';
                findPage.style.display='none';
                page.style.display='none';
                findBox.style.display='none';
            }else{
                findBox.style.display='flex';
                empty.style.display='none';
                list.style.display='flex';
                btn_1.style.display='flex';
                page.style.display='flex';
                for(let i=0;i<res.data.length;i++){
                    var li=`
                        <li class="draftItem" textID="">
                            <span class="noChoose"></span>
                            <div class="itemContent">
                                <div class="title">${res.data[i].postsName}</div>
                                <div class="lastTime">上次修改的时间：<span class="time">2${res.data[i].picture}</span></div>
                            </div>
                            <div class="itemHandle">
                                <button class="itemChange">修改</button>
                                <button class="itemDelete">删除</button>
                            </div>
                        </li>`
                    list.insertAdjacentHTML('beforeend',li);
                    var draftItem=document.querySelectorAll('.draftItem');
                    var itemDelete=document.querySelectorAll('.itemDelete');
                    draftItem[i].textID=res.data[i].postsID;
                     //获取页数
                    num();
                    function num(){
                        $.ajax({
                            type:'post',
                            url:'http://localhost:8080/ToSkyNews_war_exploded/user/drafts',
                            data:{
                                reside:user_id
                            },
                            success:function(res){
                                console.log(res.data.length);
                                if(res.data.length%6==0){
                                    allPage.innerHTML=res.data.length/6; 
                                }else if(res.data.length==0){
                                    list.style.display='none';
                                    empty.style.display='flex';
                                }else if(res.data.length%6!=0){
                                    allPage.innerHTML=Math.ceil(res.data.length/6);
                                }
                            },
                            error:function(err){
                                console.log(err);
                            }
                        })
                    }
                   
                   setTimeout(function(){
                        //删除草稿
                        itemDelete[i].addEventListener('click',function(e){
                            e.stopPropagation();
                            chooseAppear("确定要删除吗？");
                            tipNo.addEventListener('click',function(){
                                chooseFade();
                            })
                            tipOk.addEventListener('click',function(){
                                chooseFade();
                                $.ajax({
                                    type:'post',
                                    url:'http://localhost:8080/ToSkyNews_war_exploded/posts/deletePosts',
                                    data:{
                                        postsID:draftItem[i].textID
                                    },
                                    success:function(suc){
                                        console.log(suc);
                                        var pageNum=document.querySelector('.pageNum');
                                        num();
                                        if(allPage.innerHTML*1>=pageNum.innerHTML*1){
                                            draftsContent((pageNum.innerHTML*1-1)*6);
                                            cancelAll.style.display='none';
                                            deleteChoose.style.display='none';
                                            reset.style.display='none';
                                            allChoose.style.display='none';
                                            massDelete.style.display='inline-block';
                                        }else{
                                            draftsContent((allPage.innerHTML*1-1)*6);
                                            cancelAll.style.display='none';
                                            deleteChoose.style.display='none';
                                            reset.style.display='none';
                                            allChoose.style.display='none';
                                            massDelete.style.display='inline-block';
                                        }
                                        sureAppear("删除成功！");
                                        successOk.addEventListener('click',function(){
                                            sureFade();
                                        })
                                        // list.removeChild(draftItem[i]);
                                    },
                                    error:function(err){
                                        console.log(err);
                                    }
                                })
                            })
                        },false)
                        //修改草稿
                        var itemChange=document.querySelectorAll('.itemChange');
                        itemChange[i].addEventListener('click',function(e){
                            e.stopPropagation();
                            localStorage.setItem('article_id',draftItem[i].textID);
                            // localStorage.setItem("tolook", '0');
                            window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/publish-change?article_id=${draftItem[i].textID}`);
                        },false)
                   },60)
                    
                }
            }
        },
        error:function(err){
            console.log(err);
        }
    })    
}


window.onload=function(){
    var allChoose=document.querySelector('.allChoose');
    var cancelAll=document.querySelector('.cancelAll');
    var massDelete=document.querySelector('.massDelete');
    var deleteChoose=document.querySelector('.deleteChoose');
    var reset=document.querySelector('.reset');
    var itemDelete=document.querySelectorAll('.itemDelete');
    
     //操作
     var chooseBox=document.querySelectorAll('.chooseBox');
     //批量选择
     massDelete.addEventListener('click',function(){
        var noChoose=document.querySelectorAll('.noChoose');
        var itemDelete=document.querySelectorAll('.itemDelete');
         massDelete.style.display='none';
         deleteChoose.style.display='inline-block';
         allChoose.style.display='inline-block';
         cancelAll.style.display='inline-block';
         reset.style.display='inline-block';
         for(let i=0;i<noChoose.length;i++){
             noChoose[i].style.display='inline-block';
             itemDelete[i].style.display='none';
             noChoose[i].addEventListener('click',function(){
                console.log('点击')
                 if(noChoose[i].style.backgroundColor=='rgb(100, 166, 247)'){
                     noChoose[i].style.backgroundColor='rgb(255, 255, 255)';
                     console.log(noChoose[i].style.backgroundColor)
                 }else{
                     noChoose[i].style.backgroundColor='rgb(100, 166, 247)';
                     console.log(noChoose[i].style.backgroundColor);
                 }
            })   
         }
         
     })
     //全选
     allChoose.addEventListener('click',function(){
        var noChoose=document.querySelectorAll('.noChoose');
         for(let i=0;i<noChoose.length;i++){
            noChoose[i].style.backgroundColor='rgb(100, 166, 247)';
         }
     })
    //取消全选
     cancelAll.addEventListener('click',function(){
        var noChoose=document.querySelectorAll('.noChoose');
         for(let i=0;i<noChoose.length;i++){
            noChoose[i].style.backgroundColor='rgb(255, 255, 255)';
         }
     })
     //重置
     reset.addEventListener('click',function(){
        var noChoose=document.querySelectorAll('.noChoose');
        var itemDelete=document.querySelectorAll('.itemDelete');
         allChoose.style.display='none';
         cancelAll.style.display='none';
         reset.style.display='none';
         deleteChoose.style.display='none';
         massDelete.style.display='inline-block';
         for(let i=0;i<noChoose.length;i++){
            itemDelete[i].style.display='inline-block';
            noChoose[i].style.backgroundColor='rgb(255, 255, 255)';
         }
     })
     
    
    // function onclickFun(){
         //批量删除草稿
        deleteChoose.addEventListener('click',function(){
            var arr=new Array();
            var  draftItem=document.querySelectorAll('.draftItem') ;
            var noChoose=document.querySelectorAll('.noChoose');
            for(let j=0;j<draftItem.length;j++){
                if(noChoose[j].style.backgroundColor=='rgb(100, 166, 247)'){
                    arr.push(draftItem[j].textID);
                    // console.log('我被选择')
                }
                if(arr[j]==undefined){
                    arr.slice(j);
                }
                
            }
        
            sureFade();
            if(arr.length==0){
                sureAppear('请选择要删除的草稿');
                successOk.addEventListener('click',function(){
                    sureFade();
                })
            }else{
                chooseAppear("确定要删除吗？");
                tipNo.addEventListener('click',function(){
                    chooseFade();
                })
                tipOk.addEventListener('click',function(){
                    chooseFade();
                    let str='?List<Integer>list=';
                    for(let i=0;i<arr.length;i++){
                        console.log(arr[i]);
                        if(i==arr.length-1){
                            str+=arr[i];
                        }else{
                            str+=arr[i]+'&List<Integer>list=';
                        }
                        
                    }
                    console.log(str);
                    $.ajax({
                        type:'post',
                        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteBatchPosts'+str,
                        // data:{
                        // },
                        success:function(res_1){
                            console.log(res_1);
                            sureAppear("删除成功！");
                            successOk.addEventListener('click',function(){
                                sureFade();
                            })
                            var pageNum=document.querySelector('.pageNum');
                            num();
                            if(allPage.innerHTML*1>=pageNum.innerHTML*1){
                                draftsContent((pageNum.innerHTML*1-1)*6);
                                cancelAll.style.display='none';
                                deleteChoose.style.display='none';
                                reset.style.display='none';
                                allChoose.style.display='none';
                                massDelete.style.display='inline-block';
                                // cancelAll.style.display='none';
                                // deleteChoose.style.display='none';
                                // reset.style.display='none';
                                // allChoose.style.display='none';
                                // massDelete.style.display='inline-block';
                            }else{
                                draftsContent((allPage.innerHTML*1-1)*6);
                                cancelAll.style.display='none';
                                deleteChoose.style.display='none';
                                reset.style.display='none';
                                allChoose.style.display='none';
                                massDelete.style.display='inline-block';
                            }
                            
                        },
                        error:function(err){
                            console.log(err);
        
                        }
                    })
                })
                
            }      
            
        })
       //搜索页数
       var searchPage=document.querySelector('.searchPage');
       var sure=document.querySelector('.sure');
       sure.addEventListener('click',function(){
           if(searchPage.value==''){
               sureAppear('请输入要查询的页数');
               successOk.addEventListener('click',function(){
                   sureFade();
               })
           }else if(searchPage.value*1>allPage.innerHTML*1||searchPage.value*1<=0){
               sureAppear('请输入有效页数');
               successOk.addEventListener('click',function(){
                   sureFade();
               })
           }else{
                cancelAll.style.display='none';
                deleteChoose.style.display='none';
                reset.style.display='none';
                allChoose.style.display='none';
                massDelete.style.display='inline-block';
                pageNum.innerHTML=searchPage.value;
                draftsContent((pageNum.innerHTML*1-1)*6);
           }
       })
       var findAllChoose=document.querySelector('.findAllChoose');
       var findCancelAll=document.querySelector('.findCancelAll');
       var findMassDelete=document.querySelector('.findMassDelete');
       var findDeleteChoose=document.querySelector('.findDeleteChoose');
       var findReset=document.querySelector('.findReset');
        //操作
       
        // var findChooseBox=document.querySelectorAll('.findChooseBox');
        // for(let k=0;k<findChooseBox.length;k++){
        //     findChooseBox[k].addEventListener('click',function(){
        //         if(findChooseBox[k].hasAttribute('checked')==true){
        //             findChooseBox[k].removeAttribute('checked');
        //             console.log('移除了');
        //         }else{
        //             findChooseBox[k].setAttribute('checked','checked');
        //             console.log('添加了');
        //         }
        //     })
        // }
        
        findMassDelete.addEventListener('click',function(){
           var findChoose=document.querySelectorAll('.findChoose');
           var findItemDelete=document.querySelectorAll('.findItemDelete');
           findMassDelete.style.display='none';
           lastInfo.style.display='none';
           findDeleteChoose.style.display='inline-block';
           findAllChoose.style.display='inline-block';
           findCancelAll.style.display='inline-block';
           findReset.style.display='inline-block';
           for(let i=0;i<findChoose.length;i++){
               findItemDelete[i].style.display='none';
               findChoose[i].style.display='inline-block';
               findChoose[i].addEventListener('click',function(){
                    console.log('点击')
                    if(findChoose[i].style.backgroundColor=='rgb(100, 166, 247)'){
                        findChoose[i].style.backgroundColor='rgb(255, 255, 255)';
                        console.log(findChoose[i].style.backgroundColor)
                    }else{
                        findChoose[i].style.backgroundColor='rgb(100, 166, 247)';
                        console.log(findChoose[i].style.backgroundColor);
                    }
            })   
           }
        })
        findAllChoose.addEventListener('click',function(){
           var findChoose=document.querySelectorAll('.findChoose');
            for(let i=0;i<findChoose.length;i++){
               findChoose[i].style.backgroundColor='rgb(100, 166, 247)';
            }
        })
        findCancelAll.addEventListener('click',function(){
           var findChoose=document.querySelectorAll('.findChoose');
            for(let i=0;i<findChoose.length;i++){
               findChoose[i].style.backgroundColor='rgb(255, 255, 255)';
            }
        })
        findReset.addEventListener('click',function(){
           var findChoose=document.querySelectorAll('.findChoose');
           var findItemDelete=document.querySelectorAll('.findItemDelete');
           findAllChoose.style.display='none';
           findCancelAll.style.display='none';
           findReset.style.display='none';
           lastInfo.style.display='inline-block';
           findDeleteChoose.style.display='none';
           findMassDelete.style.display='inline-block';
           for(let i=0;i<findChoose.length;i++){
               findItemDelete[i].style.display='inline-block';
               findChoose[i].style.backgroundColor='rgb(255, 255, 255)';
           }
        })




        findDeleteChoose.addEventListener('click',function(){
            var arr=new Array();
            var  draftItem=document.querySelectorAll('.draftItem') ;
            var findChoose=document.querySelectorAll('.findChoose');
            for(let j=0;j<findChoose.length;j++){
                if(findChoose[j].style.backgroundColor=='rgb(100, 166, 247)'){
                    arr.push(draftItem[j].textID);
                    // console.log('我被选择')
                }
                if(arr[j]==undefined){
                    arr.slice(j);
                }
                
            }
        
            sureFade();
            if(arr.length==0){
                sureAppear('请选择要删除的草稿');
                successOk.addEventListener('click',function(){
                    sureFade();
                })
            }else{
                chooseAppear("确定要删除吗？");
                tipNo.addEventListener('click',function(){
                    chooseFade();
                })
                tipOk.addEventListener('click',function(){
                    chooseFade();
                    let str='?List<Integer>list=';
                    for(let i=0;i<arr.length;i++){
                        console.log(arr[i]);
                        if(i==arr.length-1){
                            str+=arr[i];
                        }else{
                            str+=arr[i]+'&List<Integer>list=';
                        }
                        
                    }
                    console.log(str);
                    $.ajax({
                        type:'post',
                        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteBatchPosts'+str,
                        // data:{
                        // },
                        success:function(res_1){
                            console.log(res_1);
                            sureAppear("删除成功！");
                            successOk.addEventListener('click',function(){
                                sureFade();
                            })
                            var findPageNum=document.querySelector('.findPageNum');
                            num();
                            if(findAllPage.innerHTML*1>=findPageNum.innerHTML*1){
                                findVague(findPageNum.innerHTML*1);
                                findCancelAll.style.display='none';
                                findDeleteChoose.style.display='none';
                                findReset.style.display='none';
                                lastInfo.style.display='inline-block';
                                findAllChoose.style.display='none';
                                findMassDelete.style.display='inline-block';
                                // cancelAll.style.display='none';
                                // deleteChoose.style.display='none';
                                // reset.style.display='none';
                                // allChoose.style.display='none';
                                // massDelete.style.display='inline-block';
                            }else{
                                findVague(findAllPage.innerHTML*1);
                                findCancelAll.style.display='none';
                                findDeleteChoose.style.display='none';
                                findReset.style.display='none';
                                findAllChoose.style.display='none';
                                findMassDelete.style.display='inline-block';
                            }
                            
                        },
                        error:function(err){
                            console.log(err);
        
                        }
                    })
                })
                
            }      
            
        })
    //     findDeleteChoose.addEventListener('click',function(){
    //         var brr=new Array();
    //         var  draftItem=document.querySelectorAll('.draftItem') ;
    //         var findChooseBox=document.querySelectorAll('.findChooseBox');
    //         // sureFade();
    //         // if(brr.length==0){
    //         //     sureAppear('请选择要删除的草稿');
    //         //     successOk.addEventListener('click',function(){
    //         //         sureFade();
    //         //     })
    //         // }else{
    //             chooseAppear("确定要删除吗？");
    //             tipNo.addEventListener('click',function(){
    //                 chooseFade();
    //             })
    //             tipOk.addEventListener('click',function(){
    //                 chooseFade();
    //                 for(let j=0;j<draftItem.length;j++){
    //                     console.log(findChooseBox[j].hasAttribute('checked'));
    //                     if(findChooseBox[j].hasAttribute('checked')==true){
    //                         brr.push(draftItem[j].textID);
    //                         // console.log('我被选择')
    //                     }
    //                     if(brr[j]==undefined){
    //                         brr.slice(j);
    //                     }
    //                 }
    //                 let str='?List<Integer>list=';
    //                 for(let i=0;i<brr.length;i++){
    //                     console.log(brr[i]);
    //                     if(i==brr.length-1){
    //                         str+=brr[i];
    //                     }else{
    //                         str+=brr[i]+'&List<Integer>list=';
    //                     }
                        
    //                 }
    //                 console.log(str);
    //                 $.ajax({
    //                     type:'post',
    //                     url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteBatchPosts'+str,
    //                     // data:{
    //                     // },
    //                     success:function(res_1){
    //                         sureAppear("删除成功！");
    //                         successOk.addEventListener('click',function(){
    //                             sureFade();
    //                         })
    //                         console.log(res_1);
    //                         var findPageNum=document.querySelector('.findPageNum');
    //                         num();
    //                         if(findAllPage.innerHTML*1>=findPageNum.innerHTML*1){
    //                             findVague(findPageNum.innerHTML*1);
    //                             findCancelAll.style.display='none';
    //                             findDeleteChoose.style.display='none';
    //                             findReset.style.display='none';
    //                             lastInfo.style.display='inline-block';
    //                             findAllChoose.style.display='none';
    //                             findMassDelete.style.display='inline-block';
                               
    //                         }else{
    //                             findVague(findAllPage.innerHTML*1);
    //                             findCancelAll.style.display='none';
    //                             findDeleteChoose.style.display='none';
    //                             findReset.style.display='none';
    //                             findAllChoose.style.display='none';
    //                             findMassDelete.style.display='inline-block';
    //                         }
                            
    //                     },
    //                     error:function(err){
    //                         console.log(err);
        
    //                     }
    //                 })
    //             })
                
    //         // } 
        
    // })
}
