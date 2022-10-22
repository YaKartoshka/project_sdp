const textField = document.querySelector('.content');
const counter = document.querySelector('.counter');

class Observer {
    constructor () {
      this.observers = []
    }
  
    subscribe (fn) {
      this.observers.push(fn)
    }
  
    unsubscribe (fn) {
      this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }
  
    broadcast (data) {
      this.observers.forEach(subscriber => subscriber(data))
    }
  }
const textObserver = new Observer()

textObserver.subscribe(text => {
    counter.innerHTML = getWordsCount(text)
  })

textField.addEventListener('keyup', () => {
    textObserver.broadcast(textField.value)
  })

const getWordsCount = text =>
  text ? text.trim().split(/\s+/).length : 0
  

async function addStory(){
  
  var title=document.getElementById('title').value;
  var content=document.getElementById('content').value;
  var select = document.getElementById('categories');
  var selected_category = select.options[select.selectedIndex].text;
  console.log(title,content,selected_category);
  const users=fdb.collection('users');
  const users_qS=await users.get();
  var author_email;
  var username;
  var fid=getCookie('fid');
  users_qS.forEach(doc=>{
    if(doc.id==fid){
     author_email=doc.data().email;
     username=doc.data().username;
    }
  })

  var data = {
    story_title:title,
    story_content:content,
    username:username,
    author_email:author_email,
    category:selected_category
  }
  
  const new_story= await fdb.collection('stories').add(data);

}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
