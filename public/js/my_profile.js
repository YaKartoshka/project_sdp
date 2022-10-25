var stories_list=document.querySelector('.my_stories');
var clicked_id=0;



async function showProfile(){
    var card_title=document.getElementById('card-title')
    var card_text=document.getElementById('card-text');
    var card_text_city=document.getElementById('card-text-city');
    var fid=getCookie('fid');

    var users=fdb.collection('users');
    

    var username;
    var author_email;
    var city;
    var users_qS=await users.get(); 
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
    console.log(author_email,username,city)
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
        var newDel = document.createElement("div");
        var btnClose = document.createElement("button");    
        var newLink = document.createElement("a");
        btnClose.classList.add('delbtn');
        btnClose.id = 'remove';    
        newDiv.classList.add('container-lg')
        newDiv.classList.add('story')
        newDiv.classList.add('bg-primary');
        newDiv.id = doc.id;
        newLink.classList.add('fa-solid')
        newLink.classList.add('fa-circle-xmark')
        newDel.id=doc.id;    
        newText.classList.add('story_content');
        newTitle.classList.add('story_title');
        newAuthor.classList.add('story_author');
        newText.innerHTML = story_text;
        newDel.classList.add('delete');
        newDel.setAttribute('onclick', "removeStorie(this.id)");    
        btnClose.innerHTML = newLink.outerHTML;
        newDel.innerHTML = btnClose.outerHTML;
        newAuthor.innerHTML = author;
        newTitle.innerHTML = story_title
        newDiv.innerHTML = newTitle.outerHTML + newText.outerHTML + newAuthor.outerHTML+newDel.outerHTML;
        stories_list.insertAdjacentElement('afterbegin',newDiv);
        $('.story').on("click", function () {
            delId = ($(this).attr('id'));
            
        })
        }
   });
}
showMyStories();


 
function removeStorie(click_id){
    
    const child_card=document.getElementById(click_id);
    child_card.remove();
    
    fdb.collection('stories').doc(`${click_id}`).delete().then(() => {
       
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
}