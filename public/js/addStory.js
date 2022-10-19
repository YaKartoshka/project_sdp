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
