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
  });


//Forma de traer datos de un servidor externo con jQery, ta,bioen conocido como un XMLHttpRequest
  $.ajax('https://randomuser.me/api', {
    method: 'GET',
    success : function(data){
      console.log(data)
    },
    error : function(error){
      console.log(error)
    }
  });



//Forma de traer datos de un servidor externo utilizando el método vanilla por defecto, esto devuelve una promesa
/*fetch('https://randomuser.me/api')
  .then(function(response){
    // console.log(response)
    return response.json()
  })
  .then(function(user){
    console.log('user', user.results[0].name.first)
  })
  .catch(function(){
    console.log('algo fallo')
  });*/

//Funciones asincronas
(async function load () {
  // await 
  //asction
  //terror
  //animation
  async function getData(url){  
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }
  const actionList =await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList= await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  const animationList= await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
  console.log('dramaList', dramaList)
    console.log('actionList', actionList)
    console.log('animationList', animationList)

  //Forma de traer un selector de html/css
//  const $home =  $('.home');
 const $modal = document.getElementById('modal')
 const $overlay = document.getElementById('overlay')
 const $hideModal = document.getElementById('hide-modal')
 

 const $modalImg = $modal.querySelector('img')
 const $modalTitle = $modal.querySelector('h1')
 const $modalDescription = $modal.querySelector('p')

 const $featuringContainer = document.getElementById('#featuring')
 const $form = document.getElementById('#form')
 const $home = document.getElementById('#home')

 const $actionContainer = document.querySelector('#action')
 const $dramaContainer = document.getElementById('#drama')
 const $animationContainer = document.getElementById('#animation')
}) ()