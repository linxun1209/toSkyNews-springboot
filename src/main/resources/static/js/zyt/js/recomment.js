window.addEventListener('load', function () {
    // ul class='classify' 中的li背景色变
    var classify = document.querySelector('.classify');
    var reco1_lis = this.document.querySelectorAll('.reco1_li');
    for (var i = 0; i < reco1_lis.length; i++) {
        reco1_lis[i].addEventListener('mouseenter', function () {
            this.style.backgroundColor = 'rgb(245,245,245)';
        })
        reco1_lis[i].addEventListener('mouseleave', function () {
            this.style.backgroundColor = 'rgb(255,255,255)';
        })
    }
    var fa = this.document.querySelector('.fa');
    fa.addEventListener('click', function () {
        this.style.color = 'red';
    })
    fa.addEventListener('mouseleave', function () {
        this.style.color = '#999';
    })
    var search = this.document.querySelector('.search');
    search.addEventListener('mouseover', function () {
        this.style.color = 'rgb(0, 179, 255)';
    })
    search.addEventListener('mouseleave', function () {
        this.style.color = '#999';
    })
    //    用户头像隐藏与显示
    var user = document.querySelector('.user');
    var avator=this.document.querySelector('.avator');
    var user_message = document.querySelector('.user_message');
    avator.addEventListener('mouseover', function () {
        user_message.style.display = 'block';
    })
    avator.addEventListener('mouseleave', function () {
        user_message.style.display = 'none';
    })
    user_message.addEventListener('mouseover', function () {
        user_message.style.display = 'block';
    })
    user_message.addEventListener('mouseleave', function () {
        user_message.style.display = 'none';
    })
    // 顶部搜索文本框中的文字变化
    var pad = this.document.querySelector('.pad');
    var title_input = this.document.querySelector('.title_input');
    var reco1_input = this.document.querySelector('.reco1_input');
    var arr = ['经典老歌怀旧歌曲', '熊出没重返地球', '鲤鱼ace游戏视频', '电影长津湖之水门桥', '小猪佩奇动画片'];

    function f1() {
        var math = Math.floor(Math.random() * arr.length);
        pad.innerHTML = arr[math];
    }
    setInterval(f1, 1000000);
    f1();
    // 点击关注变色
    var look = this.document.querySelector('.look');
    var hhh=0;
    look.addEventListener('click', function () {
        if (hhh == 0) {
            look.style.backgroundColor = 'rgb(245,245,245)';
            look.style.color = 'black';
            hhh = 1;
        } else {
            look.style.backgroundColor = 'rgb(255, 0, 60)';
            look.style.color = 'rgb(255,255,255)';
            hhh = 0;
        }
    })
    // 点击收藏图片变
    // var store = this.document.querySelector('.store');
    // var replace_store = this.document.querySelector('.replace_store');
    // var like_store = this.document.querySelector('.like_store');
    // like_store.addEventListener('click', function () {
    // store.style.display = 'none';
    // replace_store.style.display = 'block';
    // })
    // like_store.addEventListener('mouseleave', function () {
    // store.style.display = 'block';
    // replace_store.style.display = 'none';
    // })
    var remark_content_pic_star=this.document.querySelector('#remark_content_pic_star');
    var kkk=0;
    remark_content_pic_star .addEventListener('click', function () {
        if (kkk == 0) {
            remark_content_pic_star.style.color = 'red';
            kkk = 1;
        } else {
            remark_content_pic_star.style.color = 'rgba(255, 255, 255, 0.712)';
            kkk = 0;
        }
    })

    // tab栏板块功能
    var tab = this.document.querySelector('.tab');
    var remarks = this.document.querySelectorAll('.remark');
    var tab_lis = this.document.querySelectorAll('.tab_li');
    for (var i = 0; i < tab_lis.length; i++) {
        tab_lis[i].setAttribute('index', i);
        tab_lis[i].onmouseover = function () {
            for (var i = 0; i < tab_lis.length; i++) {
                tab_lis[i].className = 'tab_li';
            }
            this.className = 'tab_li tab_list';
            var index = this.getAttribute('index');
            console.log(index);
            for (var i = 0; i < remarks.length; i++) {
                remarks[i].style.display = 'none';
            }
            remarks[index].style.display = 'block';
        }
    }


    //  自动播放中的按钮
    var fa_toggle_off = this.document.querySelector('#fa-toggle-off');
    var fa_toggle_on = this.document.querySelector('#fa fa-toggle-on');

    fa_toggle_off.onclick = function () {
        // fa_toggle_off.style.display='none';
        fa_toggle_on.style.display = 'block';
    }
    // fa_toggle_on.onclick=function(){
    //     fa_toggle_off.style.display='block';
    //     fa_toggle_on.style.display='none';
    // }

    var remark_like=this.document.querySelector('#remark_like');
    var jjj=0;
    remark_like.addEventListener('click', function () {
        if (jjj == 0) {
            remark_like.style.color = 'red';
            remark_like.style.transform = ("scale(1.3)");
            jjj= 1;
        } else {
            remark_like.style.color = 'black';
            remark_like.style.transform = ("scale(1.0)");
            jjj= 0;
        }
    })
})