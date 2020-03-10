// 为了搭建服务器 要使用http模块
var http = require("http");
// 为了读取文件 要使用fs模块
var fs = require("fs");
// 为了解决路径问题 使用URL模块
var url = require("url");
// 格式化query数据
var qs = require("querystring");
// 定义MimeType对象
var MT = {
	css: "text/css",
	html: "text/html",
	js: "application/x-javascript",
	jpg: "image/jpeg",
	png: "image/png",
	gif: "image/gif",
	json: "text/plain",
	svg: "image/svg+xml"
}
// 定义数组 存储数据
var arr = ["a", "b", "c"];
// 创建服务器
var server = http.createServer(function(req, res) {
	var obj = url.parse(req.url, true);
	 





	// 定义接收信息的接口
	if (obj.pathname === "/submit" && req.method.toLowerCase() === "get") {
		// 获取提交过来的数据
		var msg = obj.query.msg;
		arr.push(msg);
		res.end(JSON.stringify({
			error: 0,
			data: "已经接收到您的数据了"
		}));
		console.log(arr);
		return;
	}

	// 定义返回信息的接口
	if (obj.pathname === "/getMsg" && req.method.toLowerCase() === "get") {
		// 获取前端提交的数据
		var num = obj.query.num;
		var newArr = arr.slice(num);
		res.end(JSON.stringify({
			error: 0,
			data: newArr
		}))


		return;
	}







	// 通过split方法将obj.pathname分割成数组 得到数组的最后意向就得到了后缀名称
	var extName = obj.pathname.split(".").pop();
	// 根据后缀名称生成一个mimetype字符串 
	var pathname = obj.pathname;
	fs.readFile("." + pathname, function(err, data) {
		if (err) {
			res.setHeader("content-type", "text/plain;charset=utf-8");
			res.end("抱歉，您读取的文件" + req.url + "不存在");
			return;
		}
		// 最后 拼接到这里
		res.setHeader("content-type", MT[extName] + ";charset=utf-8");
		res.end(data);
	});
});

// 监听端口号
server.listen(3000);