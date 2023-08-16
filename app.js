const express = require("express");
const path = require("path");
const app = express();
const host='127.0.0.1';
const port = 8080;
// const fs=require('fs');
const mongoose = require("mongoose");
// const { default: mongoose } = require('mongoose');
const bodyparser = require("body-parser", { UserNewUrlparser: true });
// var MONGODB_CONNECT_URI="mongodb+srv://harshith:harshith1520@cluster.jl03mrs.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect("mongodb+srv://harshith:harshith1520@cluster.jl03mrs.mongodb.net/danceDetails?retryWrites=true&w=majority");
//mongoose.connect("mongodb+srv://cluster.jl03mrs.mongodb.net/");
// --apiVersion 1 --username harshith

var details = new mongoose.Schema({
  name: String,
  pass: String,
  add: String,
  remarks: String,
});

var con = mongoose.model("con", details);

// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//     name: {type:String},
//     pass: {type:String},
//     add: {type:String},
//     remarks: {type:String},
// });

// var User = mongoose.model('User', UserSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set('views',path.join(__dirname,'views'))
app.get("/", (req, res) => {
  const ravi = { title: "fall" };
  res.status(200).render("contact.pug", ravi);
});

app.post("/", (req, res) => {
  // console.log(req.body);
  // name=req.body.name;
  // pass=req.body.pass;
  // add=req.body.add;
  // remarks=req.body.remarks;
  // const out=`${name},${pass},${add},${remarks}`
  // fs.writeFileSync('out.txt',out);
  var out = new con(req.body);
  out.save().then(() => {
      res.send("success");
    }).catch(() => {
      res.status(400).send("jfskjldhfsgldfg");
    });
  // const ravi={'message':'Ur form has submitted successfully.'};
  // res.status(200).render('index.pug',ravi);
});

app.listen(port, () => {
  console.log(`success http://${host}:${port}`);
});
