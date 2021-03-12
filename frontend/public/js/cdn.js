// 腾讯：http://frontend-1258187630.file.myqcloud.com/js/chunk-vendors.js
// 阿里：https://buildlinks-nearwallet-selector.s3-accelerate.amazonaws.com/js/chunk-vendors.js
// 谷歌：https://buildlinks-nearwallet-selector-frontend.oss-accelerate.aliyuncs.com/js/chunk-vendors.js
let qq = 'http://frontend-1258187630.file.myqcloud.com'
let ali = 'https://buildlinks-nearwallet-selector.s3-accelerate.amazonaws.com'
let google = 'https://buildlinks-nearwallet-selector-frontend.oss-accelerate.aliyuncs.com'

let urlArr = [
  {
    request: ali + '/img/bg.d033c87f.png',
    url: ali
  },
  {
    request: google + '/img/bg.d033c87f.png',
    url: google
  }
]

let timeRecord = {} // url与请求时间的记录

let flag = false
/**
 * 动态创建link script标签
 */
function addLink(url, path) { 
    var doc=document
    var link=doc.createElement('link')
    link.setAttribute('rel', 'preload')
    link.setAttribute('as', 'script')
    link.setAttribute('href', url + path)
  
    var heads = doc.getElementsByTagName('head')
    if(heads.length) 
        heads[0].appendChild(link)
    else 
        doc.documentElement.appendChild(link)
  }
  function addScript(url, path) {
    var script=document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', url + path)
    var heads = document.getElementsByTagName('head')
    if(heads.length) 
        heads[0].appendChild(script)
    else 
        document.documentElement.appendChild(script)
  }

/**
  * 创建script标签，并将js的字符串内容填充至script标签中，
  * 此方法仅限于一次创建并加载，后续进入此方法的内容将无效
  * @param jsData 填充到创建标签的内容
  */
let loadJs = (jsData, scriptUrl) => {
  if (!flag) {
    flag = !flag;
    // 第二层if我也没有仔细想，目的是为了防止第一层if进入，
    // 但是还未执行到flag=!flag的时候，第二个就进来的情况；
    if (flag) {
      window.startImgUrl = scriptUrl
      addLink(scriptUrl, '/js/app.js')
      addLink(scriptUrl, '/js/chunk-vendors.js')
      addScript(scriptUrl, '/js/chunk-vendors.js')
      addScript(scriptUrl, '/js/app.js')
    }
  } else {
    // 就是提示一下，这里else可以不要
    console.warn("已经加载过其他的了")
  }
}

/**
  * 显示 url 与操作时间
  * @param url 需要显示的url值
  */
let displayTime = (url) => {
  let startTime = timeRecord[url]["startTime"]
  let endTime = timeRecord[url]["endTime"]
}

/**
  * JavaScript 原生网络请求方式，请求指定url
  * @param url 请求的地址
  * @param callback 请求成功后执行的操作
  */
let requestByXMLHttpRequest = (url, callback, scriptUrl) => {
  const request = new XMLHttpRequest()

  request.open("GET", url)
  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE
      && request.status === 200) {

      let responseURL = request.responseURL
      timeRecord[responseURL]["endTime"] = new Date()
      displayTime(responseURL)

      callback(request.responseText, scriptUrl)
    }
  }
  request.send()
}

window.onload = () => {
  let length = urlArr.length

  for (let i = 0; i < length; i++) {
    let url = urlArr[i].request
    timeRecord[url] = {
      "startTime": new Date(),
      "endTime": 0
    };

    requestByXMLHttpRequest(url, loadJs, urlArr[i].url)
  }

}