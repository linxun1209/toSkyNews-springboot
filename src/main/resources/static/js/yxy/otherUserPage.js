//个人主页搜索导航栏
var myWorksNav = document.querySelector('.myWorksNav');
var collectWorkNav = document.querySelector('.collectWorkNav');
var cancel = document.querySelector('.cancel');
var noWork = document.querySelector('.noWork');
var searchNav = document.querySelector('.searchNav');
var workNav = document.querySelector('.workNav');
var find = document.querySelector('#find');
var close = document.querySelector('.close');
var otherUser_id = localStorage.getItem('otherUser_id');

//弹窗
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

//用户信息
var userHead = document.querySelector('.userHead');
//用户主页显示用户信息
var userHead = document.querySelector('.userHead');
var account = document.querySelector('.account');
var userName = document.querySelectorAll('.userName');
var briefText = document.querySelector('.briefText');
var boy = document.querySelector('#boy');
var girl = document.querySelector('#girl');
var nullBox = document.querySelector('.nullBox');
$.ajax({
	type: 'post',
	url: 'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
	data: {
		userID: otherUser_id
	},
	success: function(res) {
		// console.log(res);
		userName[0].innerHTML = res.username;
		userName[1].innerHTML = res.username;
		briefText.innerHTML = res.signature;
		account.innerHTML = res.account;
		userHead.style.backgroundImage = `url(${res.picture})`;
		if (res.sex == '男') {
			boy.style.display = 'block';
			girl.style.display = 'none'
		} else if (res.sex == '女') {
			boy.style.display = 'none';
			girl.style.display = 'block';
		} else {
			boy.style.display = 'none';
			girl.style.display = 'none';
		}

	},
	error: function(err) {
		// console.log(err);
	}
})




userAtt();
close.addEventListener('click', function() {
	userAtt();
	sureFade();
})

function userAtt() {
	var focusNum = document.querySelectorAll('.focusNum');
	//用户的关注
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFocus',
		data: {
			fansID: otherUser_id
		},
		success: function(res) {
			// console.log(res.length);
			for (let i = 0; i < focusNum.length; i++) {
				if (res.length < 10000) {
					focusNum[i].innerHTML = res.length;
				} else {
					var x = (res.length / 10000).toFixed(2);
					focusNum[i].innerHTML = `${x}万`;
				}
			}
		},
		error: function(err) {
			// console.log(err);
		}
	})
	//用户的粉丝
	var fansNum = document.querySelectorAll('.fansNum');
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFans',
		data: {
			focusID: otherUser_id
		},
		success: function(res) {
			// console.log(res.length);
			for (let i = 0; i < fansNum.length; i++) {
				if (res.length < 10000) {
					fansNum[i].innerHTML = res.length;
				} else {
					var x = (res.length / 10000).toFixed(2);
					fansNum[i].innerHTML = `${x}万`;
				}
			}
		},
		error: function(err) {
			// console.log(err);
		}
	})
	//用户获得的赞的总数
	var likeNum = document.querySelectorAll('.likeNum');
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/posts/queryAllSumAlike',
		data: {
			userID: otherUser_id
		},
		success: function(res) {
			// console.log(res);
			for (let i = 0; i < likeNum.length; i++) {
				if (res < 10000) {
					likeNum[i].innerHTML = res;
				} else {
					var x = (res / 10000).toFixed(2);
					likeNum[i].innerHTML = `${x}万`;
				}
			}
		},
		error: function(err) {
			// console.log(err);
		}
	})

}
// var likeWorkNav=document.querySelector('.likeWorkNav');
myWorksNav.addEventListener('click', function() {
	noWork.innerHTML = '暂未发表作品';
	myWorksNav.style.color = 'cornflowerblue';
	collectWorkNav.style.color = 'black';
	// likeWorkNav.style.color='black';
})
collectWorkNav.addEventListener('click', function() {
	noWork.innerHTML = '暂无收藏';
	collectWorkNav.style.color = 'cornflowerblue';
	myWorksNav.style.color = 'black';
	// likeWorkNav.style.color='black';
})
// likeWorkNav.addEventListener('click',function(){
//     noWork.innerHTML='暂无喜欢作品';
//     likeWorkNav.style.color='cornflowerblue';
//     myWorksNav.style.color='black';
//     collectWorkNav.style.color='black';
// })
find.addEventListener('click', function() {
	noWork.innerHTML = '暂无作品';
	searchNav.style.display = 'block';
	workNav.style.display = 'none';
})
cancel.addEventListener('click', function() {
	searchNav.style.display = 'none';
	workNav.style.display = 'block';
	noWork.innerHTML = '暂未发表作品';
})

//侧边栏
var four;

function Topfun() {
	four = setInterval(FourscrollBy, 8);
}

function FourscrollBy() {
	if (document.documentElement && document.documentElement.scrollTop) {
		if (document.documentElement.scrollTop <= 0) {
			clearInterval(four);
		} else {
			window.scrollBy(0, -30);
		}
	} else {
		if (document.body.scrollTop <= 0) {
			clearInterval(four);
		} else {
			window.scrollBy(0, -30);
		}
	}
}
var toolItema = document.querySelectorAll('.tool_item_a');
toolItema[2].addEventListener('click', function() {
	FourscrollBy();
})


//获赞弹窗
var like = document.querySelector('.like');
var likeBox = document.querySelector('.likeBox');
var know = document.querySelector('.know');
like.addEventListener('click', function() {
	likeBox.style.height = '250px';
	likeBox.style.top = '100px';
})
know.addEventListener('click', function() {
	likeBox.style.top = '0';
	likeBox.style.height = '0';
})


//wzz添加的最上面
var food_find_input = document.getElementsByClassName("food_find_input")[0];
var food_find_bon = document.getElementsByClassName("food_find_bon")[0];
food_find_bon.onclick = function() {
	let text = food_find_input.value;
	if (text == '') {
		alert("请输入搜索内容！");
	} else {
		localStorage.setItem('search_input', text);
		localStorage.setItem("tolook", '0');
		window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/search");
	}
}
var all_top = document.getElementById("all_top");
var call_top_sort = all_top.getElementsByClassName("column_sort")[0];
var all_top_a = call_top_sort.getElementsByTagName("a");
var sort_n = 0;
for (let i in all_top_a) {
	all_top_a[i].onclick = function() {
		let sort = all_top_a[i].innerHTML;
		sessionStorage.setItem("c-sort", sort);
		localStorage.setItem("tolook", '0');
		window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/user_main");
	}
}
//wzz



//用户的关注
var fansList = document.querySelector('.fansList');
var leftAtt = document.querySelector('.leftAtt');
var rightAtt = document.querySelector('.rightAtt');
leftAtt.setAttribute('indexAtt', 0);
var indexAtt = leftAtt.getAttribute('indexAtt') * 1;
rightAtt.setAttribute('allWorkAtt', 0);
$.ajax({
	type: 'post',
	url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFocus',
	data: {
		fansID: otherUser_id
	},
	success: function(suc_2) {
		leftAtt.addEventListener('click', function() {
			if (indexAtt > 0) {
				indexAtt = indexAtt - 8;
				// left.style.display='block';
				attFun(indexAtt);
			} else if (indexAtt == 0) {
				sureAppear('已经是第一页了');
				leftAtt.setAttribute('disabled', true);
				rightAtt.setAttribute('disabled', true);
				successOk.addEventListener('click', function() {
					sureFade();
					leftAtt.removeAttribute('disabled');
					rightAtt.removeAttribute('disabled');
				})
			}
		})

		rightAtt.addEventListener('click', function() {
			if (suc_2.length % 8 == 0) {
				if (suc_2.length == indexAtt + 8) {
					sureAppear('已经是最后一页了');
					leftAtt.setAttribute('disabled', true);
					rightAtt.setAttribute('disabled', true);
					successOk.addEventListener('click', function() {
						sureFade();
						leftAtt.removeAttribute('disabled');
						rightAtt.removeAttribute('disabled');
					})
					// console.log(indexAtt);
				} else {
					// right.style.display='block';
					indexAtt = indexAtt + 8;
					attFun(indexAtt);
					// console.log(indexAtt);
				}
			} else if (suc_2.length % 8 != 0) {
				if ((suc_2.length - (suc_2.length % 8)) == indexAtt) {
					sureAppear('已经是最后一页了');
					leftAtt.setAttribute('disabled', true);
					rightAtt.setAttribute('disabled', true);
					successOk.addEventListener('click', function() {
						sureFade();
						leftAtt.removeAttribute('disabled');
						rightAtt.removeAttribute('disabled');
					})
					// console.log(indexAtt);
				} else {
					// right.style.display='block';
					indexAtt = indexAtt + 8;
					attFun(indexAtt);
					// console.log(suc_2.length-(suc_2.length%8));
					// console.log(indexAtt);

				}
			}

		})
	},
	error: function(err) {
		// console.log(err);
	}
})

function attFun(indexAtt) {
	var fansList = document.querySelector('.fansList');
	fansList.innerHTML = '';
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFocusPage',
		data: {
			fansID: otherUser_id,
			num: indexAtt
		},
		success: function(suc_1) {
			// console.log(suc_1);
			if (suc_1.length == 0) {
				nullBox.style.display = 'block';
				fansList.style.display = 'none';
				leftAtt.style.display = 'none';
				rightAtt.style.display = 'none';
			} else {
				nullBox.style.display = 'none';
				fansList.style.display = 'block';
				leftAtt.style.display = 'block';
				rightAtt.style.display = 'block';
				for (let i = 0; i < suc_1.length; i++) {
					$.ajax({
						type: 'post',
						url: 'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
						data: {
							userID: suc_1[i].focusID
						},
						success: function(res) {
							// console.log(res);
							var li = `
                                <li class="fansItem">
                                    <div class="fansHead"></div>
                                    <div class="fans_1">
                                        <p class="fansName"></p>
                                        <span class="fansInfo">
                                                <span class="fansfans">0</span>
                                                <p class="fansText">粉丝</p>
                                            </span>
                                    </div>
                                    <div class="attBox">
                                        <div class="attention">
                                            <i class="fa fa-plus"></i>
                                            <span class="attentionText">关注</span>
                                        </div>
                                        <div class="noAttention">
                                            <i class="fa fa-check"></i>
                                            <span class="noattentionText">已关注</span>
                                        </div>
                                    </div>
                                </li>`;
							fansList.insertAdjacentHTML('beforeend', li);
							var attention=document.querySelectorAll('.attention');
							var noAttention=document.querySelectorAll('.noAttention')
							//点击进入其他用户页面
							setTimeout(function() {
								var fansItem = document.querySelectorAll('.fansItem');
								fansItem[i].addEventListener('click', function() {
									if(res.userID==user_id){
										localStorage.setItem("tolook", '0');
										window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/myPage");
									}else{
										localStorage.setItem('otherUser_id', res.userID);
										localStorage.setItem("tolook", '0');
										window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/otherUserPage");
									}
								})
								var fansName = document.querySelectorAll('.fansName');
								var fansfans = document.querySelectorAll('.fansfans');
								$.ajax({
									type: 'post',
									url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFansPage',
									data: {
										focusID: otherUser_id,
										num: indexAtt
									},
									success: function(suc_1) {
										if (suc_1.length < 10000) {
											fansfans[i].innerHTML = suc_1
												.length;
										} else {
											var x = (suc_1.length / 10000)
												.toFixed(2);
											fansfans[i].innerHTML = `${x}万`;
										}
									},
									error: function(err) {
										// console.log(err);
									}
								})
								var attBox = document.querySelectorAll('.attBox');
								if (user_id == res.userID) {
									attBox[i].style.display = 'none';
								}
								//粉丝的粉丝数量
								$.ajax({
									type: 'post',
									url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFans',
									data: {
										focusID: res.userID
									},
									success: function(suc_2) {
										if (suc_2.length < 10000) {
											fansfans[i].innerHTML = suc_2
												.length;
										} else {
											var x = (suc_2.length / 10000)
												.toFixed(2);
											fansfans[i].innerHTML = `${x}万`;
										}

									},
									error: function(err) {
										// console.log(err);
									}
								})
								var fansHead = document.querySelectorAll('.fansHead');
								//粉丝的粉丝信息
								$.ajax({
									type: 'post',
									url: 'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
									data: {
										userID: res.userID
									},
									success: function(res_4) {
										// console.log(res_4);
										fansName[i].innerHTML = res_4
											.username;
										fansHead[i].style.backgroundImage =
											`url(${res_4.picture})`;
									},
									error: function(err) {
										// console.log(err);
									}
								})

								//判断用户是否关注
								$.ajax({
									type: 'post',
									url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryFocusBoolean',
									data: {
										fansID: user_id,
										focusID: res.userID
									},
									success: function(res_1) {
										// console.log(res_1);
										
										var attBox = document.querySelectorAll('.attBox');
										if (res_1.code == 1) {
											attBox[i].firstElementChild.style.display = 'block';
											attBox[i].lastElementChild.style.display = 'none';
											
										} else if (res_1.code == -1) {
											attBox[i].firstElementChild.style.display = 'none';
											attBox[i].lastElementChild.style.display = 'block';		
										}
										attBox[i].addEventListener('click',function(e) {
											e.stopPropagation();
											if(attention[i].style.display=='block'){
												$.ajax({
													type: 'post',
													url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/addFocus',
													data: {
														fansID: user_id,
														focusID: res.userID
													},
													success: function(
														res_2
														) {
														// console.log(res_2);
														attBox[i].firstElementChild.style.display ='none';
														attBox[i].lastElementChild.style.display ='block';
													},
													error: function(err) {
														// console.log(err);
													}
												})
											}else{
												$.ajax({
													type: 'post',
													url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/deleteFocus',
													data: {
														fansID: user_id,
														focusID: res.userID
													},
													success: function(res_3) {
														// console.log(res_3);
														attBox[i].lastElementChild.style.display ='none';
														attBox[i].firstElementChild.style.display ='block';
													},
													error: function(err) {
														// console.log(err);
													}
												})
											}
											
										})

									},
									error: function(err) {
										// console.log(err);
									}
								})
							}, 100)


						},
						error: function(err) {
							// console.log(err);
						}
					})
				}
			}

		},
		error: function(err) {
			// console.log(err);
		}
	})
}
var focusBox = document.querySelector('.focus');
var focusNav = document.querySelector('.focusNav');
var fansNav = document.querySelector('.fansNav');
fansNav.addEventListener('click', function() {
	sureFade();
	leftAtt.style.display = 'none';
	rightAtt.style.display = 'none';
	left.style.display = 'block';
	right.style.display = 'block';
	left.removeAttribute('disabled');
	right.removeAttribute('disabled');
	fansFun(0);
})

focusBox.addEventListener('click', function() {
	if (have_land == 'false') {
		sureAppear('你还未登录，无权查看');
		successOk.addEventListener('click', function() {
			sureFade();
		})
	} else {
		sureFade();
		leftAtt.style.display = 'block';
		rightAtt.style.display = 'block';
		left.style.display = 'none';
		right.style.display = 'none';
		leftAtt.removeAttribute('disabled');
		rightAtt.removeAttribute('disabled');
		attFun(0);
	}

})
focusNav.addEventListener('click', function() {
	sureFade();
	leftAtt.style.display = 'block';
	rightAtt.style.display = 'block';
	left.style.display = 'none';
	right.style.display = 'none';
	leftAtt.removeAttribute('disabled');
	rightAtt.removeAttribute('disabled');
	attFun(0);
})


//用户的粉丝
var fansList = document.querySelector('.fansList');
var fans = document.querySelector('.fans');
fans.addEventListener('click', function() {
	if (have_land == 'false') {
		sureAppear('你还未登录，无权查看');
		successOk.addEventListener('click', function() {
			sureFade();
		})
	} else {
		fansFun(0);
	}
})

var left = document.querySelector('.left');
var right = document.querySelector('.right');
left.setAttribute('index', 0);
var index = left.getAttribute('index') * 1;
right.setAttribute('allWork', 0);
$.ajax({
	type: 'post',
	url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllSumFans',
	data: {
		focusID: otherUser_id
	},
	success: function(suc_2) {
		// if(index==0){
		//     left.style.display=='none';
		// }else{
		//     index=index-8;
		//     fansFun(index);
		// }
		// console.log(suc_2)
		left.addEventListener('click', function() {
			if (index > 0) {
				index = index - 8;
				// left.style.display='block';
				fansFun(index);
			} else if (index == 0) {
				sureAppear('已经是第一页了');
				left.setAttribute('disabled', true);
				right.setAttribute('disabled', true);
				successOk.addEventListener('click', function() {
					sureFade();
					left.removeAttribute('disabled');
					right.removeAttribute('disabled');
				})
			}
		})

		right.addEventListener('click', function() {
			if (suc_2 % 8 == 0) {
				if (suc_2 == index + 8) {
					sureAppear('已经是最后一页了');
					left.setAttribute('disabled', true);
					right.setAttribute('disabled', true);
					successOk.addEventListener('click', function() {
						sureFade();
						left.removeAttribute('disabled');
						right.removeAttribute('disabled');
					})
					// console.log(index);
				} else {
					// right.style.display='block';
					index = index + 8;
					fansFun(index);
					// console.log(index);
				}
			} 
			if (suc_2 % 8 != 0) {
				if ((index + 8) - suc_2 <= 8) {
					sureAppear('已经是最后一页了');
					left.setAttribute('disabled', true);
					right.setAttribute('disabled', true);
					successOk.addEventListener('click', function() {
						sureFade();
						left.removeAttribute('disabled');
						right.removeAttribute('disabled');
					})
					// console.log(index);
				} else {
					// right.style.display='block';
					index = index + 8;
					fansFun(index);
					// console.log(index);

				}
			}

		})
	},
	error: function(err) {
		// console.log(err);
	}
})

function fansFun(num) {
	fansList.innerHTML = '';
	$.ajax({
		type: 'post',
		url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFansPage',
		data: {
			focusID: otherUser_id,
			num: num
		},
		success: function(suc_1) {
			console.log(suc_1);
			if (suc_1.length == 0) {
				nullBox.style.display = 'block';
				fansList.style.display = 'none';
				leftAtt.style.display = 'none';
				rightAtt.style.display = 'none';
			} else {
				nullBox.style.display = 'none';
				fansList.style.display = 'block';
				leftAtt.style.display = 'inline-block';
				rightAtt.style.display = 'inline-block';
				for (let i = 0; i < suc_1.length; i++) {
					$.ajax({
						type: 'post',
						url: 'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
						data: {
							userID: suc_1[i].fansID
						},
						success: function(res) {
							// console.log(res);
							var li = `
                                <li class="fansItem">
                                    <div class="fansHead"></div>
                                    <div class="fans_1">
                                        <p class="fansName"></p>
                                        <span class="fansInfo">
                                                <span class="fansfans">0</span>
                                                <p class="fansText">粉丝</p>
                                            </span>
                                    </div>
                                    <div class="attBox">
                                        <div class="attention">
                                            <i class="fa fa-plus"></i>
                                            <span class="attentionText">关注</span>
                                        </div>
                                        <div class="noAttention">
                                            <i class="fa fa-check"></i>
                                            <span class="noattentionText">已关注</span>
                                        </div>
                                    </div>
                                </li>`;
							fansList.insertAdjacentHTML('beforeend', li);
							var attention=document.querySelectorAll('.attention');
                            var noAttention=document.querySelectorAll('.noAttention')
							//点击进入其他用户页面
							setTimeout(function() {
								var fansItem = document.querySelectorAll('.fansItem');
								fansItem[i].addEventListener('click', function() {
									if(res.userID==user_id){
										localStorage.setItem("tolook", '0');
										window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/myPage");
									}else{
										localStorage.setItem('otherUser_id', res.userID);
										localStorage.setItem("tolook", '0');
										window.location.assign("http://localhost:8080/ToSkyNews_war_exploded/otherUserPage");
									}
								})
								var fansName = document.querySelectorAll('.fansName');
								var fansfans = document.querySelectorAll('.fansfans');

								$.ajax({
									type: 'post',
									url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryAllFans',
									data: {
										focusID: res.userID
									},
									success: function(suc_2) {
										fansfans[i].innerHTML = suc_2.length;
									},
									error: function(err) {
										// console.log(err);
									}
								})
								var fansHead = document.querySelectorAll('.fansHead');
								//粉丝的粉丝
								$.ajax({
									type: 'post',
									url: 'http://localhost:8080/ToSkyNews_war_exploded/users/queryUserByID/{userID}',
									data: {
										userID: res.userID
									},
									success: function(res_4) {
										// console.log(res_4);
										fansName[i].innerHTML = res_4.username;
										fansHead[i].style.backgroundImage =`url(${res_4.picture})`;
									},
									error: function(err) {
										// console.log(err);
									}
								})
								//判断是否是用户本人
								var attBox = document.querySelectorAll('.attBox');
								if (user_id == res.userID) {
									attBox[i].style.display = 'none';
								}
								//判断用户是否关注
								$.ajax({
									type: 'post',
									url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/queryFocusBoolean',
									data: {
										fansID: user_id,
										focusID: res.userID
									},
									success: function(res_1) {
										// console.log(res_1);
										if (res_1.code == 1) {
											var attBox = document.querySelectorAll('.attBox');
											attBox[i].firstElementChild.style.display = 'block';
											attBox[i].lastElementChild.style.display = 'none';
											
										} else if (res_1.code == -1) {
											var attBox = document.querySelectorAll('.attBox');
											attBox[i].firstElementChild.style.display = 'none';
											attBox[i].lastElementChild.style.display = 'block';
										}
										attBox[i].addEventListener('click',function(e) {
											e.stopPropagation();
											if(attention[i].style.display=='block'){
												$.ajax({
													type: 'post',
													url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/addFocus',
													data: {
														fansID: user_id,
														focusID: res.userID
													},
													success: function(res_2) {
														// console.log(res_2);
														attBox[i].firstElementChild.style.display ='none';
														attBox[i].lastElementChild.style.display ='block';
													},
													error: function(err) {
														// console.log(err);
													}
												})	
											}else{
												$.ajax({
													type: 'post',
													url: 'http://localhost:8080/ToSkyNews_war_exploded/focus/deleteFocus',
													data: {
														fansID: user_id,
														focusID: res
															.userID
													},
													success: function(res_3) {
														// console.log(res_3);
														attBox[i].lastElementChild.style.display ='none';
														attBox[i].firstElementChild.style.display ='block';
													},
													error: function(err) {
														// console.log(err);
													}
												})
											}
												
										})

									},
									error: function(err) {
										// console.log(err);
									}
								})
							}, 100)


						},
						error: function(err) {
							// console.log(err);
						}
					})
				}
			}

		},
		error: function(err) {
			// console.log(err);
		}
	})
}
