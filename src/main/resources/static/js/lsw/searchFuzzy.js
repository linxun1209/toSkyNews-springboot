var input = document.getElementById("input_text");
input.value=localStorage.getItem('search_input');
var leftcontent=document.getElementById('leftContent');
var tab=leftcontent.querySelector('#tab');
var list =document.querySelector('#tab').querySelectorAll('li')
var all_sort = ["综合", "科学", "体育", "军事", "游戏", "娱乐","图片"];
for (let i in list) {
    list[i].onclick = function () {
        let sort = list[i].innerHTML;
        for (let i = 0; i < list.length; i++) {
            list[i].className = ''
        }
        this.className = 'current';
        sessionStorage.setItem("c-sort", sort);
        page.value=1
        label_count();
        sorts();
        changePage();
        picture()
    }
}
// 根据帖子标签查询所有相同标签且审核通过的帖子（模糊查询）的数量
function label_count(){
    let sort = sessionStorage.getItem('c-sort');
    if(sort == all_sort[0]||sort == null) {
        countAll()
        search()
    }else {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/ToSkyNews_war_exploded/posts/queryVagueSameLabelCount',
            data: {
                thing: input.value,
                label: sort,
            },
            success: function (data) {
                var labelNum=data
                window.localStorage.labelNum=labelNum;
                changePage();
            },
            err: function (err) {
                console.log(err)
            },
        })
    }
}
// 分页
function sorts() {
    let sort = sessionStorage.getItem('c-sort');
    let page=document.querySelector('#page');
    let p=page.value;
    let pager=(p-1)*8;
    if (sort == all_sort[0] || sort == null) {
        search1()
    }else {
        for (let i = 1; i < all_sort.length; i++) {
            if (all_sort[i] == sort) {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost:8080/ToSkyNews_war_exploded/posts/querySameLabel',
                    data: {
                        column: pager,
                        thing:input.value,
                        label: sort,
                        total: 8
                    },
                    success: function (result) {
                        leftcontent.innerHTML = null;
                        for (let n = 0; n < result.length; n++) {
                            if(result[n].cover == null) {
                                leftcontent.innerHTML += `
                                        <div class="item-block" target="_blank">
                                            <div class="item-title">
                                            <span class="postsID">${result[n].postsID}</span>
                                            <p class="height postName">${result[n].postsName}</p>
                                            </div>
                                        <div class="item-content-sectence">
                                            <span>作者：${result[n].reside}</span><br>
                                            <span class="height">${result[n].contentA}</span>
                                        </div>
                                        <div class="item-block-bottom-sectence">
                                            <span>${result[n].browse}浏览量</span>&nbsp;&nbsp;&nbsp;
                                            <span class="time">${result[n].picture}</span>
                                        </div>
                                        </div>
                                    `;
                            }else{
                                leftcontent.innerHTML += `
                                        <div class="item-block" target="_blank">
                                            <div class="item-title">
                                                <span class="postsID">${result[n].postsID}</span>
                                                <p class="height postName">${result[n].postsName}</p>
                                            </div>
                                            <div class="item-contentone">
                                                 <img src="img\jing1.jpg" class="img2">
                                             </div>
                                             <div class="item-contenttwo">
                                                <p class="height">${result[n].contentA}</p>
                                                <span class="item-content-bot"><i class="icon ion-pricetags"></i>文学网</span>
                                              </div>
                                              <div class="item-block-bottom">
                                                    <span class="http">${result[n].browse}浏览量</span>&nbsp&nbsp
                                                    <span class="time">${result[n].picture}</span>
                                                </div>
                                        </div>
                                    `;
                                let item_block=document.getElementsByClassName('item-block')[n];
                                let img2=item_block.getElementsByClassName('img2')[0];
                                img2.src=result[n].cover;
                            }
                        }
                        allchange();
                        wordlimit();
                        highlight();
                    },
                    err: function (err) {
                        console.log(err)
                    }
                })
            }
        }
    }
}
sorts();
var num;
function countAll() {
    $.ajax({
        type: "post",
        async:false,
        url: "http://localhost:8080/ToSkyNews_war_exploded/posts/vagueQueryCountAll",
        data: {
            thing: input.value,
        },
        dataType: "json",
        success:function(data){
            num=data;
            window.localStorage.labelNum=num;
        }
    })
}
function search1() {
    var page=document.querySelector('#page');
    var p=page.value;
    let pager=(p-1)*8;
    if (input.value == '') {
        alert('输入框不能为0')
    } else {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/posts/vagueQueryAll",
            data: {
                column:pager,
                thing: input.value,
                total:8
            },
            dataType: "json",
            success: function (result) {
                localStorage.setItem('search_input',input.value);
                leftcontent.innerHTML = null;
                for(let i=0;i<result.length;i++) {
                    if (result[i].cover == null) {
                        $('#leftContent').append(
                            `
                          <div class="item-block" target="_blank">
                          <div class="item-title">
                            <span class="postsID">${result[i].postsID}</span>
                            <p class="height postName">${result[i].postsName}</p>
                          </div>
                          <div class="item-content-sectence">
                            <span>作者：${result[i].reside}</span><br>
                            <span class="height">${result[i].contentA}</span>
                          </div>
                          <div class="item-block-bottom-sectence">
                            <span>${result[i].browse}浏览量</span>&nbsp;&nbsp;
                            <span class="time">${result[i].picture}</span>
                          </div>
                          </div>
                            `
                        )
                    }else{
                        leftcontent.innerHTML += `
                                  <div class="item-block" target="_blank">
                                      <div class="item-title">
                                      <span class="postsID">${result[i].postsID}</span>
                                      <p class="height postName">${result[i].postsName}</p>
                                  </div>
                                      <div class="item-contentone">
                                           <img class="img" src="">
                                      </div>
                                       <div class="item-contenttwo">
                                           <p class="height">${result[i].contentA}</p>
                                           <span class="item-content-bot"><i class="icon ion-pricetags"></i>文学网</span>
                                       </div>
                                       <div class="item-block-bottom">
                                           <span class="http">${result[i].browse}浏览量</span>&nbsp&nbsp
                                           <span class="time">${result[i].picture}</span>
                                       </div>
                                  </div>
                                  `;
                        let item_block=document.getElementsByClassName('item-block')[i];
                        let img=item_block.getElementsByClassName('img')[0];
                        img.src=result[i].cover;
                    }
                }
                allchange();
                //超过一定字数加省略号
                wordlimit();
                highlight();
            },
            error: function (result) {
                console.log(result)
            },
        })
    }
}
search1();
// 模糊查询加分页
function search() {
    let page=document.querySelector('#page');
    let p=page.value;
    let pager=(p-1)*8;
    if (input.value == '') {
        alert('输入框不能为0')
    } else {
        $.ajax({
            type: "post",
            url: "http://localhost:8080/ToSkyNews_war_exploded/posts/vagueQueryAll",
            data: {
                column:pager,
                thing: input.value,
                total:8
            },
            dataType: "json",
            success: function (result) {
                localStorage.setItem('search_input',input.value);
                leftcontent.innerHTML = null;
                for(let i=0;i<result.length;i++) {
                    if (result[i].cover == null) {
                        $('#leftContent').append(
                            `
                          <div class="item-block" target="_blank">
                          <div class="item-title">
                            <span class="postsID">${result[i].postsID}</span>
                            <p class="height postName">${result[i].postsName}</p>
                          </div>
                          <div class="item-content-sectence">
                            <span>作者：${result[i].reside}</span><br>
                            <span class="height">${result[i].contentA}</span>
                          </div>
                          <div class="item-block-bottom-sectence">
                            <span>${result[i].browse}浏览量</span>&nbsp;&nbsp;
                            <span class="time">${result[i].picture}</span>
                          </div>
                          </div>
                            `
                        )
                    }else{
                        leftcontent.innerHTML += `
                                  <div class="item-block" target="_blank">
                                      <div class="item-title">
                                      <span class="postsID">${result[i].postsID}</span>
                                      <p class="height postName">${result[i].postsName}</p>
                                  </div>
                                      <div class="item-contentone">
                                           <img class="img" src="">
                                      </div>
                                       <div class="item-contenttwo">
                                           <p class="height">${result[i].contentA}</p>
                                           <span class="item-content-bot"><i class="icon ion-pricetags"></i>文学网</span>
                                       </div>
                                       <div class="item-block-bottom">
                                           <span class="http">${result[i].browse}浏览量</span>&nbsp&nbsp
                                           <span class="time">${result[i].picture}</span>
                                       </div>
                                  </div>
                                  `;
                        let item_block=document.getElementsByClassName('item-block')[i];
                        let img=item_block.getElementsByClassName('img')[0];
                        img.src=result[i].cover;
                    }
                }
                allchange();
                //超过一定字数加省略号
                wordlimit();
                highlight();
            },
            error: function (result) {
                console.log(result)
            },
        })
    }
    countAll();
    changePage();
}
search();
// // 动态创建页码
function changePage() {
    var btn_page = document.getElementById('btn-page');
    var btn_li = btn_page.getElementsByTagName('li');
    var totalpage = Math.ceil(window.localStorage.labelNum/ 8);
    var str = ''
    for (var i = 1; i <= totalpage; i++) {
        str += '<li>' + i + '</li>'
    }
    btn_page.innerHTML = str;
    for (let i = 0; i < btn_li.length; i++) {
        btn_li[0].style.backgroundColor = "lightblue";
        btn_li[i].style.left = i * 60 + "px";
        btn_li[i].onclick = function () {
            page.value = btn_li[i].innerHTML;
            for(let i=0;i<btn_li.length;i++){
                btn_li[i].style.backgroundColor="#e3e4e5";
            }
            this.style.backgroundColor="lightblue";

            if (i <= 1) {
                for (let j = 0; j < btn_li.length; j++) {
                    btn_li[j].style.left = j * 60 + "px";
                }
            }
            if (i > 2 && i< (totalpage - 1)) {
                for (let j = 0; j < btn_li.length; j++) {
                    btn_li[j].style.left = (j - i + 2) * 60 + "px";
                }
            }
            sorts()
        }
    }
    ago.onclick = function () {
        console.log(totalpage)
        var n = parseInt(page.value);
        if (n > 1 && n <= totalpage) {
            page.value-=1;
            btn_li[page.value-1].click()
        }
    }
    next.onclick = function () {
        var n = parseInt(page.value);
        if (n > 0 && n <= totalpage) {
            page.value++;
            if(page.value>totalpage){
                page.value=1
            }
            btn_li[page.value-1].click()
        }
    }
}
// 浏览量
var item_title = document.getElementsByClassName('item-title')
var article_id = localStorage.getItem('article_id');
function allchange() {
    for (let i in item_title) {
        item_title[i].onclick = function () {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/ToSkyNews_war_exploded/posts/setBrowse",
                data: {
                    postsID: article_id
                },
                dataType: "json",
                success: function (result) {
                    console.log(result)
                },
                err: function (result) {
                    console.log("报错了！")
                }
            })
            window.location.assign('recomments');
            var id = item_title[i].querySelector('.postsID').innerHTML;
            console.log(id)
            localStorage.setItem('article_id', id)
            window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${id}`)

        }
    }
}

// 限制字数显露
function wordlimit(cname, wordlength) {
    var cname = document.getElementsByClassName('item-content-sectence');
    for (let i = 0; i < cname.length; i++) {
        var nowLength = cname[i].innerHTML.length;
        if (nowLength > 250) {
            cname[i].innerHTML = cname[i].innerHTML.substr(0, 250) + '...';
        }
    }
};

// 关键字标红
function highlight() {
    clearSelection();//先清空一下上次高亮显示的内容；
    var searchText = $('.input_text').val();
    var regExp = new RegExp(searchText, 'g');
    $('.height').each(function ()//遍历文章
    {
        var html = $(this).html();
        var newHtml = html.replace(regExp, '<a class="highlight" style="color: #ff0000">' + searchText + '</a>');
        $(this).html(newHtml);//更新文章；
    });
}

function clearSelection() {
    $('.height').each(function ()//遍历
    {
        $(this).find('.highlight').each(function ()//找到所有highlight属性的元素；
        {
            $(this).replaceWith($(this).html());//将他们的属性去掉
        });
    });
}

// 热搜热榜
hotSearch()
function hotSearch() {
    $.ajax({
        type: "post",
        url: "http://localhost:8080/ToSkyNews_war_exploded/posts/queryAlikeDesc",
        data: {
            column: 0,
            total: 30
        },
        dataType: "json",
        success: function (result) {
            let index = 0;
            for (let i = 0; i < result.length; i++) {
                index++;
                $('.showBox').append(
                    `
                        <li class="tpl">
                            <span class="number">${index}</span>
                            <a class="hot_posts">${result[i].postsName}
                            <span class="postsID" style="display: none">${result[i].postsID}</span>
                            </a>
                        </li>
                        `
                )
            }
            queryData();
            hot_post();
        },
        err: function (result) {
            console.log("报错了！！")
        }
    })
}
// 热搜分页
function queryData() {
    let change = document.getElementById('change');
    let oLi = document.getElementsByClassName('tpl');
    let number = document.getElementsByClassName('number');
    number[0].style.backgroundColor = 'red'
    number[1].style.backgroundColor = 'orange'
    number[2].style.backgroundColor = 'coral'
    var k = 0;
    change.onclick = function () {
        if(k<2){
            k=k+1;
        }else if(k=3){
            k=0;
        }
        for(let j = 0; j < oLi.length; j++) {
            oLi[j].style.display = "none";
        }
        for (let j = k * 10; j < (k + 1) * 10; j++) {
            oLi[j].style.display = "block";
        }
    }
}

// 点击热搜跳转页面
var hot_posts = document.getElementsByClassName('hot_posts')
function hot_post() {
    for (let i in hot_posts) {
        hot_posts[i].onclick = function () {
            window.location.assign('recomments');
            let id = hot_posts[i].querySelector('.postsID').innerHTML;
            localStorage.setItem('article_id', id)
            window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${id}`)
        }
    }
    localStorage.setItem("tolook", '0');
}

var paging=document.getElementById('paging')
var allPicture
function picture(){
    let sort = sessionStorage.getItem('c-sort');
    if(sort == all_sort[6]||sort == null) {
        paging.style.display='none'
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/ToSkyNews_war_exploded/img/vagueQueryPicture',
            data: {
                thing: input.value,
            },
            success: function (result) {
                // console.log(result.data.length)
                allPicture=result.data.length
                    leftcontent.innerHTML = null;
                    for (let i = 0; i < result.data.length; i++) {
                        leftcontent.innerHTML += `
                    <div class="imgsDiv">
                        <img class="imgs" src='${result.data[i].userImg}' width="140px;height:120px">
                    </div>
                    `
                    }
            },
            err: function (err) {
                console.log(err)
            },
        })
    }else{
        paging.style.display='block'
    }

}



