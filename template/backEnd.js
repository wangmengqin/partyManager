var express = require("express");
var app = express();
var mysql = require("mysql");
app.use(express.static('../public'));
//创建数据库连接
var connect = mysql.createConnection({
	host:'localhost',
	user:'wmq',
	password:'123456',
	database:'partymanager'
});
// 处理post请求的请求体模块
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//开始连接
connect.connect();

// 测试写的
app.post("/getList",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query('SELECT * FROM message', function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//查询所有专栏信息
app.post("/allcolumns",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from newscolumn`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 添加新闻专栏
app.post("/addcolumns",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO newscolumn(columnName, columnDescribe) VALUES ('${req.body.name}','${req.body.describe}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 添加新闻
app.post("/addNews",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO news(title, author, remark, theme, content, time) VALUES ('${req.body.title}','${req.body.author}', '${req.body.remark}','${req.body.theme}','${req.body.content}','${req.body.time}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
/*//获取当前登录者的所有信息
app.post("/getMessAll",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query(`SELECT * FROM person_info where id = ${req.body.id}`, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})*/
//监听端口
app.listen(5555);
console.log("开启服务器")