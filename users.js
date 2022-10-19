require('./admin_config')
const admin = require("firebase-admin");
const fdb=admin.firestore();

let UsersManager = class  {
    constructor(){
        this._strategy=null;
    }
    set strategy(strategy){
        this._strategy=strategy;
    }
    get strategy() {
        return this._strategy;
    }
    addUser(data){
        this._strategy.addUser(data);
    }
    addStory(story_data){
        this._strategy.addStory(story_data);
    }
}


let User = class {
    async addUser(data){
        var new_user=await fdb.collection('users').add(data);
        
    }
    async addStory(story_data){
        var new_story=await fdb.collection('users').doc(`${story_data.fid}`).collection('stories').add(story_data);

    }
}
module.exports = {UsersManager,User};