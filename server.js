const express=require('express');
const app=express();
const port=3000 || process.env.PORT;
const path=require('path');
const bodyParser=require('body-parser')

const sessions = require('express-session');
const cookieParser = require("cookie-parser");

const firebase=require('./firebase_config');
const auth=require('firebase/auth');
require('./admin_config')
const admin = require("firebase-admin");
const { getAuth } = require('firebase/auth');
const fauth=getAuth(firebase.getApp());
const fdb=admin.firestore();
 let {UsersManager,User} = require('./users.js');
const e = require('express');
const { response } = require('express');
var session;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/css', express.static(__dirname + '/public'))
app.use("/public", express.static(__dirname + "/public"));
app.use(sessions({
  secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
  saveUninitialized:true,
  cookie: { maxAge: 60000  },
  resave: false 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

 const usersManager=new UsersManager();
 const user=new User();


 app.post('/signIn', async (req, res) => {
  const email=req.body.email;
  const password=req.body.password;
  var id;
  auth.signInWithEmailAndPassword(fauth,email, password)
  .then(async(userCredential) => {
  
  session=req.session;
  session.email=email
  const company=fdb.collection('users');
  const company_qS=await company.get();
  company_qS.forEach(doc=>{
      if(doc.data().email==email){
          id=doc.id;
      }
  });


  res.cookie('fid',`${id}`);
  res.sendFile(path.join(__dirname + '/views/index.html'));
 })
  .catch((error) => {
  
  var errorCode = error.code;
  var errorMessage = error.message;
  res.redirect('back')
  
 });
});

 app.post('/signUp', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username=req.body.username;
  const company= fdb.collection('users');
  const company_qS=await company.get();
  var data={
    email:email,
    username:username
  }
  auth.createUserWithEmailAndPassword(fauth,email,password)
  .then(async(userCredential) => {
     session=req.session;
     session.email=email;  
     
     usersManager.strategy=user;
     usersManager.addUser(data);
     
     company_qS.forEach(doc=>{
      if(doc.data().email==email){
          id=doc.id;
      }
  });
     res.cookie('fid',`${id}`);
     res.sendFile(path.join(__dirname + '/views/index.html'));
   })
   .catch((error) => {
     var errorCode = error.code;
     var errorMessage = error.message;
     res.send(error)
   });
 

});

app.post('/addStory',(req,res)=>{
  if(fauth.currentUser!==null){
    res.sendFile(path.join(__dirname+'/views/index.html'))
  }else{
    res.redirect('/')
  }
})


app.get('/addStory',(req,res)=>{
  if(fauth.currentUser!==null){
    res.sendFile(path.join(__dirname+'/views/addStory.html'))
  }else{
    res.redirect('/')
  }
})

app.get('/signUp',(req,res)=>{
  
  res.sendFile(path.join(__dirname+'/views/signUp.html'));
  
});
 
 
 

app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname+'/views/signIn.html'));
});


  app.get('/index',(req,res)=>{
    if(fauth.currentUser!==null){
    res.sendFile(path.join(__dirname+'/views/index.html'));
    }else{
      res.redirect('/');
    }
  })
  
  
  app.post('/addUser',async(req,res)=>{
    if(fauth.currentUser!==null){
    const {name,surname,age}=req.body;
    }else{
      res.redirect('/');
    }
  })


app.listen(port,()=>{
    console.log(`App is listening at http://localhost:${port}`,);
});