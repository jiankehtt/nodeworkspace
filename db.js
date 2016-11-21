var mysql  = require('mysql'); 
var uuid = require('node-uuid'); 

// var  userAddSql = 'INSERT INTO kx_question(guid,text,type,status,stard_answer,analysis) VALUES(?,?,?,?,?,?)'; 
var  sql = 'INSERT INTO gs_gushi set ?'; 
var db  = {

	insertData: function(title,author,time,content){
		var connection = mysql.createConnection({    
		  host     : '101.200.159.209',      
		  user     : 'hutongtao',             
		  password : 'root',      
		  port: '3306',                  
		  database: 'lili',
		});
		connection.connect();
		var data = getData(title,author,time,content);
		var query = connection.query(sql,data,function (err, result) {
				if(err){
				 console.log('[INSERT ERROR] - ',err.message);
				 return;
				}       
			   console.log('OK');
			     
		});
		console.log(query.sql);
		connection.end();
	}
}

module.exports=db;

function getData(title,author,time,content){
	return {
			guid:getUuid(),
			title:trim(title),
			author:trim(author),
			time:time,
			content:trim(content),
			status:1,
			stage:1
		};
}

function trim(str){
	 return str.replace(/ /g,'');
}

function getUuid(){
	return uuid.v1().replace(/-/g,'');
}
