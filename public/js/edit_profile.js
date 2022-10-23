var username;
const fid=getCookie('fid');
async function initializeFDB(){
 

    const users=fdb.collection('users');
    const users_qS=await users.get();

    users_qS.forEach(doc=>{
        if(doc.id==fid){
            username=doc.data().username;
            
        }
    });

}




class User {
    constructor(username) {
        this.username = username;

        this.edit = function () {
            console.log("Data is added");
        };
    }
}

class DecoratedUser {
    constructor(user, new_name, city) {
        this.user = user;
        this.new_name = new_name;
        this.city = city;

        this.edit = async function () {
            var edit_user = await fdb.collection('users').doc(`${fid}`).update({
                username: this.new_name,
                city:this.city
              });
             
        };
    }
}

function editProfile(){
    var new_name=document.getElementById('new_name').value;
    var city = document.getElementById('city').value;
    var decorated_user = new DecoratedUser(user, new_name, city);
    decorated_user.edit();
}



function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

var user = new User(username);
user.edit();

initializeFDB();