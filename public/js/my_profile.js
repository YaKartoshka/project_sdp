var stories_list=document.querySelector('.my_stories');




async function showProfile(){
    var card_title=document.getElementById('card-title')
    var card_text=document.getElementById('card-text');
    var card_text_city=document.getElementById('card-text-city');
    var fid=getCookie('fid');

    const users=fdb.collection('users');
    const users_qS=await users.get()

    var username;
    var author_email;
    var city;
    users_qS.forEach(doc=>{
        if(doc.id==fid){
        author_email=doc.data().email;
        username=doc.data().username;
        city=doc.data().city
        }
    });
    if(city!=undefined){
        card_text_city.innerHTML=city;
    }
    console.log(author_email.username)
    card_title.innerHTML=`Username : ${username}`;
    card_text.innerHTML=`Your email: ${author_email}`
    

}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

showProfile();
async function showMyStories(){
   const stories = fdb.collection('stories');
   const stories_qS=await stories.get();
   const users=fdb.collection('users');
   const users_qS=await users.get()
   var fid=getCookie('fid');
   var author_email;
   var username; 
   users_qS.forEach(doc=>{
    if(doc.id==fid){
     author_email=doc.data().email;
     username=doc.data().username;
    }
  });

   stories_qS.forEach(doc=>{
        if(doc.data().author_email==author_email){
        let author = doc.data().username;
        let story_text = doc.data().story_content;
        let story_title = doc.data().story_title;
        var newDiv = document.createElement("div");
        var newText = document.createElement("p");
        var newTitle = document.createElement("div");
        var newAuthor = document.createElement("div");
        
            

        newDiv.classList.add('container-lg')
        newDiv.classList.add('story')
        newDiv.classList.add('bg-primary');
        newDiv.id = doc.id;
        newText.classList.add('story_content');
        newTitle.classList.add('story_title');
        newAuthor.classList.add('story_author');
        newText.innerHTML = story_text;
    
        newAuthor.innerHTML = author;
        newTitle.innerHTML = story_title
        newDiv.innerHTML = newTitle.outerHTML + newText.outerHTML + newAuthor.outerHTML;
        stories_list.insertAdjacentElement('afterbegin',newDiv);
        }
   });
}
showMyStories();