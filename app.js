var express=require("express"); 
var bodyParser=require("body-parser"); 
var mongoose = require("mongoose");
var urlencodedParser = bodyParser.urlencoded({ extended: true }); 
// const mongoose = require('mongoose'); 
var MongoClient = require('mongodb').MongoClient;
//remove comment from here to use mongoose
// mongoose.connect('mongodb://localhost:27017/fashion'); 
// var db=mongoose.connection; 
// db.on('error', console.log.bind(console, "connection error")); 
// db.once('open', function(callback){ 
// 	console.log("connection succeeded"); 
// }) 

var res_array = [];
var dup_array = [];
var flag;
// var m_fashion = mongoose.model('m_fashion',mfashion);

var url='mongodb://localhost:27017/fashion';
// mongoose.connect(url, function(err,db){

// 	var cursor = db.collection("mfashion").find();
// 	// console.log("cursor:",cursor);
// 	var cntr = 0;
// 	cursor.each(function(err,doc){
// 		// console.log(doc);
// 		res_array.push(doc);
// 		// cntr++;
// 		// dup_array = res_array.slice();
// 	});
// 	// var res_arr_str = JSON.stringify(res_array);
// 	console.log("resarra:",res_array);


// 	db.close();
// });

// async function foo() {
// 	let promise = new Promise((resolve, reject) =>{
// 		mongoose.connect(url, function(err,db){

// 			var cursor = await db.collection("mfashion").find();
// 			// cursor.each( await function(err,doc){
// 			// 	res_array.push(doc);
// 			// });
// 			for(let doc = await cursor.next(); doc!= null; doc = await cursor.next()){
// 				res_array.push(doc);
// 			}
// 			// resolve(res_array);
// 			db.close();
// 		});
// 	});
	// let result = await promise;
	// console.log("result:",res_array);
// }	

// async function foo(){
// 	const db =  MongoClient.connect(url);
// 	const cursor = db.collection("mfashion").find();
// 	for(let doc = await cursor.next(); doc != null; doc = await cursor.next()){
// 		res_array.push(doc);
// 	}
// 	console.log("aftr curr:",res_array);
// }
// foo();

// console.log("after async");
// console.log(dup_array);
var app=express();

app.use(bodyParser.json()); 
app.use(express.static('public'));



app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html',require('ejs').renderFile);
var gdata;
app.get('/mensfashion', async function(req,res)
{
	MongoClient.connect(url, async function(err, db){
		var cursor = await db.collection('mfashion').find();
		for(let doc = await cursor.next(); doc!=null; doc = await cursor.next()){
			res_array.push(doc);
		}
	})
	
	
	res.send(res_array);
});
// console.log("gdata:",gdata);
app.get('/registration',function(req,res){
	res.render('reg.html');
});

app.post('/register',urlencodedParser, function(req,res){
	response = { username:req.body.Uname,   
		ph :req.body.MNum, 
		email:req.body.email, 
		password:req.body.pass};
		
	console.log(req.body.Uname);
	// res.send(JSON.stringify(response));
/*	MongoClient.connect(url, function(err, db){
        if (err)
            throw err;
        console.log("Connected to Database");
        db.collection('user').insertOne(response,function(err,result){
            if (err)
                throw err;
            console.log("1 document inserted to Collection");
            console.log(response);
        });
    });
*/
    res.render('success.html');

});

app.get('/login',function(req,res){
	res.render('login.html');
});

app.get('/womensfashion',function(req,res){
	res.render('womensfashion.html');
});

app.get('/childrensfashion',function(req,res){
	res.render('childrensfashion.html');
});




app.get('/',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('home.html'); 
}).listen(6969) 

console.log("listening at port 6969");