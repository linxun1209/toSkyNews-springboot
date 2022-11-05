var userName=document.querySelectorAll('.userName');
var briefText=document.querySelector('.briefText');
var myWorksNav=document.querySelector('.myWorksNav');
var collectWorkNav=document.querySelector('.collectWorkNav');
var haveWorks=document.querySelector('.haveWorks');
var empty=document.querySelector('.empty');
var user_id=localStorage.getItem('user_id');
var tip=document.querySelector('.tip');
var deleteText=document.querySelectorAll('.deleteText')
var tipOk=document.querySelector('.tipOk');
var tipNo=document.querySelector('.tipNo');
var successTip=document.querySelector('.successTip');
var successOk=document.querySelector('.successOk');
var workTitle=document.querySelectorAll('.workTitle');
var tipText=document.querySelector('.tipText');
var successText=document.querySelector('.successText');
var account=document.querySelector('.account');
var userHead=document.querySelector('.userHead');
var workNum=document.querySelector('.workNum');
var collectNum=document.querySelector('.collectNum');
var moreWorks=document.querySelector('.moreWorks');
var moreCollect=document.querySelector('.moreCollect');
var drafts=document.querySelector('.drafts');
postNum();
function postNum(){
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionByUserID',
        data:{
            userID:user_id
        },
        success:function(suc_1){
             collectNum.innerHTML=suc_1.length;
        },
        error:function(err){
            console.log(err);
        }
    })
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/posts/queryPostsByUserID',
        data:{
            userID:user_id
        },
        success:function(suc_1){
            //  console.log(suc_1.length);
             workNum.innerHTML=suc_1.length;
             if(workNum.innerHTML=='0'){
                console.log(workNum.innerHTML);
                moreWorks.style.display='none';
                moreCollect.style.display='none';
                haveWorks.style.display='none';
                empty.style.display='flex';
             }else{
                console.log(workNum.innerHTML);
                empty.style.display='none';
                moreWorks.style.display='inline-block';
                moreCollect.style.display='none';
                haveWorks.style.display='inline-block';
                more();
             }
        },
        error:function(err){
            console.log(err);
        }
    })
}
drafts.addEventListener('click',function(){
    // localStorage.setItem("tolook", '0');
    window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/draftsPage");
})


function more(){
    getMyWorks(0);
    myWorksNav.setAttribute('condition',1);
    collectWorkNav.setAttribute('condition',0);
    var ind=1;
    $(window).on("resize scroll",function(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollHeight - 1 <= scrollTop + windowHeight) {
            myWorksNav.setAttribute('index',ind);
            if(myWorksNav.getAttribute('condition')==1){
                console.log(ind)
                if(workNum.innerHTML*1%10==0){
                    if(workNum.innerHTML*1/10!=ind){
                        getMyWorks(ind*10);
                        ind++;
                        myWorksNav.setAttribute('index',ind);
                        console.log(ind)
                    }else if(workNum.innerHTML*1/10==ind){
                        moreWorks.innerHTML='已加载全部';
                    }
                }else{
                    if(Math.ceil(workNum.innerHTML*1/10)!=ind){
                        getMyWorks( ind*10);
                        ind++;
                        myWorksNav.setAttribute('index',ind);
                        console.log(ind)
                    }else if(Math.ceil(workNum.innerHTML*1/10)==ind){
                        moreWorks.innerHTML='已加载全部';
                    }
                }
            } 
        }
    });
    var n=1;
    $(window).on("resize scroll",function(){
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        if (scrollHeight - 1 <= scrollTop + windowHeight) {
            collectWorkNav.setAttribute('num',n);
            if(collectWorkNav.getAttribute('condition')==1){
                console.log(ind)
                if(collectWorkNav.innerHTML*1%10==0){
                    if(collectNum.innerHTML*1/10!=ind){
                        getLoveWorks(n*10);
                        n++;
                        collectWorkNav.setAttribute('num',n);
                        console.log(n)
                    }else if(collectNum.innerHTML*1/10==n){
                        moreCollect.innerHTML='已加载全部';
                    }
                }else{
                    if(Math.ceil(collectNum.innerHTML*1/10)!=n){
                        getLoveWorks(n*10);
                        n++;
                        collectWorkNav.setAttribute('num',n);
                        console.log(n)
                    }else if(Math.ceil(collectNum.innerHTML*1/10)==n){
                        moreCollect.innerHTML='已加载全部';
                    }
                }
            } 
        }
    });
}


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

// var haveMyWork=document.querySelector('.haveMyWork');
//用户自己的帖子
function getMyWorks(x){
    var num=x;
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/user/savePosts',
        data:{
            column:x,
            reside:user_id
        },
        success:function(res){
             console.log(res.data);
                for(let i=0;i<res.data.length;i++){
                    var works=`
                        <div class="worksItem">
                            <div class="workTitle" textID=""></div>
                            <div class="footer">
                                <span class="read"><span class="readNum">0</span>阅读</span>
                                <span class="discuss"><span class="discussNum">0</span>评论</span>
                                <span class="giveLike"><span class="giveLikeNum">0</span>点赞</span>
                                <span class="textTime"><span class="timeNum">0分钟</span></span>
                                <span class="status">未审核</span>
                                <div class="handle"><span class="deleteText">删除</span><span class="changeText">修改</span><span class="collect">收藏</span></div>
                            </div>
                        </div>`;
                    haveWorks.insertAdjacentHTML('beforeend',works);
                    setTimeout(function(){
                        var y=(i+num)*1;
                        var workTitle=document.querySelectorAll('.workTitle');
                        var giveLikeNum=document.querySelectorAll('.giveLikeNum');
                        var status=document.querySelectorAll('.status');
                        var timeNum=document.querySelectorAll('.timeNum');
                        var deleteText=document.querySelectorAll('.deleteText');
                        var worksItem=document.querySelectorAll('.worksItem');
                        var readNum=document.querySelectorAll('.readNum');
                        var collect=document.querySelectorAll('.collect');
                        workTitle[y].innerHTML=res.data[i].postsName;
                        workTitle[y].textID=res.data[i].postsID;
                        if(res.data[i].alike<10000){
                            giveLikeNum[y].innerHTML=res.data[i].alike; 
                        }else{
                            var x=(res.data[i].alike/10000).toFixed(2);
                            giveLikeNum[y].innerHTML=`${x}万`;
                        }
                        timeNum[y].innerHTML=res.data[i].picture;
                        if(res.data[i].browse<10000){
                            readNum[y].innerHTML=res.data[i].browse;     
                        }else{
                            var x=(res.data[i].browse/10000).toFixed(2);
                            readNum[y].innerHTML=`${x}万`;
                        }
                        //评论数量
                        var discussNum=document.querySelectorAll('.discussNum');
                        $.ajax({
                            type:'post',
                            url:'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                            data:{
                                postsID:workTitle[y].textID
                            },
                            success:function(suc_1){
                                 console.log(suc_1);
                                if(suc_1<10000){
                                    discussNum[y].innerHTML=suc_1;       
                                }else{
                                    var x=(suc_1/10000).toFixed(2);
                                    discussNum[y].innerHTML=`${x}万`;
                                }
                            },
                            error:function(err){
                                console.log(err);
                            }
                        })
                        //判断帖子状态
                        if(res.data[i].status==1){
                            status[y].style.display='none';
                        }else if(res.data[i].status==-1){
                            status[y].style.display='inline-block';
                            status[y].innerHTML='未过审';
                        }else if(res.data[i].status==0){
                            status[y].innerHTML='未审核';
                        }
                        //  判断是否已经收藏帖子
                        $.ajax({
                            type:'post',
                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                            data:{
                                postsID:workTitle[y].textID,
                                userID:user_id
                            },
                            success:function(suc){
                                console.log(suc);
                                if(suc.code==-1){
                                    collect[y].innerHTML='取消收藏';
                                }else{
                                    collect[y].innerHTML='收藏';
                                }
                            },
                            error:function(err){
                                console.log(err);
                            }
                        })
                        //收藏与取消收藏
                        collect[y].addEventListener('click',function(e){
                            e.stopPropagation();
                            //用户收藏自己的帖子
                            if(res.data[i].status==0){
                                sureAppear("帖子未审核，无法收藏");
                                successOk.addEventListener('click',function(){
                                    sureFade();
                                })
                            }else if(res.data[i].status==-1){
                                sureAppear("帖子未通过审核，无法收藏");
                                successOk.addEventListener('click',function(){
                                    sureFade();
                                })
                            }else if(res.data[i].status==1){
                                if(collect[y].innerHTML=='收藏'){
                                    chooseAppear("确定要收藏吗？");
                                    tipNo.addEventListener('click',function(){
                                        chooseFade();
                                    })
                                    tipOk.addEventListener('click',function(){
                                        chooseFade();
                                        $.ajax({
                                            type:'post',
                                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                            data:{
                                                postsID:workTitle[y].textID,
                                                userID:user_id
                                            },
                                            success:function(res){
                                                console.log(res);
                                                collect[y].innerHTML='取消收藏';
                                                // num();
                                            },
                                            error:function(err){
                                                console.log(err);
                                            }
                                        })
                                    })
                                }else{
                                    chooseAppear("确定要取消收藏吗?");
                                    tipOk.addEventListener('click',function(){
                                        chooseFade();
                                        $.ajax({
                                            type:'post',
                                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                            data:{
                                                postsID:workTitle[y].textID,
                                                userID:user_id
                                            },
                                            success:function(suc){
                                                console.log(suc);
                                                collect[y].innerHTML='收藏';
                                                // num();
                                            },
                                            error:function(fal){
                                                console.log(fal);
                                            }
                                        })
                                    })
                                    tipNo.addEventListener('click',function(){
                                        chooseFade();
                                    })
                                }
        
                            }
                            
                        },false)
                        
                        //跳转到文章显示页面
                        workTitle[y].addEventListener('click',function(){
                            $.ajax({
                                type:'post',
                                url:'http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                                data:{
                                    postsID:workTitle[y].textID
                                },
                                success:function(suc_1){
                                    console.log(suc_1);
                                },
                                error:function(err){
                                    console.log(err);
                                }
                            })
                            localStorage.setItem('article_id',workTitle[y].textID);
                            // localStorage.setItem("tolook", '0');
                            window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${workTitle[y].textID}`);
                        })
                         //删除帖子(阻止了冒泡)
                        deleteText[y].addEventListener('click',function(e){
                            e.stopPropagation();
                            chooseAppear("确定要删除吗？")
                            tipNo.addEventListener('click',function(){
                                chooseFade();
                            })
                            tipOk.addEventListener('click',function(){
                                chooseFade();
                                $.ajax({
                                    type:'post',
                                    url:'http://localhost:8080/ToSkyNews_war_exploded/posts/deletePosts',
                                    data:{
                                       postsID:workTitle[y].textID
                                    },
                                    success:function(res){
                                        console.log(res);
                                        sureAppear("删除成功");
                                        successOk.addEventListener('click',function(){
                                            sureFade();
                                        })
                                        haveWorks.removeChild(worksItem[y]);
                                        // num();
                                    },
                                    error:function(err){
                                        console.log(err);
                                    }
                                })
                            })
                           
                        },false)
                         //跳转到修改页面
                            var changeText=document.querySelectorAll('.changeText');
                            changeText[y].addEventListener('click',function(e){
                                e.stopPropagation();
                                localStorage.setItem('article_id',workTitle[y].textID);
                                // localStorage.setItem("tolook", '0');
                                window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/publish-change?article_id=${workTitle[y].textID}`);
                            },false)
                    },60)
                 }
        },
        error:function(err){
            // console.log(err);
        }
    });
}
function getLoveWorks(m){
    var index=m;
    $.ajax({
        type:'post',
        url:'http://localhost:8080/ToSkyNews_war_exploded/user/queryPostsByCollectionID',
        data:{
            column:m,
            userID:user_id
        },
        success:function(suc){
            console.log(suc.length);
                for(let i=0;i<suc.length;i++){
                    var works=`
                    <div class="worksItem">
                        <div class="workTitle" textID=""></div>
                        <div class="footer">
                            <span class="read"><span class="readNum"></span>阅读</span>
                            <span class="discuss"><span class="discussNum"></span>评论</span>
                            <span class="giveLike"><span class="giveLikeNum"></span>点赞</span>
                            <span class="textTime"><span class="timeNum"></span></span>
                            <span class="cancelLove">取消收藏</span>
                        </div>
                    </div>`;
                    haveWorks.insertAdjacentHTML('beforeend',works);
                      //获取帖子内容
                      setTimeout(function(){
                        var n=(i+index)*1;
                          var worksItem=document.querySelectorAll('.worksItem');
                          var workTitle=document.querySelectorAll('.workTitle');
                          var giveLikeNum=document.querySelectorAll('.giveLikeNum');
                          var timeNum=document.querySelectorAll('.timeNum');
                          workTitle[n].innerHTML=suc[i].postsName;
                          workTitle[n].textID=suc[i].postsID;
                          var readNum=document.querySelectorAll('.readNum');
                          if(suc[i].alike<10000){
                              giveLikeNum[n].innerHTML=suc[i].alike; 
                          }else{
                              var x=(suc[i].alike/10000).toFixed(2);
                              giveLikeNum[n].innerHTML=`${x}万`;
                          }
                          timeNum[n].innerHTML=suc[i].picture;
                          if(suc[i].browse<10000){
                              readNum[n].innerHTML=suc[i].browse; 
                          }else{
                              var x=(suc[i].browse/10000).toFixed(2);
                              readNum[n].innerHTML=`${x}万`;
                          }
                          //评论数量
                          var discussNum=document.querySelectorAll('.discussNum');
                          $.ajax({
                              type:'post',
                              url:'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                              data:{
                                  postsID:workTitle[n].textID
                              },
                              success:function(suc_2){
                                  console.log(suc_2);
                                  if(suc_2<10000){
                                      discussNum[n].innerHTML=suc_2;       
                                  }else{
                                      var x=(suc_2/10000).toFixed(2);
                                      discussNum[n].innerHTML=`${x}万`;
                                  }
                              },
                              error:function(err){
                                  console.log(err);
                              }
                          })
                          //跳转到文章显示页面
                          worksItem[n].addEventListener('click',function(){
                              $.ajax({
                                  type:'post',
                                  url:'http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                                  data:{
                                      postsID:workTitle[n].textID
                                  },
                                  success:function(suc_1){
                                      console.log(suc_1);
                                  },
                                  error:function(err){
                                      console.log(err);
                                  }
                              })
                              localStorage.setItem('article_id',workTitle[n].textID);
                            //   localStorage.setItem("tolook", '0');
                              window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${workTitle[n].textID}`);
                          })
                          // 取消收藏
                          var cancelLove=document.querySelectorAll('.cancelLove');
                          cancelLove[n].addEventListener('click',function(e){
                              e.stopPropagation();
                              chooseAppear("确定要取消收藏吗?");
                              tipOk.addEventListener('click',function(){
                                  chooseFade();
                                  $.ajax({
                                      type:'post',
                                      url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                      data:{
                                          postsID:workTitle[n].textID,
                                          userID:user_id
                                      },
                                      success:function(suc){
                                          console.log(suc);
                                          sureAppear("取消收藏成功!");
                                          successOk.addEventListener('click',function(){
                                              sureFade();
                                          })
                                          haveWorks.removeChild(worksItem[n]);
                                        //   num();
                                      },
                                      error:function(fal){
                                          console.log(fal);
                                      }
                                  })
                              })
                              tipNo.addEventListener('click',function(){
                                  chooseFade();
                              })
                          },false)
                      },100)
                }
        },
        error:function(err){
            console.log(err);
        }
    })
}

//展示用户自己的帖子和收藏的帖子
var myWorksNav=document.querySelector('.myWorksNav');
var collectWorkNav=document.querySelector('.collectWorkNav');
var cancel=document.querySelector('.cancel');
var noWork=document.querySelector('.noWork');
var searchNav=document.querySelector('.searchNav');
var workNav=document.querySelector('.workNav');
var find=document.querySelector('#find');
// getLoveWorks(0);
myWorksNav.addEventListener('click',function(){
    haveWorks.innerHTML='';
    if(workNum.innerHTML==0){
        empty.style.display='flex';
        haveWorks.style.display='none';
        moreWorks.style.display='none';
        moreCollect.style.display='none';
    }else{
       empty.style.display='none';
       haveWorks.style.display='block';
       // noWork.innerHTML='暂未发表作品';
        myWorksNav.style.color='cornflowerblue';
        collectWorkNav.style.color='black';
        // haveCollect.style.display='none';
        // haveMyWork.style.display='block';
        moreWorks.style.display='inline-block';
        moreCollect.style.display='none';
        myWorksNav.setAttribute('condition',1);
        collectWorkNav.setAttribute('condition',0);
        getMyWorks(0);
    }
    
})
collectWorkNav.addEventListener('click',function(){
    haveWorks.innerHTML='';
    if(collectNum.innerHTML==0){
        empty.style.display='flex';
        haveWorks.style.display='none';
        moreWorks.style.display='none';
        moreCollect.style.display='none';
    }else{
        empty.style.display='none';
        haveWorks.style.display='block';
        moreWorks.style.display='none';
        moreCollect.style.display='inline-block';
        getLoveWorks(0);
    }
    // noWork.innerHTML='暂无收藏';
    collectWorkNav.style.color='cornflowerblue';
    myWorksNav.style.color='black';
    // haveMyWork.style.display='none';
    // haveCollect.style.display='block';
    myWorksNav.setAttribute('condition',0);
    collectWorkNav.setAttribute('condition',1);
   
})
find.addEventListener('click',function(){
    haveWorks.innerHTML='';
    if(workNum.innerHTML==0){
        empty.style.display='flex';
        haveWorks.style.display='none';
        moreWorks.style.display='none';
        moreCollect.style.display='none';
    }else{
       empty.style.display='none';
       haveWorks.style.display='block';
       moreWorks.style.display='inline-block';
       moreCollect.style.display='none';
       getMyWorks(0);
    }
    searchNav.style.display='block';
    workNav.style.display='none';
    myWorksNav.setAttribute('condition',0);
    collectWorkNav.setAttribute('condition',0);
   
})
cancel.addEventListener('click',function(){
    haveWorks.innerHTML='';
    searchNav.style.display='none';
    workNav.style.display='block';
    if(workNum.innerHTML==0){
        empty.style.display='flex';
        haveWorks.style.display='none';
        moreWorks.style.display='none';
        moreCollect.style.display='none';
    }else{
       empty.style.display='none';
       haveWorks.style.display='block';
       moreWorks.style.display='inline-block';
       moreCollect.style.display='none';
       getMyWorks(0);
    }
    myWorksNav.style.color='cornflowerblue';
    collectWorkNav.style.color='block';
    // noWork.innerHTML='暂未发表作品';
    
    // haveCollect.style.display='none';
    // haveMyWork.style.display='block';
    myWorksNav.setAttribute('condition',1);
    collectWorkNav.setAttribute('condition',0);
})

//模糊搜索自己的作品
var searchBox=document.querySelector('.searchBox');
var searchInput=document.querySelector('.searchInput');
searchBox.addEventListener('click',function(){
    if(searchInput.value==''){
        haveWorks.style.display='none';
        empty.style.display='flex';
        moreCollect.style.display='none';
        moreWorks.style.display='none';
    }else{
        haveWorks.innerHTML='';
        empty.style.display='none';
        haveWorks.style.display='block';
        moreCollect.style.display='none';
        moreWorks.style.display='none';
        $.ajax({
            type:'post',
            url:'http://localhost:8080/ToSkyNews_war_exploded/posts/vagueQueryPerson',
            data:{
                thing:searchInput.value,
                userID:user_id
            },
            success:function(res){
                haveWorks.innerHTML="";
                // console.log(res);
                if(res.length==0){
                    haveWorks.style.display='none';
                    moreCollect.style.display='none';
                    moreWorks.style.display='none';
                    empty.style.display='flex';
                }else{
                    for(let i=0;i<res.length;i++){
                        var works=`
                        <div class="worksItem">
                            <div class="workTitle" textID=""></div>
                            <div class="footer">
                                <span class="read"><span class="readNum">0</span>阅读</span>
                                <span class="discuss"><span class="discussNum">0</span>评论</span>
                                <span class="giveLike"><span class="giveLikeNum">0</span>点赞</span>
                                <span class="textTime"><span class="timeNum">21分钟</span></span>
                                <span class="status">未审核</span>
                                <div class="handle"><span class="deleteText">删除</span><span class="changeText">修改</span><span class="collect">收藏</span></div>
                            </div>
                        </div>`;
                        haveWorks.insertAdjacentHTML('beforeend',works);
                        var giveLikeNum=document.querySelectorAll('.giveLikeNum');
                        var timeNum=document.querySelectorAll('.timeNum');
                        var status=document.querySelectorAll('.status');
                        var workTitle=document.querySelectorAll('.workTitle');
                        var readNum=document.querySelectorAll('.readNum');
                        var deleteText=document.querySelectorAll('.deleteText');
                        workTitle[i].textID=res[i].postsID;
                        var worksItem=document.querySelectorAll('.worksItem');
                        var collect=document.querySelectorAll('.collect');
                         //评论数量
                         var discussNum=document.querySelectorAll('.discussNum');
                         $.ajax({
                             type:'post',
                             url:'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                             data:{
                                 postsID:workTitle[i].textID
                             },
                             success:function(suc_1){
                                //   console.log(suc_1);
                                if(suc_1<10000){
                                    discussNum[i].innerHTML=suc_1;       
                                }else{
                                    var x=(suc_1/10000).toFixed(2);
                                    discussNum[i].innerHTML=`${x}万`;
                                }
                             },
                             error:function(err){
                                //  console.log(err);
                             }
                         })
                        //  判断是否已经收藏帖子
                        $.ajax({
                            type:'post',
                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                            data:{
                                postsID:workTitle[i].textID,
                                userID:user_id
                            },
                            success:function(suc){
                                // console.log(suc);
                                if(suc.code==-1){
                                    collect[i].innerHTML='取消收藏';
                                }else{
                                    collect[i].innerHTML='收藏';
                                }
                            },
                            error:function(err){
                                // console.log(err);
                            }
                        })
                        //判断是否已经收藏帖子
                        $.ajax({
                            type:'post',
                            url:'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                            data:{
                                postsID:workTitle[i].textID,
                                userID:user_id
                            },
                            success:function(res){
                                // console.log(res);
                                if(res.code==-1){
                                    collect[i].innerHTML='取消收藏';
                                }else{
                                    collect[i].innerHTML='收藏';
                                }
                            },
                            error:function(err){
                                // console.log(err);
                            }
                        })
                        //跳转到文章显示页面
                        worksItem[i].addEventListener('click',function(){
                            localStorage.setItem('article_id',workTitle[i].textID);
                            // localStorage.setItem("tolook", '0');
                            window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${workTitle[i].textID}`);
                        })
                        if(res[i].status==1){
                            status[i].style.display='none';
                        }
                        if(res[i].status==1){
                            status[i].style.display='none';
                        }else if(res[i].status==-1){
                            status[i].style.display='inline-block';
                            status[i].innerHTML='未过审';
                        }else if(res[i].status==0){
                            status[i].innerHTML='未审核';
                        }
                        workTitle[i].innerHTML=res[i].postsName;
                        if(res[i].alike<10000){
                            giveLikeNum[i].innerHTML=res[i].alike;       
                        }else{
                            var giveLike=(res[i].alike/10000).toFixed(2);
                            giveLikeNum[i].innerHTML=`${giveLike}万`;
                        }
                        timeNum[i].innerHTML=res[i].picture;
                        if(res[i].browse<10000){
                            readNum[i].innerHTML=res[i].browse;       
                        }else{
                            var x=(res[i].browse/10000).toFixed(2);
                            readNum[i].innerHTML=`${x}万`;
                        }
                        //删除帖子(阻止了冒泡)
                        deleteText[i].addEventListener('click',function(e){
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
                                        postsID:workTitle[i].textID
                                    },
                                    success:function(res){
                                        // console.log(res);
                                        sureAppear("确认要删除吗?");
                                        successOk.addEventListener('click',function(){
                                            sureFade();
                                        })
                                        // num();
                                    
                                    },
                                    error:function(err){
                                        // console.log(err);
                                    }
                                })
                            })
                        },false)
                        
                        var collect=document.querySelectorAll('.collect');
                        //用户收藏自己的帖子
                        collect[i].addEventListener('click',function(e){
                            e.stopPropagation();
                            if(collect[i].innerHTML=='收藏'){
                                chooseAppear("确定要收藏吗？");
                                tipNo.addEventListener('click',function(){
                                    chooseFade();
                                })
                                tipOk.addEventListener('click',function(){
                                    chooseFade();
                                    $.ajax({
                                        type:'post',
                                        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                        data:{
                                            postsID:workTitle[i].textID,
                                            userID:user_id
                                        },
                                        success:function(res){
                                            // console.log(res);
                                            collect[i].innerHTML='取消收藏';
                                            // num();
                                        },
                                        error:function(err){
                                            // console.log(err);
                                        }
                                    })
                                })
                            }else{
                                chooseAppear("确定要取消收藏吗?");
                                tipOk.addEventListener('click',function(){
                                    chooseFade();
                                    $.ajax({
                                        type:'post',
                                        url:'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                        data:{
                                            postsID:workTitle[i].textID,
                                            userID:user_id
                                        },
                                        success:function(suc){
                                            // console.log(suc);
                                            collect[i].innerHTML='收藏';
                                            // num();
                                            
                                        },
                                        error:function(fal){
                                            // console.log(fal);
                                        }
                                    })
                                })
                                tipNo.addEventListener('click',function(){
                                    chooseFade();
                                })
                            }
    
                        },false)
                        //跳转到修改页面
                        var changeText=document.querySelectorAll('.changeText');
                        changeText[i].addEventListener('click',function(e){
                            e.stopPropagation();
                            localStorage.setItem('article_id',workTitle[i].textID);
                            // localStorage.setItem("tolook", '0');
                            window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/publish-change?article_id=${workTitle[i].textID}`);
                        },false)
                    }
                }
                        
            },
            error:function(err){
                // console.log(err);
            }
        
        })
    }
})


