var readline = require('readline');  
var fs = require('fs'); 
var db = require('./db.js'); 
 
  
var fReadName = './xiaoxue1.txt';  
var fRead = fs.createReadStream(fReadName);  

  
var objReadline = readline.createInterface({  
    input: fRead
});  


var index =0;
var lines = [];
objReadline.on('line', (line)=>{  
	lines.push(line);
});  
  
objReadline.on('close', ()=>{  
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		var start = line.indexOf('《');
		var end = line.indexOf('》');
		var start1 = line.indexOf('(');
		if(start1==-1){
			start1 = line.indexOf('（');
		}
		var end1 = line.indexOf(')');
		if(end1==-1){
			end1 = line.indexOf('）');
		}

		var title = line.substr(start+1,end-start-1);
		var author = line.substr(end+1,start1-end-1);
		var time = line.substr(start1+1,end1-start1-1);
		var content = line.substr(end1+1);

    	db.insertData(title,author,time,content);
	}
	
}); 


/**
 * 收集开心辞典的数据
 *
 */
function collectData(text,stard_answer){
		var  params = [];
		params.push(uuid.v1());
		params.push(text);
		params.push(1);
		params.push(1);
		params.push(stard_answer);
		params.push("");
		return params;
};