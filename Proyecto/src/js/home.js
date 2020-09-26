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

  const $form = document.getElementById('form');
 const $home = document.getElementById('home')
 const $featuringContainer = document.getElementById('featuring')


 //Agregando atributos css 
function setAttributes($element, attributes){
  for(const attribute in attributes){
    $element.setAttribute(attribute, attributes[attribute]);
  }
}

//Evento de busqueda en la barra de website
$form.addEventListener('submit', (event) =>{
  event.preventDefault();//quita la recarga al submit
  $home.classList.add('search-active')
  const $loader = document.createElement('img');
  setAttributes($loader, {
    src : 'src/images/loader.gif',
    height: 50,
    width: 50,
  })
  $featuringContainer.append($loader);
 }) 



  const actionList =await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList= await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  const animationList= await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')
  console.log('dramaList', dramaList)
    console.log('actionList', actionList)
    console.log('animationList', animationList)

function videoItemTemplate(movie){
  return (
`<div class="primaryPlaylistItem">
  <div class="primaryPlaylistItem-image">
    <img src="${movie.medium_cover_image}">
  </div>
  <h4 class="primaryPlaylistItem-title">
    ${movie.title}
  </h4>
</div>`
  )
}


function createTemplate(HTMLString){
  const html = document.implementation.createHTMLDocument()
  html.body.innerHTML = HTMLString;
  return html.body.children[0];
}

function addEventClick($element){
  $element.addEventListener('click', () =>{
    showModal() //funcion para mostrar el modal
  })

}

function renderMovieList(list, $container){
  // actionList.data.movies
  $container.children[0].remove();//Eliminar reload
  list.forEach((movie) => {
    const HTMLString = videoItemTemplate(movie) 
    const movieElement = createTemplate(HTMLString)
    $container.append(movieElement)
    addEventClick(movieElement) 
  })
}

const $actionContainer = document.querySelector('#action')
renderMovieList(actionList.data.movies,$actionContainer)

const $dramaContainer = document.getElementById('drama')
renderMovieList(dramaList.data.movies,$dramaContainer)

const $animationContainer = document.getElementById('animation')
renderMovieList(animationList.data.movies,$animationContainer)

  //Forma de traer un selector de html/css
//  const $home =  $('.home');
 const $modal = document.getElementById('modal')
 const $overlay = document.getElementById('overlay')
 const $hideModal = document.getElementById('hide-modal')
 

 const $modalImg = $modal.querySelector('img')
 const $modalTitle = $modal.querySelector('h1')
 const $modalDescription = $modal.querySelector('p')


function showModal (){
  $overlay.classList.add('active')
  $modal.style.animation = 'modalIn .8s forwards'
}

 $hideModal.addEventListener('click', hideModal)
 function hideModal (){
  $overlay.classList.remove('active')
  $modal.style.animation = 'modalOut .8s forwards'
 }

// function videoItemTemplate(src,title){
//   return (
// `<div class="primaryPlaylistItem">
//   <div class="primaryPlaylistItem-image">
//     <img src="${src}">
//   </div>
//   <h4 class="primaryPlaylistItem-title">
//     ${title}
//   </h4>
// </div>`
//   )
// }
// console.log(videoItemTemplate('src/'))

}) ()