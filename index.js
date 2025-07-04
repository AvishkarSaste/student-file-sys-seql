const express = require("express");
const cors = require("cors");
const mysql2 = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql2.createConnection({
Host: sql12.freesqldatabase.com
Database name: sql12788277
Database user: sql12788277
Database password: 8dUZk8Dybr
Port number: 3306
});

//set up multer for the file uploads 

const storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null, 'uploads/'); 			//destination for folders
	},
	
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));		//Unique name
	},
});

const upload = multer({storage});

//Serve uploaded files staticaly 
app.use('/uploads',express.static('uploads'));

app.post("/ss", upload.single('file'), (req, res) => {
	let sql = "insert into student values(?,?,?,?)";
	let data = [req.body.rno, req.body.name, req.body.marks, req.file.filename];
	con.query(sql, data,(error, result) => {
		if(error)	res.send(error);
		else		res.send(result);
	});
});

app.get("/gs", (req, res) => {
	let sql = "select * from student";
	con.query(sql, (err, result) => {
		if(err)		res.send(err);
		else		res.send(result);
	});
});

app.delete("/ds", (req,res) => {
	let data = [req.body.rno];
	fs.unlink("./uploads/" + req.body.image, () => {});
	let sql = "delete from student where rno = ?";
	con.query(sql, data, (err, result) => {
		if(err)		res.send(err);
		else		res.send(result);
	});
});

app.listen(9000, () => {console.log("ready to sereve @9000");});



//Concept of blob