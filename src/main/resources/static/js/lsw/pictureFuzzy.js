// // 模糊查询加分页
// var input_text=document.getElementById('input_text');
// var rightCenter2=document.getElementById('rightCenter2');
// function search(){
//     if(input_text.value==''){
//         alert('请输入描述')
//     }else{
//         $.ajax({
//             type: "post",
//             url: "http://localhost:8080/ToSkyNews_war_exploded/img/vagueQueryPicture",
//             data: {
//                 thing: input_text.value
//             },
//             dataType: "json",
//             success: function (result) {
//                 console.log(result)
//                 var pageBig=document.getElementById('pageBig');
//                 pageBig.innerHTML +=`
//                 <button id="ago1" onclick='ss()'>上一页</button>
//                     <a id="aa1" href="javascript:;">1</a>
//                     <button id="next1" onclick="xx()">下一页</button>
//                     <span>跳转至&nbsp;<input oninput="pictureAllNum()" value="1" style="width: 20px;" id="page"/>&nbsp;页</span>
//                  `
//                 sort();
//             },
//             err: function (result) {
//                 console.log("报错了！")
//             }
//         })
//     }
// }
// function sort(){
//     let page=document.querySelector('#page');
//     let p=page.value;
//     let pager=(p-1)*8;
//     $.ajax({
//         type: "post",
//         url: "http://localhost:8080/ToSkyNews_war_exploded/img/vagueSaveImgPages",
//         data: {
//             column: pager,
//             thing:input_text.value,
//             total:15
//         },
//         dataType: "json",
//         success: function (result) {
//             console.log(result)
//             rightCenter2.innerHTML=null
//             for(let i=0;i<result.data.length;i++){
//                 rightCenter2.innerHTML +=`
//                 <div class="imgsDiv">
//                     <div class="imgCover"  onclick="q('${result.data[i].pictureID}')">删除</div>
//                     <img class="imgs" src='${result.data[i].userImg}' width="140px;height:120px">
//                 </div>
//             `
//             }
//         },
//         err: function (result) {
//             console.log("报错了！")
//         }
//     })
//     ss()
//     xx()
// }
