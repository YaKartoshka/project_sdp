var stories_list=document.querySelector(".stories");

async function showAllStories(){
    console.log('start')
   const stories = fdb.collection('stories');
   const stories_qS=await stories.get();
   console.log('start')
   stories_qS.forEach(doc=>{
        console.log(doc.id)
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
    
   });
}
showAllStories();

async function showStoriesByCategory(){
  var select = document.getElementById('categories');
  var selected_category =await select.options[select.selectedIndex].text;
  console.log(selected_category)
}

function removeStories(){
     var cards = document.querySelectorAll('.story');
    cards.forEach(card=>{
        card.remove();
    });
}


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

const storyObserver = new Observer();

storyObserver.subscribe(()=>{
     removeStories();
     showAllStories();
});

fdb.collection('stories').onSnapshot(doc=>{
storyObserver.broadcast();
})
