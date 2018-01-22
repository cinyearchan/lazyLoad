var http = require('http')
var fs = require('fs')
var url = require('url')

//console.log(Object.keys(http))
var port = process.env.PORT || 8888;

var server = http.createServer(function(request, response){

  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  //从这里开始看，上面不要看

  if(path === '/index'){
    response.setHeader('Content-Type', 'text/html; charset="utf-8"')
    var string = fs.readFileSync('./index.html', 'utf-8')
    response.end(string)
  }else if(path === '/getNews'){
    response.setHeader('Content-Type', 'application/json')
    var news = fs.readFileSync('./news.json', 'utf-8')
    var pageIndex = query.page

    var len = 3
    var retNews = Array.prototype.slice.call(JSON.parse(news), pageIndex * len, pageIndex * len + len)
    var string = JSON.stringify({status: 0, data: retNews})
    response.end(JSON.stringify({status: 0, data: retNews}))
  }else{
    console.log(path)
    response.statusCode = 404
    response.setHeader('Content-Type','text/html')
    var notFoundFile = fs.readFileSync('./404.html', 'utf-8')
    response.end(notFoundFile)
  }

  // 代码结束，下面不要看
  console.log(method + ' ' + request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)