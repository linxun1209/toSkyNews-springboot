var focusOther = document.querySelector('.focusOther');
var userName = document.querySelectorAll('.userName');
var briefText = document.querySelector('.briefText');
var myWorksNav = document.querySelector('.myWorksNav');
var collectWorkNav = document.querySelector('.collectWorkNav');
var haveWorks = document.querySelector('.haveWorks');
var empty = document.querySelector('.empty');
var account = document.querySelector('.account');
var otherUser_id = localStorage.getItem('otherUser_id');
var user_id = localStorage.getItem('user_id');
var have_land = localStorage.getItem('have_land');
var nullBox = document.querySelector('.nullBox');
var nullText = document.querySelector('.nullText');
var tip = document.querySelector('.tip');
var tipText = document.querySelector('.tipText');
var tipOk = document.querySelector('.tipOk');
var tipNo = document.querySelector('.tipNo');
var fansNav = document.querySelector('.fansNav');
var focusNav = document.querySelector('.focusNav');
var successTip = document.querySelector('.successTip');
var successOk = document.querySelector('.successOk');
var successText = document.querySelector('.successText');
var workNum = document.querySelector('.workNum');
var collectNum = document.querySelector('.collectNum');

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
//加载更多
var moreWorks = document.querySelector('.moreWorks');
var moreCollect = document.querySelector('.moreCollect');
postNum();
//收藏和作品数量
function postNum() {
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionByUserID',
		data: {
			userID: otherUser_id
		},
		success: function(suc_1) {
            console.log(suc_1)
			collectNum.innerHTML = suc_1.length;
		},
		error: function(err) {
			// console.log(err);
		}
	})
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/user/allCountPosts',
		data: {
			reside: otherUser_id
		},
		success: function(suc_1) {
			 console.log(suc_1);
            workNum.innerHTML=suc_1;
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
		error: function(err) {
			// console.log(err);
		}
	})
}
function more(){
    getMyWorks(0);
    myWorksNav.setAttribute('condition', 1);
    collectWorkNav.setAttribute('condition', 0);
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

$.ajax({
	type: 'post',
	url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryFocusBoolean',
	data: {
		fansID: user_id,
		focusID: otherUser_id
	},
	success: function(res) {
		// console.log(res);
		if (res.data == '该用户已经关注过此用户！') {
			focusOther.innerHTML = '取消关注';
		} else {
			focusOther.innerHTML = '关注TA';
		}
	},
	error: function(err) {
		// console.log(err);
	}
})
focusOther.addEventListener('click', function() {
	if (have_land == 'false') {
        sureAppear('请先登录')
		successOk.addEventListener('click', function() {
			sureFade();
		})
	} else {
		if (focusOther.innerHTML == '关注TA') {
			$.ajax({
				type: 'post',
				url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/addFocus',
				data: {
					fansID: user_id,
					focusID: otherUser_id
				},
				success: function(res) {
					// console.log(res);
					focusOther.innerHTML = '取消关注';
				},
				error: function(err) {
					// console.log(err);
				}
			})
		} else {
			$.ajax({
				type: 'post',
				url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/deleteFocus',
				data: {
					fansID: user_id,
					focusID: otherUser_id
				},
				success: function(res) {
					// console.log(res);
					focusOther.innerHTML = '关注TA';
				},
				error: function(err) {
					// console.log(err);
				}
			})
		}
	}


})



//用户自己的帖子
// getMyWorks(0);

function getMyWorks(x) {
	var num = x;
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/user/disDrafts',
		data: {
			start: x,
			reside: otherUser_id,
			status: 1,
            count:10
		},
		success: function(res) {
			console.log(res.data);
			for (let i = 0; i < res.data.length; i++) {
                var works = `
                    <div class="worksItem">
                        <div class="workTitle" textID=""></div>
                        <div class="footer">
                            <span class="read"><span class="readNum">0</span>阅读</span>
                            <span class="discuss"><span class="discussNum">0</span>评论</span>
                            <span class="giveLike"><span class="giveLikeNum">0</span>点赞</span>
                            <span class="textTime"><span class="timeNum">21分钟</span></span>
                            <span class="collect">收藏</span>
                        </div>
                    </div>`;
                haveWorks.insertAdjacentHTML('beforeend', works);
                setTimeout(function() {
                    var y = (i + num) * 1;
                    var worksItem = document.querySelectorAll('.worksItem');
                    var workTitle = document.querySelectorAll('.workTitle');
                    var giveLikeNum = document.querySelectorAll('.giveLikeNum');
                    var timeNum = document.querySelectorAll('.timeNum');
                    var readNum = document.querySelectorAll('.readNum');
                    workTitle[y].textID = res.data[i].postsID;
                    workTitle[y].innerHTML = res.data[i].postsName;
                    if (res.data[i].alike < 10000) {
                        giveLikeNum[y].innerHTML = res.data[i].alike;
                    } else {
                        var x = (res.data[i].alike / 10000).toFixed(2);
                        giveLikeNum[y].innerHTML = `${x}万`;
                    }
                    if (res.data[i].browse < 10000) {
                        readNum[y].innerHTML = res.data[i].browse;
                    } else {
                        var x = (res.data[i].browse / 10000).toFixed(2);
                        readNum[y].innerHTML = `${x}万`;
                    }
                    timeNum[y].innerHTML = res.data[i].picture;
                    //跳转到文章显示页面
                    worksItem[y].addEventListener('click', function(e) {
                        e.stopPropagation();
                        $.ajax({
                            type: 'post',
                            url: 'http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                            data: {
                                postsID: workTitle[y].textID
                            },
                            success: function(suc_1) {
                                console.log(suc_1);
                                localStorage.setItem('article_id',workTitle[y].textID);

                                window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article=${workTitle[y].textID}`);
                            },
                            error: function(err) {
                                console.log(err);
                            }
                        })
                    })

                    //评论数量
                    var discussNum = document.querySelectorAll('.discussNum');
                    $.ajax({
                        type: 'post',
                        url: 'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                        data: {
                            postsID: workTitle[y].textID
                        },
                        success: function(suc_1) {
                            console.log(suc_1);
                            if (suc_1 < 10000) {
                                discussNum[y].innerHTML = suc_1;
                            } else {
                                var x = (suc_1 / 10000).toFixed(2);
                                discussNum[y].innerHTML = `${x}万`;
                            }
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    })
                    //  判断是否已经收藏帖子
                    $.ajax({
                        type: 'post',
                        url: 'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                        data: {
                            postsID: workTitle[y].textID,
                            userID: user_id
                        },
                        success: function(suc) {
                            // console.log(suc);
                            if (suc.code == -1) {
                                collect[y].innerHTML = '取消收藏';
                            } else {
                                collect[y].innerHTML = '收藏';
                            }
                        },
                        error: function(err) {
                            // console.log(err);
                        }
                    })
                    //用户收藏该用户帖子
                    var collect = document.querySelectorAll('.collect');
                    collect[y].addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (have_land == 'false') {
                            sureAppear('请先登录')
                            successOk.addEventListener('click', function() {
                                sureFade();
                            })
                        } else {
                            if (collect[y].innerHTML == '收藏') {
                                chooseAppear('确定要收藏吗？');
                                tipNo.addEventListener('click', function() {
                                    chooseFade();
                                })
                                tipOk.addEventListener('click', function() {
                                    chooseFade();
                                    $.ajax({
                                        type: 'post',
                                        url: 'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                        data: {
                                            postsID: workTitle[y]
                                                .textID,
                                            userID: user_id
                                        },
                                        success: function(res) {
                                            console.log(res);
                                            collect[y].innerHTML =
                                                '取消收藏'
                                        },
                                        error: function(err) {
                                            console.log(err);
                                        }
                                    })
                                })
                            } else {
                                chooseAppear('确定要取消收藏吗?');
                                tipNo.addEventListener('click', function() {
                                    chooseFade();
                                })
                                tipOk.addEventListener('click', function() {
                                    chooseFade();
                                    $.ajax({
                                        type: 'post',
                                        url: 'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                        data: {
                                            postsID: workTitle[y]
                                                .textID,
                                            userID: user_id
                                        },
                                        success: function(suc) {
                                            console.log(suc);
                                            collect[y].innerHTML =
                                                '收藏';
                                        },
                                        error: function(fal) {
                                            console.log(fal);
                                        }
                                    })
                                })
                            }
                        }
                    }, false)
                }, 60)
            }
		},
		error: function(err) {
			// console.log(err);
		}
	});
}

//用户收藏的帖子
// getLoveWorks(0);
function getLoveWorks(m) {
    var index = m;
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/user/queryPostsByCollectionID',
		data: {
			column: m,
			userID: otherUser_id 
		},
		success: function(suc) {
			console.log(suc.length);
			for (let i = 0; i < suc.length; i++) {
                var works = `
                <div class="worksItem">
                    <div class="workTitle" textID=""></div>
                    <div class="footer">
                        <span class="read"><span class="readNum"></span>阅读</span>
                        <span class="discuss"><span class="discussNum"></span>评论</span>
                        <span class="giveLike"><span class="giveLikeNum"></span>点赞</span>
                        <span class="textTime"><span class="timeNum"></span></span>
                        <span class="collect">收藏</span>
                    </div>
                </div>`;
                haveWorks.insertAdjacentHTML('beforeend', works);
                //获取帖子内容
                setTimeout(function() {
                    var n = (i + index) * 1;
                    var worksItem = document.querySelectorAll('.worksItem');
                    var workTitle = document.querySelectorAll('.workTitle');
                    var giveLikeNum = document.querySelectorAll('.giveLikeNum');
                    var timeNum = document.querySelectorAll('.timeNum');
                    workTitle[n].innerHTML = suc[i].postsName;
                    workTitle[n].textID = suc[i].postsID;
                    var readNum = document.querySelectorAll('.readNum');
                    if (suc[i].alike < 10000) {
                        giveLikeNum[n].innerHTML = suc[i].alike;
                    } else {
                        var x = (suc[i].alike / 10000).toFixed(2);
                        giveLikeNum[n].innerHTML = `${x}万`;
                    }
                    timeNum[n].innerHTML = suc[i].picture;
                    if (suc[i].browse < 10000) {
                        readNum[n].innerHTML = suc[i].browse;
                    } else {
                        var x = (suc[i].browse / 10000).toFixed(2);
                        readNum[n].innerHTML = `${x}万`;
                    }
                    //评论数量
                    var discussNum = document.querySelectorAll('.discussNum');
                    $.ajax({
                        type: 'post',
                        url: 'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                        data: {
                            postsID: workTitle[n].textID
                        },
                        success: function(suc_2) {
                            console.log(suc_2);
                            if (suc_2 < 10000) {
                                discussNum[n].innerHTML = suc_2;
                            } else {
                                var x = (suc_2 / 10000).toFixed(2);
                                discussNum[n].innerHTML = `${x}万`;
                            }
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    })
                    //跳转到文章显示页面
                    worksItem[n].addEventListener('click', function() {
                        $.ajax({
                            type: 'post',
                            url: 'http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse',
                            data: {
                                postsID: workTitle[n].textID
                            },
                            success: function(suc_1) {
                                console.log(suc_1);
                            },
                            error: function(err) {
                                console.log(err);
                            }
                        })
                        localStorage.setItem('article_id', workTitle[n].textID);

                        window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id-${workTitle[n].textID}`);
                    })
                    // 取消收藏
                    var collect = document.querySelectorAll('.collect');
                    collect[n].addEventListener('click', function(e) {
                        e.stopPropagation();
                        chooseAppear("确定要取消收藏吗?");
                        tipOk.addEventListener('click', function() {
                            chooseFade();
                            $.ajax({
                                type: 'post',
                                url: 'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                data: {
                                    postsID: workTitle[n].textID,
                                    userID: user_id
                                },
                                success: function(suc) {
                                    console.log(suc);
                                    sureAppear("取消收藏成功!");
                                    successOk.addEventListener(
                                        'click',
                                        function() {
                                            sureFade();
                                        })
                                    haveWorks.removeChild(worksItem[n]);
                                    postNum();
                                },
                                error: function(fal) {
                                    console.log(fal);
                                }
                            })
                        })
                        tipNo.addEventListener('click', function() {
                            chooseFade();
                        })
                    }, false)
                }, 100)
            }
		},
		error: function(err) {
			console.log(err);
		}
	})
}


//展示用户自己的帖子和收藏的帖子
var myWorksNav = document.querySelector('.myWorksNav');
var collectWorkNav = document.querySelector('.collectWorkNav');
var cancel = document.querySelector('.cancel');
var noWork = document.querySelector('.noWork');
var searchNav = document.querySelector('.searchNav');
var workNav = document.querySelector('.workNav');
var find = document.querySelector('#find');
var searchInput = document.querySelector('.searchInput');

myWorksNav.addEventListener('click', function() {
	haveWorks.innerHTML='';
    if(workNum.innerHTML==0){
        empty.style.display='flex';
        haveWorks.style.display='none';
    }else{
       empty.style.display='none';
       haveWorks.style.display='block';
       moreWorks.style.display='inline-block';
    moreCollect.style.display='none';
    myWorksNav.setAttribute('condition',1);
    collectWorkNav.setAttribute('condition',0);
    getMyWorks(0);
    }
    // noWork.innerHTML='暂未发表作品';
    myWorksNav.style.color='cornflowerblue';
    collectWorkNav.style.color='black';
    // haveCollect.style.display='none';
    // haveMyWork.style.display='block';
    
})
collectWorkNav.addEventListener('click', function() {
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
find.addEventListener('click', function() {
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
cancel.addEventListener('click', function() {
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
var searchBox = document.querySelector('.searchBox');
searchBox.addEventListener('click', function() {
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
            type: 'post',
            url: 'http://localhost:8080/ToSkyNews_war_exploded/posts/vagueQueryPerson',
            data: {
                thing: searchInput.value,
                userID: otherUser_id
            },
            success: function(res) {
                console.log(res);
                haveWorks.innerHTML = "";
                if (res.length == 0) {
                    haveWorks.style.display='none';
                    moreCollect.style.display='none';
                    moreWorks.style.display='none';
                    empty.style.display='flex';
                } else {
                    empty.style.display = 'none';
                    for (let i = 0; i < res.length; i++) {
                        if (res[i].status == 1) {
                            var works = `
                                <div class="worksItem">
                                    <div class="workTitle" textID=""></div>
                                    <div class="footer">
                                        <span class="read"><span class="readNum">0</span>阅读</span>
                                        <span class="discuss"><span class="discussNum">0</span>评论</span>
                                        <span class="giveLike"><span class="giveLikeNum">0</span>点赞</span>
                                        <span class="textTime"><span class="timeNum">21分钟</span></span>
                                        <span class="collect">收藏</span>
                                    </div>
                                </div>`;
                            haveWorks.insertAdjacentHTML('beforeend', works);
                            var workTitle = document.querySelectorAll('.workTitle');
                            workTitle[i].textID = res[i].postsID;
                            var giveLikeNum = document.querySelectorAll('.giveLikeNum');
                            var timeNum = document.querySelectorAll('.timeNum');
                            var readNum = document.querySelectorAll('.readNum');
                            if (res[i].browse < 10000) {
                                readNum[i].innerHTML = res[i].browse;
                            } else {
                                var x = (res[i].browse / 10000).toFixed(2);
                                readNum[i].innerHTML = `${x}万`;
                            }
                            workTitle[i].innerHTML = res[i].postsName;
                            if (res[i].alike < 10000) {
                                giveLikeNum[i].innerHTML = res[i].alike;
                            } else {
                                var giveLike = (res[i].alike / 10000).toFixed(2);
                                giveLikeNum[i].innerHTML = `${giveLike}万`;
                            }
                            timeNum[i].innerHTML = res[i].picture;
                            var collect = document.querySelectorAll('.collect');
                            //评论数量
                            var discussNum = document.querySelectorAll('.discussNum');
                            $.ajax({
                                type: 'post',
                                url: 'http://localhost:8080/ToSkyNews_war_exploded/comments/queryCommentCount',
                                data: {
                                    postsID: workTitle[i].textID
                                },
                                success: function(suc_1) {
                                    // console.log(suc_1);
                                    if (suc_1 < 10000) {
                                        discussNum[i].innerHTML = suc_1;
                                    } else {
                                        var x = (suc_1 / 10000).toFixed(2);
                                        discussNum[i].innerHTML = `${x}万`;
                                    }
                                },
                                error: function(err) {
                                    // console.log(err);
                                }
                            })
                            //判断是否已经收藏帖子
                            $.ajax({
                                type: 'post',
                                url: 'http://localhost:8080/ToSkyNews_war_exploded/collections/queryCollectionBoolean',
                                data: {
                                    postsID: workTitle[i].textID,
                                    userID: user_id
                                },
                                success: function(res) {
                                    // console.log(res);
                                    if (res.code == -1) {
                                        collect[i].innerHTML = '取消收藏';
                                    } else {
                                        collect[i].innerHTML = '收藏';
                                    }
                                },
                                error: function(err) {
                                    // console.log(err);
                                }
                            })
                            collect[i].addEventListener('click', function(e) {
                                e.stopPropagation();
                                if (have_land == 'false') {
                                    sureAppear('请先登录');
                                    successOk.addEventListener('click', function() {
                                        sureFade();
                                    })
                                } else {
                                    //用户收藏自己的帖子
                                    if (collect[i].innerHTML == '收藏') {
                                        chooseAppear('确定要收藏吗？');
                                        tipNo.addEventListener('click', function() {
                                            chooseFade();
                                        })
                                        tipOk.addEventListener('click', function() {
                                            chooseFade();
                                            $.ajax({
                                                type: 'post',
                                                url: 'http://localhost:8080/ToSkyNews_war_exploded/collections/addCollection',
                                                data: {
                                                    postsID: workTitle[i]
                                                        .textID,
                                                    userID: user_id
                                                },
                                                success: function(res) {
                                                    // console.log(res);
                                                    collect[i].innerHTML =
                                                        '取消收藏'
                                                },
                                                error: function(err) {
                                                    // console.log(err);
                                                }
                                            })
                                        })
                                    } else {
                                        chooseAppear('确定要取消收藏吗?');
                                        tipOk.addEventListener('click', function() {
                                            chooseFade();
                                            $.ajax({
                                                type: 'post',
                                                url: 'http://localhost:8080/ToSkyNews_war_exploded/collections/deleteCollection',
                                                data: {
                                                    postsID: workTitle[i]
                                                        .textID,
                                                    userID: user_id
                                                },
                                                success: function(suc) {
                                                    // console.log(suc);
                                                    collect[i].innerHTML =
                                                        '收藏';
    
                                                },
                                                error: function(fal) {
                                                    // console.log(fal);
                                                }
                                            })
                                        })
                                    }
                                }
                            }, false)
                        }
                    }
                }
    
            },
            error: function(err) {
                // console.log(err);
            }
        })
    }
})
