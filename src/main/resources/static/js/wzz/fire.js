//热搜热榜
let showBox=document.getElementsByClassName('showBox')[0];
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
                // $('.showBox').append(
                showBox.innerHTML+=
                    `
                        <li class="tpl">
                            <span class="number">${index}</span>
                            <a class="hot_posts">${result[i].postsName}
                            <span class="postsID" style="display: none">${result[i].postsID}</span>
                            </a>
                        </li>
                    `;
                // )
            }
            queryData();
            hot_post();
        },
        err: function (result) {
            console.log("报错了！！")
        }
    })

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
            let id = hot_posts[i].querySelector('.postsID').innerHTML;
            localStorage.setItem("article_id", id);
            window.location.assign(`http://localhost:8080/ToSkyNews_war_exploded/recomments?article_id=${id}`);
        }
    }
}