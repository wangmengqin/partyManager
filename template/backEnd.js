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
// 根据id查询专栏信息
app.post("/getColumnById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from newscolumn where id like '%${req.body.id}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据名称查询专栏信息
app.post("/getColumnByName",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from newscolumn where columnName like '%${req.body.name}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改专栏信息
app.post("/editColumnById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update newscolumn set columnName = '${req.body.name}', columnDescribe = '${req.body.describe}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除专栏信息
app.post("/deleteColumnById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from newscolumn where id = '${req.body.id}'`;
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

/* 新闻模块 */
//查询所有信息
app.post("/allNews",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from news`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id查询新闻信息
app.post("/getNewsById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from news where id like '%${req.body.id}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据标题查询新闻信息
app.post("/getNewsByTitle",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from news where title like '%${req.body.title}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据摘要查询新闻信息
app.post("/getNewsByRemark",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from news where remark like '%${req.body.remark}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据作者查询新闻信息
app.post("/getNewsByAuthor",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from news where author like '%${req.body.author}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据专题查询新闻信息
app.post("/getNewsByTheme",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from news where theme like '%${req.body.theme}%' order by id desc LIMIT 6 `;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改新闻信息
app.post("/editNewsById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update news set title = '${req.body.title}', author = '${req.body.author}', remark = '${req.body.remark}', theme = '${req.body.theme}', content = '${req.body.content}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除新闻信息
app.post("/deleteNewsById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from news where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 添加新闻
app.post("/addNews",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO news(title, author, remark, theme, content, time) VALUES ('${req.body.title}','${req.body.author}', '${req.body.remark}','${req.body.column}','${req.body.content}','${req.body.time}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

/* 活动模块 */
// 添加活动
app.post("/addActivity",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO activities(activity_name, speaker, place, time, branch, img, activity_describe, type) VALUES ('${req.body.name}','${req.body.speaker}', '${req.body.place}','${req.body.time}','${req.body.branch}','${req.body.img}', '${req.body.describe}', '${req.body.type}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//查询所有信息
app.post("/allActivity",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from activities`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//查询所有信息（降序）
app.post("/allActivityDesc",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from activities order by id Desc limit 3`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据活动名称查询活动信息
app.post("/getActivityByName",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from activities where activity_name like '%${req.body.name}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据活动编号查询活动信息
app.post("/getActivityById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from activities where id like '%${req.body.id}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据活动举办支部查询活动信息
app.post("/getActivityByBranch",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from activities where branch like '%${req.body.branch}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据活动描述查询活动信息
app.post("/getActivityByDescribe",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from activities where activity_describe like '%${req.body.describe}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据活动类型活动信息
app.post("/getActivityByType",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from activities where type like '%${req.body.type}%' order by id desc LIMIT 6 `;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除活动信息
app.post("/deleteActivityById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from activities where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改活动信息
app.post("/editActivity",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update activities set activity_name = '${req.body.name}', speaker = '${req.body.speaker}', place = '${req.body.place}', time = '${req.body.time}', activity_describe = '${req.body.describe}', branch = '${req.body.branch}', content = '${req.body.content}', type='${req.body.type}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

/* 支部模块 */
// 添加支部
app.post("/addBranch",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO branch(name, institute, secretary, fu_secretary, propagate) VALUES ('${req.body.branchName}','${req.body.institute}', '${req.body.secretary}','${req.body.deputySecretary}','${req.body.propagate}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//查询所有信息
app.post("/allBranch",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from branch`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据支部名称查询支部信息
app.post("/getBranchByName",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from branch where name like '%${req.body.name}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据学院查询支部信息
app.post("/getBranchByInstitute",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from branch where institute like '%${req.body.institute}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据学院查询支部信息
app.post("/getBranchById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from branch where id like '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除信息
app.post("/deleteBranchById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from branch where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改支部信息
app.post("/editBranch",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update branch set name = '${req.body.name}', institute = '${req.body.institute}', secretary = '${req.body.secretary}', fu_secretary = '${req.body.deputySecretary}', propagate = '${req.body.propagate}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

/* 党员模块 */
// 党员添加
app.post("/addMember",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO member(name, sex, age, sno, major, institute, grade, type, native) VALUES ('${req.body.name}', '${req.body.sex}', '${req.body.age}', '${req.body.sno}', '${req.body.major}', '${req.body.institute}', '${req.body.grade}', '${req.body.type}','${req.body.native}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//查询所有信息
app.post("/allMember",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from member`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//根据id查询信息
app.post("/getMemberById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from member where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//根据学生姓名查询信息
app.post("/getMemberByName",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from member where name like '%${req.body.name}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//根据学院查询信息
app.post("/getMemberByInstitute",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from member where institute like '%${req.body.institute}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//根据专业查询信息
app.post("/getMemberByMajor",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from member where major like '%${req.body.major}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//根据学号查询信息
app.post("/getMemberBySno",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `select * from member where sno like '%${req.body.sno}%'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除信息
app.post("/deleteMemberById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from member where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改党员信息
app.post("/editMember",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update member set name = '${req.body.name}', sex = '${req.body.sex}', age = '${req.body.age}', sno = '${req.body.sno}', major = '${req.body.major}', institute = '${req.body.institute}', identify = '${req.body.identify}', type = '${req.body.type}', branch = '${req.body.branch}', native = '${req.body.native}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改党员身份信息
app.post("/editMemberIdentify",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update member set identify = '${req.body.identify}', branch = '${req.body.branch}', password = '${req.body.password}', head = '${req.body.head}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改党员密码信息
app.post("/editMemberPassword",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update member set password = '${req.body.password}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

//获取当前登录者的所有信息（普通党员）
app.post("/getLoginInfo",function(req,res){
	//解决跨域问题
	res.append("Access-Control-Allow-Origin","*");
	//连接后执行相应功能
	connect.query(`SELECT password FROM member where sno = ${req.body.username}`, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

/* 活动列表模块 */
// 党员参加活动
app.post("/addMemberActivity",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO activities_member(activity_name, member_sno, member, money_status, status) VALUES ('${req.body.activity_name}', '${req.body.member_sno}', '${req.body.member}', '${req.body.money_status}', '${req.body.status}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 获取所有参加活动信息
app.post("/allMemberActivity",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from activities_member`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
//根据学号、姓名、活动名称查询信息
app.post("/getMemberActivityBySnoName",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from activities_member WHERE activity_name = '${req.body.activity_name}' AND member = '${req.body.member}' AND member_sno = '${req.body.sno}' `;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改参加活动状态信息
app.post("/editMemberActivityStatus",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update activities_member set status = '${req.body.status}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除信息
app.post("/deleteMemberActivityById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from activities_member where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

/* 留言模块 */
// 获取所有信息
app.post("/allMessage",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from message order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 前端显示留言
app.post("/allShowMessage",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * FROM message WHERE status = '显示' or status = '精选' ORDER BY time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 获取精选留言
app.post("/allRecommandMessage",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from message where status = '精选' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据学号查找留言
app.post("/getMessageBySno",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from message where sno like '%${req.body.sno}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据内容查找留言
app.post("/getMessageByContent",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from message where content like '%${req.body.content}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除信息
app.post("/deleteMessage",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from message where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 增加留言
app.post("/addMessage",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO message(sno, name, content, time, head, status) VALUES ('${req.body.sno}', '${req.body.name}', '${req.body.content}', '${req.body.time}', '${req.body.head}', '${req.body.status}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id修改留言状态信息
app.post("/editMessageStatus",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update message set status = '${req.body.status}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

/* 组织关系模块 */
// 获取所有信息
app.post("/allCheckOrg",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from org order by applyTime Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id 修改状态（审核）
app.post("/editOrgStatus",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update org set status = '${req.body.status}', checkTime = '${req.body.checkTime}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据学生姓名搜索记录
app.post("/getOrgByName",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from org where name like '%${req.body.name}%' order by id Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据支部搜索记录
app.post("/getOrgByBranch",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from org where branch like '%${req.body.branch}%' order by id Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 申请迁出（增加组织关系）
app.post("/addOrg",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO org(name, sno, branch, city, address, applyTime, status) VALUES ('${req.body.name}', '${req.body.sno}', '${req.body.branch}', '${req.body.city}', '${req.body.address}', '${req.body.applyTime}', '${req.body.status}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

/* 公告模块 */
// 发布公告
app.post("/addInform",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO inform(sno, name, title, content, time) VALUES ('${req.body.sno}', '${req.body.name}', '${req.body.title}', '${req.body.content}', '${req.body.time}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 查询所有
app.post("/allInform",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from inform order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id查询
app.post("/getInformById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from inform where id = '${req.body.id}' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据标题查询
app.post("/getInformByTitle",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from inform where title like '%${req.body.title}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据发布者查询
app.post("/getInformByName",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from inform where name like '%${req.body.name}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据内容查询
app.post("/getInformByContent",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from inform where content like '%${req.body.content}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id 修改内容
app.post("/editInform",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update inform set name = '${req.body.name}', sno = '${req.body.sno}', title = '${req.body.title}', content = '${req.body.content}', time = '${req.body.time}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除信息
app.post("/deleteInform",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from inform where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

/* 党务管理模块 即民主生活，争先创优模块 */
// 增加公告
app.post("/addLife",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `INSERT INTO life(title, branch, content, type, time) VALUES ('${req.body.title}', '${req.body.branch}', '${req.body.content}', '${req.body.type}', '${req.body.time}')`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 查询所有
app.post("/allLife",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from life order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id查询
app.post("/getLifeById",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from life where id = '${req.body.id}' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据标题查询
app.post("/getLifeByTitle",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from life where title like '%${req.body.title}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据支部查询
app.post("/getLifeByBranch",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from life where branch like '%${req.body.branch}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据内容查询
app.post("/getLifeByContent",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from life where content like '%${req.body.content}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据类型查询
app.post("/getLifeByType",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `SELECT * from life where type like '%${req.body.type}%' order by time Desc`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id 修改内容
app.post("/editLife",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `update life set title = '${req.body.title}', branch = '${req.body.branch}', content = '${req.body.content}', type = '${req.body.type}', time = '${req.body.time}' where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})
// 根据id删除信息
app.post("/deleteLife",function(req,res){
	res.append("Access-Control-Allow-Origin","*");
	var sql = `delete from life where id = '${req.body.id}'`;
	connect.query(sql, function(error, results, fields) {
		if(error) throw error;
		res.send(JSON.stringify(results));
	});
})

//监听端口
app.listen(5555);
console.log("开启服务器")