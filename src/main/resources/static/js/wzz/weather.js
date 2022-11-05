// window.onload = function (){
// 	// 模糊定位
//     AMap.plugin('AMap.CitySearch', function () {
//         var citySearch = new AMap.CitySearch()
//         citySearch.getLocalCity(function (status, result) {
//             if (status === 'complete' && result.info === 'OK') {
//                 // 查询成功，result即为当前所在城市信息
//                 console.log(result)
//             }
//         })
//     })
//     // 精准定位  注意，部分浏览器会获取不到位置，如谷歌。经测试，用Edge是可以获取到的
//     AMap.plugin('AMap.Geolocation', function() {
//            var geolocation = new AMap.Geolocation({
//                 // 是否使用高精度定位，默认：true
//                 enableHighAccuracy: false,
//             })
//             geolocation.getCurrentPosition()
//             AMap.event.addListener(geolocation, 'complete', onComplete)
//             AMap.event.addListener(geolocation, 'error', onError)
//             function onComplete (data) {
//                 // data是具体的定位信息
//                 console.log('data', data);//这里就是获取到的位置了
//             }
//             function onError (err) {
//                 // // 定位出错
//                 console.log('err', err);//这里就是获取到的位置了
//             }
//         })
//     }
WIDGET = {
    "CONFIG": {
      "modules": "01234",
      "background": "5",
      "tmpColor": "FFFFFF",
      "tmpSize": "16",
      "cityColor": "FFFFFF",
      "citySize": "16",
      "aqiColor": "FFFFFF",
      "aqiSize": "16",
      "weatherIconSize": "24",
      "alertIconSize": "18",
      "padding": "10px 10px 10px 10px",
      "shadow": "0",
      "language": "auto",
      "fixed": "true",
      "vertical": "top",
      "horizontal": "left",
      "left": "100",
      "top": "5",
      "key": "4f3b0213669a4d4bb84f495d2b1b8a8b"
    }
  }

