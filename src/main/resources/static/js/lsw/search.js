window.onload = function () {
    // 动态返回顶部
    var timer = null;
    var box = document.getElementById("scrollTop")
    box.onclick = function () {
        cancelAnimationFrame(timer);
        timer = requestAnimationFrame(function fn() {
            var oTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (oTop > 0) {
                document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;
                timer = requestAnimationFrame(fn);
            } else {
                cancelAnimationFrame(timer);
            }
        });
    }
    // 鼠标滑动时，导航栏弹出且加阴影
    const topDiv = document.getElementById("toproll");
    window.onscroll = function () {
        if (document.documentElement.scrollTop >= 90) {
            topDiv.style.position = "fixed";
            topDiv.style.marginTop = "0px";
            topDiv.style.width = "100%";
            topDiv.style.cssText = "box-shadow: 0 0 7px grey";
        } else {
            topDiv.style.position = "relative";
            topDiv.style.marginTop = "0px";
            topDiv.style.width = "100%";
            topDiv.style.cssText = "box-shadow: 0 0 0 0  red";
        }
    }

}


