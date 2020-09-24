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


//Forma de traer datos de un servidor externo con jQery, ta,bioen conocido como un XMLHttpRequest
  $.ajax('https://randomuser.me/api', {
    method: 'GET',
    success : function(data){
      console.log(data)
    },
    error : function(error){
      console.log(error)
    }
  })



//Forma de traer datos de un servidor externo utilizando el método vanilla por defecto, esto devuelve una promesa
fetch('https://randomuser.me/api')
  .then(function(response){
    // console.log(response)
    return response.json()
  })
  .then(function(user){
    console.log('user', user.results[0].name.first)
  })
  .catch(function(){
    console.log('algo fallo')
  })