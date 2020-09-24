console.log('hola mundo!');
const noCambia = "Jose";

let cambia = "@JoseMorales"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

//Creando promesa, la promesa necesita dos parametros donde uno se jecuta si todo sale bien y uno por si todo sale mal
const getUserAll = new Promise(function(todoBien, todoMal) {
  //Llama a un api
  setTimeout(function(){
    todoBien('se acabo el tiempo')
  }, 5000)
}) 


const getUser = new Promise(function(todoBien, todoMal) {
  //Llama a un api
  setTimeout(function(){
    todoBien('se acabo el tiempo 2')
  }, 2000)
}) 

/*
getUser
  //Si todo a ido bien se utiliza en then
  .then(function(){ //Promesa instantánea
    console.log('todo esta bien en la vida')
  })

  //Cuando la promesa se rechaza o falla se utiliza catch
  .catch(function(message){
    console.log(message)
  })
*/

  //forma de mandar multiples promesas .all
  //Forma de llamar la promesa que termine primero .race
Promise.race([
  getUser,
  getUserAll
])
  .then(function(message){
    console.log(message)
  })
  .catch(function(message){
    console.log(message)
  })